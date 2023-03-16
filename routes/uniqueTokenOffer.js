"use strict";

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const moment = require('moment');
const Op = Sequelize.Op;
const app = express();
const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('../config/apps.json');
const routeApi = config.test.etixPay.url;
const notifications = require("../utils/notification");

app.post("/create", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  let info = req.body;

  let dateNow = moment();
  info.unique_token_offerDATEEND = dateNow
    .add(23, "hour")
    .format("YYYY-MM-DD HH:mm:ss");

  const unique = await dbModels.unique.findByPk(info.uniqueID);

  const uniqueOfferTokenNew = dbModels.unique_token_offer.build(info);

  const uniqueOffertSave = await uniqueOfferTokenNew.save();

  let notificationInfo = {
    notificationTITLE: "Tokens - Offer received",
    USERTO: info.userOWNER,
    USERFROM: info.userBUY,
    notificationMESSAGE: "By " + info.unique_token_offerAMMOUNT + " ATM",
    notificationMESSAGETWO:
      "For " +
      info.unique_token_offerQUANTITYTOKEN +
      " tokens of this NFU " +
      unique.uniqueName,
    notificationLOOP: false,
    notificationVIEW: false,
    notificationNUMBERREPET: 0,
    notificationIMG: "",
    notificationIMGTWO: "",
    modelID: uniqueOffertSave.id,
    modelTYPE: "unique_token_offer",
    notificationTYPE: "FINANCIAL",
    notificationTYPEUSER: "SELL",
    notificationSITUATIONAUCTION: "SUCCESS",
    notificationSELLTYPE: "SELL",
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

  return res.status(200).send({
    success: true,
    message: dataLanguage.saved,
    data: uniqueOffertSave,
  });

  /* 
   uniqueOfferTokenNew.save().then(
        uniqueTokenOffersave=> {
    
                
            }
    ).catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: dataLanguage.errorSaved,
                    error: error
                });
            }
        );*/
});

app.get(
  "/get-details/:uniqueOfferTokenID",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let dateNow = moment();

    const uniqueOfferTokenID = req.params.uniqueOfferTokenID;

    const options = {
      where: {
        id: uniqueOfferTokenID,
      },
      include: [{ model: dbModels.unique }],
    };

    let uniqueOfferToken = await dbModels.unique_token_offer.findOne(options);

    if (
      uniqueOfferToken.unique_token_offerSTATUS != "PENDING" ||
      uniqueOfferToken.unique_token_offerDATEEND <= dateNow
    ) {
      return res.status(200).send({
        success: false,
        message: "This Offert Ended",
      });
    }

    return res.status(200).send({
      success: true,
      message: dataLanguage.saved,
      data: uniqueOfferToken,
    });
  }
);

