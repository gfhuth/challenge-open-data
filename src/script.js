const DATASET_LINK = "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022)/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022).csv";

function getAndParseDataset() {
  
}


class Ingredient {
    constructor(_name, _ghg_kg, _gprot_kg, _gcarb_kg, _gfat_kg) {
      this.name = _name;
      this.ghg_kg = _ghg_kg;
      this.gprot_kg = _gprot_kg
      this.gcarb_kg = _gcarb_kg
      this.gfat_kg = _gfat_kg
    }
} 

class Recipe {
    constructor(name) {
        this.name = name;
        this.ingredients = [];
    }
} 