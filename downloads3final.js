/* Installation:
 * npm install aws-sdk
 * npm install async
 * node awsDownloadFilesInBucket.js
 */

var Promise = require("bluebird");
const fse = require("fs-extra");

// SETTINGS
var AWS_KEY = "";
var AWS_SECRET = "";
var BUCKET = "";
var PREFIX = "";
console.log("set all the settings");

var AWS = require("aws-sdk");
AWS.config.update({ accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET });

var params = {
  Bucket: BUCKET,
  Prefix: PREFIX,
};

var S3 = new AWS.S3();

module.exports = {
  writeFile: function (key, contents) {
    // Do something with file
    fse.outputFile(key, contents, function (err) {
      if (err) throw err;
      console.log(key + "Item saved locally!");
    });
  },

  getFiles: function (fileParams) {
    S3.getObject(fileParams, function (err, fileContents) {
      console.log("Writing files");
      err
        ? callback(err)
        : module.exports.writeFile(
            fileParams.Key,
            fileContents.Body.toString()
          );
    });
  },

  listHelper: function (err, data) {
    if (err) return console.log(err);
    Promise.each(
      data.Contents,
      (fileObj) =>
        new Promise((resolve, reject) => {
          module.exports.getFiles({
            Bucket: BUCKET,
            Key: fileObj.Key,
          });
          resolve();
        }),
      {
        concurrency: 4,
      }
    )
      .then(() => {
        console.log("All files downloaded successfully!");
      })
      .catch((err) => {
        console.error("Failed to download files " + err.message);
      });
  },

  main: function () {
    S3.listObjects(params, module.exports.listHelper);
  },
};