"use strict";

const express = require("express");
const dbModels = require("../models");
const Sequelize = require("sequelize");
const mdAuthenticattion = require("../middlewares/authenticated");
const funtions = require("../utils/funtions");
const moment = require("moment");
const { doDuring } = require("async");

const app = express();

app.post("/create", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let info = req.body;
  let dateNow = moment();
  info.unique_sellDATEEXPIRE =
    req.body.days === 0
      ? null
      : dateNow.add(req.body.days, "days").format("YYYY-MM-DD HH:mm:ss");
  const uniqueBuild = dbModels.unique_sell.build(info);
  let tokens;
  if (info.unique_sellTYPE === "AUCTION") {
    tokens = await dbModels.my_token.findOne({
      where: { uniqueID: info.uniqueID, userID: info.userID },
    });
    if (tokens)
      tokens.mytokenQUANTITYAVAIBLE =
        tokens.mytokenQUANTITYAVAIBLE - info.unique_sellQUANTITYSALE;
  }

  uniqueBuild
    .save()
    .then(async (uniqueSaved) => {
      if (tokens)
        await dbModels.my_token.update(tokens.toJSON(), {
          where: { uniqueID: info.uniqueID, userID: info.userID },
        });
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: uniqueSaved,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        success: false,
        message: dataLanguage.errorSaved,
        error: error,
      });
    });
});

app.post("/close", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const sellID = req.body.sellID;
  let sellinfo = await dbModels.unique_sell.findByPk(sellID);

  sellinfo.unique_sellSTATUS = "INACTIVE";
  sellinfo.unique_sellSITUATION = req.body.statusTransaction;

  if (req.body.userBUY) {
    sellinfo.userBUY = req.body.userBUY;

    if (req.body.statusTransaction == "SUCCESS") {
      /* REGISTER BUY*/
      let infoTrasaction = {};
      infoTrasaction.transactionAMOUNT = sellinfo.unique_sellPRICE;
      infoTrasaction.userTO = req.body.userBUY;
      infoTrasaction.userFROM = sellinfo.userID;
      infoTrasaction.uniqueID = sellinfo.uniqueID;
      infoTrasaction.unique_sellID = sellinfo.id;
      infoTrasaction.userID = req.body.userBUY;
      infoTrasaction.transactionAMOUNTTOKEN = sellinfo.unique_sellQUANTITYSALE;
      infoTrasaction.transactionOBSERVATION = "BUY UNIQUE";
      infoTrasaction.transactionSTATUS = "COMPLETED";
      const transactionBuild = dbModels.transaction.build(infoTrasaction);
      transactionBuild.save();

      /* REGISTER SELL*/
      let infoTrasactionSell = {};
      infoTrasactionSell.transactionAMOUNT = sellinfo.unique_sellPRICE;
      infoTrasactionSell.userTO = req.body.userBUY;
      infoTrasactionSell.userID = sellinfo.userID;
      infoTrasactionSell.userFROM = sellinfo.userID;
      infoTrasactionSell.uniqueID = sellinfo.uniqueID;
      infoTrasactionSell.unique_sellID = sellinfo.id;
      infoTrasactionSell.transactionAMOUNTTOKEN =
        sellinfo.unique_sellQUANTITYSALE;
      infoTrasactionSell.transactionOBSERVATION = "SELL UNIQUE";
      infoTrasactionSell.transactionSTATUS = "COMPLETED";
      const transactionBuildSell =
        dbModels.transaction.build(infoTrasactionSell);
      transactionBuildSell.save();

      const commissionPercentage = (sellinfo.unique_sellPRICE * 2.5) / 100;
      let infoTrasactionCommision = {};
      infoTrasactionCommision.transactionAMOUNT = commissionPercentage;
      infoTrasactionCommision.userTO = sellinfo.userID;
      infoTrasactionCommision.uniqueID = sellinfo.uniqueID;
      infoTrasactionCommision.unique_sellID = sellinfo.id;
      infoTrasactionCommision.userID = sellinfo.userID;
      infoTrasactionCommision.transactionOBSERVATION =
        "PAY COMMISION PROTOCOL73";
      infoTrasactionCommision.transactionSTATUS = "COMPLETED";
      const transactionBuildCommision = dbModels.transaction.build(
        infoTrasactionCommision
      );
      transactionBuildCommision.save();
    }
  }

  dbModels.unique_sell
    .update(sellinfo.toJSON(), { where: { id: sellID } })
    .then((uniqueSaved) => {
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: uniqueSaved,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        success: false,
        message: dataLanguage.errorSaved,
        error: error,
      });
    });
});

