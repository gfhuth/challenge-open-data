import { camebert_chart } from "../charts/pie-chart.js";

const templatePieChart = document.createElement("template");
templatePieChart.innerHTML = /*html*/ `
<div id="container">
  <p id="name">Nom du plat</p>
  <div id="pie-chart">
  </div>
</div>
<style>
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    width: calc(100% - 2*3rem)
  }

  #pie-chart {
    min-width: 100px;
    width: 100%;
  }
</style>
`;

class PieChart extends HTMLElement {
  static observedAttributes = ["data"];

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.append(templatePieChart.content.cloneNode(true));
  }

  render() {
    this.shadowRoot.getElementById("name").innerHTML = this.data.name;
    const targetElement = this.shadowRoot.getElementById("pie-chart");
    targetElement.innerHTML = "";
    camebert_chart(this.data, targetElement);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      newValue = JSON.parse(newValue);
      this.data = newValue;
      this.render();
    }
  }
}

customElements.define("x-pie-chart", PieChart);
