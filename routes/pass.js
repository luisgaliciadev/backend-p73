"use strict";

const express = require("express");
const dbModels = require("../models");
const Sequelize = require("sequelize");
const mdAuthenticattion = require("../middlewares/authenticated");
const funtions = require("../utils/funtions");
const Op = Sequelize.Op;
const moment = require("moment");

const app = express();

app.get("/get-list", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  await dbModels.pass
    .findAll()
    .then((passes) => {
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: passes,
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

app.get(
  "/my-info/:userID",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    let userPass = {};

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.params.userID },
    });

    if (!userPassPresent) {
      let infoPass = {};
      infoPass.userID = req.params.userID;

      const user_passCreate = dbModels.user_pass.build(infoPass);
      userPass.infoPass = await user_passCreate.save();
      userPass.infoPass = await dbModels.user_pass.findByPk(userPass.id);
    } else {
      userPass.infoPass = userPassPresent;
    }

    let profile = await dbModels.profile.findOne({
      where: { userID: req.params.userID },
      include: [{ model: dbModels.app_plan }],
    });

    userPass.appPlan = profile.app_plan;

    userPass.artMovement =
      await dbModels.user_pass_art_movement_use.findAndCountAll({
        where: {
          userID: req.params.userID,
          user_pass_art_movement_useSTATUS: "ACTIVE",
        },
        include: [{ model: dbModels.unique_art_movent }],
      });
    userPass.mood = await dbModels.user_pass_mood_use.findAndCountAll({
      where: { userID: req.params.userID, user_pass_mood_useSTATUS: "ACTIVE" },
      include: [{ model: dbModels.unique_mood }],
    });
    userPass.element = await dbModels.user_pass_element_use.findAndCountAll({
      where: {
        userID: req.params.userID,
        user_pass_element_useSTATUS: "ACTIVE",
      },
      include: [{ model: dbModels.unique_element }],
    });

    let myPASS = {};
    myPASS.AANG = userPass.element ? userPass.element.count : 0;
    myPASS.PEACOCK = userPass.artMovement ? userPass.artMovement.count : 0;
    myPASS.HYENA = userPass.mood ? userPass.mood.count : 0;
    myPASS.EAGLE = userPass.infoPass.user_passSTARTINGIMG ? 1 : 0;
    myPASS.OWL = userPass.infoPass.user_passVIDEO ? 1 : 0;
    myPASS.MOUSE = userPass.infoPass.user_passINTERATIONQUANTITYMAXCAMY / 50;
    myPASS.MOLE = 1;

    userPass.infoPass.user_passINTERATIONQUANTITYMAX73DIFFUSION =
      userPass.infoPass.user_passINTERATIONQUANTITYMAX73DIFFUSION +
      userPass.appPlan.iteration73Diffusion;

    userPass.infoPass.user_passINTERATIONQUANTITYMAXCAMY = userPass.appPlan
      .iterationCamy
      ? userPass.infoPass.user_passINTERATIONQUANTITYMAXCAMY +
        userPass.appPlan.iterationCamy
      : 0;

    let free = {};
    free.artMovement =
      await dbModels.user_pass_art_movement_use.findAndCountAll({
        where: {
          userID: req.params.userID,
          user_pass_art_movement_useSTATUS: "ACTIVE",
          user_pass_art_movement_useFREEPLAN: true,
        },
      });
    free.mood = await dbModels.user_pass_mood_use.findAndCountAll({
      where: {
        userID: req.params.userID,
        user_pass_mood_useSTATUS: "ACTIVE",
        user_pass_mood_useFREEPLAN: true,
      },
    });
    free.element = await dbModels.user_pass_element_use.findAndCountAll({
      where: {
        userID: req.params.userID,
        user_pass_element_useSTATUS: "ACTIVE",
        user_pass_element_useFREEPLAN: true,
      },
    });

    userPass.infoPass.user_passBALANCEARTMOVEMENT = userPass.appPlan
      .art_movementPassQuantity
      ? userPass.appPlan.art_movementPassQuantity +
        userPass.infoPass.user_passBALANCEARTMOVEMENT -
        free.artMovement.count
      : userPass.infoPass.user_passBALANCEARTMOVEMENT;
    userPass.infoPass.user_passBALANCEMOOD = userPass.appPlan.moodPassQuantity
      ? userPass.appPlan.moodPassQuantity +
        userPass.infoPass.user_passBALANCEMOOD -
        free.mood.count
      : userPass.infoPass.user_passBALANCEMOOD;
    userPass.infoPass.user_passBALANCEELEMENT = userPass.appPlan
      .elementPassQuantity
      ? userPass.appPlan.elementPassQuantity +
        userPass.infoPass.user_passBALANCEELEMENT -
        free.element.count
      : userPass.infoPass.user_passBALANCEELEMENT;

    let passes = [];
    if (userPass.infoPass.user_passQUALITYLEVEL == "HIGH") myPASS.MOLE = 2;
    if (userPass.infoPass.user_passQUALITYLEVEL == "EXCELENT") myPASS.MOLE = 3;
    if (userPass.infoPass.user_passQUALITYLEVEL == "SUPREME") myPASS.MOLE = 4;

    userPass.element = userPass.element.rows;
    userPass.artMovement = userPass.artMovement.rows;
    userPass.mood = userPass.mood.rows;

    let passesList = await dbModels.pass.findAll();

    passesList.forEach((element) => {
      let pass = {};
      pass.passNAME = element.passNAME;
      pass.passTYPE = element.passTYPE;
      pass.passQUANTITY = element.passQUANTITY;
      pass.passAMOUNT = element.passAMOUNT;
      pass.passPRICE = element.passPRICE;
      pass.id = element.id;
      pass.passIMG = element.passIMG;

      if (element.passTYPE == "ELEMENT") {
        pass.passLEVEL = myPASS.AANG;
        passes[0] = pass;
      }
      if (element.passTYPE == "ART-MOVEMENT") {
        pass.passLEVEL = myPASS.PEACOCK;
        passes[1] = pass;
      }
      if (element.passTYPE == "MOOD") {
        pass.passLEVEL = myPASS.HYENA;
        passes[2] = pass;
      }
      if (element.passTYPE == "ADD-IMG") {
        pass.passLEVEL = myPASS.EAGLE;
        passes[3] = pass;
      }
      if (element.passTYPE == "ITERATION") {
        pass.passLEVEL = myPASS.MOUSE;
        passes[4] = pass;
      }
      if (element.passTYPE == "QUALITY") {
        pass.passLEVEL = myPASS.MOLE;
        passes[5] = pass;
      }
      if (element.passTYPE == "VIDEO") {
        pass.passLEVEL = myPASS.OWL;
        passes[6] = pass;
      }
    });

    userPass.myPassLevel = passes;

    return res.status(200).send({
      success: true,
      message: "User Pass",
      data: userPass,
    });
  }
);

