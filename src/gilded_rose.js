const item = require("./item");

class Shop {
  constructor(items=[]){
    this.items = items;
    this.MAX_QUALITY = 50
  }

  updateQuality() {
    this.items.forEach(function(item) {
      if (item.name != 'Brie' && item.name != 'Backstage passes') {
        if (item.quality > 0) {
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
        if (item.name != 'Brie') {
          if (item.name != 'Backstage passes') {
            if (item.quality > 0) {
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

}



module.exports = {
  Shop
}
