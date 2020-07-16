class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(function(item) {
      if (item.name != 'Brie' && item.name != 'Backstage passes') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras') {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == 'Backstage passes') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras') {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != 'Brie') {
          if (item.name != 'Backstage passes') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras') {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
  });
    return this.items;
  }
}

module.exports = {
  Shop
}
