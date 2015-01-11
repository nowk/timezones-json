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
      assert.equal(g.name, "America");
    });
  });

  it("returns multiple groups by name", function() {
    var g = tz.group("america", "Us (common)");
    assert.lengthOf(g, 2);
    assert.equal(g[0].name, "America");
    assert.equal(g[1].name, "US (Common)");
  });

  it("does not return duplicate matching groups", function() {
    var g = tz.group("america", "america");
    assert.equal(g.name, "America");
  });

  it("returns ane emtpy array if no groups are found", function() {
    var g = tz.group("outer", "space");
    assert.lengthOf(g, 0);
  });
});

describe("zone", function() {
  it("returns a zone by timezone name", function() {
    [
      "America/New_York",
      "america/new_york"
    ].forEach(function(v) {
      var z = tz.zone(v);
      assert.equal("America/New_York", z.value);
      assert.equal("New York", z.name);
    });
  });

  it("returns multiple zones by name", function() {
    var z = tz.zone("America/new_York", "Asia/Seoul");
    assert.lengthOf(z, 2);
    assert.equal(z[0].name, "New York");
    assert.equal(z[1].name, "Seoul");
  });

  it("does not return duplicate matching groups", function() {
    var z = tz.zone("America/New_York", "America/New_York");
    assert.equal(z.value, "America/New_York");
    assert.equal(z.name, "New York");
  });

  it("returns ane emtpy array if no zones are found", function() {
    var z = tz.zone("outer", "space");
    assert.lengthOf(z, 0);
  });
});
