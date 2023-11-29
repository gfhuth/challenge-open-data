import { createBarChart } from "../charts/bar-chart.js";

const templateBarChart = document.createElement("template");
templateBarChart.innerHTML = /*html*/ `
<div id="container">
  <div id="bar-chart"></div>
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

class BarChart extends HTMLElement {
  static observedAttributes = ["data"];
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });
    this.data = [];
    this.shadowRoot.append(templateBarChart.content.cloneNode(true));

    this.allFeatures = [
      {
        id: "apportCalorique",
        name: "Apport calorique",
      },
      {
        id: "emissionGES",
        name: "Emissions de GES",
      },
      {
        id: "landUse",
        name: "Utilisation du sol",
      },
      {
        id: "waterUse",
        name: "Utilisation de l'eau",
      },
    ];
    this.features = ["apportCalorique", "emissionGES"];

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
    const targetElement = this.shadowRoot.getElementById("bar-chart");
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

    createBarChart(
      this.data,
      this.features.map(feature => this.allFeatures.find(f => f.id === feature)),
      targetElement
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      newValue = JSON.parse(newValue);
      this.data = newValue;
      this.render();
    }
  }
}

customElements.define("x-bar-chart", BarChart);
