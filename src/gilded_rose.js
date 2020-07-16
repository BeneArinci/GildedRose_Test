const item = require("./item");

class Shop {
  constructor(items=[]){
    this.items = items;
    this.MAX_QUALITY = 50
    this.MIN_QUALITY = 0
  }
  updateQuality() {
    this.items.forEach(function(item) {
      if (this._isBrie(item) == false && item.name != 'Backstage passes') {
        if (this._isNotMinQuality(item)) {
          if (item.name != 'Sulfuras') {
            item.quality --;
          }
        }
      } else {
        if (this._isNotMaxQuality(item)) {
          item.quality ++;
          if (item.name == 'Backstage passes') {
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
      if (item.name != 'Sulfuras') {
        item.sellIn --;
      }
      if (item.sellIn < 0) {
        if (this._isBrie(item) == false) {
          if (item.name != 'Backstage passes') {
            if (this._isNotMinQuality(item)) {
              if (item.name != 'Sulfuras') {
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



  _isNotMaxQuality(item) {
    return item.quality < this.MAX_QUALITY
  }

  _isNotMinQuality(item) {
    return item.quality > this.MIN_QUALITY
  }

  _isBrie(item) {
    return item.name == "Brie"
  }
}



module.exports = {
  Shop
}
