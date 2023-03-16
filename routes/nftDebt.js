"use strict";

const express = require("express");
const dbModels = require("../models");
const Sequelize = require("sequelize");
const mdAuthenticattion = require("../middlewares/authenticated");
const funtions = require("../utils/funtions");
const moment = require("moment");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const Op = Sequelize.Op;

app.post("/detail", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  const nft = await dbModels.unique.findByPk(req.body.nftID);

  if (!nft) {
    return res.status(200).send({
      success: true,
      message: "Detail NFT debt",
      data: null,
    });
  }

  await dbModels.nft_debt
    .findOne({
      where: {
        nftCONSECUTIVE: nft.uniqueNFTCONSECUTIVE,
        userID: req.body.userID,
      },
    })
    .then((nftDebt) => {
      return res.status(200).send({
        success: true,
        message: "Detail NFT debt",
        data: nftDebt,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        success: false,
        message: "Server error.",
        error: error,
      });
    });
});

app.post(
  "/reduce-debt",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const nft = await dbModels.unique.findByPk(req.body.nftID);

    let debtNFT = await dbModels.nft_debt.findOne({
      where: {
        nftCONSECUTIVE: nft.uniqueNFTCONSECUTIVE,
        userID: req.body.userID,
      },
    });

    if (!debtNFT) {
      return res.status(200).send({
        success: false,
        message: "This User No DebT NFT",
      });
    }
    debtNFT.nft_debtAMMOUNT = debtNFT.nft_debtAMMOUNT - 1;

    await dbModels.nft_debt
      .update(debtNFT.toJSON(), { where: { id: debtNFT.id } })
      .then((nftDebt) => {
        return res.status(200).send({
          success: true,
          message: "Detail NFT debt",
          data: debtNFT,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: "Server error.",
          error: error,
        });
      });
  }
);

module.exports = app;
