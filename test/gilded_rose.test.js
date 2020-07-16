const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  let shopBrieNormal;
  let shopBrieBestQuality;
  let shopSulfuras;
  let shopPassesNormal;
  let shopPasses10days;
  let shopPassesExpired;
  let shopPassesBestQuality;
 
  beforeEach(function(){
    shopBrieNormal = new Shop([new Item("Brie", 10, 10)]);
    shopBrieBestQuality = new Shop([new Item("Brie", -5, 50)])
    shopSulfuras = new Shop([new Item("Sulfuras", 0, 10)])
    shopPassesNormal = new Shop([new Item("Backstage passes", 12, 10)])
    shopPasses10days = new Shop([new Item("Backstage passes", 10, 10)])
    shopPasses5days = new Shop([new Item("Backstage passes", 5, 10)])
    shopPassesExpired = new Shop([new Item("Backstage passes", 0, 30)])
    shopPassesBestQuality = new Shop([new Item("Backstage passes", 5, 50)])
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
      expect(shopPassesNormal.items[0]).toEqual({"name": "Backstage passes", "quality": 11, "sellIn": 11})
    });
    it('when sellin <= 10 (days from the concert), adds 2 to quality and reduces by 1 the sellIn', function(){
      shopPasses10days.updateQuality()
      expect(shopPasses10days.items[0]).toEqual({"name": "Backstage passes", "quality": 12, "sellIn": 9})
    });
    it('when sellin <=5 (days from the concert), adds 3 to quality and reduces by 1 the sellIn', function(){
      shopPasses5days.updateQuality()
      expect(shopPasses5days.items[0]).toEqual({"name": "Backstage passes", "quality": 13, "sellIn": 4})
    });
    it('when sellin <=0, quality drops to 0', function(){
      shopPassesExpired.updateQuality()
      expect(shopPassesExpired.items[0]).toEqual({"name": "Backstage passes", "quality": 0, "sellIn": -1})
    });
    it('Does not increase the quality if quality is already 50', function(){
      shopPassesBestQuality.updateQuality()
      expect(shopPassesBestQuality.items[0]).toEqual({"name": "Backstage passes", "quality": 50, "sellIn": 4})
    });

  });





});
