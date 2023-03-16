"use strict";

const express = require("express");
const dbModels = require("../models");
const Sequelize = require("sequelize");
const mdAuthenticattion = require("../middlewares/authenticated");
const funtions = require("../utils/funtions");
const moment = require("moment");
const Op = Sequelize.Op;

const app = express();

app.post("/create", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const promtpInfo = req.body;
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.toLocaleUpperCase();

  // promtpInfo.userID = promtpInfo.main_user_id;

  let firstSpace = /^ /;
  let lastSpace = / $/;
  let manySpace = /[ ]+/g;

  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(manySpace, " ");
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(firstSpace, "");
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(lastSpace, "");

  const options = {
    where: {
      promtpTEXT: {
        [Op.eq]: promtpInfo.promtpTEXT,
      },
      promtpSTATUS: {
        [Op.ne]: "DISABLE",
      },
    },
  };

  const promtpFind = await dbModels.promtp.findOne(options);

  if (promtpFind) {
    return res.status(200).send({
      success: false,
      message: "prompt not available, quartermaster with a new one.",
    });
  }

  let info = req.body;

  let dateNow = moment();
  info.promtpDATEEXPIRE = dateNow.add(90, "days").format("YYYY-MM-DD HH:mm:ss");

  const promptBuild = dbModels.promtp.build(req.body);
  const promptNow = promptBuild
    .save()
    .then((promptSaved) => {
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: promptSaved,
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
  "/associate-paternity",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const promtpInfo = req.body;
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    let firstSpace = /^ /;
    let lastSpace = / $/;
    let manySpace = /[ ]+/g;

    promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(manySpace, " ");
    promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(firstSpace, "");
    promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(lastSpace, "");

    const promtpTextSplit = promtpInfo.promtpTEXT.split(" ");

    const promtpNow = await dbModels.promtp.findOne({
      where: { promtpTEXT: promtpInfo.promtpTEXT },
    });
    if (promtpNow) {
      let promptPaternityFeed;
      let paternityFeed = {};
      let paternityFeedBuild;

      for (let i = 0; i < promtpTextSplit.length; i++) {
        promptPaternityFeed = await dbModels.promtp.findOne({
          where: { promtpTEXT: promtpTextSplit[i], promtpsPATERNITYFEED: true },
        });
        if (promptPaternityFeed) {
          paternityFeed.promtp_fatherID = promptPaternityFeed.id;
          paternityFeed.promtp_sonID = promtpNow.id;
          paternityFeedBuild = dbModels.paternity_feed.build(paternityFeed);
          paternityFeedBuild.save();
        }
      }
    }
    return res.status(200).send({
      success: true,
      message: dataLanguage.saved,
    });
  }
);

app.post("/check", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const promtpInfo = req.body;
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.toUpperCase();

  let firstSpace = /^ /;
  let lastSpace = / $/;
  let manySpace = /[ ]+/g;

  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(manySpace, " ");
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(firstSpace, "");
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(lastSpace, "");

  const options = {
    where: {
      promtpTEXT: {
        [Op.eq]: promtpInfo.promtpTEXT,
      },
      promtpSTATUS: {
        [Op.ne]: "DISABLE",
      },
    },
  };

  const promtpFind = await dbModels.promtp.findOne(options);

  if (promtpFind) {
    return res.status(200).send({
      success: false,
      message: "prompt not available, quartermaster with a new one.",
    });
  }

  const promtpTextSplit = promtpInfo.promtpTEXT.split(" ");

  let promptPaternityFeed = [];

  for (let i = 0; i < promtpTextSplit.length; i++) {
    promptPaternityFeed[i] = await dbModels.promtp.findOne({
      where: { promtpTEXT: promtpTextSplit[i], promtpsPATERNITYFEED: true },
    });
  }

  return res.status(200).send({
    success: true,
    message: "prompt available",
    data: promptPaternityFeed,
  });
});

