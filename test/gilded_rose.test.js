const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  let shopBrieNormal;
  let shopBrieExpired;
  let shopBrieBestQuality;
  beforeEach(function(){
    shopBrieNormal = new Shop([new Item("Brie", 10, 10)]);
    shopBrieBestQuality = new Shop([new Item("Brie", -5, 50)])
  });

  describe("updating Brie quality", function(){
    it('Increases by 1 the value of quality and decreases by one the sell in in normal conditions', function(){
      shopBrieNormal.updateQuality()
      expect(shopBrieNormal.items[0]).toEqual({"name": "Brie", "quality": 11, "sellIn": 9})
    });
    it('Does not increase the quality if quality is already 50', function(){
      shopBrieBestQuality.updateQuality()
      expect(shopBrieBestQuality.items[0]).toEqual({"name": "Brie", "quality": 50, "sellIn": -6})
    });
  });

});
