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

app.post("/create", mdAuthenticattion.checkToken, (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let uniqueInfo = req.body;
  uniqueInfo.uniqueUSERCREATOR = uniqueInfo.user.main_user_id;
  uniqueInfo.userCREATOR = uniqueInfo.user.main_user_id;
  const unique = dbModels.unique.build(uniqueInfo);
  unique
    .save()
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

app.post("/create-from-admin", (req, res, next) => {
  // const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let uniqueInfo = req.body;
  uniqueInfo.uniqueUSERCREATOR = uniqueInfo.user.main_user_id;
  uniqueInfo.userCREATOR = uniqueInfo.user.main_user_id;
  const unique = dbModels.unique.build(uniqueInfo);
  unique
    .save()
    .then((uniqueSaved) => {
      return res.status(200).send({
        success: true,
        message: "Draft created",
        data: uniqueSaved,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        success: false,
        message: "Draft error",
        error: error,
      });
    });
});

app.put("/update", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let uniqueInfo = req.body;
  const unique = await dbModels.unique.findOne({
    where: { id: uniqueInfo.id },
  });
  unique.uniqueHASS = uniqueInfo.uniqueHASS;
  unique.project_tokenID = uniqueInfo.project_tokenID;
  // unique.update(unique.toJSON(), {where: {id: uniqueInfo.id}}).then(
  unique
    .update(uniqueInfo, { where: { id: uniqueInfo.id } })
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

// app.put('/update-all', mdAuthenticattion.checkToken, async (req, res, next ) => {
//     const dataLanguage = funtions.languages(req.headers["x-localization"]);
//     let uniqueInfo = req.body;
//     const unique = await dbModels.unique.findOne({ where: { id: uniqueInfo.id } });
//     unique.uniqueHASS = uniqueInfo.uniqueHASS
//     unique.project_tokenID = uniqueInfo.project_tokenID
//     unique.update(unique.toJSON(), {where: {id: uniqueInfo.id}}).then(
//         uniqueSaved => {
//              return res.status(200).send({
//                 success: true,
//                 message: dataLanguage.saved,
//                 data: uniqueSaved
//             });
//         }
//     )
//     .catch(
//         error =>  {
//             return res.status(500).send({
//                 success: false,
//                 message: dataLanguage.errorSaved,
//                 error: error
//             });
//         }
//     );
// });

app.get("/moods", mdAuthenticattion.checkToken, async (req, res, next) => {
  let languageCode = req.headers["x-localization"];

  const lang = languageCode.toLocaleUpperCase();

  const language = await dbModels.language.findOne({
    where: { languageCODE: lang },
  });

  dbModels.unique_mood
    .findAll({ where: { languageID: language.id } })
    .then((moods) => {
      return res.status(200).send({
        success: true,
        message: "Registro consultado correctamente.",
        data: moods,
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

app.get("/elements", mdAuthenticattion.checkToken, async (req, res, next) => {
  let languageCode = req.headers["x-localization"];

  const lang = languageCode.toLocaleUpperCase();

  const language = await dbModels.language.findOne({
    where: { languageCODE: lang },
  });

  dbModels.unique_element
    .findAll({ where: { languageID: language.id } })
    .then((elements) => {
      return res.status(200).send({
        success: true,
        message: "Registro consultado correctamente.",
        data: elements,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        success: false,
        message: "No se pudo consultar el registro.",
        error: error,
      });
    });
});

app.get("/movements", mdAuthenticattion.checkToken, async (req, res, next) => {
  let languageCode = req.headers["x-localization"];

  const lang = languageCode.toLocaleUpperCase();

  const language = await dbModels.language.findOne({
    where: { languageCODE: lang },
  });

  dbModels.unique_art_movent
    .findAll({ where: { languageID: language.id } })
    .then((movements) => {
      return res.status(200).send({
        success: true,
        message: "Registro consultado correctamente.",
        data: movements,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        success: false,
        message: "No se pudo consultar el registro.",
        error: error,
      });
    });
});

app.post("/my-list", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  const userID = req.body.user.main_user_id;

  const Op = Sequelize.Op;

  const options = {
    where: {
      uniqueUSERCREATOR: {
        [Op.eq]: userID,
      },
    },
    include: [{ model: dbModels.unique_like }, { model: dbModels.my_token }],
  };

  await dbModels.unique
    .findAll(options)
    .then((uniques) => {
      return res.status(200).send({
        success: true,
        message: "List of Unique",
        data: uniques,
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

app.post("/last", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  const userID = req.body.userID;

  let options;
  if (userID != null) {
    options = {
      where: { idImageUniqueType: 1 },
      order: [["id", "DESC"]],
      limit: 10,
      offset: 0,
      include: [
        { model: dbModels.unique_sell },
        { model: dbModels.profile },
        {
          model: dbModels.unique_like,
          where: {
            unique_likeSTATUS: 1,
            userID: userID,
          },
        },
      ],
    };
  } else {
    options = {
      where: { idImageUniqueType: 1 },
      order: [["id", "DESC"]],
      limit: 10,
      offset: 0,
      include: [{ model: dbModels.profile }, { model: dbModels.unique_sell }],
    };
  }

  const options2 = {
    where: { idImageUniqueType: 1 },
    order: [["id", "DESC"]],
    limit: 10,
    offset: 0,
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

  let uniquesListLike = await dbModels.unique.findAll(options2);
  await dbModels.unique
    .findAll(options)
    .then((uniques) => {
      let uniquesList = uniques;

      // for(let i=0; i<uniquesListLike.length; i++){
      //     uniquesList[i].uniqueLIKECOUNT = uniquesListLike[i].unique_likes.length;
      // }

      let i = 0;
      uniquesList.map((unique) => {
        uniquesListLike.map((uniqueLike) => {
          if (unique.id === uniqueLike.id) {
            uniquesList[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
          }
        });
        i++;
      });

      return res.status(200).send({
        success: true,
        message: "Last Uniques",
        data: uniquesList,
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

app.get("/lastArtWorks", (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const options = {
    where: { idImageUniqueType: 2 },
    order: [["id", "DESC"]],
    limit: 9,
    offset: 0,
    include: [{ model: dbModels.profile }],
  };
  dbModels.unique
    .findAll(options)
    .then((artworks) => {
      return res.status(200).send({
        success: true,
        message: "Last Artworks",
        data: artworks,
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

app.get("/bestSellingArtworks", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const options = {
    where: { idImageUniqueType: 2 },
    order: [["id", "DESC"]],
    // limit: 4,
    // offset: 0,
    uniqueSTATUS: "ARTWORK",
    include: [
      { model: dbModels.profile },
      { model: dbModels.unique_download, where: { id: { [Op.gt]: 0 } } },
    ],
  };

  let uniques = await dbModels.unique.findAll(options);
  let uniquesListOrganize = uniques.sort(function (a, b) {
    if (a.uniqueCOUNTDOWNLOAD < b.uniqueCOUNTDOWNLOAD) {
      return 1;
    }
    if (a.uniqueCOUNTDOWNLOAD > b.uniqueCOUNTDOWNLOAD) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  let uniquesList = uniquesListOrganize.slice(0, 6);
  return res.status(200).send({
    success: true,
    message: "Best selling artworks",
    data: uniquesList,
  });
});

app.get("/top-selling", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  // const tokens = await dbModels.my_token.findAll({where: { mytokenSITUATION: 'SALE'}, include: [{model: dbModels.unique}, {model: dbModels.profile}] });
  const tokens = await dbModels.my_token.findAll({
    include: [{ model: dbModels.unique }, { model: dbModels.profile }],
  });
  let tokensID = [];
  if (tokens) tokensID = tokens.map((token) => token.toJSON().uniqueID);

  const options = {
    // where: {idImageUniqueType: 1},
    where: {
      // idImageUniqueType: {[Op.eq]: 1 },
      uniqueSITUATION: { [Op.not]: "PRIVATE" },
      id: { [Op.or]: tokensID },
    },
    order: [["uniquePRICETOKEN", "DESC"]],
    limit: 6,
    offset: 0,
    include: [
      { model: dbModels.profile },
      {
        model: dbModels.unique_sell,
        order: [["unique_sellPRICE", "DESC"]],
        where: {
          unique_sellTYPE: "SALE",
          unique_sellSITUATION: "SUCCESS",
        },
      },
    ],
  };
  dbModels.unique
    .findAll(options)
    .then((uniques) => {
      let topSellingUniques = [];
      tokens.map((token) => {
        uniques.map((unique) => {
          if (
            token.uniqueID === unique.id &&
            token.userID === unique.unique_sells[0].userID
          ) {
            topSellingUniques.push({
              ...unique.toJSON(),
              myToken: token.toJSON(),
            });
          }
        });
      });

      return res.status(200).send({
        success: true,
        message: "Top selling uniques",
        data: topSellingUniques,
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

app.post("/explore-new-horizons-all", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.userID;
  let AllUniques = [];
  let tokens = await dbModels.my_token.findAll({
    where: {
      mytokenQUANTITYAVAIBLE: { [Op.gt]: 0 },
      userID: { [Op.ne]: userID },
      mytokenSITUATION: { [Op.or]: ["SALE", "	AUCTION", "PUBLIC"] },
    },
    order: [["uniqueId", "DESC"]],
    include: [
      { model: dbModels.unique },
      {
        model: dbModels.profile,
        where: {
          profileUSERNAME: { [Op.not]: null },
          profileNAME: { [Op.not]: null },
        },
      },
    ],
  });
  let tokensID = tokens.map((myToken) => myToken.toJSON().uniqueID);
  let uniques = await dbModels.unique.findAll({
    where: { id: { [Op.or]: tokensID }, userCREATOR: { [Op.ne]: userID } },
    order: [["id", "DESC"]],
    include: [
      {
        model: dbModels.profile,
        where: {
          profileUSERNAME: { [Op.not]: null },
          profileNAME: { [Op.not]: null },
        },
      },
      { model: dbModels.unique_download },
      { model: dbModels.unique_like },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  let artworks = await dbModels.unique.findAll({
    where: { idImageUniqueType: 2, userCREATOR: { [Op.ne]: userID } },
    order: [["id", "DESC"]],
    include: [
      {
        model: dbModels.profile,
        where: {
          profileUSERNAME: { [Op.not]: null },
          profileNAME: { [Op.not]: null },
        },
      },
      { model: dbModels.unique_download },
      { model: dbModels.unique_like },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  let drafts = await dbModels.unique.findAll({
    where: { idImageUniqueType: 3, userCREATOR: { [Op.ne]: userID } },
    order: [["id", "DESC"]],
    include: [
      {
        model: dbModels.profile,
        where: {
          profileUSERNAME: { [Op.not]: null },
          profileNAME: { [Op.not]: null },
        },
      },
      { model: dbModels.unique_download },
      { model: dbModels.unique_like },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  let allUniqueArtwork = await dbModels.unique.findAll({
    where: {
      idImageUniqueType: { [Op.or]: [1, 2, 3] },
      userCREATOR: { [Op.ne]: userID },
    },
    order: [["id", "DESC"]],
    limit: 1000,
    offset: 0,
    include: [
      {
        model: dbModels.profile,
        where: {
          profileUSERNAME: { [Op.not]: null },
          profileNAME: { [Op.not]: null },
        },
      },
      { model: dbModels.unique_download },
      { model: dbModels.unique_like },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  // let allUniqueArtwork = await dbModels.unique.findAll({where: { idImageUniqueType: {[Op.or]: [1,2]}}, order: [['id', 'DESC']],limit: 1000, offset: 0, include: [{model: dbModels.profile}, {model: dbModels.unique_download},{model: dbModels.unique_like},{model: dbModels.unique_sell, include: [{model: dbModels.auction_offer}]}]});
  let usersTopActive = [];
  allUniqueArtwork.forEach((unique) => {
    usersTopActive.push(unique.profile);
  });

  usersTopActive = usersTopActive.filter(
    (data, index, j) => index === j.findIndex((t) => t.id === data.id)
  );
  let userIDTopActive = usersTopActive.map(
    (profile) => profile.toJSON().userID
  );
  let topProfileActive = [];
  if (userIDTopActive.length > 0)
    topProfileActive = await dbModels.profile.findAll({
      where: {
        userID: { [Op.or]: userIDTopActive },
        profileUSERNAME: { [Op.not]: null },
        profileNAME: { [Op.not]: null },
      },
    });
  let x = 0;
  let profileActives = [];
  topProfileActive.forEach((profile) => {
    profileActives.push({ ...profile.toJSON(), uniques: [], countUniques: 0 });
    allUniqueArtwork.forEach((unique) => {
      if (profile.userID == unique.profile.userID) {
        profileActives[x].uniques.push(unique);
        profileActives[x].countUniques++;
      }
    });
    x++;
  });

  profileActives = funtions.sortJSON(profileActives, "countUniques", "desc");

  tokens.forEach((myToken) => {
    let unique = uniques.find((unique) => unique.id == myToken.uniqueID);
    if (unique) {
      AllUniques.push({ ...unique.toJSON(), myToken });
    }
  });

  const uniquesID = AllUniques.map((unique) => unique.id);
  const optionsUniqueLikes = {
    where: { idImageUniqueType: 1, id: { [Op.or]: uniquesID } },
    order: [["id", "DESC"]],
    // limit: 100,
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
  AllUniques.map((unique) => {
    uniquesListLike.map((uniqueLike) => {
      if (unique.id === uniqueLike.id) {
        AllUniques[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
      }
    });
    i++;
  });

  const artworksID = artworks.map((artwork) => artwork.id);
  const optionsArtworkLikes = {
    where: { idImageUniqueType: 2, id: { [Op.or]: artworksID } },
    order: [["id", "DESC"]],
    // limit: 100,
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
  let j = 0;
  let artworksListLike = await dbModels.unique.findAll(optionsArtworkLikes);
  artworks.map((artwork) => {
    artworksListLike.map((artworkLike) => {
      if (artwork.id === artworkLike.id) {
        artworks[j].uniqueLIKECOUNT = artworkLike.unique_likes.length;
      }
    });
    j++;
  });

  const draftsID = drafts.map((draft) => draft.id);
  const optionsDraftLikes = {
    where: { idImageUniqueType: 3, id: { [Op.or]: draftsID } },
    order: [["id", "DESC"]],
    // limit: 100,
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
  let y = 0;
  let draftListLike = await dbModels.unique.findAll(optionsDraftLikes);
  drafts.map((draft) => {
    draftListLike.map((draftLike) => {
      if (draft.id === draftLike.id) {
        drafts[y].uniqueLIKECOUNT = draftLike.unique_likes.length;
      }
    });
    y++;
  });

  return res.status(200).send({
    success: true,
    message: "List all uniques",
    data: { AllUniques, artworks, profileActives, drafts },
  });
});

app.post("/under-observations", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.userID;
  let AllUniques = [];
  let tokens = await dbModels.my_token.findAll({
    where: {
      mytokenQUANTITYAVAIBLE: { [Op.gt]: 0 },
      userID: { [Op.ne]: userID },
    },
    order: [["uniqueId", "DESC"]],
    include: [
      { model: dbModels.unique },
      {
        model: dbModels.profile,
        include: [
          {
            model: dbModels.profile_observation,
            where: { userID: userID, profile_observationSTATUS: true },
          },
        ],
      },
    ],
  });
  let tokensID = tokens.map((myToken) => myToken.toJSON().uniqueID);
  let uniques = await dbModels.unique.findAll({
    where: { id: { [Op.or]: tokensID }, userCREATOR: { [Op.ne]: userID } },
    order: [["id", "DESC"]],
    include: [
      {
        model: dbModels.profile,
        include: [
          {
            model: dbModels.profile_observation,
            where: { userID: userID, profile_observationSTATUS: true },
          },
        ],
      },
      { model: dbModels.unique_download },
      { model: dbModels.unique_like },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  let artworks = await dbModels.unique.findAll({
    where: { idImageUniqueType: 2, userCREATOR: { [Op.ne]: userID } },
    order: [["id", "DESC"]],
    include: [
      {
        model: dbModels.profile,
        include: [
          {
            model: dbModels.profile_observation,
            where: { userID: userID, profile_observationSTATUS: true },
          },
        ],
      },
      { model: dbModels.unique_download },
      { model: dbModels.unique_like },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });

  let allUniqueArtwork = await dbModels.unique.findAll({
    where: {
      idImageUniqueType: { [Op.or]: [1, 2] },
      userCREATOR: { [Op.ne]: userID },
    },
    order: [["id", "DESC"]],
    limit: 1000,
    offset: 0,
    include: [
      {
        model: dbModels.profile,
        include: [
          {
            model: dbModels.profile_observation,
            where: { userID: userID, profile_observationSTATUS: true },
          },
        ],
      },
      { model: dbModels.unique_download },
      { model: dbModels.unique_like },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  // let allUniqueArtwork = await dbModels.unique.findAll({where: { idImageUniqueType: {[Op.or]: [1,2]}}, order: [['id', 'DESC']],limit: 1000, offset: 0, include: [{model: dbModels.profile}, {model: dbModels.unique_download},{model: dbModels.unique_like},{model: dbModels.unique_sell, include: [{model: dbModels.auction_offer}]}]});
  let usersTopActive = [];
  allUniqueArtwork.forEach((unique) => {
    usersTopActive.push(unique.profile);
  });
  usersTopActive = usersTopActive.filter(
    (data, index, j) => index === j.findIndex((t) => t.id === data.id)
  );
  let userIDTopActive = usersTopActive.map(
    (profile) => profile.toJSON().userID
  );
  let topProfileActive = await dbModels.profile.findAll({
    where: { userID: { [Op.or]: userIDTopActive } },
    include: [
      {
        model: dbModels.profile_observation,
        where: { userID: userID, profile_observationSTATUS: true },
      },
    ],
  });
  let x = 0;
  let profileActives = [];
  topProfileActive.forEach((profile) => {
    profileActives.push({ ...profile.toJSON(), uniques: [], countUniques: 0 });
    allUniqueArtwork.forEach((unique) => {
      if (profile.userID == unique.profile.userID) {
        profileActives[x].uniques.push(unique);
        profileActives[x].countUniques++;
      }
    });
    x++;
  });

  profileActives = funtions.sortJSON(profileActives, "countUniques", "desc");

  tokens.forEach((myToken) => {
    let unique = uniques.find((unique) => unique.id == myToken.uniqueID);
    if (unique) {
      AllUniques.push({ ...unique.toJSON(), myToken });
    }
  });

  const uniquesID = AllUniques.map((unique) => unique.id);
  const optionsUniqueLikes = {
    where: { idImageUniqueType: 1, id: { [Op.or]: uniquesID } },
    order: [["id", "DESC"]],
    // limit: 100,
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
  AllUniques.map((unique) => {
    uniquesListLike.map((uniqueLike) => {
      if (unique.id === uniqueLike.id) {
        AllUniques[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
      }
    });
    i++;
  });

  const artworksID = artworks.map((artwork) => artwork.id);
  const optionsArtworkLikes = {
    where: { idImageUniqueType: 2, id: { [Op.or]: artworksID } },
    order: [["id", "DESC"]],
    // limit: 100,
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
  let j = 0;
  let artworksListLike = await dbModels.unique.findAll(optionsArtworkLikes);
  artworks.map((artwork) => {
    artworksListLike.map((artworkLike) => {
      if (artwork.id === artworkLike.id) {
        artworks[j].uniqueLIKECOUNT = artworkLike.unique_likes.length;
      }
    });
    j++;
  });

  return res.status(200).send({
    success: true,
    message: "List all uniques",
    data: profileActives,
  });
});

app.post("/explore-new-horizons", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.userID;

  const tokens = await dbModels.my_token.findAll({
    where: {
      mytokenSITUATION: { [Op.ne]: "PRIVATE" },
      userID: { [Op.ne]: userID },
    },
    limit: 100,
    offset: 0,
    include: [{ model: dbModels.unique }, { model: dbModels.profile }],
  });
  let tokensID = [];
  if (tokens) tokensID = tokens.map((token) => token.toJSON().uniqueID);

  let options;
  if (userID != null) {
    options = {
      // where: {idImageUniqueType: 1},
      where: {
        // idImageUniqueType: {[Op.eq]: 1 },
        uniqueSITUATION: { [Op.ne]: "PRIVATE" },
        uniqueUSERCREATOR: { [Op.ne]: userID },
        id: { [Op.or]: tokensID },
      },
      order: [["id", "DESC"]],
      limit: 100,
      offset: 0,
      include: [
        { model: dbModels.profile },
        {
          model: dbModels.unique_sell,
          // where: {
          //             unique_sellSTATUS: true,
          //             unique_sellTYPE: "SALE"
          //         }
        },
        {
          model: dbModels.unique_like,
          where: {
            unique_likeSTATUS: 1,
            userID: userID,
          },
        },
      ],
    };
  } else {
    options = {
      // where: {idImageUniqueType: 1},
      where: {
        // idImageUniqueType: {[Op.eq]: 1 },
        uniqueSITUATION: { [Op.not]: "PRIVATE" },
        id: { [Op.or]: tokensID },
      },
      order: [["id", "DESC"]],
      limit: 100,
      offset: 0,
      include: [
        { model: dbModels.profile },
        {
          model: dbModels.unique_sell,
          // where: {
          //     unique_sellSTATUS: true,
          //     unique_sellTYPE: "SALE"
          // }
        },
      ],
    };
  }

  const options2 = {
    where: {
      idImageUniqueType: 1,
      // uniqueUSERCREATOR: {[Op.not]: userID},
    },
    order: [["id", "DESC"]],
    limit: 100,
    offset: 0,
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

  let uniquesListLike = await dbModels.unique.findAll(options2);

  dbModels.unique
    .findAll(options)
    .then((uniques) => {
      let uniquesList = uniques;
      // for(let i=0; i<uniquesListLike.length; i++){
      //     uniquesList[i].uniqueLIKECOUNT = uniquesListLike[i].unique_likes.length;
      // }

      let i = 0;
      uniquesList.map((unique) => {
        uniquesListLike.map((uniqueLike) => {
          if (unique.id === uniqueLike.id) {
            uniquesList[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
          }
        });
        i++;
      });

      let newHorisons = [];
      tokens.map((token) => {
        uniquesList.map((unique) => {
          if (token.uniqueID === unique.id) {
            newHorisons.push({ ...unique.toJSON(), myToken: token.toJSON() });
          }
        });
      });

      return res.status(200).send({
        success: true,
        message: "New horizons list",
        data: newHorisons,
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

app.post("/hot-auctions", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.userID;
  const dateNow = moment();
  // const dateNow = new Date();

  let tokens = await dbModels.my_token.findAll({
    include: [
      { model: dbModels.unique },
      { model: dbModels.profile },
      {
        model: dbModels.unique_sell,
        where: {
          unique_sellSTATUS: "ACTIVE",
          unique_sellTYPE: "AUCTION",
          unique_sellDATEEXPIRE: { [Op.gt]: dateNow },
        },
      },
    ],
  });

  tokens = tokens.filter((token) => token.userID === token.unique_sell.userID);

  let tokensID = [];

  if (tokens) tokensID = tokens.map((token) => token.toJSON().uniqueID);

  let options;
  if (userID != null) {
    options = {
      where: {
        id: { [Op.or]: tokensID },
        // uniqueSITUATION: "AUCTION",
        // idImageUniqueType: 1,
        // uniqueSTATUS: "UNIQUE",
        // userID: userID
      },
      include: [
        { model: dbModels.profile },
        {
          model: dbModels.unique_like,
          where: {
            unique_likeSTATUS: 1,
            userID: userID,
          },
        },
        {
          model: dbModels.unique_sell,
          where: {
            unique_sellSTATUS: "ACTIVE",
            unique_sellTYPE: "AUCTION",
            unique_sellDATEEXPIRE: { [Op.gt]: dateNow },
          },
          include: [{ model: dbModels.auction_offer }],
        },
      ],
      limit: 10,
      offset: 0,
    };
  } else {
    options = {
      where: {
        id: { [Op.or]: tokensID },
        // uniqueSITUATION: "AUCTION",
        // idImageUniqueType: 1,
        // uniqueSTATUS: "UNIQUE",
      },
      limit: 10,
      offset: 0,
      include: [
        { model: dbModels.profile },
        {
          model: dbModels.unique_sell,
          where: {
            unique_sellSTATUS: "ACTIVE",
            unique_sellTYPE: "AUCTION",
            unique_sellDATEEXPIRE: { [Op.gt]: dateNow },
          },
        },
      ],
    };
  }

  const options2 = {
    where: {
      id: { [Op.or]: tokensID },
      // uniqueSITUATION: "AUCTION",
      // idImageUniqueType: 1,
      // uniqueSTATUS: "UNIQUE",
    },
    limit: 10,
    offset: 0,
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
  let uniquesListLike = await dbModels.unique.findAll(options2);

  dbModels.unique
    .findAll(options)
    .then((uniques) => {
      let uniquesList = uniques;
      let i = 0;
      uniquesList.map((unique) => {
        uniquesListLike.map((uniqueLike) => {
          if (unique.id === uniqueLike.id) {
            uniquesList[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
          }
        });
        i++;
      });

      let hotAuctions = [];
      tokens.map((token) => {
        uniquesList.map((unique) => {
          if (token.uniqueID === unique.id) {
            hotAuctions.push({ ...unique.toJSON(), myToken: token.toJSON() });
          }
        });
      });

      let j = 0;
      hotAuctions.forEach((token) => {
        let sells = token.unique_sells.filter((sell) => {
          return token.myToken.unique_sell.id === sell.id;
        });
        hotAuctions[j].unique_sells = sells;
        j++;
      });

      return res.status(200).send({
        success: true,
        message: "Hot Auctions",
        data: hotAuctions,
        // tokens
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

app.post("/all-uniques", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.userID;

  let AllUniques = [];
  // let tokens = await dbModels.my_token.findAll({where: { mytokenQUANTITYAVAIBLE:  {[Op.gt]: 0}}, order: [['uniqueId', 'DESC']], include: [{model: dbModels.unique}, {model: dbModels.profile}] });
  let tokens = await dbModels.my_token.findAll({
    order: [["uniqueId", "DESC"]],
    include: [{ model: dbModels.unique }, { model: dbModels.profile }],
  });
  let tokensID = tokens.map((myToken) => myToken.toJSON().uniqueID);
  let uniques = await dbModels.unique.findAll({
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
  let artworks = await dbModels.unique.findAll({
    where: { idImageUniqueType: 2 },
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

  tokens.forEach((myToken) => {
    let unique = uniques.find((unique) => unique.id == myToken.uniqueID);
    if (unique) {
      AllUniques.push({ ...unique.toJSON(), myToken });
    }
  });

  const optionsUniqueLikes = {
    where: { idImageUniqueType: 1 },
    order: [["id", "DESC"]],
    // limit: 100,
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
  AllUniques.map((unique) => {
    uniquesListLike.map((uniqueLike) => {
      if (unique.id === uniqueLike.id) {
        AllUniques[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
      }
    });
    i++;
  });

  const optionsArtworkLikes = {
    where: { idImageUniqueType: 2 },
    order: [["id", "DESC"]],
    // limit: 100,
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
  let j = 0;
  let artworksListLike = await dbModels.unique.findAll(optionsArtworkLikes);
  artworks.map((artwork) => {
    artworksListLike.map((artworkLike) => {
      if (artwork.id === artworkLike.id) {
        artworks[j].uniqueLIKECOUNT = artworkLike.unique_likes.length;
      }
    });
    j++;
  });

  return res.status(200).send({
    success: true,
    message: "List all uniques",
    data: { AllUniques, artworks },
  });
});

app.post("/my-favorites-uniques", async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.userID;

  let AllUniques = [];
  // let tokens = await dbModels.my_token.findAll({where: { mytokenQUANTITYAVAIBLE:  {[Op.gt]: 0}}, order: [['uniqueId', 'DESC']], include: [{model: dbModels.unique}, {model: dbModels.profile}] });
  let tokens = await dbModels.my_token.findAll({
    order: [["uniqueId", "DESC"]],
    include: [
      {
        model: dbModels.unique,
        include: [
          {
            model: dbModels.unique_like,
            where: { unique_likeSTATUS: 1, userID: userID },
          },
        ],
      },
      { model: dbModels.profile },
      { model: dbModels.profile },
    ],
  });
  let tokensID = tokens.map((myToken) => myToken.toJSON().uniqueID);
  let uniques = await dbModels.unique.findAll({
    where: { id: { [Op.or]: tokensID } },
    order: [["id", "DESC"]],
    include: [
      { model: dbModels.profile },
      { model: dbModels.unique_download },
      {
        model: dbModels.unique_like,
        where: { userID: userID, unique_likeSTATUS: 1 },
      },
      {
        model: dbModels.unique_sell,
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  // let artworks = await dbModels.unique.findAll({where: {idImageUniqueType: 2}, order: [['id', 'DESC']], include: [{model: dbModels.profile}, {model: dbModels.unique_download},{model: dbModels.unique_like},{model: dbModels.unique_sell, include: [{model: dbModels.auction_offer}]}]});
  tokens.forEach((myToken) => {
    let unique = uniques.find((unique) => unique.id == myToken.uniqueID);
    if (unique) {
      AllUniques.push({ ...unique.toJSON(), myToken });
    }
  });

  let uniquesID = AllUniques.map((unique) => unique.id);
  const optionsUniqueLikes = {
    where: { idImageUniqueType: 1, id: { [Op.or]: uniquesID } },
    order: [["id", "DESC"]],
    limit: 100,
    offset: 0,
    include: [
      { model: dbModels.profile },
      {
        model: dbModels.unique_like,
        where: {
          unique_likeSTATUS: 1,
          userID: userID,
        },
      },
    ],
  };
  let i = 0;
  let uniquesListLike = await dbModels.unique.findAll(optionsUniqueLikes);
  AllUniques.map((unique) => {
    uniquesListLike.map((uniqueLike) => {
      if (unique.id === uniqueLike.id) {
        AllUniques[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
      }
    });
    i++;
  });

  return res.status(200).send({
    success: true,
    message: "List all uniques",
    data: AllUniques,
  });
});

app.post("/my-favorite-auctions", async (req, res, next) => {
  let dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const userID = req.body.userID;

  let AllUniques = [];
  let tokens = await dbModels.my_token.findAll({
    order: [["uniqueId", "DESC"]],
    include: [
      {
        model: dbModels.unique,
        include: [
          {
            model: dbModels.unique_sell,
            where: {
              unique_sellTYPE: "AUCTION",
              unique_sellSTATUS: "ACTIVE",
              unique_sellSITUATION: "WAITING",
            },
          },
        ],
      },
      { model: dbModels.profile },
      { model: dbModels.profile },
    ],
  });
  let tokensID = tokens.map((myToken) => myToken.toJSON().uniqueID);
  let uniques = await dbModels.unique.findAll({
    where: { id: { [Op.or]: tokensID } },
    order: [["id", "DESC"]],
    include: [
      { model: dbModels.profile },
      { model: dbModels.unique_download },
      {
        model: dbModels.unique_like,
        where: { userID: userID, unique_likeSTATUS: 1 },
      },
      {
        model: dbModels.unique_sell,
        where: {
          unique_sellTYPE: "AUCTION",
          unique_sellSTATUS: "ACTIVE",
          unique_sellDATEEXPIRE: { [Op.gte]: dateNow },
        },
        include: [{ model: dbModels.auction_offer }],
      },
    ],
  });
  tokens.forEach((myToken) => {
    let unique = uniques.find((unique) => unique.id == myToken.uniqueID);
    if (unique) {
      AllUniques.push({ ...unique.toJSON(), myToken });
    }
  });
  let favoriteAuctions = [];
  let fgAcution = false;
  AllUniques = AllUniques.filter((unique) => {
    unique.unique_sells.forEach((sale) => {
      if (unique.myToken.userID == sale.userID) fgAcution = true;
    });
    if (fgAcution) return unique;
    fgAcution = false;
  });

  let uniquesID = AllUniques.map((unique) => unique.id);
  const optionsUniqueLikes = {
    where: { idImageUniqueType: 1, id: { [Op.or]: uniquesID } },
    order: [["id", "DESC"]],
    limit: 100,
    offset: 0,
    include: [
      { model: dbModels.profile },
      {
        model: dbModels.unique_like,
        where: {
          unique_likeSTATUS: 1,
          userID: userID,
        },
      },
    ],
  };

  let i = 0;
  let uniquesListLike = await dbModels.unique.findAll(optionsUniqueLikes);
  AllUniques.map((unique) => {
    uniquesListLike.map((uniqueLike) => {
      if (unique.id === uniqueLike.id) {
        AllUniques[i].uniqueLIKECOUNT = uniqueLike.unique_likes.length;
      }
    });
    i++;
  });

  return res.status(200).send({
    success: true,
    message: "List all uniques",
    data: AllUniques,
  });
});

app.post(
  "/update-situation",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    let uniqueInfo = req.body;

    const unique = await dbModels.unique.findByPk(uniqueInfo.uniqueID);
    unique.uniqueSITUATION = uniqueInfo.uniqueSITUATION;

    const myToken = await dbModels.my_token.findOne({
      where: { uniqueID: uniqueInfo.uniqueID, userID: uniqueInfo.userID },
    });
    myToken.mytokenSITUATION = uniqueInfo.uniqueSITUATION;
    myToken.mytokenQUANTITYAVAIBLE =
      myToken.mytokenQUANTITYAVAIBLE - uniqueInfo.tokenAMOUNT;

    dbModels.my_token
      .update(myToken.toJSON(), {
        where: { uniqueID: uniqueInfo.uniqueID, userID: uniqueInfo.userID },
      })
      .then((myTokenUpdated) => {
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: myTokenUpdated,
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
  "/info-unique",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const uniqueID = req.body.uniqueID;
    const userID = req.body.userID;
    const myToken = await dbModels.my_token.findOne({
      where: { userID: userID, uniqueID: uniqueID },
      include: [{ model: dbModels.unique }, { model: dbModels.profile }],
    });
    const options = {
      where: {
        id: uniqueID,
      },
      include: [
        { model: dbModels.profile },
        { model: dbModels.unique_like },
        { model: dbModels.unique_download },
        { model: dbModels.unique_art_movent },
        { model: dbModels.unique_mood },
        { model: dbModels.unique_element },
        {
          model: dbModels.unique_sell,
          include: [{ model: dbModels.auction_offer }],
        },
      ],
    };
    const optionsUniqueLike = {
      where: {
        id: uniqueID,
      },
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
    let uniquesListLike = await dbModels.unique.findOne(optionsUniqueLike);

    dbModels.unique
      .findOne(options)
      .then((uniqueSearch) => {
        let unique = { ...uniqueSearch.toJSON(), myToken };
        let uniqueLIKECOUNT = 0;
        if (uniquesListLike)
          uniqueLIKECOUNT = uniquesListLike.unique_likes.length;
        unique.uniqueLIKECOUNT = uniqueLIKECOUNT;
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: unique,
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
  "/info-unique-by-idsell",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const sellID = req.body.sellID;
    const uniqueSell = await dbModels.unique_sell.findByPk(sellID);
    const uniqueID = uniqueSell.uniqueID;
    const userID = req.body.userID;
    const myToken = await dbModels.my_token.findOne({
      where: { userID: userID, uniqueID: uniqueID },
      include: [{ model: dbModels.unique }, { model: dbModels.profile }],
    });
    const options = {
      where: {
        id: uniqueID,
      },
      include: [
        { model: dbModels.profile },
        { model: dbModels.unique_like },
        { model: dbModels.unique_download },
        {
          model: dbModels.unique_sell,
          include: [{ model: dbModels.auction_offer }],
        },
      ],
    };
    const optionsUniqueLike = {
      where: {
        id: uniqueID,
      },
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
    let uniquesListLike = await dbModels.unique.findOne(optionsUniqueLike);

    dbModels.unique
      .findOne(options)
      .then((uniqueSearch) => {
        let unique = { ...uniqueSearch.toJSON(), myToken };
        let uniqueLIKECOUNT = 0;
        if (uniquesListLike)
          uniqueLIKECOUNT = uniquesListLike.unique_likes.length;
        unique.uniqueLIKECOUNT = uniqueLIKECOUNT;
        return res.status(200).send({
          success: true,
          message: dataLanguage.saved,
          data: unique,
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

app.put("/delete", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let uniqueInfo = req.body;
  const unique = await dbModels.unique.findOne({
    where: { id: uniqueInfo.id },
  });
  uniqueInfo.uniqueSTATUS = "DELETE";
  unique
    .update(uniqueInfo, { where: { id: uniqueInfo.id } })
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

module.exports = app;
