import { createBarChart, datas } from "./diagrams/bar-chart.js";

const templateBarChart = document.createElement("template");
templateBarChart.innerHTML = /*html*/ `
<div>
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
    this.shadowRoot.append(templateBarChart.content.cloneNode(true));
    this.render();
  }
  
  render() {
    origin = this.shadowRoot.getElementById("bar-chart")
    createBarChart(datas, origin)
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") newValue = JSON.parse(newValue);
    this[name] = newValue;
    this.render();
  }
}

customElements.define("x-bar-chart", BarChart);