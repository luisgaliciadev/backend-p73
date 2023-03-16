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

app.post("/create", mdAuthenticattion.checkToken, async (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  let nftInfo = req.body;

  let nfts = [];

  if (nftInfo.withPlan == true) {
    let nftRegisterInfo = {};

    nftRegisterInfo.userID = nftInfo.userID;

    const nftRegisterBuild =
      dbModels.register_create_nft.build(nftRegisterInfo);
    const nftRegister = await nftRegisterBuild.save();
  }

  const nftLast = await dbModels.unique.findOne({
    where: { uniqueSTATUS: "NFT" },
    order: [["id", "DESC"]],
  });

  let consecutive;

  if (!nftLast) {
    consecutive = 1;
  } else {
    consecutive = nftLast.uniqueNFTCONSECUTIVE + 1;
  }

  for (let i = 0; i < nftInfo.quantityToken; i++) {
    nftInfo.uniqueUSERCREATOR = nftInfo.userID;
    nftInfo.userCREATOR = nftInfo.userID;
    nftInfo.project_tokenID = nftInfo.project_tokenID;
    nftInfo.uniqueSTATUS = "NFT";
    nftInfo.uniqueNFTCONSECUTIVE = consecutive;
    const unique = dbModels.unique.build(nftInfo);
    const nft = await unique.save();
    nfts[i] = nft;

    let tokenInfo = {
      userID: nftInfo.userID,
      uniqueID: nft.id,
      projectID: nftInfo.project_tokenID,
      projectCODE: nftInfo.uniqueDIGITALCONTRACTADDRESS,
      mytokenQUANTITYAVAIBLE: 1,
      mytokenQUANTITYBUY: 1,
      mytokenPRICEBUY: nftInfo.tokenPRICE,
      mytokenSITUATION: "SALE",
    };

    const token = dbModels.my_token.build(tokenInfo);

    token.save();
  }

  let debtNftInfo = {
    nft_debtAMMOUNT: nftInfo.quantityToken - 1,
    nftCONSECUTIVE: consecutive,
    userID: nftInfo.userID,
  };

  const debtNftBuild = dbModels.nft_debt.build(debtNftInfo);
  debtNftBuild.save();

  return res.status(200).send({
    success: true,
    message: dataLanguage.saved,
    data: nfts,
  });
});

app.post(
  "/create-sell",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let uniqueSellInfo = req.body;

    let nft = await dbModels.unique.findByPk(uniqueSellInfo.nftID);

    let token = await dbModels.my_token.findOne({
      where: { uniqueID: uniqueSellInfo.nftID },
    });

    uniqueSellInfo.uniqueID = uniqueSellInfo.nftID;
    uniqueSellInfo.unique_sellQUANTITYSALE = 1;
    uniqueSellInfo.unique_sellNFT = true;

    const uniqueBuild = dbModels.unique_sell.build(uniqueSellInfo);

    uniqueBuild
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
  }
);

