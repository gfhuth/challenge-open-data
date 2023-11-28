const template = document.createElement("template");
template.innerHTML = /*html*/ `
<div id="container">
  <div id="selected-meals">
    <!-- Liste des plats sélectionnés -->
    <div id="select-meal">
      <!-- Sélection d'un nouveau plat  -->
      <div id="select-meal-list" style="display:none;"></div>
    </div>
  </div>
</div>
<style>
  #container {
    padding: 2rem;
  }

  #container,
  #selected-meals {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
  }

  #select-meal {
    width: 32px;
    height: 32px;
    display: block;
    background-color: #fff;
    border-radius: 16px;
    position: relative;
    cursor: pointer;
  }

  #select-meal::after,
  #select-meal::before {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    content: '';
    display: block;
    background-color: black;
  }

  #select-meal::before {
    height: 60%;
    width: 2px;
  }

  #select-meal::after {
    height: 2px;
    width: 60%;
  }

  #select-meal-list {
    bottom: 0;
    left: 0;
    transform: translate(0, 100%);
    width: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    z-index: 1000;
  }

  .elem-meal {
    padding: 0.2rem 0.3rem;
    background-color: white;
    white-space: nowrap;
  }

  .meal {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #fff;
    position: relative;
    padding: 0 calc(8px + 20px + 8px) 0 8px;
    height: 32px;
    border-radius: 16px;
  }

  .delete-meal {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translate(0%, -50%) rotate(45deg);
    background-color: #222;
    border-radius: 1000px;
    cursor: pointer;
  }

  .delete-meal::before {
    height: 70%;
    width: 2px;
  }

  .delete-meal::after {
    height: 2px;
    width: 70%;
  }

  .delete-meal::before,
  .delete-meal::after {
    transform-origin: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    content: '';
    display: block;
    background-color: #fff;
  }
</style>
`;

class MealsChangedEvent extends Event {
  constructor(data) {
    super("mealschanged", {
      detail: {
        message: "Meals changed",
      },
    });
    this.data = data;
  }
}

class Meal extends HTMLElement {
  static observedAttributes = ["meals", "onmealschanged"];

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.meals = [];
    this.selectedMeals = [];
    this.selectionInProgress = false;
    this.shadowRoot.getElementById("select-meal").onclick =
      this.selectMeal.bind(this);
    document.addEventListener("click", () => {
      this.selectionInProgress = false;
      this.showOrHide();
    });
  }

  showOrHide() {
    if (!this.selectionInProgress) {
      this.shadowRoot.getElementById("select-meal-list").style.display =
        "none";
    } else {
      this.shadowRoot.getElementById("select-meal-list").style.display =
        "";
    }
    return this.selectionInProgress;
  }

  selectMeal(event) {
    event.stopPropagation();
    this.selectionInProgress = !this.selectionInProgress;
    if (!this.showOrHide()) return;

    const meals = this.meals;
    const list = this.shadowRoot.getElementById("select-meal-list");
    list.innerHTML = "";
    meals
      .filter((meal) => this.selectedMeals.indexOf(meal) < 0).forEach((meal) => {
        const elem = document.createElement("span");
        elem.classList.add("elem-meal");
        elem.innerHTML = meal;
        elem.onclick = () => this.addMeal(meal);
        list.appendChild(elem);
      });

    const createMeal = document.createElement("span");
    createMeal.classList.add("elem-meal");
    createMeal.innerHTML = "Créer un plat";
    createMeal.onclick = this.createMeal.bind(this);
    list.appendChild(createMeal);
  }

  createMeal() {}

  notify() {
    this.dispatchEvent(new MealsChangedEvent(this.selectedMeals));
  }

  addMeal(meal) {
    if (this.selectedMeals.indexOf(meal) >= 0) return;
    this.selectedMeals.push(meal);
    this.updateMeals();
    this.notify();
  }

  removeMeal(meal) {
    if (this.selectedMeals.indexOf(meal) < 0) return;
    this.selectedMeals.splice(this.selectedMeals.indexOf(meal), 1);
    this.updateMeals();
    this.notify();
  }
  updateMeals() {
    const meals = this.selectedMeals;
    const list = this.shadowRoot.getElementById("selected-meals");
    const children = list.querySelectorAll('.meal');
    children.forEach(child => list.removeChild(child))
    const lastChild = list.querySelector("#select-meal")

    meals.forEach((meal) => {
      const elem = document.createElement("span");
      elem.classList.add("meal");
      const cross = document.createElement("span");
      cross.classList.add("delete-meal");
      cross.onclick = () => this.removeMeal(meal);
      elem.innerText = meal;
      elem.appendChild(cross);
      list.insertBefore(elem, lastChild);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "meals") newValue = JSON.parse(newValue);
    this[name] = newValue;
    if (name === "onmealschanged") {
      if (window[newValue] && typeof window[newValue] === 'function') {
        this.addEventListener("mealschanged", window[newValue]);
      }
    }
  }
}

customElements.define("x-meals", Meal);