app.post(
  "/create-automatic-user-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    const userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: info.userID },
    });

    if (userPassPresent) {
      return res.status(200).send({
        success: true,
        message: "Pass User Now Register",
      });
    }

    const user_pass = dbModels.user_pass.build(info);

    user_pass
      .save()
      .then((user_passSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: user_passSaved,
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
  "/associate-art-movement-user-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    let dateNow = moment();
    info.user_pass_art_movement_useDATEUNTIL = dateNow
      .add(30, "days")
      .format("YYYY-MM-DD HH:mm:ss");

    if (info.user_pass_art_movement_useFREEPLAN) {
      let profile = await dbModels.profile.findOne({
        where: { userID: req.body.userID },
      });
      info.user_pass_art_movement_useDATEUNTIL = profile.planDATEEND;
    }

    const userPassArtMovement = dbModels.user_pass_art_movement_use.build(info);

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.body.userID },
    });

    if (userPassPresent.user_passBALANCEARTMOVEMENT > 0) {
      userPassPresent.user_passBALANCEARTMOVEMENT =
        userPassPresent.user_passBALANCEARTMOVEMENT - 1;

      dbModels.user_pass.update(userPassPresent.toJSON(), {
        where: { id: userPassPresent.id },
      });
    }
    userPassArtMovement
      .save()
      .then((userPassArtMovement) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: userPassArtMovement,
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
  "/associate-element-user-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    let dateNow = moment();
    info.user_pass_element_useDATEUNTIL = dateNow
      .add(30, "days")
      .format("YYYY-MM-DD HH:mm:ss");

    if (info.user_pass_element_useFREEPLAN) {
      let profile = await dbModels.profile.findOne({
        where: { userID: req.body.userID },
      });
      info.user_pass_element_useDATEUNTIL = profile.planDATEEND;
    }

    const user_pass = dbModels.user_pass_element_use.build(info);

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.body.userID },
    });

    if (userPassPresent.user_passBALANCEELEMENT > 0) {
      userPassPresent.user_passBALANCEELEMENT =
        userPassPresent.user_passBALANCEELEMENT - 1;

      dbModels.user_pass.update(userPassPresent.toJSON(), {
        where: { id: userPassPresent.id },
      });
    }

    user_pass
      .save()
      .then((user_passSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: user_passSaved,
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
  "/associate-mood-user-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    let dateNow = moment();
    info.user_pass_mood_useDATEUNTIL = dateNow
      .add(30, "days")
      .format("YYYY-MM-DD HH:mm:ss");

    if (info.user_pass_mood_useFREEPLAN) {
      let profile = await dbModels.profile.findOne({
        where: { userID: req.body.userID },
      });
      info.user_pass_mood_useDATEUNTIL = profile.planDATEEND;
    }

    const user_pass = dbModels.user_pass_mood_use.build(info);

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.body.userID },
    });

    if (userPassPresent.user_passBALANCEMOOD > 0) {
      userPassPresent.user_passBALANCEMOOD =
        userPassPresent.user_passBALANCEMOOD - 1;

      dbModels.user_pass.update(userPassPresent.toJSON(), {
        where: { id: userPassPresent.id },
      });
    }

    user_pass
      .save()
      .then((user_passSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: user_passSaved,
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
  "/add-eagle-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.body.userID },
    });

    userPassPresent.user_passSTARTINGIMG = true;

    dbModels.user_pass
      .update(userPassPresent.toJSON(), { where: { id: userPassPresent.id } })
      .then((user_passSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: user_passSaved,
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
  "/add-owl-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.body.userID },
    });

    userPassPresent.user_passVIDEO = true;

    dbModels.user_pass
      .update(userPassPresent.toJSON(), { where: { id: userPassPresent.id } })
      .then((user_passSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: user_passSaved,
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
  "/add-mole-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.body.userID },
    });

    if (userPassPresent.user_passQUALITYLEVEL == "EXCELENT")
      userPassPresent.user_passQUALITYLEVEL = "SUPREME";
    if (userPassPresent.user_passQUALITYLEVEL == "HIGH")
      userPassPresent.user_passQUALITYLEVEL = "EXCELENT";
    if (userPassPresent.user_passQUALITYLEVEL == "DEFAULT")
      userPassPresent.user_passQUALITYLEVEL = "HIGH";

    dbModels.user_pass
      .update(userPassPresent.toJSON(), { where: { id: userPassPresent.id } })
      .then((user_passSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: user_passSaved,
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
  "/add-mouse-pass",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let userPassPresent = await dbModels.user_pass.findOne({
      where: { userID: req.body.userID },
    });

    if (userPassPresent.user_passINTERATIONQUANTITYMAX73DIFFUSION < 100) {
      userPassPresent.user_passINTERATIONQUANTITYMAX73DIFFUSION =
        userPassPresent.user_passINTERATIONQUANTITYMAX73DIFFUSION + 50;
    }

    if (userPassPresent.user_passINTERATIONQUANTITYMAXCAMY < 350) {
      userPassPresent.user_passINTERATIONQUANTITYMAXCAMY =
        userPassPresent.user_passINTERATIONQUANTITYMAXCAMY + 50;
    }

    dbModels.user_pass
      .update(userPassPresent.toJSON(), { where: { id: userPassPresent.id } })
      .then((user_passSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: user_passSaved,
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
