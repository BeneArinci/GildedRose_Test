const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  let shopBrieNormal;
  let shopBrieExpired;
  let shopBrieBestQuality;
  beforeEach(function(){
    shopBrieNormal = new Shop([new Item("Aged Brie", 10, 10)]);
  });

  describe("updating Brie quality", function(){
    it('Increases by 1 the value of quality and decreases by one the sell in in normal conditions', function(){
      shopBrieNormal.updateQuality()
      expect(shopBrieNormal.items[0]).toEqual({"name": "Aged Brie", "quality": 11, "sellIn": 9})
    });
  });
});
