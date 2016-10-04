"use strict";

// Helper: Sort object by keys.
var sortObject = function (obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (memo, key) {
      memo[key] = obj[key];
      return memo;
    }, {});
};

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

  // Switch out `dependencies` and `devDependencies`
  var hasConcurrently = false;
  var builderVersion = "^3.1.0"; // Current version string.
  if (pkg.dependencies) {
    // Add or update latest builder.
    if (pkg.dependencies.builder || pkg.dependencies.concurrently) {
      pkg.dependencies.builder = builderVersion;
      pkg.dependencies = sortObject(pkg.dependencies);
    }

    // Remove concurrently.
    if (pkg.dependencies.concurrently) {
      hasConcurrently = true;
      delete pkg.dependencies.concurrently;
    }
  }
  if (pkg.devDependencies) {
    // Add or update latest builder to devDeps if _not_ already in prod deps.
    if (!(pkg.dependencies || {}).builder &&
      (pkg.devDependencies.builder || pkg.devDependencies.concurrently)) {
      pkg.devDependencies.builder = builderVersion;
      pkg.devDependencies = sortObject(pkg.devDependencies);
    }

    // Remove concurrently.
    if (pkg.devDependencies.concurrently) {
      hasConcurrently = true;
      delete pkg.devDependencies.concurrently;
    }
  }

  if (!hasConcurrently) {
    callback(new Error("Did not find `concurrently` in package.json for: " + pkg.name));
    return;
  }

  // Check out actually _using_ concurrently in npm scripts.
  if (!(pkg.scripts)) {
    callback(new Error("Not using `concurrently` in package.json:scripts for: " + pkg.name));
    return;
  }

  console.log("TODO REMOVE", pkg);

  // TODO: INSERT TRANFORM
  callback(null, obj.contents);
};
