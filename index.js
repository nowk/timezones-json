/* jshint node: true */

var timezones = require("./timezones");

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
  this.z = z;
}

/*
 * name returns the time group name
 *
 * @return {String}
 * @api public
 */

Tg.prototype.name = function() {
  return this.z.group;
};

/*
 * zones returns the collection of zones for this time group
 *
 * @return {Array}
 * @api public
 */

Tg.prototype.zones = function() {
  return this.z.zones;
};