app.post(
  "/close-sell",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let uniqueSellInfo = req.body;

    let uniqueSell = await dbModels.unique_sell.findByPk(
      uniqueSellInfo.uniqueSellID
    );

    uniqueSell.unique_sellSITUATION = uniqueSellInfo.status;
    uniqueSell.unique_sellSTATUS = "INACTIVE";

    if (uniqueSellInfo.status == "SUCCESS") {
      let nft = await dbModels.unique.findByPk(uniqueSell.uniqueID);

      nft.userCREATOR = uniqueSellInfo.userBUY;

      const th = await dbModels.unique.update(nft.toJSON(), {
        where: { id: nft.id },
      });

      let token = await dbModels.my_token.findOne({
        where: { uniqueID: uniqueSell.uniqueID },
      });

      token.userID = uniqueSellInfo.userBUY;

      const tokenNew = await dbModels.my_token.update(token.toJSON(), {
        where: { id: token.id },
      });
    }

    dbModels.unique_sell
      .update(uniqueSell.toJSON(), {
        where: { id: uniqueSellInfo.uniqueSellID },
      })
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

app.get("/list-sell-nft", (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);

  const uniqueSellOptions = {
    where: {
      unique_sellNFT: {
        [Op.eq]: true,
      },
      unique_sellSITUATION: {
        [Op.eq]: "WAITING",
      },
      unique_sellTYPE: {
        [Op.eq]: "SALE",
      },
    },
  };

  dbModels.unique_sell
    .findAll(uniqueSellOptions)
    .then((nfts) => {
      return res.status(200).send({
        success: true,
        message: "NFT List Sell",
        data: nfts,
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
  "/create-sell",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let uniqueSellInfo = req.body;

    let nft = await dbModels.unique.findByPk(uniqueSellInfo.nftID);

    let token = await dbModels.my_token.findOne({
      where: { uniqueID: uniqueSellInfo.nftID },
    });

    uniqueSellInfo.uniqueID = uniqueSellInfo.nftID;
    uniqueSellInfo.unique_sellQUANTITYSALE = 1;
    uniqueSellInfo.unique_sellNFT = true;

    const uniqueBuild = dbModels.unique_sell.build(uniqueSellInfo);

    uniqueBuild
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
  }
);

app.post(
  "/create-auction",
  mdAuthenticattion.checkToken,
  async (req, res, next) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let uniqueSellInfo = req.body;
    let dateNow = moment();

    let nft = await dbModels.unique.findByPk(uniqueSellInfo.nftID);

    let token = await dbModels.my_token.findOne({
      where: { uniqueID: uniqueSellInfo.nftID },
    });

    uniqueSellInfo.uniqueID = uniqueSellInfo.nftID;
    uniqueSellInfo.unique_sellQUANTITYSALE = 1;
    uniqueSellInfo.unique_sellNFT = true;
    uniqueSellInfo.unique_sellDATEEXPIRE =
      req.body.days === 0
        ? null
        : dateNow.add(req.body.days, "days").format("YYYY-MM-DD HH:mm:ss");
    uniqueSellInfo.unique_sellTYPE = "AUCTION";

    let tokens;
    tokens = await dbModels.my_token.findOne({
      where: { uniqueID: uniqueSellInfo.nftID, userID: uniqueSellInfo.userID },
    });
    if (tokens)
      tokens.mytokenQUANTITYAVAIBLE = tokens.mytokenQUANTITYAVAIBLE - 1;
    if (tokens)
      await dbModels.my_token.update(tokens.toJSON(), {
        where: {
          uniqueID: uniqueSellInfo.nftID,
          userID: uniqueSellInfo.userID,
        },
      });
    const uniqueBuild = dbModels.unique_sell.build(uniqueSellInfo);

    uniqueBuild
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
  }
);

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
    myToken.mytokenQUANTITYAVAIBLE = myToken.mytokenQUANTITYAVAIBLE + 1;

    if (info.statusTransaction == "SUCCESS") {
      auctionOffert.auction_offerSTATUS = "APPROVED";
      sellinfo.userBUY = auctionOffert.userID;
      myToken.userID = auctionOffert.userID;
    } else {
      auctionOffert.auction_offerSTATUS = "REJECTED";
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

app.get("/lastNft", (req, res, next) => {
  const dataLanguage = funtions.languages(req.headers["x-localization"]);
  const options = {
    where: { uniqueSTATUS: "NFT" },
    order: [["id", "DESC"]],
    limit: 10,
    offset: 0,
    include: [{ model: dbModels.profile }],
  };
  dbModels.unique
    .findAll(options)
    .then((nfts) => {
      return res.status(200).send({
        success: true,
        message: "Last NFT",
        data: nfts,
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

module.exports = app;
// "use strict";

// const express = require("express");
// const dbModels = require("../models");
// const Sequelize = require("sequelize");
// const mdAuthenticattion = require("../middlewares/authenticated");
// const funtions = require("../utils/funtions");
// const moment = require("moment");
// var bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// const Op = Sequelize.Op;

// app.post("/create", mdAuthenticattion.checkToken, async (req, res, next) => {
//   const dataLanguage = funtions.languages(req.headers["x-localization"]);
//   let nftInfo = req.body;

//   let nfts = [];

//   if (nftInfo.withPlan == true) {
//     let nftRegisterInfo = {};

//     nftRegisterInfo.userID = nftInfo.userID;

//     const nftRegisterBuild =
//       dbModels.register_create_nft.build(nftRegisterInfo);
//     const nftRegister = await nftRegisterBuild.save();
//   }

//   for (let i = 0; i < nftInfo.quantityToken; i++) {
//     nftInfo.uniqueUSERCREATOR = nftInfo.userID;
//     nftInfo.userCREATOR = nftInfo.userID;
//     nftInfo.project_tokenID = nftInfo.project_tokenID;
//     nftInfo.uniqueSTATUS = "NFT";
//     const unique = dbModels.unique.build(nftInfo);
//     const nft = await unique.save();

//     nfts[i] = nft;

//     let tokenInfo = {
//       userID: nftInfo.userID,
//       uniqueID: nft.id,
//       projectID: nftInfo.project_tokenID,
//       projectCODE: nftInfo.uniqueDIGITALCONTRACTADDRESS,
//       mytokenQUANTITYAVAIBLE: 1,
//       mytokenQUANTITYBUY: 1,
//       mytokenPRICEBUY: nftInfo.tokenPRICE,
//     };

//     const token = dbModels.my_token.build(tokenInfo);

//     token.save();
//   }

//   return res.status(200).send({
//     success: true,
//     message: dataLanguage.saved,
//     data: nfts,
//   });
// });

// app.post(
//   "/create-sell",
//   mdAuthenticattion.checkToken,
//   async (req, res, next) => {
//     const dataLanguage = funtions.languages(req.headers["x-localization"]);

//     let uniqueSellInfo = req.body;

//     let nft = await dbModels.unique.findByPk(uniqueSellInfo.nftID);

//     let token = await dbModels.my_token.findOne({
//       where: { uniqueID: uniqueSellInfo.nftID },
//     });

//     uniqueSellInfo.uniqueID = uniqueSellInfo.nftID;
//     uniqueSellInfo.unique_sellQUANTITYSALE = 1;
//     uniqueSellInfo.unique_sellNFT = true;

//     const uniqueBuild = dbModels.unique_sell.build(uniqueSellInfo);

//     uniqueBuild
//       .save()
//       .then((uniqueSaved) => {
//         return res.status(200).send({
//           success: true,
//           message: dataLanguage.saved,
//           data: uniqueSaved,
//         });
//       })
//       .catch((error) => {
//         return res.status(500).send({
//           success: false,
//           message: dataLanguage.errorSaved,
//           error: error,
//         });
//       });
//   }
// );

// app.post(
//   "/close-sell",
//   mdAuthenticattion.checkToken,
//   async (req, res, next) => {
//     const dataLanguage = funtions.languages(req.headers["x-localization"]);

//     let uniqueSellInfo = req.body;

//     let uniqueSell = await dbModels.unique_sell.findByPk(
//       uniqueSellInfo.uniqueSellID
//     );

//     uniqueSell.unique_sellSITUATION = uniqueSellInfo.status;
//     uniqueSell.unique_sellSTATUS = "INACTIVE";

//     if (uniqueSellInfo.status == "SUCCESS") {
//       let nft = await dbModels.unique.findByPk(uniqueSell.uniqueID);

//       if (uniqueSellInfo.status == "SUCCESS") {
//         console.log("uniqueSellInfo.userBU", uniqueSellInfo.userBUY);
//         let nft = await dbModels.unique.findByPk(uniqueSell.uniqueID);

//         const th = await dbModels.unique.update(nft.toJSON(), {
//           where: { id: nft.id },
//         });

//         let token = await dbModels.my_token.findOne({
//           where: { uniqueID: uniqueSell.uniqueID },
//         });

//         token.userID = uniqueSellInfo.userBUY;

//         const tokenNew = await dbModels.my_token.update(token.toJSON(), {
//           where: { id: token.id },
//         });
//       }

//       let token = await dbModels.my_token.findOne({
//         where: { uniqueID: uniqueSell.uniqueID },
//       });
//       console.log(token.toJSON());
//       token.userID = uniqueSellInfo.userBUY;

//       dbModels.my_token.update(token.toJSON(), { where: { id: token.id } });
//     }

//     dbModels.unique_sell
//       .update(uniqueSell.toJSON(), {
//         where: { id: uniqueSellInfo.uniqueSellID },
//       })
//       .then((uniqueSaved) => {
//         return res.status(200).send({
//           success: true,
//           message: dataLanguage.saved,
//           data: uniqueSaved,
//         });
//       })
//       .catch((error) => {
//         return res.status(500).send({
//           success: false,
//           message: dataLanguage.errorSaved,
//           error: error,
//         });
//       });
//   }
// );

// module.exports = app;