app.post("/process-offer", mdAuthenticattion.checkToken,async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    let dateNow = moment();
    let uniqueOfferToken = await dbModels.unique_token_offer.findByPk(
      info.uniqueOfferTokenID
    );

    if (
      uniqueOfferToken.unique_token_offerSTATUS == "FAILED" ||
      uniqueOfferToken.unique_token_offerDATEEND <= dateNow ||
      uniqueOfferToken.unique_token_offerSTATUS == "REFUSED"
    ) {
      return res.status(200).send({
        success: false,
        message: "This Offert Ended",
      });
    }

    const unique = await dbModels.unique.findByPk(uniqueOfferToken.uniqueID);

    if (info.offerSTATUS == "SUCCESS") {
      let myTokensOwner = await dbModels.my_token.findOne({
        where: {
          uniqueID: uniqueOfferToken.uniqueID,
          userID: uniqueOfferToken.userOWNER,
        },
      });

      if (
        myTokensOwner.mytokenQUANTITYAVAIBLE <
        uniqueOfferToken.unique_token_offerQUANTITYTOKEN
      ) {
        /*let body = new FormData();
                body.append('transferCode', uniqueOfferToken.transactionCODE);
                body.append('observation', 'OFFER REJECTED');

                let transaction = await fetch(routeApi + "/api/v2/micro-service/transactions/cancel-offert-auction",
                {
                method: 'POST',
                headers: { 
                        'accept': 'application/json',
                        'token': 'EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD',
                        },
                body: body
                });*/

        uniqueOfferToken.unique_token_offerSTATUS = "REFUSED";

        dbModels.unique_token_offer.update(uniqueOfferToken.toJSON(), {
          where: { id: uniqueOfferToken.id },
        });

        let notificationInfo = {
          notificationTITLE: "Tokens - Ofert has beed refused",
          USERTO: uniqueOfferToken.userBUY,
          USERFROM: uniqueOfferToken.userOWNER,
          notificationMESSAGE:
            "By " + uniqueOfferToken.unique_token_offerAMMOUNT + " ATM",
          notificationMESSAGETWO:
            "For " +
            uniqueOfferToken.unique_token_offerQUANTITYTOKEN +
            " tokens of this unique " +
            unique.uniqueName,
          notificationLOOP: false,
          notificationVIEW: false,
          notificationNUMBERREPET: 0,
          notificationIMG: "",
          notificationIMGTWO: "",
          modelID: uniqueOfferToken.id,
          modelTYPE: "unique_token_offer",
          notificationTYPE: "FINANCIAL",
          notificationTYPEUSER: "SELL",
          notificationSITUATIONAUCTION: "FAIL",
          notificationSELLTYPE: "SELL",
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

        return res.status(200).send({
          success: false,
          message: "You don't have enough tokens",
        });
      }

      uniqueOfferToken.unique_token_offerSTATUS = "SUCCESS";

      let myTokenUserBuy = await dbModels.my_token.findOne({
        where: {
          uniqueID: uniqueOfferToken.uniqueID,
          userID: uniqueOfferToken.userBUY,
        },
      });

      if (myTokenUserBuy) {
        myTokenUserBuy.mytokenQUANTITYAVAIBLE =
          parseInt(myTokenUserBuy.mytokenQUANTITYAVAIBLE) +
          parseInt(uniqueOfferToken.unique_token_offerQUANTITYTOKEN);
        myTokenUserBuy.mytokenQUANTITYBUY =
          uniqueOfferToken.unique_token_offerQUANTITYTOKEN;
        myTokenUserBuy.mytokenPRICEBUY =
          uniqueOfferToken.unique_token_offerAMMOUNT /
          uniqueOfferToken.unique_token_offerQUANTITYTOKEN;
        dbModels.my_token.update(myTokenUserBuy.toJSON(), {
          where: { id: myTokenUserBuy.id },
        });
      } else {
        let infoTokens = {};
        infoTokens.userID = uniqueOfferToken.userBUY;
        infoTokens.uniqueID = uniqueOfferToken.uniqueID;
        infoTokens.projectID = myTokensOwner.projectID;
        infoTokens.projectCODE = myTokensOwner.projectCODE;
        infoTokens.mytokenSITUATION = "PUBLIC";
        infoTokens.mytokenQUANTITYAVAIBLE =
          uniqueOfferToken.unique_token_offerQUANTITYTOKEN;
        infoTokens.mytokenQUANTITYBUY =
          uniqueOfferToken.unique_token_offerQUANTITYTOKEN;
        infoTokens.mytokenPRICEBUY =
          uniqueOfferToken.unique_token_offerAMMOUNT /
          uniqueOfferToken.unique_token_offerQUANTITYTOKEN;

        const myTokenNewBuy = dbModels.my_token.build(infoTokens);

        myTokenNewBuy.save();
      }

      myTokensOwner.mytokenQUANTITYAVAIBLE =
        myTokensOwner.mytokenQUANTITYAVAIBLE -
        uniqueOfferToken.unique_token_offerQUANTITYTOKEN;

      dbModels.my_token.update(myTokensOwner.toJSON(), {
        where: { id: myTokensOwner.id },
      });

      let notificationInfo = {
        notificationTITLE: "Tokens - Offer has beed accepted",
        USERTO: uniqueOfferToken.userBUY,
        USERFROM: uniqueOfferToken.userOWNER,
        notificationMESSAGE:
          "By " + uniqueOfferToken.unique_token_offerAMMOUNT + " ATM",
        notificationMESSAGETWO:
          "For " +
          uniqueOfferToken.unique_token_offerQUANTITYTOKEN +
          " tokens of this unique " +
          unique.uniqueName,
        notificationLOOP: false,
        notificationVIEW: false,
        notificationNUMBERREPET: 0,
        notificationIMG: "",
        notificationIMGTWO: "",
        modelID: uniqueOfferToken.id,
        modelTYPE: "unique_token_offer",
        notificationTYPE: "FINANCIAL",
        notificationTYPEUSER: "SELL",
        notificationSITUATIONAUCTION: "SUCCESS",
        notificationSELLTYPE: "SELL",
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
    } else {
      /*
        const body = new FormData();
        body.append('transferCode', uniqueOfferToken.transactionCODE);
        body.append('observation', 'OFFER REJECTED');

                let transaction = await fetch(routeApi + "/api/v2/micro-service/transactions/cancel-offert-auction",
                {
                method: 'POST',
                headers: { 
                        'accept': 'application/json',
                        'token': 'EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD',
                        },
                body: body
                })*/
      uniqueOfferToken.unique_token_offerSTATUS = "REFUSED";

      let notificationInfo = {
        notificationTITLE: "Tokens - Ofert has beed refused",
        USERTO: uniqueOfferToken.userBUY,
        USERFROM: uniqueOfferToken.userOWNER,
        notificationMESSAGE:
          "By " + uniqueOfferToken.unique_token_offerAMMOUNT + " ATM",
        notificationMESSAGETWO:
          "For " +
          uniqueOfferToken.unique_token_offerQUANTITYTOKEN +
          " tokens of this unique " +
          unique.uniqueName,
        notificationLOOP: false,
        notificationVIEW: false,
        notificationNUMBERREPET: 0,
        notificationIMG: "",
        notificationIMGTWO: "",
        modelID: uniqueOfferToken.id,
        modelTYPE: "unique_token_offer",
        notificationTYPE: "FINANCIAL",
        notificationTYPEUSER: "SELL",
        notificationSITUATIONAUCTION: "FAIL",
        notificationSELLTYPE: "SELL",
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
    }

    dbModels.unique_token_offer
      .update(uniqueOfferToken.toJSON(), { where: { id: uniqueOfferToken.id } })
      .then((uniqueTokenOffersave) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: uniqueOfferToken,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: dataLanguage.errorSaved,
          error: error,
        });
      });
  }
);


module.exports = app;
