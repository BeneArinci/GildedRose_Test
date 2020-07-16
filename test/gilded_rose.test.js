const {Shop} = require("../src/gilded_rose");
const {Item} = require("../src/item")

describe("Gilded Rose", function() {
  let shopBrie;
  let shopBrieTopQuality;
  let shopSulfuras;
  let shopPasses;
  let shopPasses10days;
  let shopPassesExpired;
  let shopPassesBestQuality;
  let shopOtherItem;
  let shopOtherItemExpired;
  let shopMultipleItems;

  describe("updating Brie quality", function(){
    it('Increases by 1 the value of quality and decreases by one the sell in in normal conditions', function(){
      shopBrie = new Shop([new Item("Brie", 10, 10)]);
      shopBrie.updateQuality();
      expect(shopBrie.items[0]).toEqual({"name": "Brie", "quality": 11, "sellIn": 9});
    });
    it('Does not increase the quality if quality is already 50', function(){
      shopBrieTopQuality = new Shop([new Item("Brie", -5, 50)]);
      shopBrieTopQuality.updateQuality();
      expect(shopBrieTopQuality.items[0]).toEqual({"name": "Brie", "quality": 50, "sellIn": -6});
    });
  });

  describe("updating Sulfuras quality", function(){
    it('does not modify their quality nor the selling value', function(){
      shopSulfuras = new Shop([new Item("Sulfuras", 0, 10)]);
      shopSulfuras.updateQuality();
      expect(shopSulfuras.items[0]).toEqual({"name": "Sulfuras", "quality": 10, "sellIn": 0});
    });
  });

  describe("updating Backstage Passes quality", function(){
    it('in normal conditions, adds 1 to quality and reduces by 1 the sellIn', function(){
      shopPasses = new Shop([new Item("Backstage passes", 12, 10)]);
      shopPasses.updateQuality();
      expect(shopPasses.items[0]).toEqual({"name": "Backstage passes", "quality": 11, "sellIn": 11});
    });
    it('when sellin <= 10 (days from the concert), adds 2 to quality and reduces by 1 the sellIn', function(){
      shopPasses10days = new Shop([new Item("Backstage passes", 10, 10)]);
      shopPasses10days.updateQuality();
      expect(shopPasses10days.items[0]).toEqual({"name": "Backstage passes", "quality": 12, "sellIn": 9});
    });
    it('when sellin <=5 (days from the concert), adds 3 to quality and reduces by 1 the sellIn', function(){
      shopPasses5days = new Shop([new Item("Backstage passes", 5, 10)]);
      shopPasses5days.updateQuality();
      expect(shopPasses5days.items[0]).toEqual({"name": "Backstage passes", "quality": 13, "sellIn": 4});
    });
    it('when sellin <=0, quality drops to 0', function(){
      shopPassesExpired = new Shop([new Item("Backstage passes", 0, 30)]);
      shopPassesExpired.updateQuality();
      expect(shopPassesExpired.items[0]).toEqual({"name": "Backstage passes", "quality": 0, "sellIn": -1});
    });
    it('Does not increase the quality if quality is already 50', function(){
      shopPassesBestQuality = new Shop([new Item("Backstage passes", 5, 50)]);
      shopPassesBestQuality.updateQuality();
      expect(shopPassesBestQuality.items[0]).toEqual({"name": "Backstage passes", "quality": 50, "sellIn": 4});
    });
  });

  describe("updating Other Items quality", function(){
    it('in normal conditions, reduces quality and sellIn by 1', function(){
      shopOtherItem = new Shop([new Item("Other Item", 10, 10)]);
      shopOtherItem.updateQuality();
      expect(shopOtherItem.items[0]).toEqual({"name": "Other Item", "quality": 9, "sellIn": 9});
    });
    it('when the item is expired, reduces quality by 2 and sellIn by 1', function(){
      shopOtherItemExpired = new Shop([new Item("Other Item", 0, 10)]);
      shopOtherItemExpired.updateQuality();
      expect(shopOtherItemExpired.items[0]).toEqual({"name": "Other Item", "quality": 8, "sellIn": -1});
    });
    it('the quality of an item never go below the minimum of 0', function(){
      shopOtherItemLowQuality = new Shop([new Item("Other Item", -1, 1)]);
      shopOtherItemLowQuality.updateQuality();
      expect(shopOtherItemLowQuality.items[0]).toEqual({"name": "Other Item", "quality": 0, "sellIn": -2})
    });
  });

  describe("introducing Conjured item and updating their quality", function(){
    it('reduces the quality by 2 if the item is not expired', function(){
      shopConjured = new Shop([new Item("Conjured", 5, 10)]);
      shopConjured.updateQuality();
      expect(shopConjured.items[0]).toEqual({"name": "Conjured", "quality": 8, "sellIn": 4})
    });
    it('reduces the quality by 4 if the item is expired', function(){
      shopConjuredExpired = new Shop([new Item("Conjured", -1, 10)])
      shopConjuredExpired.updateQuality();
      expect(shopConjuredExpired.items[0]).toEqual({"name": "Conjured", "quality": 6, "sellIn": -2})
    });
    it('does not bring the quality above the minimum of 0', function(){
      shopConjured = new Shop([new Item("Conjured", 0, 1)])
      shopConjured.updateQuality()
      expect(shopConjured.items[0]).toEqual({"name": "Conjured", "quality": 0, "sellIn": -1})
    });
    it('does not bring the quality above the minimum of 0, extra example', function(){
      shopConjured = new Shop([new Item("Conjured", 5, 1)])
      shopConjured.updateQuality()
      expect(shopConjured.items[0]).toEqual({"name": "Conjured", "quality": 0, "sellIn": 4})
    });
  });

  describe("multiple items", function(){
    it('works for multiple items', function(){
      shopMultipleItems = new Shop([new Item("Other Item", 0, 10), new Item("Brie", 10, 10), new Item("Sulfuras", 0, 10)]);
      shopMultipleItems.updateQuality();
      expect(shopMultipleItems.items[0]).toEqual({"name": "Other Item", "quality": 8, "sellIn": -1});
      expect(shopMultipleItems.items[1]).toEqual({"name": "Brie", "quality": 11, "sellIn": 9});
      expect(shopMultipleItems.items[2]).toEqual({"name": "Sulfuras", "quality": 10, "sellIn": 0});
    });
  });
});