import { createBarChart } from "./diagrams/bar-chart.js";

const templateBarChart = document.createElement("template");
templateBarChart.innerHTML = /*html*/ `
<div id="container">
  <div id="bar-chart"></div>
</div>
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
    const container = this.shadowRoot.getElementById("container");
    const list = document.createElement("x-list");
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
    list.setAttribute("items", JSON.stringify(this.allFeatures));
    list.setAttribute("default", "apportCalorique,emissionGES");
    list.addEventListener("listitemschanged", (event) => {
      this.features = event.data;
      this.render();
    });
    container.appendChild(list);
    this.features = list.selectedItems || [];
    this.render();
  }

  render() {
    const targetElement = this.shadowRoot.getElementById("bar-chart");
    targetElement.innerHTML = "";
    // createBarChart(this.data, this.features.map(f => this.allFeatures.find(fe => fe.id === f)), targetElement);
    createBarChart(
      this.data,
      this.allFeatures.filter((feature) => this.features.includes(feature.id)),
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
