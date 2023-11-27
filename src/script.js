const DATASET_LINK =
    "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022)/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022).csv";

function getAndParseDataset() {}

class Ingredient {
    constructor(_name, _ghg_kg, _gprot_kg, _gfat_kg, _gcarb_kg) {
        this.name = _name;
        this.ghg_kg = _ghg_kg;
        this.gprot_kg = _gprot_kg;
        this.gfat_kg = _gfat_kg;
        this.gcarb_kg = _gcarb_kg;
    }
}

class Recipe {
    constructor(name) {
        this.name = name;
        this.ingredients = [];
    }
}

async function parseCSV() {
    let data = await fetch(DATASET_LINK);
    data = await data.text();
    data = await data.split("\n");
    data.shift();

    const objects = data.map(parse_rows2Ingredient);
    return objects;
}

function parse_rows2Ingredient(row) {
    const values = row.split(",");
    const obj_name = values[0];
    const obj_ghg_kg = values[2];
    const obj_gprot_kg = (obj_ghg_kg * 100) / values[4];
    const obj_gfat_kg = (obj_ghg_kg * 100) / values[5];
    const obj_kcalcarb_kg =
        (obj_ghg_kg * 1000) / values[3] - (obj_gprot_kg * 4 + obj_gfat_kg * 9);
    const obj = new Ingredient(
        obj_name,
        obj_ghg_kg,
        obj_gprot_kg,
        obj_gfat_kg,
        obj_kcalcarb_kg / 4
    );
    return obj;
}

ingredients = parseCSV();

function onMealsChanged(event) {
    console.log("meals changed", event.data);
}
