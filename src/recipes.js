import { Ingredient } from "./ingredients.js";

export class Recipe {
    static recipes = {}

  static fromObject(obj) {
    const r = new Recipe(obj.id, obj.name);
    Object.keys(obj.ingredients).forEach(key => {
      let value = obj.ingredients[key];
      r.ingredients[key] = value;
    })
    return r;
  }

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.ingredients = {};
    Recipe.recipes[id] = this;
  }

  getLipides() {
    const qte_lipides = 0;
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      const ing = Ingredient.ingredients[key];
      qte_lipides += ing.gfat_kg*(value/1000);
    })
    return qte_lipides;
  }

  getGlucides() {
    qte_glucides = 0;
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      qte_glucides += key.gcarb_kg*(value/1000);
    })
    return qte_glucides;
  }

  getProteines() {
    qte_proteines = 0;
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      qte_proteines += key.gprot_kg*(value/1000);
    })
    return qte_proteines;
  }

  getPoidsTotal() {
    poids = 0;
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      poids += value;
    })
    return poids;
  }

  getApportCalorique() {
    const dico = {};
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      const ing = Ingredient.ingredients[key];
      console.log(Ingredient.ingredients)
      dico[ing.name] = ing.energyTotal_kg * (value/1000);
    })
    return dico;
  }

  getEmissionGES() {
    const dico = {};
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      const ing = Ingredient.ingredients[key];
      dico[ing.name] = ing.ghg_kg * (value/1000);
    })
    return dico;
  }

  getLandUse() {
    const dico = {};
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      const ing = Ingredient.ingredients[key];
      dico[ing.name] = ing.land_use_kg * (value/1000);
    })
    return dico;
  }

  getWaterUse() {
    const dico = {};
    Object.keys(this.ingredients).forEach(key => {
      let value = this.ingredients[key];
      const ing = Ingredient.ingredients[key];
      dico[ing.name] = ing.water_kg * (value/1000);
    })
    return dico;
  }

  getObjectBarChart(type1, type2){
    const obj = {
      Plate : this.name
    }
    switch(type1){
      case 'cal':
        obj.type1 = this.getApportCalorique();
        break;
      case 'ges':
        obj.type1 = this.getEmissionGES();
        break;
      case 'land':
        obj.type1 = this.getLandUse();
        break;
      case 'water':
        obj.type1 = this.getWaterUse();
        break;
      default:
        console.log("oupsi y a un souci dans le type1")
        break;
    }
    switch(type2){
      case 'cal':
        obj.type2 = this.getApportCalorique();
        break;
      case 'ges':
        obj.type2 = this.getEmissionGES();
        break;
      case 'land':
        obj.type2 = this.getLandUse();
        break;
      case 'water':
        obj.type2 = this.getWaterUse();
        break;
      default:
        console.log("oupsi y a un souci dans le type2")
        break;
    }
    return obj
    
  }
}

