"use strict";

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

  // Check if actually have concurrently.
  if (!((pkg.dependencies || {}).concurrently || (pkg.devDependencies || {}).concurrently)) {
    callback(new Error("Did not find `concurrently` in package.json for: " + pkg.name));
    return;
  }

  console.log("TODO REMOVE", pkg);

  // TODO: INSERT TRANFORM
  callback(null, obj.contents);
};
