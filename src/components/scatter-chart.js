import { scatter_plot } from "../charts/scatter-chart.js"
import { Ingredient } from "../ingredients.js"

const templateScatterChart = document.createElement("template");
templateScatterChart.innerHTML = /*html*/ `
<div id="container">
  <div id="scatter-chart"></div>
  <div id="select-container">
    <select id="feature-1"></select>
    <select id="feature-2"></select>
  </div>
</div>
<style>
#select-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

select {
  background-color: #ffffff;
}
</style>
`;

class ScatterChart extends HTMLElement {
  static observedAttributes = ["data"];
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.append(templateScatterChart.content.cloneNode(true));

    this.allFeatures = [
      {
        id: "ghg_kg",
        name: "Emission de GES",
      },
      {
        id: "gprot_kg",
        name: "Quantité de protéines",
      },
      {
        id: "gfat_kg",
        name: "Quantité de lipides",
      },
      {
        id: "gcarb_kg",
        name: "Quantité de glucides",
      },
      {
        id: "land_use_kg",
        name: "Utilisation du sol",
      },
      {
        id: "water_kg",
        name: "Utilisation de l'eau",
      },
    ];
    this.features = ["gprot_kg", "ghg_kg"];

    const select_1 = this.shadowRoot.getElementById("feature-1");
    const select_2 = this.shadowRoot.getElementById("feature-2");

    select_1.addEventListener("change", () => {
      this.features = [select_1.value, select_2.value];
      this.render();
    });
    select_2.addEventListener("change", () => {
      this.features = [select_1.value, select_2.value];
      this.render();
    });

    this.render();
  }

  render() {
    const targetElement = this.shadowRoot.getElementById("scatter-chart");
    targetElement.innerHTML = "";

    const select_1 = this.shadowRoot.getElementById("feature-1");
    select_1.innerHTML = "";
    const select_2 = this.shadowRoot.getElementById("feature-2");
    select_2.innerHTML = "";

    this.allFeatures
      .filter((feature) => feature.id != this.features[1])
      .forEach((feature) => {
        const option = document.createElement("option");
        option.setAttribute("value", feature.id);
        option.appendChild(document.createTextNode(feature.name));
        select_1.appendChild(option);
      });

    this.allFeatures
      .filter((feature) => feature.id != this.features[0])
      .forEach((feature) => {
        const option = document.createElement("option");
        option.setAttribute("value", feature.id);
        option.appendChild(document.createTextNode(feature.name));
        select_2.appendChild(option);
      });

    const selectedItem_1 = select_1.querySelector(
      `option[value="${this.features[0]}"]`
    );
    selectedItem_1.setAttribute("selected", true);
    const selectedItem_2 = select_2.querySelector(
      `option[value="${this.features[1]}"]`
    );
    selectedItem_2.setAttribute("selected", true);

    this.shadowRoot.getElementById('scatter-chart').appendChild(scatter_plot(this.data || [], this.features[0], this.features[1]));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") newValue = JSON.parse(newValue);
    this[name] = newValue;
    this.render();
  }
}

customElements.define("x-scatter-chart", ScatterChart);
