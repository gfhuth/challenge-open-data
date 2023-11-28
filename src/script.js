const DATASET_LINK = "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022)/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022).csv";


class Ingredient {
    constructor(_name, _ghg_kg, _gprot_kg, _gfat_kg, _gcarb_kg, _land_use_kg, _water_kg) {
      this.name = _name;
      this.ghg_kg = _ghg_kg;
      this.gprot_kg = _gprot_kg
      this.gfat_kg = _gfat_kg
      this.gcarb_kg = _gcarb_kg
      this.land_use_kg = _land_use_kg
      this.water_kg = _water_kg
    }

    get energyTotal_kg(){
        return  this.EnergyProt_kg + 
                this.EnergyFat_kg +
                this.EnergyCarb_kg
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

class Recipe {
    constructor(name) {
        this.name = name;
        this.ingredients = [];
    }
} 

async function parseCSV(){
    let data = await fetch(DATASET_LINK);
    data = await data.text();
    data = data.split('\n')
    data = data.filter(Boolean)
    data.shift()

    data = data.map(parse_rows2Ingredient);
    console.log(data)
    data = data.reduce(objList2oneObj, {});
    return data
}

function objList2oneObj(objetAccumulated, objetoCurrent){
    objetAccumulated[objetoCurrent.name] = objetoCurrent.values;

    return objetAccumulated;
}


function parse_rows2Ingredient(row){
        const values = row.split(',');
        const obj_name = values[0]
        const obj_ghg_kg = parseFloat(values[2])
        const obj_gprot_kg = obj_ghg_kg*100/values[4]
        const obj_gfat_kg = obj_ghg_kg*100/values[5]
        const obj_kcalcarb_kg = (obj_ghg_kg*1000/values[3]) - (obj_gprot_kg*4 + obj_gfat_kg*9)
        const obj_land_use_kg = parseFloat(values[6])
        const obj_water_kg = parseFloat(values[18])
        const obj = new Ingredient(
            obj_name,
            obj_ghg_kg,
            obj_gprot_kg,
            obj_gfat_kg,
            obj_kcalcarb_kg/4,
            obj_land_use_kg,
            obj_water_kg
        );
        return {"name": obj_name, "values": obj};
}

ingredients = parseCSV()
