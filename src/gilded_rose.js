const item = require("./item");

class Shop {
  constructor(items=[]){
    this.items = items;
    this.MAX_QUALITY = 50
    this.MIN_QUALITY = 0
  }
  updateQuality() {
    this.items.forEach(function(item) {
      if (this._isBrie(item)) {
        this._updateBrieQuality(item);
      } else if (this._isSulfuras(item)) {
        this._updateSulfurasQuality(item);
      } else if (this._isBackstagePasses(item)) {
        this._updateBackstagePass(item);
      } else {
        this._updateOtherProducts(item)
      }
    }.bind(this));
    return this.items;
  }

  _updateBrieQuality(item) {
    if (this._isNotMaxQuality(item)) {
      item.quality ++
    }
    item.sellIn --
  }

  _updateSulfurasQuality(item) {
    item = item 
  }

  _updateBackstagePass(item) {
    if (this._isNotMaxQuality(item) && item.sellIn > 0) {
      if (item.sellIn < 6) {
        item.quality = item.quality + 3
        } else if (item.sellIn <= 10 && item.sellIn > 5) {
        item.quality += 2
        } else {
        item.quality ++
      }
    }
    if (item.sellIn == 0){
      item.quality = 0
    }
    item.sellIn --
  }

  _updateOtherProducts(item) {
    if (this._isNotMinQuality(item) && item.sellIn > 0){
      item.quality --
    }
    if (this._isNotMinQuality(item) && item.sellIn <= 0){
      item.quality -= 2
    }
    item.sellIn --
  }

  _isNotMaxQuality(item) {
    return item.quality < this.MAX_QUALITY
  }

  _isNotMinQuality(item) {
    return item.quality > this.MIN_QUALITY
  }

  _isBrie(item) {
    return item.name == "Brie"
  }

  _isSulfuras(item) {
    return item.name == "Sulfuras"
  }

  _isBackstagePasses(item) {
    return item.name == "Backstage passes"
  }
  
}



module.exports = {
  Shop
}
