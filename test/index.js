/* jshint node: true */

var assert = require("chai").assert;
var tz = require("..");

describe("group", function() {
  it("returns a group by name", function() {
    [
      "america",
      "America"
    ].forEach(function(v) {
      var g = tz.group(v);
      assert.equal(g.name(), "America");
    });
  });

  it("returns multiple groups by name", function() {
    var g = tz.group("america", "Us (common)");
    assert.lengthOf(g, 2);
    assert.equal(g[0].name(), "America");
    assert.equal(g[1].name(), "US (Common)");
  });

  it("does not return duplicate matching groups", function() {
    var g = tz.group("america", "america");
    assert.equal(g.name(), "America");
  });

  it("returns ane emtpy array if no groups are found", function() {
    var g = tz.group("outer", "space");
    assert.lengthOf(g, 0);
  });
});

