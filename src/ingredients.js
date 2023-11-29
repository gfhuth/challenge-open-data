
export class Ingredient {
  static ingredients = {}

  constructor(_name, _display_name, _ghg_kg, _gprot_kg, _gfat_kg, _gcarb_kg, _land_use_kg, _water_kg) {
    this.name = _name;
    this.displayName = _display_name;
    this.ghg_kg = _ghg_kg;
    this.gprot_kg = _gprot_kg
    this.gfat_kg = _gfat_kg
    this.gcarb_kg = _gcarb_kg
    this.land_use_kg = _land_use_kg
    this.water_kg = _water_kg
  }
  get energyTotal_kg(){
      return  this.energyProt_kg + 
              this.energyFat_kg +
              this.energyCarb_kg
  }
  get energyProt_kg(){
      return this.gprot_kg*4
  }
  get energyFat_kg(){
      return this.gprot_kg*9
  }
  get energyCarb_kg(){
      return this.gcarb_kg*4
  }
} 