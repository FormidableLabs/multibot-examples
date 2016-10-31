"use strict";
/*eslint-disable max-statements, complexity*/

var fs = require("fs");
var path = require("path");
var sortObject = require("../../../lib/utils").sortObject;

var read = function (name) {
  return fs.readFileSync(path.resolve(__dirname, name)).toString("utf8");
};
var npmignore = read("./npmignore");
var gitignore = read("./gitignore");
var readme = read("./readme");

var INDENT = 2; // spaces to indent

var TRANFORMS = {
  "package.json": function (obj, callback) {
    // Parse JSON
    try {
      var pkg = JSON.parse(obj.contents);
    } catch (err) {
      callback(err);
      return;
    }

    // Upgrades
    var upgrades = {
      "builder": "^3.1.0",
      "builder-docs-archetype": "^4.2.1",
      "builder-docs-archetype-dev": "^4.2.1",
      "victory": "*"
    };
    Object
      .keys(upgrades)
      .forEach(function (key) {
        if ((pkg.dependencies || {})[key]) {
          pkg.dependencies[key] = upgrades[key];
        }
        if ((pkg.devDependencies || {})[key]) {
          pkg.devDependencies[key] = upgrades[key];
        }
      });

    // Removals
    var removals = [
      "builder-react-component",
      "builder-react-component-dev"
    ];
    removals.forEach(function (remove) {
      delete (pkg.dependencies || {})[remove];
      delete (pkg.devDependencies || {})[remove];
    });

    // Add preversion task
    if (!pkg.scripts) {
      throw new Error("Missing scripts");
    } else if (pkg.scripts.preversion) {
      throw new Error("Found preexisting preversion");
    }
    pkg.scripts.preversion = "builder run npm:preversion";

    // Sort keys.
    if (pkg.scripts) {
      pkg.scripts = sortObject(pkg.scripts);
    }
    if (pkg.dependencies) {
      pkg.dependencies = sortObject(pkg.dependencies);
    }
    if (pkg.devDependencies) {
      pkg.devDependencies = sortObject(pkg.devDependencies);
    }

    // Successful transformation.
    callback(null, JSON.stringify(pkg, null, INDENT).toString("utf8") + "\n");
  },

  ".npmignore": function (obj, callback) {
    callback(null, npmignore);
  },

  ".gitignore": function (obj, callback) {
    callback(null, gitignore);
  },

  "README.md": function (obj, callback) {
    callback(null, obj.contents + "\n" + readme);
  }
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
  var transform = TRANFORMS[obj.file];

  // Validate that we only process package.json files.
  if (!transform) {
    callback(new Error("Encountered bad file: " + obj.file));
    return;
  }

  transform(obj, callback);
};
