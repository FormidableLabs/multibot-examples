"use strict";

/**
 * Various helpers.
 */

// Helper: Sort object by keys.
module.exports.sortObject = function (obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (memo, key) {
      memo[key] = obj[key];
      return memo;
    }, {});
};
