"use strict";

const express = require("express");
const dbModels = require("../models");
const Sequelize = require("sequelize");
const moment = require("moment");
const mdAuthenticattion = require("../middlewares/authenticated");
const funtions = require("../utils/funtions");

const ConfigApps = require("../config/apps.json");
const fetch = require("node-fetch");
const Op = Sequelize.Op;

const app = express();

app.post("/create", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const getProfile = await dbModels.profile.findOne({
    where: { userID: req.body.userID },
  });
  if (getProfile) {
    return res.status(400).send({
      success: false,
      message: "Registro ya existe.",
    });
  }
  const profile = dbModels.profile.build(req.body);
  profile
    .save()
    .then((profileSaved) => {
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: profileSaved,
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

app.post("/update-profile", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let getProfile = await dbModels.profile.findOne({
    where: { userID: req.body.userID },
  });

  let infoProfile = req.body;
  infoProfile.img = getProfile.img;
  infoProfile.profileBANNER = getProfile.profileBANNER;
  const Op = Sequelize.Op;

  const options = {
    where: {
      profileUSERNAME: {
        [Op.eq]: req.body.profileUSERNAME,
      },
      userID: {
        [Op.ne]: req.body.userID,
      },
    },
  };
  const profileUsername = await dbModels.profile.findOne(options);

  if (profileUsername) {
    return res.status(200).send({
      success: false,
      message: "Username no Avaible",
    });
  }

  // if (req.body.bannerIMG) {
  //     let fileBanner = req.body.bannerIMG;
  //     infoProfile.profileBANNER = funtions.uploadImg(fileBanner, req.body.userID);
  // }
  // if (req.body.img) {
  //     let fileProfile = req.body.img;
  //     infoProfile.img = funtions.uploadImg(fileProfile, req.body.userID);
  // }

  dbModels.profile
    .update(infoProfile, { where: { id: getProfile.id } })
    .then((profileSaved) => {
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: profileSaved,
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

app.post("/create-profile", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let getProfile = await dbModels.profile.findOne({
    where: { userID: req.body.userID },
  });

  if (getProfile) {
    return res.status(400).send({
      success: false,
      message: "Register its Now.",
    });
  }
  let infoProfile = req.body;
  const Op = Sequelize.Op;

  const options = {
    where: {
      profileUSERNAME: {
        [Op.eq]: req.body.profileUSERNAME,
      },
    },
  };
  const profileUsername = await dbModels.profile.findOne(options);

  if (profileUsername) {
    return res.status(200).send({
      success: false,
      message: "Username no Avaible",
    });
  }

  if (req.body.profileBANNER) {
    let fileBanner = req.body.profileBANNER;
    infoProfile.profileBANNER = funtions.uploadImg(fileBanner, req.body.userID);
  }
  if (req.body.img) {
    let fileProfile = req.body.img;
    infoProfile.img = funtions.uploadImg(fileProfile, req.body.userID);
  }

  const profileBuild = dbModels.profile.build(infoProfile);
  profileBuild
    .save()
    .then((profileSaved) => {
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: profileSaved,
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

app.post("/automatic-create", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const languageCode = req.headers["x-localization"];
  const getProfile = await dbModels.profile.findOne({
    where: { userID: req.body.userID },
  });
  if (getProfile) {
    return res.status(200).send({
      success: false,
      message: "Profile Ready Now",
    });
  }
  const lang = languageCode.toLocaleUpperCase();
  const language = await dbModels.language.findOne({
    where: { languageCODE: lang },
  });
  const getProfileType = await dbModels.profile_type.findOne({
    where: { profileID: 1, languageID: language.id },
  });
  let infoProfile = {};
  infoProfile.idProfileType = getProfileType.id;
  infoProfile.userID = req.body.userID;

  const profile = dbModels.profile.build(infoProfile);
  profile
    .save()
    .then((profileSaved) => {
      return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: profileSaved,
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

app.get("/:id", mdAuthenticattion.checkToken, async (req, res, next) => {
  const idUser = req.params.id;
  const profile = await dbModels.profile.findOne({ where: { userID: idUser } });
  if (profile) {
    return res.status(200).send({
      success: true,
      message: "Perfil consultado correctamente.",
      data: profile,
    });
  }
  return res.status(200).send({
    success: false,
    message: "Perfil no existe.",
  });
});

app.get(
  "/get-info/:id",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const id = req.params.id;
    let profile = await dbModels.profile.findOne({
      where: { id: req.params.id },
    });
    const Op = Sequelize.Op;
    if (profile) {
      const userId = profile.userID;
      let profileInfo = {};
      profileInfo.profile = profile;
      profileInfo.artwork = await dbModels.unique.findAll({
        where: { uniqueUSERCREATOR: userId, uniqueSTATUS: "ARTWORK" },
      });
      profileInfo.promtp = await dbModels.promtp.findAll({
        where: { userID: userId },
      });
      profileInfo.payToOwn = await dbModels.unique.findAll({
        where: { uniqueUSERCREATOR: userId, uniqueSTATUS: "PAY-TO-OWN" },
      });
      profileInfo.vouchers = await dbModels.voucher.findAll({
        where: { userID: userId },
      });

      const optionsUnique = {
        where: {
          uniqueSTATUS: {
            [Op.eq]: "UNIQUE",
          },
          uniqueSituation: {
            [Op.ne]: "PRIVATE",
          },
        },
        include: [
          {
            as: "my_tokens",
            model: dbModels.my_token,
            required: true,
            where: {
              userID: {
                [Op.eq]: userId,
              },
            },
          },
        ],
      };

      profileInfo.uniques = await dbModels.unique.findAll(optionsUnique);

      profileInfo.promtpCount = 0;
      if (profileInfo.promtp) {
        profileInfo.promtpCount = Object.keys(profileInfo.promtp).length;
      }
      profileInfo.artworkCount = 0;
      if (profileInfo.artwork) {
        profileInfo.artworkCount = Object.keys(profileInfo.artwork).length;
      }
      profileInfo.uniqueCount = 0;
      if (profileInfo.uniques) {
        profileInfo.uniqueCount = Object.keys(profileInfo.uniques).length;
      }

      profileInfo.followers = 0;
      const followers = await dbModels.profile_like.findAndCountAll({
        where: { profileID: profile.id },
      });
      if (followers) {
        profileInfo.followers = followers.count;
      }

      profileInfo.followings = 0;

      const followings = await dbModels.profile_like.findAndCountAll({
        where: { userID: userId },
      });
      if (followings) {
        profileInfo.followings = followings.count;
      }

      return res.status(200).send({
        success: true,
        message: "Perfil consultado correctamente.",
        data: profileInfo,
      });
    }
    return res.status(200).send({
      success: false,
      message: "Perfil no existe.",
    });
  }
);

app.get(
  "/types/profiles",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const languageCode = req.headers["x-localization"];
    const lang = languageCode.toLocaleUpperCase();
    const language = await dbModels.language.findOne({
      where: { languageCODE: lang },
    });
    const profile_types = await dbModels.profile_type.findAll({
      where: { languageID: language.id },
    });
    if (profile_types) {
      return res.status(200).send({
        success: true,
        message: "Profile Types.",
        data: profile_types,
      });
    }
    return res.status(200).send({
      success: false,
      message: "Profile types does not exist",
    });
  }
);

app.post(
  "/my-profile",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const userId = req.body.userID;
    let AllUniques = [];
    let AllNfts = [];
    // let projects;
    // const resWallet = await fetch(`${ConfigApps.development.etixPay.url}/api/v2/micro-service/projects-art/get-tokens-user/${userId}`,
    //     {
    //         method: 'GET',
    //         headers: {
    //                     'accept': 'application/json',
    //                     'token': 'EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD'
    //                  }
    //     });
    // const wallet = await resWallet.json();
    // if (!wallet) {
    //     return res.status(500).send({
    //         success: false,
    //         message: 'Server error',
    //         error: 'Server error'
    //     });
    // }

    // if (!wallet.success) {
    //     return res.status(400).send({
    //         success: false,
    //         message: 'Server error',
    //         error: 'Server error'
    //     });
    // }
    // projects = wallet.data;
    // let projectsID = wallet.data.map(project => project.proyectoID)

    let myTokens = await dbModels.my_token.findAll({
      where: { userID: userId },
      order: [["id", "DESC"]],
      include: [
        { model: dbModels.unique },
        { model: dbModels.profile },
        { model: dbModels.unique, where: { uniqueSTATUS: "UNIQUE" } },
      ],
    });
    let tokensID = myTokens.map((myToken) => myToken.toJSON().uniqueID);
    let myUniques = await dbModels.unique.findAll({
      where: { id: { [Op.or]: tokensID } },
      order: [["id", "DESC"]],
      include: [
        { model: dbModels.profile },
        { model: dbModels.unique_download },
        { model: dbModels.unique_like },
        {
          model: dbModels.unique_sell,
          include: [{ model: dbModels.auction_offer }],
        },
      ],
    });
    const uniquesSell = await dbModels.unique_sell.findAll({
      where: {
        userID: userId,
        unique_sellTYPE: { [Op.or]: ["AUCTION", "SALE"] },
        unique_sellSTATUS: "INACTIVE",
        unique_sellSITUATION: "SUCCESS",
      },
    });
    const uniquesBuy = await dbModels.unique_sell.findAll({
      where: {
        userBUY: userId,
        unique_sellTYPE: { [Op.or]: ["AUCTION", "SALE"] },
        unique_sellSTATUS: "INACTIVE",
        unique_sellSITUATION: "SUCCESS",
      },
    });

    const tradedSell = uniquesSell.map(
      (sell) => sell.unique_sellQUANTITYSALE * sell.unique_sellPRICE
    );
    let tradedSellTotal = 0;
    tradedSell.forEach((trade) => (tradedSellTotal = tradedSellTotal + trade));
    const tradedBuy = uniquesBuy.map(
      (sell) => sell.unique_sellQUANTITYSALE * sell.unique_sellPRICE
    );
    let tradedBuyTotal = 0;
    tradedBuy.forEach((trade) => (tradedBuyTotal = tradedBuyTotal + trade));
    const totalTraded = tradedSellTotal + tradedBuyTotal;

    myTokens.forEach((myToken) => {
      let myUnique = myUniques.find((unique) => unique.id == myToken.uniqueID);
      if (myUnique) {
        AllUniques.push({ ...myUnique.toJSON(), myToken });
      }
    });

    AllUniques = AllUniques.filter((unique) => {
      if (unique.myToken.mytokenQUANTITYAVAIBLE === 0) {
        if (unique.myToken.userID == unique.profile.userID) return unique;
      } else {
        return unique;
      }
    });

    const uniquesID = AllUniques.map((unique) => unique.id);

    const options = {
      where: { userId: userId },
      include: [
        { model: dbModels.app_plan },
        { model: dbModels.profile_like },
        { model: dbModels.profile_observation },
      ],
    };

    let profile = await dbModels.profile.findOne(options);
    if (profile) {
      let infoProfile = {};
      infoProfile.profile = profile;
      infoProfile.totalTraded = totalTraded;
      // infoProfile.artwork = await dbModels.unique.findAll({where: {userCREATOR: userId, uniqueSTATUS: 'ARTWORK'},  include: [{ model: dbModels.profile},{ model: dbModels.unique_download }]});
      const myArtwork = await dbModels.unique.findAll({
        where: { userCREATOR: userId, uniqueSTATUS: "ARTWORK" },
        order: [["id", "DESC"]],
        include: [
          { model: dbModels.profile },
          { model: dbModels.unique_download },
        ],
      });
      const myArtworkDownload = await dbModels.unique.findAll({
        where: { idImageUniqueType: "2" },
        order: [["id", "DESC"]],
        include: [
          { model: dbModels.profile },
          { model: dbModels.unique_download, where: { userID: userId } },
        ],
      });
      const allArtworks = myArtwork.concat(myArtworkDownload);
      infoProfile.artwork = allArtworks.filter(
        (data, index, j) => index === j.findIndex((t) => t.id === data.id)
      );

      let myTokensNfts = await dbModels.my_token.findAll({
        where: { userID: userId, mytokenQUANTITYAVAIBLE: { [Op.eq]: 1 } },
        order: [["id", "DESC"]],
        include: [
          { model: dbModels.unique },
          { model: dbModels.profile },
          { model: dbModels.unique, where: { uniqueSTATUS: "NFT" } },
        ],
      });
      let nftsID = myTokensNfts.map((myToken) => myToken.toJSON().uniqueID);
      let myNfts = await dbModels.unique.findAll({
        where: { id: { [Op.or]: nftsID } },
        order: [["id", "DESC"]],
        include: [
          { model: dbModels.profile },
          { model: dbModels.unique_download },
          { model: dbModels.unique_like },
          {
            model: dbModels.unique_sell,
            include: [{ model: dbModels.auction_offer }],
          },
        ],
      });

      myTokensNfts.forEach((myToken) => {
        let myUnique = myNfts.find((unique) => unique.id == myToken.uniqueID);
        if (myUnique) {
          AllNfts.push({ ...myUnique.toJSON(), myToken });
        }
      });
      infoProfile.nfts = AllNfts;

      // infoProfile.nft = await dbModels.unique.findAll({where: {uniqueUSERCREATOR: userId, uniqueSTATUS: 'NFT'}, include: [{ model: dbModels.profile}]});
      infoProfile.uniques = AllUniques;
      // infoProfile.uniques = await dbModels.unique.findAll({order: [['id', 'DESC']], where: {userCREATOR: userId, uniqueSTATUS: 'UNIQUE'},
      //                                                     include: [ { model: dbModels.profile},{ model: dbModels.unique_download}, { model: dbModels.unique_like}, {model: dbModels.unique_sell}]});

      infoProfile.drafts = await dbModels.unique.findAll({
        where: { uniqueSTATUS: "DRAFT", userCREATOR: userId },
        order: [["id", "DESC"]],
        include: [
          { model: dbModels.profile },
          { model: dbModels.unique_download },
        ],
      });
      const promtp = await dbModels.promtp.findAll({
        where: { userID: userId, promtpSTATUS: { [Op.ne]: "DISABLE" } },
      });
      infoProfile.promtp = [];
      infoProfile.payToOwn = await dbModels.unique.findAll({
        where: { uniqueUSERCREATOR: userId, uniqueSTATUS: "PAY-TO-OWN" },
        include: [{ model: dbModels.profile }],
      });
      infoProfile.vouchers = await dbModels.voucher.findAll({
        where: { userID: userId },
      });

      const uniquesPrompt = await dbModels.unique.findAll({
        where: { uniqueSTATUS: "UNIQUE" },
      });
      const uniquesPromptUsed = uniquesPrompt.map(
        (prompt) => prompt.uniquePROMTP
      );
      let j = 0;
      promtp.forEach((prompt) => {
        let cantUsed = 0;
        uniquesPromptUsed.forEach((promptUsed) => {
          if (prompt.promtpTEXT === promptUsed) {
            cantUsed++;
          }
        });
        infoProfile.promtp.push({ ...prompt.toJSON(), cantUSED: cantUsed });
        j++;
      });

      // infoProfile.uniques = await dbModels.unique.findAll({order: [['id', 'DESC']], where: {uniqueSTATUS: 'UNIQUE'},
      //                                                     include: [{
      //                                                         as: 'my_tokens',
      //                                                         model: dbModels.my_token,
      //                                                         required:true,
      //                                                         where: {
      //                                                             userID: userId
      //                                                         }
      //                                                       }, { model: dbModels.profile},{ model: dbModels.unique_download}, { model: dbModels.unique_like}, {model: dbModels.unique_sell}]});

      const optionsUniqueLikes = {
        where: { idImageUniqueType: 1, id: { [Op.or]: uniquesID } },
        order: [["id", "DESC"]],
        // limit: 4,
        // offset: 0,
        include: [
          { model: dbModels.profile },
          {
            model: dbModels.unique_like,
            where: {
              unique_likeSTATUS: 1,
            },
          },
        ],
      };

      let i = 0;
      let uniquesListLike = await dbModels.unique.findAll(optionsUniqueLikes);
      infoProfile.uniques.map((unique) => {
        uniquesListLike.map((uniqueLike) => {
          if (unique.id === uniqueLike.id) {
            infoProfile.uniques[i].uniqueLIKECOUNT =
              uniqueLike.unique_likes.length;
          }
        });
        i++;
      });

      infoProfile.promtpCount = 0;
      if (infoProfile.promtp) {
        infoProfile.promtpCount = Object.keys(infoProfile.promtp).length;
      }
      infoProfile.artworkCount = 0;
      if (infoProfile.artwork) {
        infoProfile.artworkCount = Object.keys(infoProfile.artwork).length;
      }
      infoProfile.uniqueCount = 0;
      if (infoProfile.uniques) {
        infoProfile.uniqueCount = Object.keys(infoProfile.uniques).length;
      }
      infoProfile.nftCount = 0;
      if (infoProfile.nfts) {
        infoProfile.nftCount = Object.keys(infoProfile.nfts).length;
      }

      infoProfile.followers = 0;
      const followers = await dbModels.profile_like.findAndCountAll({
        where: { profileID: profile.id, profile_likeSTATUS: true },
      });
      if (followers) {
        infoProfile.followers = followers.count;
      }

      infoProfile.followings = 0;

      const followings = await dbModels.profile_like.findAndCountAll({
        where: { userID: userId, profile_likeSTATUS: true },
      });
      if (followings) {
        infoProfile.followings = followings.count;
      }

      infoProfile.underObservations = 0;

      const underObservations =
        await dbModels.profile_observation.findAndCountAll({
          where: { userID: userId, profile_observationSTATUS: true },
        });
      if (underObservations) {
        infoProfile.underObservations = underObservations.count;
      }

      infoProfile.observations = 0;

      const observations = await dbModels.profile_observation.findAndCountAll({
        where: { profileID: profile.id, profile_observationSTATUS: true },
      });
      if (observations) {
        infoProfile.observations = observations.count;
      }

      return res.status(200).send({
        success: true,
        message: "Perfil consultado correctamente.",
        data: infoProfile,
      });
    }
    return res.status(200).send({
      success: false,
      message: "Perfil no existe.",
    });
  }
);

app.post(
  "/update-plan",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    let info = req.body;
    const planId = req.body.planID;
    let dateNow = moment();
    const startPlan = moment().format("YYYY-MM-DD HH:mm:ss");
    info.planDATESTART = startPlan;
    info.planDATEEND = dateNow.add(30, "days").calendar();
    dbModels.profile
      .update(info, { where: { userID: info.userID } })
      .then((profileSaved) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: profileSaved,
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
  "/my-info-plan-now",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const info = req.body;

    const infoProfile = await dbModels.profile.findOne({
      where: { userID: info.userID },
    });

    let infoPlan = await dbModels.app_plan.findByPk(infoProfile.planID);

    const dateNow = moment();
    // const startOfMonth = moment().startOf("month");
    // const endOfMonth = moment().endOf("month");
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD HH:mm");
    const startDateNow = moment().startOf("day");
    const endDateNow = moment().endOf("day");

    let planNow = {};
    planNow.planID = infoProfile.planID;
    planNow.planDATEEND = infoProfile.planDATEEND;
    planNow.available = true;

    if (infoProfile.planDATEEND <= dateNow && infoProfile.planID != 1) {
      planNow.available = false;
      return res.status(200).send({
        success: true,
        message: "Info Profile",
        data: planNow,
      });
    }

    const Op = Sequelize.Op;
    let startDatePlan = moment(infoProfile.planDATESTART).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    if (!startDatePlan) startDatePlan = startOfMonth;
    const optionsArtWork = {
      where: {
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        userID: {
          [Op.eq]: info.userID,
        },
      },
    };
    console.log(startOfMonth, endOfMonth);
    const nfts = await dbModels.register_create_nft.findAll(optionsArtWork);

    const optionsDrafts = {
      where: {
        uniqueSTATUS: {
          [Op.eq]: "DRAFT",
        },
        userCREATOR: {
          [Op.eq]: info.userID,
        },
        uniqueCREATIONWITHOUTPLAN: {
          [Op.eq]: false,
        },
      },
    };

    const drafts = await dbModels.unique.findAll(optionsDrafts);

    const optionsUnique = {
      where: {
        uniqueSTATUS: {
          [Op.eq]: "UNIQUE",
        },
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        userCREATOR: {
          [Op.eq]: info.userID,
        },
        uniqueCREATIONWITHOUTPLAN: {
          [Op.eq]: false,
        },
      },
    };

    const uniques = await dbModels.unique.findAll(optionsUnique);

    planNow.nftCount = 0;
    planNow.nftAvailable = true;

    if (nfts) {
      planNow.nftCount = nfts.length;
      const nftavailable = infoPlan.artworks - planNow.nftCount;
      planNow.nftAvailableCount = nftavailable;
      if (nftavailable <= 0) {
        planNow.nftAvailable = false;
      }
    }

    planNow.draftCount = 0;
    planNow.draftAvailable = true;

    if (drafts) {
      planNow.draftCount = drafts.length;
      const draftkavailable = infoPlan.drafts - planNow.draftCount;
      planNow.draftAvailableCount = draftkavailable;
      if (draftkavailable <= 0) {
        planNow.draftAvailable = false;
      }
    }

    planNow.uniqueCount = 0;
    planNow.uniqueAvailable = true;

    if (uniques) {
      planNow.uniqueCount = uniques.length;
      const uniquesAvailable = infoPlan.uniques - planNow.uniqueCount;
      planNow.uniquesAvailableCount = uniquesAvailable;
      if (uniquesAvailable <= 0) {
        planNow.uniqueAvailable = false;
      }
    }

    planNow.basicCount = 0;
    planNow.basicAvailable = true;

    if (infoPlan.modeBasic == "DAY") {
      const optionsBasic = {
        where: {
          userID: {
            [Op.eq]: info.userID,
          },
          createdAt: {
            [Op.between]: [startDateNow, endDateNow],
          },
        },
      };

      const registerExecutions = await dbModels.register_execution.findAll(
        optionsBasic
      );

      if (registerExecutions) {
        planNow.basicCount = registerExecutions.length;
        const basicavailable = infoPlan.basic - planNow.basicCount;
        planNow.basicAvailableCount = basicavailable;
        if (basicavailable <= 0) {
          planNow.basicAvailable = false;
        }
      }
    } else {
      const optionsBasic2 = {
        where: {
          userID: {
            [Op.eq]: info.userID,
          },
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      };

      const registerExecutions2 = await dbModels.register_execution.findAll(
        optionsBasic2
      );

      if (registerExecutions2) {
        planNow.basicCount = registerExecutions2.length;
        const basicavailable2 = infoPlan.basic - planNow.basicCount;
        planNow.basicAvailableCount = basicavailable2;
        if (basicavailable2 <= 0) {
          planNow.basicAvailable = false;
        }
      }
    }

    return res.status(200).send({
      success: true,
      message: "Info Profile",
      data: planNow,
    });
  }
);

module.exports = app;
