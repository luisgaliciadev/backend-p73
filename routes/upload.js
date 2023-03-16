"use strict";

var express = require("express");

var fileUpload = require("express-fileupload");
var fs = require("fs");

// mssql
var bodyParser = require("body-parser");
var http = require("http");
var path = require("path");
const dbModels = require("../models");

const mt = require("media-thumbnail");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

app.put("/:tipo/:id", (req, res, next) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  const tiposValidos = [
    "starting-images",
    "images-uniques",
    "images-arts-works",
    "images-drafts",
    "stories",
    "profile-image",
    "profile-banner",
    "certifications-arts-uniques",
    "document-id-images",
    "images-nfts",
  ];
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).send({
      ok: false,
      message: "El tipo de colección no es valido.",
    });
  }

  if (!req.files) {
    res.status(400).send({
      ok: false,
      message: "No se ha selecciono ningun un archivo.",
    });
  } else {
    // Get File Name
    const file = req.files.image;
    const arrayFileName = file.name.split(".");
    const extFile = arrayFileName[arrayFileName.length - 1];
    const fileSize = file.size;

    let extValida = [
      "PNG",
      "png",
      "JPG",
      "jpg",
      "webp",
      "WEBP",
      "gif",
      "GIF",
      "jpeg",
      "JPEG",
    ];

    if (tipo === "stories") {
      extValida = [
        "png",
        "PNG",
        "jpeg",
        "JPEG",
        "jpg",
        "JPG",
        "mp4",
        "MP4",
        "webp",
        "WEBP",
        "gif",
        "GIF",
      ];
    }

    if (tipo === "certifications-arts-uniques") {
      extValida = ["pdf", "PDF"];
    }

    if (extValida.indexOf(extFile) < 0) {
      res.status(400).send({
        ok: false,
        message: "Extensión de archivo no valida." + "extFile: " + extFile,
      });
    } else {
      // File Name
      let fileName = "";

      fileName = `${arrayFileName[0]}-${id}-${new Date().getMilliseconds()}`;
      if (tipo === "stories")
        fileName = `${"story"}-${id}-${new Date().getMilliseconds()}`;
      if (tipo === "profile-image")
        fileName = `${"profile-image"}-${id}-${new Date().getMilliseconds()}`;
      if (tipo === "profile-banner")
        fileName = `${"profile-banner"}-${id}-${new Date().getMilliseconds()}`;

      // Tempotal path
      const path = `./uploads/${tipo}/${fileName}.${extFile}`;
      file.mv(path, async (err) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: "Error al intentar guardar el archivo.",
            error: err,
          });
        } else {
          if (extFile === "mp4" || extFile === "MP4") {
            // mt.forVideo(path, `./uploads/${tipo}/${fileName}.jpg`, {
            //   width: 200,
            // }).then(
            //   () => uploadFile(tipo, id, `${fileName}.${extFile}`, res),
            //   (err) => console.error(err)
            // );
            new ffmpeg(path).takeScreenshots(
              {
                filename: `${fileName}.jpg`,
                count: 1,
                timemarks: ["5"],
              },
              `./uploads/${tipo}`
            );
            uploadFile(tipo, id, `${fileName}.${extFile}`, res);
          } else {
            uploadFile(tipo, id, `${fileName}.${extFile}`, res);
          }
        }
      });
    }
  }
});

async function uploadFile(tipo, id, fileName, res) {
  if (
    tipo === "starting-images" ||
    tipo === "certifications-arts-uniques" ||
    tipo === "images-nfts"
  ) {
    const path = `/${tipo}/${fileName}`;
    return res.status(200).send({
      success: true,
      message: "Image upload",
      data: path,
    });
  }

  if (
    tipo === "images-uniques" ||
    tipo === "images-arts-works" ||
    tipo === "images-drafts"
  ) {
    const path = `/${tipo}/${fileName}`;
    let unique = await dbModels.unique.findByPk(id);
    if (unique) {
      // if (tipo !== 'certifications-arts-uniques') unique.uniqueLINK = path;
      unique.uniqueLINK = path;
      dbModels.unique
        .update(unique.toJSON(), { where: { id: id } })
        .then((uniqueUpdate) => {
          res.status(200).send({
            success: true,
            message: "Unique link update",
            data: { path, uniqueUpdate },
          });
        })
        .catch((error) => {
          res.status(500).send({
            success: false,
            message: "Error update unique link",
            error: error,
          });
        });
    } else {
      res.status(500).send({
        success: false,
        message: "Unique does not exist",
        error: "Unique does not exist",
      });
    }
  }

  if (tipo === "stories") {
    const path = `/${tipo}/${fileName}`;
    let story = await dbModels.story.findByPk(id);
    if (story) {
      story.file = path;
      dbModels.story
        .update(story.toJSON(), { where: { id: id } })
        .then((stotyUpdate) => {
          res.status(200).send({
            success: true,
            message: "Story update",
            data: { path, stotyUpdate },
          });
        })
        .catch((error) => {
          res.status(500).send({
            success: false,
            message: "Error update story",
            error: error,
          });
        });
    } else {
      res.status(500).send({
        success: false,
        message: "Story does not exist",
        error: "Story does not exist",
      });
    }
  }

  if (tipo === "profile-image" || tipo === "profile-banner") {
    const path = `/${tipo}/${fileName}`;
    let profile = await dbModels.profile.findOne({ where: { userID: id } });
    if (profile) {
      if (tipo === "profile-image") {
        profile.img = path;
      }
      if (tipo === "profile-banner") {
        profile.profileBANNER = path;
      }

      dbModels.profile
        .update(profile.toJSON(), { where: { userID: id } })
        .then((profileUpdate) => {
          res.status(200).send({
            success: true,
            message: "Profile update",
            data: { path, profileUpdate },
          });
        })
        .catch((error) => {
          res.status(500).send({
            success: false,
            message: "Error update story",
            error: error,
          });
        });
    } else {
      res.status(500).send({
        success: false,
        message: "Profile does not exist",
        error: "Profile does not exist",
      });
    }
  }

  if (tipo === "document-id-images") {
    const path = `/${tipo}/${fileName}`;
    let profile = await dbModels.profile.findOne({ where: { userID: id } });
    if (profile) {
      let oldPath = "";
      if (fileName.indexOf("Front") > -1) {
        oldPath = "./uploads" + profile.profileDOCUMENTIDEN;
        profile.profileDOCUMENTIDEN = path;
      }
      if (fileName.indexOf("Back") > -1) {
        oldPath = "./uploads" + profile.profileDOCUMENTIDENBACK;
        profile.profileDOCUMENTIDENBACK = path;
      }

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      dbModels.profile
        .update(profile.toJSON(), { where: { userID: id } })
        .then((profileUpdate) => {
          res.status(200).send({
            success: true,
            message: "Profile update",
            data: { path, profileUpdate },
          });
        })
        .catch((error) => {
          res.status(500).send({
            success: false,
            message: "Error update story",
            error: error,
          });
        });
    } else {
      res.status(500).send({
        success: false,
        message: "Profile does not exist",
        error: "Profile does not exist",
      });
    }
  }
}

module.exports = app;