app.post(
  "/close-auction",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    const Op = Sequelize.Op;

    const sellID = req.body.sellID;

    let sellinfo = await dbModels.unique_sell.findByPk(sellID);
    sellinfo.unique_sellSTATUS = "INACTIVE";
    sellinfo.unique_sellSITUATION = info.statusTransaction;

    const optionsAuctionOffer = {
      where: {
        unique_sellID: {
          [Op.eq]: sellID,
        },
        auction_offerSTATUS: {
          [Op.eq]: "ACTIVE",
        },
      },
    };

    let auctionOffert = await dbModels.auction_offer.findOne(
      optionsAuctionOffer
    );

    let myToken = await dbModels.my_token.findOne({
      where: { uniqueID: sellinfo.uniqueID, userID: sellinfo.userID },
    });
    myToken.mytokenSITUATION = "PUBLIC";
    if (info.statusTransaction == "SUCCESS") {
      auctionOffert.auction_offerSTATUS = "APPROVED";
      sellinfo.userBUY = auctionOffert.userID;
      /* REGISTER BUY*/
      let infoTrasaction = {};
      infoTrasaction.transactionAMOUNT = sellinfo.unique_sellPRICE;
      infoTrasaction.userTO = auctionOffert.userID;
      infoTrasaction.userFROM = sellinfo.userID;
      infoTrasaction.uniqueID = sellinfo.uniqueID;
      infoTrasaction.unique_sellID = sellinfo.id;
      infoTrasaction.userID = auctionOffert.userID;
      infoTrasaction.transactionAMOUNTTOKEN = sellinfo.unique_sellQUANTITYSALE;
      infoTrasaction.transactionOBSERVATION = "WIN UNIQUE AUCTION";
      infoTrasaction.transactionSTATUS = "COMPLETED";
      const transactionBuild = dbModels.transaction.build(infoTrasaction);
      transactionBuild.save();

      /* REGISTER SELL*/
      let infoTrasactionSell = {};
      infoTrasactionSell.transactionAMOUNT = sellinfo.unique_sellPRICE;
      infoTrasactionSell.userTO = auctionOffert.userID;
      infoTrasactionSell.userID = sellinfo.userID;
      infoTrasactionSell.userFROM = sellinfo.userID;
      infoTrasactionSell.uniqueID = sellinfo.uniqueID;
      infoTrasactionSell.unique_sellID = sellinfo.id;
      infoTrasactionSell.transactionAMOUNTTOKEN =
        sellinfo.unique_sellQUANTITYSALE;
      infoTrasactionSell.transactionOBSERVATION = "SELL UNIQUE AUCTION";
      infoTrasactionSell.transactionSTATUS = "COMPLETED";
      const transactionBuildSell =
        dbModels.transaction.build(infoTrasactionSell);
      transactionBuildSell.save();

      const commissionPercentage = (sellinfo.unique_sellPRICE * 2.5) / 100;
      let infoTrasactionCommision = {};
      infoTrasactionCommision.transactionAMOUNT = commissionPercentage;
      infoTrasactionCommision.userTO = sellinfo.userID;
      infoTrasactionCommision.uniqueID = sellinfo.uniqueID;
      infoTrasactionCommision.unique_sellID = sellinfo.id;
      infoTrasactionCommision.userID = sellinfo.userID;
      infoTrasactionCommision.transactionOBSERVATION =
        "PAY COMMISION PROTOCOL73";
      infoTrasactionCommision.transactionSTATUS = "COMPLETED";
      const transactionBuildCommision = dbModels.transaction.build(
        infoTrasactionCommision
      );
      transactionBuildCommision.save();
    } else {
      auctionOffert.auction_offerSTATUS = "REJECTED";
      myToken.mytokenQUANTITYAVAIBLE =
        myToken.mytokenQUANTITYAVAIBLE + sellinfo.unique_sellQUANTITYSALE;
    }

    dbModels.my_token.update(myToken.toJSON(), {
      where: { uniqueID: sellinfo.uniqueID, userID: sellinfo.userID },
    });

    dbModels.auction_offer.update(auctionOffert.toJSON(), {
      where: { id: auctionOffert.id },
    });

    dbModels.unique_sell
      .update(sellinfo.toJSON(), { where: { id: sellID } })
      .then((uniqueSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: uniqueSaved,
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

app.post(
  "/user-auctions",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    const Op = Sequelize.Op;

    const uniqueSellOptions = {
      where: {
        userID: {
          [Op.eq]: info.userID,
        },
        unique_sellSITUATION: {
          [Op.eq]: info.statusTransaction,
        },
        unique_sellTYPE: {
          [Op.eq]: "AUCTION",
        },
      },
      include: [{ model: dbModels.auction_offer, order: [["id", "DESC"]] }],
    };

    let uniqueSell = await dbModels.unique_sell.findAll(uniqueSellOptions);

    return res.status(200).send({
      success: true,
      message: "List Actions",
      data: uniqueSell,
    });

    await dbModels.unique_sell
      .findAll(uniqueSellOptions)
      .then((uniques_sells) => {
        return res.status(200).send({
          success: true,
          message: "List Actions",
          data: uniques_sells,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: "error list",
          error: error,
        });
      });
  }
);

app.get("/get-detail-auction/:sellID", async (req, res, next) => {
  const sellID = req.params.sellID;

  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  let info = {};

  info.auction = await dbModels.unique_sell.findByPk(sellID);

  if (info.auction) {
    info.profile = await dbModels.profile.findOne({
      where: { userID: info.auction.userID },
    });
    const Op = Sequelize.Op;

    const optionsUnique = {
      where: {
        id: {
          [Op.eq]: info.auction.uniqueID,
        },
      },
      order: [["id", "DESC"]],
    };

    info.unique = await dbModels.unique.findOne(optionsUnique);
  }

  return res.status(200).send({
    success: true,
    message: "Auction Details",
    data: info,
  });
});

app.get("/get-auction-offers/:sellID", async (req, res, next) => {
  const sellID = req.params.sellID;

  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  const Op = Sequelize.Op;

  const options = {
    where: {
      unique_sellID: {
        [Op.eq]: sellID,
      },
    },
    include: [{ model: dbModels.profile }],
    order: [["id", "DESC"]],
  };

  let offers = await dbModels.auction_offer.findAll(options);

  return res.status(200).send({
    success: true,
    message: dataLanguage.saved,
    data: offers,
  });
});

app.get("/get-auction-user-token/:sellID", async (req, res, next) => {
  const sellID = req.params.sellID;

  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  let auction = await dbModels.unique_sell.findByPk(sellID);

  const Op = Sequelize.Op;

  const options = {
    where: {
      uniqueID: {
        [Op.eq]: auction.uniqueID,
      },
      mytokenQUANTITYAVAIBLE: {
        [Op.gt]: 0,
      },
    },
    include: [{ model: dbModels.profile }],
  };

  let userTokens = await dbModels.my_token.findAll(options);

  return res.status(200).send({
    success: true,
    message: dataLanguage.saved,
    data: userTokens,
  });
});

app.get("/get-users-token/:uniqueID", async (req, res, next) => {
  const uniqueID = req.params.uniqueID;
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const Op = Sequelize.Op;
  const options = {
    where: {
      uniqueID: {
        [Op.eq]: uniqueID,
      },
      mytokenQUANTITYAVAIBLE: {
        [Op.gt]: 0,
      },
    },
    include: [{ model: dbModels.profile }],
  };
  let userTokens = await dbModels.my_token.findAll(options);
  return res.status(200).send({
    success: true,
    message: dataLanguage.saved,
    data: userTokens,
  });
});

app.get(
  "/get-auction/:unique_sellID",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const sellID = req.params.unique_sellID;

    const Op = Sequelize.Op;

    const uniqueSellOptions = {
      where: {
        id: sellID,
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

    let uniqueSell = await dbModels.unique_sell.findOne(uniqueSellOptions);

    return res.status(200).send({
      success: true,
      message: "info Auction",
      data: uniqueSell,
    });
  }
);

module.exports = app;
