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
    constructor(name) {
        this.name = name;
        this.ingredients = new Map(Ingredient, int);
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
cassoulet.ingredients.set(ingredients["beans"], 400);
cassoulet.ingredients.set(ingredients["pork_loin"], 200);
cassoulet.ingredients.set(ingredients["pork_sausages"], 320);

/* Poulet basquaise */
const poulet_basquaise = new Recipe("poulet_basquaise");
poulet_basquaise.ingredients.set(ingredient["chicken_breast"], 1500);
poulet_basquaise.ingredients.set(ingredient["tomatoes"], 1000);
poulet_basquaise.ingredients.set(ingredient["peppers"], 700);
poulet_basquaise.ingredients.set(ingredient["onions"], 300);
poulet_basquaise.ingredients.set(ingredient["olive_oil"], 3);

/* Raclette */
const raclette = new Recipe("raclette");
raclette.ingredients.set(ingredient["potatoes"], 1000);
raclette.ingredients.set(ingredient["cheddar_cheese"], 800);
raclette.ingredients.set(ingredient["onions"], 50);

/* Quiche lorraine */
const quiche_lorraine = new Recipe("quiche_lorraine");
quiche_lorraine.ingredients.set(ingredient["quiche"], 700);

/* Gratin dauphinois */
const gratin_dauphinois = new Recipe("gratin_dauphinois");
gratin_dauphinois.ingredients.set(ingredient["potatoes"], 1500);
gratin_dauphinois.ingredients.set(ingredient["cow's_milk"], 900); //vérifier les noms des ingrédients !!!
gratin_dauphinois.ingredients.set(ingredient["butter"], 100);
gratin_dauphinois.ingredients.set(ingredient["sunflower_oil"], 200);

/* Boeuf bourguignon */
const boeuf_bourguignon = new Recipe("boeuf_bourguignon");
boeuf_bourguignon.ingredients.set(ingredient["beef_mince"], 600);
boeuf_bourguignon.ingredients.set(ingredient["butter"], 100);
boeuf_bourguignon.ingredients.set(ingredient["carrots"], 1500);
boeuf_bourguignon.ingredients.set(ingredient["onions"], 200);
boeuf_bourguignon.ingredients.set(ingredient["wine"], 2);

/* Choucroute */
const choucroute = new Recipe("choucroute");
choucroute.ingredients.set(ingredient["cabbage"], 2000);
choucroute.ingredients.set(ingredient["onions"], 100);
choucroute.ingredients.set(ingredient["pork_sausages"], 1000);
choucroute.ingredients.set(ingredient["pork_loin"], 1500);
choucroute.ingredients.set(ingredient["potatoes"], 3000);
choucroute.ingredients.set(ingredient["bacon"], 30);

/* Tarte tatin */
const tarte_tatin = new Recipe("tarte_tatin");
tarte_tatin.ingredients.set(ingredient["apple_pie"], 750);

/* Croissant */
const croissant = new Recipe("croissant");
croissant.ingredients.set(ingredient["croissant"], 60);

/* Pain au chocolat */
const pain_chocolat = new Recipe("pain_chocolat");
pain_chocolat.ingredients.set(ingredient["pain_au_chocolat"], 60);

/* Lasagnes bolognaise */
const lasagnes_bolognaise = new Recipe("lasagnes_bolognaise");
lasagnes_bolognaise.ingredients.set(ingredient["tomatoes"], 500);
lasagnes_bolognaise.ingredients.set(ingredient["beef_steak"], 250);
lasagnes_bolognaise.ingredients.set(ingredient["olive_oil"], 2);
lasagnes_bolognaise.ingredients.set(ingredient["lasagne_sheets"], 500);

/* Spaghetti carbonara */
const spaghetti_carbonara = new Recipe("spaghetti_carbonara");
spaghetti_carbonara.ingredients.set(ingredient["penne_pasta"], 200);
spaghetti_carbonara.ingredients.set(ingredient["eggs"], 20);
spaghetti_carbonara.ingredients.set(ingredient["bacon"], 160);
spaghetti_carbonara.ingredients.set(ingredient["parmesan_cheese"], 60);
spaghetti_carbonara.ingredients.set(ingredient["cow's_milk"], 50);
spaghetti_carbonara.ingredients.set(ingredient["sunflower_oil"], 100);

/* Risotto */
const risotto = new Recipe("risotto");
risotto.ingredients.set(ingredient["onions"], 50);
risotto.ingredients.set(ingredient["butter"], 20);
risotto.ingredients.set(ingredient["olive_oil"], 2);
risotto.ingredients.set(ingredient["mushrooms"], 250);
risotto.ingredients.set(ingredient["rice"], 200);
risotto.ingredients.set(ingredient["parmesan_cheese"], 50);

/* Saucisses au curry */
const saucisses_curry = new Recipe("saucisses_curry");
saucisses_curry.ingredients.set(ingredient["tomatoes"], 50);
saucisses_curry.ingredients.set(ingredient["pork_sausages"], 100);
saucisses_curry.ingredients.set(ingredient["olive_oil"], 2);
saucisses_curry.ingredients.set(ingredient["onions"], 100);

/* Hot dog */
const hot_dog = new Recipe("hot_dog");
hot_dog.ingredients.set(ingredient["bread"], 250);
hot_dog.ingredients.set(ingredient["pork_sausages"], 40);
hot_dog.ingredients.set(ingredient["tomato_ketchup"], 1);
hot_dog.ingredients.set(ingredient["onions"], 30);

/* Mac and cheese */
const mac_and_cheese = new Recipe("mac_and_cheese");
mac_and_cheese.ingredients.set(ingredient["macaroni_cheese"], 450);
mac_and_cheese.ingredients.set(ingredient["cow's milk"], 4);
mac_and_cheese.ingredients.set(ingredient["butter"], 20);