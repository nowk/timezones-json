/* jshint node: true */

/*
 * timezones returns the raw timezones list
 *
 * @return {Array}
 * @api public
 */

var timezones = exports.timezones = require("./timezones");

/*
 * groupsMap is a array map of the timezone group names for easier search
 *
 * @return {Array}
 * @api public
 */

var groupsMap = exports.groupsMap = timezones.map(function(v) {
  return v.group.toLowerCase();
});

/*
 * zones is an flattened array of zones maped to their timezone name
 *
 * @return {Object}
 * @api public
 */

var zones = exports.zones = timezones.reduce(function(memo, v) {
  var group = v.group;
  var zones = v.zones;

  var i = 0;
  var len = zones.length;
  for(; i < len; i++) {
    var z = zones[i];
    memo[z.value.toLowerCase()] = z;
  }

  return memo;
}, {});

/*
 * zone returns one or more zones based on given names
 *
 * @param {String...}
 * @return {Object|Array}
 * @api public
 */

exports.zone = function() {
  var names = Array.prototype.slice.call(arguments);

  var z = [];
  var indexed = [];

  var i = 0;
  var len = names.length;
  for(; i < len; i++) {
    var key = names[i].toLowerCase();
    var zone = zones[key];
    if (!zone) {
      continue;
    }

    if (~indexed.indexOf(key)) {
      continue;
    }

    indexed.push(key);
    z.push(zone);
  }

  if (z.length === 1) {
    return z[0];
  }

  return z;
};

/*
 * group returns one or more time groups based on given names
 *
 * @param {String...}
 * @return {Tg|Array} (if array, an array of Tgs)
 * @api public
 */

exports.group = function() {
  var names = Array.prototype.slice.call(arguments);

  var g = [];
  var indexed = [];

  var i = 0;
  var len = names.length;
  for(; i < len; i++) {
    var idx = groupsMap.indexOf(names[i].toLowerCase());
    if (idx < 0) {
      continue;
    }

    if (~indexed.indexOf(idx)) {
      continue;
    }

    indexed.push(idx);
    g.push(new Tg(timezones[idx]));
  }

  if (g.length === 1) {
    return g[0];
  }

  return g;
};

/*
 * Tg represents a timezone collection object
 *
 * @param {Object} z
 * @constructor
 */

function Tg(z) {
  this.name = z.group;
  this.zones = z.zones;
}
