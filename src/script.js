const DATASET_LINK = "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022)/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022).csv";

function getAndParseDataset() {
  
}


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
} 

class Recipe {
    static recipes = {}

    constructor(name) {
        this.name = name;
        this.ingredients = new Map(Ingredient, int);
        Recipe.recipes[name] = this;
    }

    getLipides() {
        qte_lipides = 0;
        for (const [key, value] of this.ingredients) {
            qte_lipides += key._gfat_kg*(value/1000);
        }
        return qte_lipides;
    }

    getGlucides() {
        qte_glucides = 0;
        for (const [key, value] of this.ingredients) {
            qte_glucides += key._gcarb_kg*(value/1000);
        }
        return qte_glucides;
    }

    getProteines() {
        qte_proteines = 0;
        for (const [key, value] of this.ingredients) {
            qte_proteines += key._gprot_kg*(value/1000);
        }
        return qte_proteines;
    }
} 

async function parseCSV(){
    let data = await fetch(DATASET_LINK);
    data = await data.text();
    data = await data.split('\n')
    data.shift()

    dico = {}
    data.forEach(line =>
        ingredient = parse_rows2Ingredient(line),
        dico[ingredient.name] = ingredient)
    return dico;
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
        return obj;
}

ingredients = parseCSV()


/*======================== Définition des recettes ========================*/

/* Cassoulet */
const cassoulet = new Recipe("cassoulet");
cassoulet.ingredients.set(ingredients["beans"], 100);
cassoulet.ingredients.set(ingredients["pork_loin"], 50);
cassoulet.ingredients.set(ingredients["pork_sausages"], 80);

/* Poulet basquaise */
const poulet_basquaise = new Recipe("poulet_basquaise");
poulet_basquaise.ingredients.set(ingredient["chicken_breast"], 250);
poulet_basquaise.ingredients.set(ingredient["tomatoes"], 167);
poulet_basquaise.ingredients.set(ingredient["peppers"], 117);
poulet_basquaise.ingredients.set(ingredient["onions"], 50);
poulet_basquaise.ingredients.set(ingredient["olive_oil"], 1);

/* Raclette */
const raclette = new Recipe("raclette");
raclette.ingredients.set(ingredient["potatoes"], 250);
raclette.ingredients.set(ingredient["cheddar_cheese"], 200);
raclette.ingredients.set(ingredient["onions"], 12);

/* Quiche lorraine */
const quiche_lorraine = new Recipe("quiche_lorraine");
quiche_lorraine.ingredients.set(ingredient["quiche"], 350);

/* Gratin dauphinois */
const gratin_dauphinois = new Recipe("gratin_dauphinois");
gratin_dauphinois.ingredients.set(ingredient["potatoes"], 250);
gratin_dauphinois.ingredients.set(ingredient["cow's_milk"], 183); //vérifier les noms des ingrédients !!!
gratin_dauphinois.ingredients.set(ingredient["butter"], 17);
gratin_dauphinois.ingredients.set(ingredient["sunflower_oil"], 100);

/* Boeuf bourguignon */
const boeuf_bourguignon = new Recipe("boeuf_bourguignon");
boeuf_bourguignon.ingredients.set(ingredient["beef_mince"], 150);
boeuf_bourguignon.ingredients.set(ingredient["butter"], 25);
boeuf_bourguignon.ingredients.set(ingredient["carrots"], 375);
boeuf_bourguignon.ingredients.set(ingredient["onions"], 50);
boeuf_bourguignon.ingredients.set(ingredient["wine"], 1);

/* Choucroute */
const choucroute = new Recipe("choucroute");
choucroute.ingredients.set(ingredient["cabbage"], 250);
choucroute.ingredients.set(ingredient["onions"], 12);
choucroute.ingredients.set(ingredient["pork_sausages"], 100);
choucroute.ingredients.set(ingredient["pork_loin"], 87);
choucroute.ingredients.set(ingredient["potatoes"], 87);
choucroute.ingredients.set(ingredient["bacon"], 87);

/* Tarte tatin */
const tarte_tatin = new Recipe("tarte_tatin");
tarte_tatin.ingredients.set(ingredient["apple_pie"], 188);

/* Croissant */
const croissant = new Recipe("croissant");
croissant.ingredients.set(ingredient["croissant"], 60);

/* Pain au chocolat */
const pain_chocolat = new Recipe("pain_chocolat");
pain_chocolat.ingredients.set(ingredient["pain_au_chocolat"], 60);

/* Lasagnes bolognaise */
const lasagnes_bolognaise = new Recipe("lasagnes_bolognaise");
lasagnes_bolognaise.ingredients.set(ingredient["tomatoes"], 212);
lasagnes_bolognaise.ingredients.set(ingredient["beef_steak"], 125);
lasagnes_bolognaise.ingredients.set(ingredient["olive_oil"], 1);
lasagnes_bolognaise.ingredients.set(ingredient["lasagne_sheets"], 125);
lasagnes_bolognaise.ingredients.set(ingredient["onions"], 12);
lasagnes_bolognaise.ingredients.set(ingredient["carrots"], 25);
lasagnes_bolognaise.ingredients.set(ingredient["wine"], 1);

/* Spaghetti carbonara */
const spaghetti_carbonara = new Recipe("spaghetti_carbonara");
spaghetti_carbonara.ingredients.set(ingredient["penne_pasta"], 50);
spaghetti_carbonara.ingredients.set(ingredient["eggs"], 5);
spaghetti_carbonara.ingredients.set(ingredient["bacon"], 40);
spaghetti_carbonara.ingredients.set(ingredient["parmesan_cheese"], 15);
spaghetti_carbonara.ingredients.set(ingredient["cow's_milk"], 12);
spaghetti_carbonara.ingredients.set(ingredient["sunflower_oil"], 25);

/* Risotto */
const risotto = new Recipe("risotto");
risotto.ingredients.set(ingredient["onions"], 25);
risotto.ingredients.set(ingredient["butter"], 10);
risotto.ingredients.set(ingredient["olive_oil"], 1);
risotto.ingredients.set(ingredient["mushrooms"], 125);
risotto.ingredients.set(ingredient["rice"], 100);
risotto.ingredients.set(ingredient["parmesan_cheese"], 25);

/* Saucisses au curry */
const saucisses_curry = new Recipe("saucisses_curry");
saucisses_curry.ingredients.set(ingredient["tomatoes"], 25);
saucisses_curry.ingredients.set(ingredient["pork_sausages"], 25);
saucisses_curry.ingredients.set(ingredient["olive_oil"], 1);
saucisses_curry.ingredients.set(ingredient["onions"], 25);

/* Hot dog */
const hot_dog = new Recipe("hot_dog");
hot_dog.ingredients.set(ingredient["bread"], 142);
hot_dog.ingredients.set(ingredient["pork_sausages"], 50);
hot_dog.ingredients.set(ingredient["tomato_ketchup"], 1);
hot_dog.ingredients.set(ingredient["onions"], 25);

/* Mac and cheese */
const mac_and_cheese = new Recipe("mac_and_cheese");
mac_and_cheese.ingredients.set(ingredient["macaroni_cheese"], 112);
mac_and_cheese.ingredients.set(ingredient["cow's milk"], 1);
mac_and_cheese.ingredients.set(ingredient["butter"], 5);