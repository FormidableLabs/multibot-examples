"use strict";
/*eslint-disable max-statements, complexity*/

var INDENT = 2; // spaces to indent

/**
 * Transform contents of file to new format.
 *
 * @param {Object}    obj           File object.
 * @param {String}    obj.repo      Repository name
 * @param {String}    obj.file      File path
 * @param {String}    obj.contents  UTF8 content of file (or `null` if doesn't exist)
 * @param {Function}  callback      Send transformed contents to `(err, newContents)`
 * @returns {void}
 */
module.exports = function (obj, callback) {

  // Validate that we only process package.json files.
  if (obj.file !== "package.json") {
    callback(new Error("Encountered bad file: " + obj.file));
    return;
  }

  // Parse JSON
  try {
    var pkg = JSON.parse(obj.contents);
  } catch (err) {
    callback(err);
    return;
  }

  // Dependencies
  pkg.dependencies["builder-victory-component"] = "^4.0.2";
  pkg.devDependencies["builder-victory-component-dev"] = "^4.0.2";

  // Publishr
  pkg.publishr.scripts = {
    postinstall: ""
  };

  // Successful transformation.
  callback(null, JSON.stringify(pkg, null, INDENT).toString("utf8") + "\n");
};
