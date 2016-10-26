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

  // Upgrade builder
  if ((pkg.dependencies || {}).builder) {
    pkg.dependencies.builder = "^3.1.0";
  }
  if ((pkg.devDependencies || {}).builder) {
    pkg.devDependencies.builder = "^3.1.0";
  }

  // Mutate engines restriction per
  // https://github.com/FormidableLabs/victory/pull/410/files
  delete pkg.engineStrict;
  pkg.engines.npm = ">=2.0.0";

  // Successful transformation.
  callback(null, JSON.stringify(pkg, null, INDENT).toString("utf8") + "\n");
};
