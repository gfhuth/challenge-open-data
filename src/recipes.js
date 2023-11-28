import { Ingredient } from "./ingredients.js";

export class Recipe {
  static recipes = {}

  constructor(name) {
      this.name = name;
      this.ingredients = {};
      Recipe.recipes[name] = this;
  }

  getLipides() {
      qte_lipides = 0;
      Object.keys(this.ingredients).forEach(key => {
        let value = this.ingredients[key];
        qte_lipides += key._gfat_kg*(value/1000);
      })
      return qte_lipides;
  }

  getGlucides() {
      qte_glucides = 0;
      Object.keys(this.ingredients).forEach(key => {
        let value = this.ingredients[key];
          qte_glucides += key._gcarb_kg*(value/1000);
      })
      return qte_glucides;
  }

  getProteines() {
      qte_proteines = 0;
      Object.keys(this.ingredients).forEach(key => {
        let value = this.ingredients[key];
          qte_proteines += key._gprot_kg*(value/1000);
      })
      return qte_proteines;
  }
}

export function createRecipes() {
  /*======================== Définition des recettes ========================*/
  const ingredients = Ingredient.ingredients;

  /* Cassoulet */
  const cassoulet = new Recipe("cassoulet");
  cassoulet.ingredients["beans"] = 100;
  cassoulet.ingredients["pork_loin"] = 50;
  cassoulet.ingredients["pork_sausages"] = 80;
  
  /* Poulet basquaise */
  const poulet_basquaise = new Recipe("poulet_basquaise");
  poulet_basquaise.ingredients["chicken_breast"] = 250;
  poulet_basquaise.ingredients["tomatoes"] = 167;
  poulet_basquaise.ingredients["peppers"] = 117;
  poulet_basquaise.ingredients["onions"] = 50;
  poulet_basquaise.ingredients["olive_oil"] = 1;
  
  /* Raclette */
  const raclette = new Recipe("raclette");
  raclette.ingredients["potatoes"] = 250;
  raclette.ingredients["cheddar_cheese"] = 200;
  raclette.ingredients["onions"] = 12;
  
  /* Quiche lorraine */
  const quiche_lorraine = new Recipe("quiche_lorraine");
  quiche_lorraine.ingredients["quiche"] = 350;
  
  /* Gratin dauphinois */
  const gratin_dauphinois = new Recipe("gratin_dauphinois");
  gratin_dauphinois.ingredients["potatoes"] = 250;
  gratin_dauphinois.ingredients["cow_s_milk"] = 183;
  gratin_dauphinois.ingredients["butter"] = 17;
  gratin_dauphinois.ingredients["sunflower_oil"] = 100;
  
  /* Boeuf bourguignon */
  const boeuf_bourguignon = new Recipe("boeuf_bourguignon");
  boeuf_bourguignon.ingredients["beef_mince"] = 150;
  boeuf_bourguignon.ingredients["butter"] = 25;
  boeuf_bourguignon.ingredients["carrots"] = 375;
  boeuf_bourguignon.ingredients["onions"] = 50;
  boeuf_bourguignon.ingredients["wine"] = 1;
  
  /* Choucroute */
  const choucroute = new Recipe("choucroute");
  choucroute.ingredients["cabbage"] = 250;
  choucroute.ingredients["onions"] = 12;
  choucroute.ingredients["pork_sausages"] = 100;
  choucroute.ingredients["pork_loin"] = 87;
  choucroute.ingredients["potatoes"] = 87;
  choucroute.ingredients["bacon"] = 87;
  
  /* Tarte tatin */
  const tarte_tatin = new Recipe("tarte_tatin");
  tarte_tatin.ingredients["apple_pie"] = 188;
  
  /* Croissant */
  const croissant = new Recipe("croissant");
  croissant.ingredients["croissant"] = 60;
  
  /* Pain au chocolat */
  const pain_chocolat = new Recipe("pain_chocolat");
  pain_chocolat.ingredients["pain_au_chocolat"] = 60;
  
  /* Lasagnes bolognaise */
  const lasagnes_bolognaise = new Recipe("lasagnes_bolognaise");
  lasagnes_bolognaise.ingredients["tomatoes"] = 212;
  lasagnes_bolognaise.ingredients["beef_steak"] = 125;
  lasagnes_bolognaise.ingredients["olive_oil"] = 1;
  lasagnes_bolognaise.ingredients["lasagne_sheets"] = 125;
  lasagnes_bolognaise.ingredients["onions"] = 12;
  lasagnes_bolognaise.ingredients["carrots"] = 25;
  lasagnes_bolognaise.ingredients["wine"] = 1;
  
  /* Spaghetti carbonara */
  const spaghetti_carbonara = new Recipe("spaghetti_carbonara");
  spaghetti_carbonara.ingredients["penne_pasta"] = 50;
  spaghetti_carbonara.ingredients["eggs"] = 5;
  spaghetti_carbonara.ingredients["bacon"] = 40;
  spaghetti_carbonara.ingredients["parmesan_cheese"] = 15;
  spaghetti_carbonara.ingredients["cow_s_milk"] = 12;
  spaghetti_carbonara.ingredients["sunflower_oil"] = 25;
  
  /* Risotto */
  const risotto = new Recipe("risotto");
  risotto.ingredients["onions"] = 25;
  risotto.ingredients["butter"] = 10;
  risotto.ingredients["olive_oil"] = 1;
  risotto.ingredients["mushrooms"] = 125;
  risotto.ingredients["rice"] = 100;
  risotto.ingredients["parmesan_cheese"] = 25;
  
  /* Saucisses au curry */
  const saucisses_curry = new Recipe("saucisses_curry");
  saucisses_curry.ingredients["tomatoes"] = 25;
  saucisses_curry.ingredients["pork_sausages"] = 25;
  saucisses_curry.ingredients["olive_oil"] = 1;
  saucisses_curry.ingredients["onions"] = 25;
  
  /* Hot dog */
  const hot_dog = new Recipe("hot_dog");
  hot_dog.ingredients["bread"] = 142;
  hot_dog.ingredients["pork_sausages"] = 50;
  hot_dog.ingredients["tomato_ketchup"] = 1;
  hot_dog.ingredients["onions"] = 25;
  
  /* Mac and cheese */
  const mac_and_cheese = new Recipe("mac_and_cheese");
  mac_and_cheese.ingredients["macaroni_cheese"] = 112;
  mac_and_cheese.ingredients["cow_s_milk"] = 1;
  mac_and_cheese.ingredients["butter"] = 5;
}
  