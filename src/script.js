import { Ingredient } from "./ingredients.js"
import { Recipe, createRecipes } from "./recipes.js";
import { camebert_chart } from "./diagrams/camembert-chart.js";
const DATASET_LINK = "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022)/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022).csv";

async function getAndParseDataset(){
    let data = await fetch(DATASET_LINK);
    data = await data.text();
    data = data.split('\n')
    data = data.filter(Boolean)
    data.shift()

    data = data.map(getIngredientFromDatasetRow);
    data = data.reduce(objList2oneObj, {});
    Ingredient.ingredients = data
    return data
}

function objList2oneObj(objetAccumulated, objetoCurrent){
    objetAccumulated[objetoCurrent.name] = objetoCurrent.values;

    return objetAccumulated;
}
function getIngredientFromDatasetRow(row){
        const values = row.split(',');
        const obj_name = values[0].replace(/\s+/g, '_').
                    toLowerCase().
                    replace(/'/g, '_');
        const obj_displayName = values[0]
        const obj_ghg_kg = parseFloat(values[2])
        const obj_gprot_kg = obj_ghg_kg*100/values[4] // TODO: inf-> 0
        const obj_gfat_kg = obj_ghg_kg*100/values[5]
        const obj_kcalcarb_kg = (obj_ghg_kg*1000/values[3]) - (obj_gprot_kg*4 + obj_gfat_kg*9)
        const obj_land_use_kg = parseFloat(values[6])
        const obj_water_kg = parseFloat(values[18])
        const obj = new Ingredient(
            obj_name,
            obj_displayName,
            obj_ghg_kg,
            isFinite(obj_gprot_kg) ? obj_gprot_kg : 0.0,
            isFinite(obj_gfat_kg) ? obj_gfat_kg : 0.0,
            isFinite(obj_kcalcarb_kg/4) ? obj_kcalcarb_kg/4 : 0.0,
            obj_land_use_kg,
            obj_water_kg
        );
        return {"name": obj_name, "values": obj};
}

window.onload = async () => {
    await getAndParseDataset();
    createRecipes();
    
    const mealsList = document.getElementById('meals-list')
    mealsList.addEventListener('listitemschanged', onSelectedMealsChanged)
    mealsList.setAttribute('items', JSON.stringify(Object.values(Recipe.recipes)))
    onSelectedMealsChanged({ data: mealsList.selectedItems });
    // console.log(Recipe.recipes["risotto"].getNutritionHierarchy())
    // document.getElementById('camembert_chart')
    //     .appendChild(
    //         camebert_chart(
    //             Recipe.recipes["risotto"].getNutritionHierarchy()
    //         )
    //     )
    //     console.log(JSON.stringify(Recipe.recipes["risotto"].getNutritionHierarchy()));

}

function onSelectedMealsChanged(event) {
    const meals = event.data;
    const recipes = meals.map(meal => Recipe.recipes[meal])
    const pieCharts = document.getElementById('pie-charts');
    const barChart = document.getElementById('bar-chart');

    pieCharts.setAttribute('data', JSON.stringify(recipes.map(r => r.getNutritionHierarchy())));
    barChart.setAttribute('data', JSON.stringify(recipes.map(r => r.formatForBarChart())))
}