app.post("/checkByUser", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const promtpInfo = req.body;
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.toUpperCase();

  let firstSpace = /^ /;
  let lastSpace = / $/;
  let manySpace = /[ ]+/g;

  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(manySpace, " ");
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(firstSpace, "");
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.replace(lastSpace, "");

  const optionsPromtp = {
    where: {
      promtpTEXT: {
        [Op.eq]: promtpInfo.promtpTEXT,
      },
      promtpSTATUS: {
        [Op.ne]: "DISABLE",
      },
    },
  };
  const promtp = await dbModels.promtp.findOne(optionsPromtp);

  let options;

  if (promtp) {
    const promtpUser = await dbModels.promtp.findOne({
      where: { promtpTEXT: promtpInfo.promtpTEXT, userID: promtpInfo.userID },
    });

    if (promtpUser) {
      const promtpTextSplit = promtpInfo.promtpTEXT.split(" ");

      let promptPaternityFeed = [];

      for (let i = 0; i < promtpTextSplit.length; i++) {
        options = {
          where: {
            userID: {
              [Op.not]: promtpInfo.userID,
            },
            promtpTEXT: {
              [Op.eq]: promtpTextSplit[i],
            },
            promtpsPATERNITYFEED: {
              [Op.eq]: true,
            },
          },
        };

        promptPaternityFeed[i] = await dbModels.promtp.findOne(options);
      }

      return res.status(200).send({
        success: true,
        message: "prompt available",
        data: promptPaternityFeed,
      });
    }
    return res.status(200).send({
      success: false,
      message: "prompt not available, quartermaster with a new one.",
    });
  }

  const promtpTextSplit = promtpInfo.promtpTEXT.split(" ");

  let promptPaternityFeed = [];

  for (let i = 0; i < promtpTextSplit.length; i++) {
    options = {
      where: {
        userID: {
          [Op.not]: promtpInfo.userID,
        },
        promtpTEXT: {
          [Op.eq]: promtpTextSplit[i],
        },
        promtpsPATERNITYFEED: {
          [Op.eq]: true,
        },
      },
    };

    promptPaternityFeed[i] = await dbModels.promtp.findOne(options);
  }

  return res.status(200).send({
    success: true,
    message: "prompt available",
    data: promptPaternityFeed,
  });
});

app.post("/checkAvailableByUser", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const promtpInfo = req.body;
  promtpInfo.promtpTEXT = promtpInfo.promtpTEXT.toUpperCase();
  const promtpUser = await dbModels.promtp.findOne({
    where: { promtpTEXT: promtpInfo.promtpTEXT, userID: promtpInfo.userID },
  });
  if (promtpUser) {
    return res.status(200).send({
      success: true,
      message: "prompt available",
      data: promtpInfo,
    });
  }
  return res.status(200).send({
    success: false,
    message: "prompt not available, quartermaster with a new one.",
  });
});

app.post("/my-list", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.user.main_user_id;
  const options = {
    where: {
      userID: {
        [Op.eq]: userID,
      },
      promtpSTATUS: {
        [Op.ne]: "DISABLE",
      },
    },
  };
  await dbModels.promtp
    .findAll(options)
    .then((prompts) => {
      return res.status(200).send({
        success: true,
        message: "List of promtp",
        data: prompts,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        success: false,
        message: "error",
        error: error,
      });
    });
});

app.post(
  "/add-paternity-feed",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const userID = req.body.userID;

    let prompt = await dbModels.promtp.findOne({
      where: { id: req.body.promptID },
    });

    let firstSpace = /^ /;
    let lastSpace = / $/;
    let manySpace = /[ ]+/g;

    let promtpText = prompt.promtpTEXT;

    promtpText = promtpText.replace(manySpace, " ");
    promtpText = promtpText.replace(firstSpace, "");
    promtpText = promtpText.replace(lastSpace, "");
    const promtpTextSplit = promtpText.split(" ");
    const countWords = promtpTextSplit.length;

    if (countWords > 1) {
      return res.status(200).send({
        success: true,
        message: "Promtp no Avaiable for Paternity Feed",
      });
    }

    if (promtpTextSplit[0].length < 3) {
      return res.status(200).send({
        success: true,
        message: "Debe ser minimo de 3 caracteres",
      });
    }

    prompt.promtpsPATERNITYFEEDPERCENTAGE =
      req.body.promtpsPATERNITYFEEDPERCENTAGE;
    prompt.promtpsPATERNITYFEED = true;

    dbModels.promtp
      .update(prompt.toJSON(), { where: { id: prompt.id } })
      .then((prompts) => {
        return res.status(200).send({
          success: true,
          message: "Promtp Success",
          data: prompt,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: "error",
          error: error,
        });
      });
  }
);

app.put("/use", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const promtpTEXT = req.body.promtpTEXT.toLocaleUpperCase();
  const optionsPromtp = {
    where: {
      promtpTEXT: {
        [Op.eq]: promtpTEXT,
      },
      promtpSTATUS: {
        [Op.ne]: "DISABLE",
      },
    },
  };
  const promtp = await dbModels.promtp.findOne(optionsPromtp);
  if (promtp) {
    let infoPromtp = promtp.toJSON();
    infoPromtp.promtpSTATUS = "USED";
    dbModels.promtp
      .update(infoPromtp, { where: { id: infoPromtp.id } })
      .then((promtpUpdate) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.updated,
          data: promtpUpdate,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: dataLanguage.errorUpdated,
          error: error,
        });
      });
  } else {
    return res.status(200).send({
      success: false,
      message: "Promtp does not exist",
    });
  }
});

module.exports = app;
