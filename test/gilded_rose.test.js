const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  let shopBrieNormal;
  let shopBrieBestQuality;
  let shopSulfuras;
  let shopPassesNormal;
 
  beforeEach(function(){
    shopBrieNormal = new Shop([new Item("Brie", 10, 10)]);
    shopBrieBestQuality = new Shop([new Item("Brie", -5, 50)])
    shopSulfuras = new Shop([new Item("Sulfuras", 0, 10)])
    shopPassesNormal = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10)])

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

  describe("updating Sulfuras quality", function(){
    it('does not modify their quality nor the selling value', function(){
      shopSulfuras.updateQuality()
      expect(shopSulfuras.items[0]).toEqual({"name": "Sulfuras", "quality": 10, "sellIn": 0})
    });
  });

  describe("updating Sulfuras quality", function(){
    it('in normal conditions, adds 1 to quality and reduces by 1 the sellIn', function(){
      shopPassesNormal.updateQuality()
      expect(shopPassesNormal.items[0]).toEqual({"name": "Backstage passes to a TAFKAL80ETC concert", "quality": 11, "sellIn": 11})
    });
  });



});
