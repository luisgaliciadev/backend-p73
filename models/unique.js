"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class unique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unique.belongsTo(models.image_unique_type, {
        foreignKey: "idImageUniqueType",
        targetKey: "id",
      });

      unique.belongsTo(models.profile, {
        foreignKey: "uniqueUSERCREATOR",
        targetKey: "userID",
      });

      this.hasOne(models.voucher);

      // unique.belongsTo(models.unique_sell, {
      //   foreignKey: 'id',
      //   targetKey: 'uniqueID'
      // });

      unique.hasMany(models.unique_like);
      unique.hasMany(models.unique_download);

      unique.hasMany(models.unique_sell);
      unique.hasMany(models.my_token);

      unique.belongsTo(models.unique_art_movent, {
        foreignKey: "unique_art_moventID",
        targetKey: "id",
      });

      unique.belongsTo(models.unique_mood, {
        foreignKey: "unique_moodID",
        targetKey: "id",
      });

      unique.belongsTo(models.unique_element, {
        foreignKey: "unique_elementID",
        targetKey: "id",
      });
    }
  }
  unique.init(
    {
      uniquePROMTP: {
        type: DataTypes.STRING,
      },
      uniqueLINK: DataTypes.STRING,
      uniqueHASS: DataTypes.STRING,
      uniqueIMGINFLUENCELINK: DataTypes.STRING,
      uniqueIMGINFLUENCEPERCENTAGE: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      uniqueWIDTH: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      uniqueHEIGHT: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      uniqueINTERATION: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      uniqueLUCKYNUMBER: DataTypes.STRING,
      uniqueHASS: DataTypes.STRING,
      uniqueLINKVIDEO: DataTypes.STRING,
      uniqueSTATUS: DataTypes.ENUM(
        "UNIQUE",
        "DRAFT",
        "ARTWORK",
        "DELETE",
        "PAY-TO-OWN",
        "NFT"
      ),
      uniqueDOWNLOADAVIABLE: DataTypes.BOOLEAN,
      uniqueASPECTRATIO: DataTypes.STRING,
      uniqueVIDEOFRAME: DataTypes.STRING,
      uniqueVIDEOSTYLE: DataTypes.STRING,
      uniqueVIDEODURATION: DataTypes.STRING,
      uniqueUSERCREATOR: DataTypes.INTEGER.UNSIGNED,
      userCREATOR: DataTypes.INTEGER,
      uniqueVIDEOFPS: DataTypes.STRING,
      uniqueVIDEOLOOP: DataTypes.BOOLEAN,
      uniqueVIDEORESOLUTION: DataTypes.STRING,
      walletCREATOR: DataTypes.INTEGER.UNSIGNED,
      unique_art_moventID: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      unique_elementID: DataTypes.INTEGER.UNSIGNED,
      unique_moodID: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      idImageUniqueType: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      uniqueName: DataTypes.STRING,
      uniqueNOTE: DataTypes.TEXT,
      uniquePRICETOKEN: DataTypes.FLOAT,
      uniqueROYALTYPERCENTAGE: DataTypes.FLOAT,
      uniqueDIGITALCONTRACTADDRESS: DataTypes.TEXT,
      project_tokenID: DataTypes.INTEGER,
      uniqueTOKENAVAILABLE: DataTypes.INTEGER,
      uniqueSITUATION: DataTypes.ENUM("PRIVATE", "SALE", "AUCTION"),
      uniqueLIKECOUNT: {
        type: DataTypes.INTEGER,
      },
      uniquePRICEDOWNLOAD: DataTypes.FLOAT,
      uniqueCOUNTDOWNLOAD: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.unique_downloads) {
            return 0;
          } else {
            return this.unique_downloads.length;
          }
        },
      },
      uniqueCREATIONWITHOUTPLAN: DataTypes.BOOLEAN,
      uniqueQUALITY: DataTypes.ENUM("DEFAULT", "HIGHT", "EXCELLENT", "SUPREME"),
      uniqueDESCRIPTION: DataTypes.STRING,
      uniqueNFTCONSECUTIVE: DataTypes.INTEGER,
      unique_TYPEALGORITHM: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "unique",
    }
  );

  return unique;
};