export function createRecipes() {
    /*======================== Définition des recettes ========================*/
    const ingredients = Ingredient.ingredients;

  /* Cassoulet */
  const cassoulet = new Recipe("cassoulet", "Cassoulet");
  cassoulet.ingredients["beans"] = 100;
  cassoulet.ingredients["pork_loin"] = 50;
  cassoulet.ingredients["pork_sausages"] = 80;
  
  /* Poulet basquaise */
  const poulet_basquaise = new Recipe("poulet_basquaise", "Poulet basquaise");
  poulet_basquaise.ingredients["chicken_breast"] = 250;
  poulet_basquaise.ingredients["tomatoes"] = 167;
  poulet_basquaise.ingredients["peppers"] = 117;
  poulet_basquaise.ingredients["onions"] = 50;
  poulet_basquaise.ingredients["olive_oil"] = 1;
  
  /* Raclette */
  const raclette = new Recipe("raclette", "Raclette");
  raclette.ingredients["potatoes"] = 250;
  raclette.ingredients["cheddar_cheese"] = 200;
  raclette.ingredients["onions"] = 12;
  
  /* Quiche lorraine */
  const quiche_lorraine = new Recipe("quiche_lorraine", "Quiche lorraine");
  quiche_lorraine.ingredients["quiche"] = 350;
  
  /* Gratin dauphinois */
  const gratin_dauphinois = new Recipe("gratin_dauphinois", "Gratin dauphinois");
  gratin_dauphinois.ingredients["potatoes"] = 250;
  gratin_dauphinois.ingredients["cow_s_milk"] = 183;
  gratin_dauphinois.ingredients["butter"] = 17;
  gratin_dauphinois.ingredients["sunflower_oil"] = 100;
  
  /* Boeuf bourguignon */
  const boeuf_bourguignon = new Recipe("boeuf_bourguignon", "Boeuf bourguignon");
  boeuf_bourguignon.ingredients["beef_mince"] = 150;
  boeuf_bourguignon.ingredients["butter"] = 25;
  boeuf_bourguignon.ingredients["carrots"] = 375;
  boeuf_bourguignon.ingredients["onions"] = 50;
  boeuf_bourguignon.ingredients["wine"] = 1;
  
  /* Choucroute */
  const choucroute = new Recipe("choucroute", "Choucroute");
  choucroute.ingredients["cabbage"] = 250;
  choucroute.ingredients["onions"] = 12;
  choucroute.ingredients["pork_sausages"] = 100;
  choucroute.ingredients["pork_loin"] = 87;
  choucroute.ingredients["potatoes"] = 87;
  choucroute.ingredients["bacon"] = 87;
  
  /* Tarte tatin */
  const tarte_tatin = new Recipe("tarte_tatin", "Tarte tatin");
  tarte_tatin.ingredients["apple_pie"] = 188;
  
  /* Croissant */
  const croissant = new Recipe("croissant", "Croissant");
  croissant.ingredients["croissant"] = 60;
  
  /* Pain au chocolat */
  const pain_chocolat = new Recipe("pain_au_chocolat", "Pain au chocolat");
  pain_chocolat.ingredients["pain_au_chocolat"] = 60;
  
  /* Lasagnes bolognaise */
  const lasagnes_bolognaise = new Recipe("lasagnes_bolognaise", "Lasagne à la bolognaise");
  lasagnes_bolognaise.ingredients["tomatoes"] = 212;
  lasagnes_bolognaise.ingredients["beef_steak"] = 125;
  lasagnes_bolognaise.ingredients["olive_oil"] = 1;
  lasagnes_bolognaise.ingredients["lasagne_sheets"] = 125;
  lasagnes_bolognaise.ingredients["onions"] = 12;
  lasagnes_bolognaise.ingredients["carrots"] = 25;
  lasagnes_bolognaise.ingredients["wine"] = 1;
  
  /* Spaghetti carbonara */
  const spaghetti_carbonara = new Recipe("spaghetti_carbonara", "Spaghetti à la carbonara");
  spaghetti_carbonara.ingredients["penne_pasta"] = 50;
  spaghetti_carbonara.ingredients["eggs"] = 5;
  spaghetti_carbonara.ingredients["bacon"] = 40;
  spaghetti_carbonara.ingredients["parmesan_cheese"] = 15;
  spaghetti_carbonara.ingredients["cow_s_milk"] = 12;
  spaghetti_carbonara.ingredients["sunflower_oil"] = 25;
  
  /* Risotto */
  const risotto = new Recipe("risotto", "Risotto");
  risotto.ingredients["onions"] = 25;
  risotto.ingredients["butter"] = 10;
  risotto.ingredients["olive_oil"] = 1;
  risotto.ingredients["mushrooms"] = 125;
  risotto.ingredients["rice"] = 100;
  risotto.ingredients["parmesan_cheese"] = 25;
  
  /* Saucisses au curry */
  const saucisses_curry = new Recipe("saucisses_curry", "Saucisses curry");
  saucisses_curry.ingredients["tomatoes"] = 25;
  saucisses_curry.ingredients["pork_sausages"] = 25;
  saucisses_curry.ingredients["olive_oil"] = 1;
  saucisses_curry.ingredients["onions"] = 25;
  
  /* Hot dog */
  const hot_dog = new Recipe("hot_dog", "Hot dog");
  hot_dog.ingredients["bread"] = 142;
  hot_dog.ingredients["pork_sausages"] = 50;
  hot_dog.ingredients["tomato_ketchup"] = 1;
  hot_dog.ingredients["onions"] = 25;
  
  /* Mac and cheese */
  const mac_and_cheese = new Recipe("mac_and_cheese", "Mac and cheese");
  mac_and_cheese.ingredients["macaroni_cheese"] = 112;
  mac_and_cheese.ingredients["cow_s_milk"] = 1;
  mac_and_cheese.ingredients["butter"] = 5;
}
