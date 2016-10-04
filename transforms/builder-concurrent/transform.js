"use strict";
/*eslint-disable max-statements, complexity*/

var argvSplit = require("argv-split");

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

  // Helper: Mutate the scripts using concurrently.
  var usingConcurrently = false;
  var mutateScripts = function (key) {
    // Find all concurrently commands.
    var cmd = pkg.scripts[key];
    if (cmd.indexOf("concurrent ") === 0 || cmd.indexOf("concurrently ") === 0) {
      usingConcurrently = true;

      // Split in to tokens, looking for `concurrently 'one' 'two'` or
      // `concurrently "one" "two"`.
      //
      // **HACKAGE**: Splitting full strings in the same manner as the
      // underlying shell does is black magic and presently unreliable with
      // any library in Node.js. We use one for the most simple splitting to
      // detect our expected command string formats and error if anything is
      // unexpected to not have to deal with the truly perverse "real bash"
      // scenarios.
      var tokens = argvSplit(cmd);

      // Convert to `npm` script tasks.
      var tasks = tokens
        // Remove first token (`concurrent(|ly`), then `-f`, `--flag` flags
        .filter(function (token, idx) { return !(idx === 0 || token.indexOf("-") === 0); })
        // Convert to just task name or error out.
        .map(function (token) {
          var task = token.replace(/^npm run(|-script) /, "");
          if (task === token) {
            // Unchanged means an error (not an npm task).
            throw new Error("Encountered non-npm task for: " + pkg.name + " - " + task);
          }

          return task;
        });

      console.log("TODO HERE tokens: ", tokens);
      console.log("TODO HERE tasks: ", tasks);




    }
  };

  // Mutate and check out actually _using_ concurrently in npm scripts along the way.
  try {
    Object.keys(pkg.scripts || {}).forEach(mutateScripts);
  } catch (err) {
    callback(err);
    return;
  }

  if (!usingConcurrently) {
    callback(new Error("Not using `concurrently` in package.json:scripts for: " + pkg.name));
    return;
  }

  //console.log("TODO REMOVE", pkg);

  // TODO: INSERT TRANFORM
  callback(null, obj.contents);
};
