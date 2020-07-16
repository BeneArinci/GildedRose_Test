const item = require("./item");

class Shop {
  constructor(items=[]){
    this.items = items;
    this.MAX_QUALITY = 50
    this.MIN_QUALITY = 0
  }
  updateQuality() {
    this.items.forEach(function(item) {
      if (this._isBrie(item) == false && this._isBackstagePasses(item) == false) {
        if (this._isNotMinQuality(item)) {
          if (this._isSulfuras(item) == false) {
            item.quality --;
          }
        }
      } else {
        if (this._isNotMaxQuality(item)) {
          item.quality ++;
          if (this._isBackstagePasses(item)) {
            if (item.sellIn < 11) {
              if (this._isNotMaxQuality(item)) {
                item.quality ++;
              }
            }
            if (item.sellIn < 6) {
              if (this._isNotMaxQuality(item)) {
                item.quality ++;
              }
            }
          }
        }
      }
      if (this._isSulfuras(item) == false){
        item.sellIn --;
      }
      if (item.sellIn < 0) {
        if (this._isBrie(item) == false) {
          if (this._isBackstagePasses(item) == false) {
            if (this._isNotMinQuality(item)) {
              if (this._isSulfuras(item) == false) {
                item.quality --;
              }
            }
          } else {
            item.quality -= item.quality;
          }
        } else {
          if (this._isNotMaxQuality(item)) {
            item.quality ++;
          }
        }
      }
  }.bind(this));
    return this.items;
  }

  _updateBrieQuality(item) {
    if (item.quality == this.MAX_QUALITY() == false) {
      item.quality ++
    }
    item.sellIn --
  }

  _updateSulfurasQuality(item) {
    item = item 
  }

  _updateBackstagePass(item) {
    if (item.sellIn <= 10) {
      item.quality = item.quality + 2
    } if (item.sellIn <= 5 && item.sellIn > 0) {
      item.quality = item.quality + 3
    } else {
      item.sellIn = 0
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
