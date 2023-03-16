"use strict";

const express = require("express");
const dbModels = require("../models");
const Sequelize = require("sequelize");
const mdAuthenticattion = require("../middlewares/authenticated");
const notifications = require("../utils/notification");
const moment = require("moment");
const fetch = require("node-fetch");
const FormData = require("form-data");
const config = require("../config/apps.json");

exports.auctionJob = async () => {
  let dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
  let dateNow2 = moment();

  const Op = Sequelize.Op;

  const routeApi = config.production.etixPay.url;

  const uniqueSellOptions = {
    where: {
      unique_sellSITUATION: {
        [Op.eq]: "WAITING",
      },
      unique_sellTYPE: {
        [Op.eq]: "AUCTION",
      },
      unique_sellDATEEXPIRE: {
        [Op.lt]: dateNow,
      },
    },
    include: [
      {
        model: dbModels.auction_offer,
        where: {
          auction_offerSTATUS: {
            [Op.eq]: "ACTIVE",
          },
        },
        required: false,
      },
    ],
  };

  let uniqueSell = await dbModels.unique_sell.findAll(uniqueSellOptions);

  let body = new FormData();
  let bodyToken = new FormData();

  uniqueSell.forEach(async (element) => {
    let unique = await dbModels.unique.findByPk(element.uniqueID);

    element.unique_sellSTATUS = "INACTIVE";

    let myToken = await dbModels.my_token.findOne({
      where: { uniqueID: element.uniqueID, userID: element.userID },
    });

    if (element.auction_offers[0]) {
      //body Token
      let newToken = {};

      let tokens_user = await dbModels.my_token.findOne({
        where: {
          userID: element.auction_offers[0].userID,
          uniqueID: element.uniqueID,
        },
      });

      newToken.uniqueID = element.uniqueID;
      newToken.userID = element.auction_offers[0].userID;
      newToken.mytokenQUANTITYAVAIBLE = element.unique_sellQUANTITYSALE;
      newToken.mytokenQUANTITYBUY = element.unique_sellQUANTITYSALE;
      newToken.mytokenPRICEBUY =
        element.auction_offers[0].auction_offerAMMOUNT /
        element.unique_sellQUANTITYSALE;

      let auctionOffert = element.auction_offers[0];

      const walletResponse = await fetch(
        routeApi +
          "/api/v2/micro-service/p73/get-balance-wallet/" +
          auctionOffert.userID,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            token:
              "EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD",
          },
        }
      );

      const wallet = await walletResponse.json();

      const walletID = wallet.data.id;

      if (element.unique_sellAUCTIONBOOKINGPRICE) {
        if (
          element.auction_offers[0].auction_offerAMMOUNT <
          element.unique_sellAUCTIONBOOKINGPRICE
        ) {
          element.unique_sellSITUATION = "NO-MET";
          element.unique_sellDATEEXPIRE = dateNow2
            .add(23, "hour")
            .format("YYYY-MM-DD HH:mm:ss");

          let notificationInfo = {
            notificationTITLE: "AUCTION ENDED",
            USERTO: element.userID,
            USERFROM: element.userID,
            notificationMESSAGE: "Reserve price",
            notificationMESSAGETWO: "NOT MET",
            notificationLOOP: false,
            notificationVIEW: false,
            notificationNUMBERREPET: 0,
            notificationIMG: "",
            notificationIMGTWO: "",
            modelID: element.id,
            modelTYPE: "UNIQUE_SELL",
            notificationTYPE: "FINANCIAL",
            notificationTYPEUSER: "SELL",
            notificationSITUATIONAUCTION: "NO-MET",
            notificationSELLTYPE: "AUCTION",
            notificationCOLORTITLE: "",
            notificationCOLORMESSAGE: "",
            notificationCOLORMESSAGETWO: "DANGER",
          };

          let notificationBuild = dbModels.notification.build(notificationInfo);

          let notification = await notificationBuild.save();

          let sendNotification = {
            userID: notification.USERTO,
            notificationID: notification.id,
            subscriptionAPP: "P73",
          };

          notifications.sendNotification(sendNotification);
        } else {
          element.unique_sellSITUATION = "SUCCESS";
          element.userBUY = auctionOffert.userID;
          // Token Asigne
          myToken.mytokenSITUATION = "PUBLIC";
          dbModels.my_token.update(myToken.toJSON(), {
            where: { id: myToken.id },
          });

          if (tokens_user) {
            tokens_user.mytokenQUANTITYAVAIBLE =
              parseInt(tokens_user.mytokenQUANTITYAVAIBLE) +
              parseInt(element.unique_sellQUANTITYSALE);
            tokens_user.mytokenQUANTITYBUY = element.unique_sellQUANTITYSALE;
            tokens_user.mytokenPRICEBUY =
              element.auction_offers[0].auction_offerAMMOUNT /
              element.unique_sellQUANTITYSALE;
            dbModels.my_token.update(tokens_user.toJSON(), {
              where: { id: tokens_user.id },
            });
          } else {
            let tokenBuild = dbModels.my_token.build(newToken);
            tokenBuild.save();
          }
          //Transaction
          body.append("transferCode", auctionOffert.transactionCODE);
          body.append("userID", auctionOffert.userID);
          body.append("amount", auctionOffert.auction_offerAMMOUNT);
          body.append("commissionPercentage", 2.5);
          body.append("userTO", element.userID);

          if (unique.uniqueROYALTYPERCENTAGE) {
            body.append("royaltyPercentage", unique.uniqueROYALTYPERCENTAGE);
            body.append("userRoyaltyID", unique.uniqueUSERCREATOR);
          }

          let transaction = await fetch(
            routeApi +
              "/api/v2/micro-service/transactions/approved-offert-auction",
            {
              method: "POST",
              headers: {
                accept: "application/json",
                token:
                  "EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD",
              },
              body: body,
            }
          );

          auctionOffert.auction_offerSTATUS = "APPROVED";
          dbModels.auction_offer.update(auctionOffert.toJSON(), {
            where: { id: auctionOffert.id },
          });

          //Transaction Token
          bodyToken.append("userID", auctionOffert.userID);
          bodyToken.append("walletTO", walletID);
          bodyToken.append("projectID", element.projectID);
          bodyToken.append("amount", element.unique_sellQUANTITYSALE);
          bodyToken.append("userFROM", element.userID);

          let transactionToken = await fetch(
            routeApi + "/api/v2/micro-service/transactions/buy-token-art",
            {
              method: "POST",
              headers: {
                accept: "application/json",
                token:
                  "EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD",
              },
              body: bodyToken,
            }
          );

          //Notification Sell

          let notificationInfo = {
            notificationTITLE: "AUCTION ENDED",
            USERTO: element.userID,
            USERFROM: auctionOffert.userID,
            notificationMESSAGE: "Last offer",
            notificationMESSAGETWO: auctionOffert.auction_offerAMMOUNT + " ATM",
            notificationLOOP: false,
            notificationVIEW: false,
            notificationNUMBERREPET: 0,
            notificationIMG: "",
            notificationIMGTWO: "",
            modelID: element.id,
            modelTYPE: "UNIQUE_SELL",
            notificationTYPE: "FINANCIAL",
            notificationTYPEUSER: "SELL",
            notificationSITUATIONAUCTION: "SUCCESS",
            notificationSELLTYPE: "AUCTION",
            notificationCOLORTITLE: "",
            notificationCOLORMESSAGE: "",
            notificationCOLORMESSAGETWO: "PRIMARY",
          };

          let notificationBuild = dbModels.notification.build(notificationInfo);

          let notification = await notificationBuild.save();

          let sendNotification = {
            userID: notification.USERTO,
            notificationID: notification.id,
            subscriptionAPP: "P73",
          };

          notifications.sendNotification(sendNotification);

          //Notification Buy

          let notificationInfoTwo = {
            notificationTITLE: "You Won The Auction!",
            USERTO: auctionOffert.userID,
            USERFROM: element.userID,
            notificationMESSAGE:
              "+" + element.unique_sellQUANTITYSALE + " tokens",
            notificationMESSAGETWO:
              "-" + auctionOffert.auction_offerAMMOUNT + " ATM",
            notificationLOOP: false,
            notificationVIEW: false,
            notificationNUMBERREPET: 0,
            notificationIMG: "",
            notificationIMGTWO: "",
            modelID: element.id,
            modelTYPE: "UNIQUE_SELL",
            notificationTYPE: "FINANCIAL",
            notificationTYPEUSER: "BUY",
            notificationSITUATIONAUCTION: "SUCCESS",
            notificationSELLTYPE: "AUCTION",
            notificationCOLORTITLE: "",
            notificationCOLORMESSAGE: "",
            notificationCOLORMESSAGETWO: "DANGER",
          };

          let notificationBuildTwo =
            dbModels.notification.build(notificationInfoTwo);

          let notificationTwo = await notificationBuildTwo.save();

          sendNotification = {
            userID: notificationTwo.USERTO,
            notificationID: notificationTwo.id,
            subscriptionAPP: "P73",
          };

          notifications.sendNotification(sendNotification);

          if (element.unique_sellNFT == true) {
            unique.userCREATOR = auctionOffert.userID;
            dbModels.unique.update(unique.toJSON(), {
              where: { id: unique.id },
            });
          }
        }
      } else {
        element.unique_sellSITUATION = "SUCCESS";
        element.userBUY = auctionOffert.userID;
        // Token Asigne
        myToken.mytokenSITUATION = "PUBLIC";
        dbModels.my_token.update(myToken.toJSON(), {
          where: { id: myToken.id },
        });

        if (tokens_user) {
          tokens_user.mytokenQUANTITYAVAIBLE =
            parseInt(tokens_user.mytokenQUANTITYAVAIBLE) +
            parseInt(element.unique_sellQUANTITYSALE);
          tokens_user.mytokenQUANTITYBUY = element.unique_sellQUANTITYSALE;
          tokens_user.mytokenPRICEBUY =
            element.auction_offers[0].auction_offerAMMOUNT;
          dbModels.my_token.update(tokens_user.toJSON(), {
            where: { id: tokens_user.id },
          });
        } else {
          let tokenBuild = dbModels.my_token.build(newToken);
          tokenBuild.save();
        }
        //Transaction
        body.append("transferCode", auctionOffert.transactionCODE);
        body.append("userID", auctionOffert.userID);
        body.append("amount", auctionOffert.auction_offerAMMOUNT);
        body.append("commissionPercentage", 2.5);
        body.append("userTO", element.userID);

        if (unique.uniqueROYALTYPERCENTAGE) {
          body.append("royaltyPercentage", unique.uniqueROYALTYPERCENTAGE);
          body.append("userRoyaltyID", unique.uniqueUSERCREATOR);
        }

        let transaction = await fetch(
          routeApi +
            "/api/v2/micro-service/transactions/approved-offert-auction",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              token:
                "EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD",
            },
            body: body,
          }
        );

        auctionOffert.auction_offerSTATUS = "APPROVED";
        dbModels.auction_offer.update(auctionOffert.toJSON(), {
          where: { id: auctionOffert.id },
        });

        //Create Token Serve Etix
        //Transaction Token
        bodyToken.append("userID", auctionOffert.userID);
        bodyToken.append("walletTO", walletID);
        bodyToken.append("projectID", element.projectID);
        bodyToken.append("amount", element.unique_sellQUANTITYSALE);
        bodyToken.append("userFROM", element.userID);

        let transactionToken = await fetch(
          routeApi + "/api/v2/micro-service/transactions/buy-token-art",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              token:
                "EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD",
            },
            body: bodyToken,
          }
        );

        //Notification Sell

        let notificationInfo = {
          notificationTITLE: "AUCTION ENDED",
          USERTO: element.userID,
          USERFROM: auctionOffert.userID,
          notificationMESSAGE: "Last offer",
          notificationMESSAGETWO: auctionOffert.auction_offerAMMOUNT + " ATM",
          notificationLOOP: false,
          notificationVIEW: false,
          notificationNUMBERREPET: 0,
          notificationIMG: "",
          notificationIMGTWO: "",
          modelID: element.id,
          modelTYPE: "UNIQUE_SELL",
          notificationTYPE: "FINANCIAL",
          notificationTYPEUSER: "SELL",
          notificationSITUATIONAUCTION: "SUCCESS",
          notificationSELLTYPE: "AUCTION",
          notificationCOLORTITLE: "",
          notificationCOLORMESSAGE: "",
          notificationCOLORMESSAGETWO: "",
        };

        let notificationBuild = dbModels.notification.build(notificationInfo);

        let notification = await notificationBuild.save();

        let sendNotification = {
          userID: notification.USERTO,
          notificationID: notification.id,
          subscriptionAPP: "P73",
        };

        notifications.sendNotification(sendNotification);

        //Notification Buy

        let notificationInfoTwo = {
          notificationTITLE: "You Won The Auction!",
          USERTO: auctionOffert.userID,
          USERFROM: element.userID,
          notificationMESSAGE:
            "+" + element.unique_sellQUANTITYSALE + " tokens",
          notificationMESSAGETWO:
            "-" + auctionOffert.auction_offerAMMOUNT + " ATM",
          notificationLOOP: false,
          notificationVIEW: false,
          notificationNUMBERREPET: 0,
          notificationIMG: "",
          notificationIMGTWO: "",
          modelID: element.id,
          modelTYPE: "UNIQUE_SELL",
          notificationTYPE: "FINANCIAL",
          notificationTYPEUSER: "BUY",
          notificationSITUATIONAUCTION: "SUCCESS",
          notificationSELLTYPE: "AUCTION",
          notificationCOLORTITLE: "",
          notificationCOLORMESSAGE: "",
          notificationCOLORMESSAGETWO: "",
        };

        let notificationBuildTwo =
          dbModels.notification.build(notificationInfoTwo);

        let notificationTwo = await notificationBuildTwo.save();

        sendNotification = {
          userID: notificationTwo.USERTO,
          notificationID: notificationTwo.id,
          subscriptionAPP: "P73",
        };

        notifications.sendNotification(sendNotification);

        if (element.unique_sellNFT == true) {
          unique.userCREATOR = auctionOffert.userID;
          dbModels.unique.update(unique.toJSON(), { where: { id: unique.id } });
        }
      }
    } else {
      element.unique_sellSITUATION = "FAIL";

      //Notification

      let notificationInfo = {
        notificationTITLE: "AUCTION ENDED",
        USERTO: element.userID,
        USERFROM: element.userID,
        notificationMESSAGE: "NO OFFERS RECEIVED",
        notificationMESSAGETWO: "",
        notificationLOOP: false,
        notificationVIEW: false,
        notificationNUMBERREPET: 0,
        notificationIMG: "",
        notificationIMGTWO: "",
        modelID: element.id,
        modelTYPE: "UNIQUE_SELL",
        notificationTYPE: "FINANCIAL",
        notificationTYPEUSER: "SELL",
        notificationSITUATIONAUCTION: "FAIL",
        notificationSELLTYPE: "AUCTION",
        notificationCOLORTITLE: "",
        notificationCOLORMESSAGE: "DANGER",
        notificationCOLORMESSAGETWO: "",
      };

      let notificationBuild = dbModels.notification.build(notificationInfo);

      let notification = await notificationBuild.save();

      let sendNotification = {
        userID: notification.USERTO,
        notificationID: notification.id,
        subscriptionAPP: "P73",
      };

      notifications.sendNotification(sendNotification);

      myToken.mytokenSITUATION = "PUBLIC";
      myToken.mytokenQUANTITYAVAIBLE =
        parseInt(myToken.mytokenQUANTITYAVAIBLE) +
        parseInt(element.unique_sellQUANTITYSALE);

      dbModels.my_token.update(myToken.toJSON(), { where: { id: myToken.id } });
    }
    const uniqueSellUpdate = element;

    await dbModels.unique_sell.update(uniqueSellUpdate.toJSON(), {
      where: { id: uniqueSellUpdate.id },
    });
  });
};
