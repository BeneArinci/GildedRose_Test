## MY GILDED ROSE

I worked on this kata as a tech assignment given to me by Makers during the course's 10th week.
The way I personally followed to solve this kata is the following:
* writing comprehensive feature tests(edge cases covered). Since the current program was working, I needed to write tests so that, when refactoring, I could be confident I was not breaking any main functionality.
* creating multiple private functions that, slowly but surely, were taking away responsibilities to the main updateQuality() function
* building the last private methods, each of them with a specific responsibility: update quality of a single type of product
* integrating all the functions and reaching a good level of functions' single responsibility
* TDDing for Conjured items. Having divided responsibilities between functions, this has been quite simple. It was enough to add a new function for updating their specific value and integrating this new function with the main one (updateQuality)

**Future imrovements** 
I followed the SRP within the Shop class. I was not completely comfortable in creating item-related functions inside that class because I do believe they do not belong there. At the same time, the Item class was not editable and specifications like max value, min value etc could be also specific to the shop.
In any case, my shop class is doing too much. It is still too long. My next refactoring will be about splitting responsibilities between more classes.


### SETUP
I used Javascript and Jest as a testing framework.

After you clone this repo, please *Install dependencies

```sh
npm install
```

Command to *run all tests

```sh
npm test
```

Command to *generate test coverage report

```sh
npm run test:coverage
```

