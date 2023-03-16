"use strict";

const express = require("express");
const dbModels = require("../models");
const Sequelize = require("sequelize");
const mdAuthenticattion = require("../middlewares/authenticated");
const funtions = require("../utils/funtions");
const moment = require("moment");
const Op = Sequelize.Op;

const app = express();

app.get(
  "/top-artists/:page",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const options = {
      where: { profileTYPE: "CREATOR" },
      order: [["id", "DESC"]],
      limit: 10,
      offset: parseInt(req.params.page),
    };
    dbModels.profile
      .findAll(options)
      .then((artists) => {
        return res.status(200).send({
          success: true,
          message: "Artists List",
          data: artists,
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

app.get(
  "/top-investor/:page",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const uniqueSell = await dbModels.unique_sell.findAll({
      where: {
        unique_sellTYPE: { [Op.or]: ["AUCTION", "SALE"] },
        unique_sellSTATUS: "INACTIVE",
        unique_sellSITUATION: "SUCCESS",
      },
      order: [["id", "DESC"]],
      limit: 1000,
      offset: 0,
    });

    let usersID = uniqueSell.map((sell) => sell.toJSON().userBUY);
    usersID = usersID.filter(
      (data, index, j) => index === j.findIndex((t) => t === data)
    );
    const options = {
      where: { userID: { [Op.or]: usersID } },
      // where: {profileTYPE: 'INVESTOR'},
      order: [["id", "DESC"]],
      // limit: 10,
      offset: parseInt(req.params.page),
    };
    dbModels.profile
      .findAll(options)
      .then((artists) => {
        let i = 0;
        let topInvestors = [];
        artists.forEach((artist) => {
          topInvestors.push({
            ...artist.toJSON(),
            uniqueSells: [],
            countUniqueSell: 0,
            valueUniqueSell: 0,
          });
          uniqueSell.forEach((sell) => {
            if (sell.userBUY == artist.userID) {
              topInvestors[i].uniqueSells.push(sell);
              topInvestors[i].countUniqueSell++;
              topInvestors[i].valueUniqueSell =
                topInvestors[i].valueUniqueSell +
                sell.unique_sellPRICE * sell.unique_sellQUANTITYSALE;
            }
          });
          i++;
        });

        topInvestors = topInvestors.filter(
          (artists) => artists.countUniqueSell > 0
        );
        topInvestors = funtions.sortJSON(
          topInvestors,
          "valueUniqueSell",
          "desc"
        );

        return res.status(200).send({
          success: true,
          message: "Investor List",
          data: topInvestors,
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

app.get(
  "/top-artists-valued/:page",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const uniqueSell = await dbModels.unique_sell.findAll({
      where: {
        unique_sellTYPE: { [Op.or]: ["AUCTION", "SALE"] },
        unique_sellSTATUS: "INACTIVE",
        unique_sellSITUATION: "SUCCESS",
      },
      order: [["id", "DESC"]],
      limit: 1000,
      offset: 0,
    });

    let usersID = uniqueSell.map((sell) => sell.toJSON().userID);
    usersID = usersID.filter(
      (data, index, j) => index === j.findIndex((t) => t === data)
    );
    const options = {
      where: { userID: { [Op.or]: usersID } },
      order: [["id", "DESC"]],
      // limit: 10,
      // offset:  parseInt(req.params.page)
    };
    dbModels.profile
      .findAll(options)
      .then((artists) => {
        let i = 0;
        let topArtits = [];
        artists.forEach((artist) => {
          topArtits.push({
            ...artist.toJSON(),
            uniqueSells: [],
            countUniqueSell: 0,
            valueUniqueSell: 0,
          });
          uniqueSell.forEach((sell) => {
            if (sell.userID == artist.userID) {
              topArtits[i].uniqueSells.push(sell);
              topArtits[i].countUniqueSell++;
              topArtits[i].valueUniqueSell =
                topArtits[i].valueUniqueSell +
                sell.unique_sellPRICE * sell.unique_sellQUANTITYSALE;
            }
          });
          i++;
        });

        topArtits = topArtits.filter((artists) => artists.countUniqueSell > 0);
        topArtits = funtions.sortJSON(topArtits, "valueUniqueSell", "desc");

        return res.status(200).send({
          success: true,
          message: "Artists valued List",
          data: topArtits,
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
