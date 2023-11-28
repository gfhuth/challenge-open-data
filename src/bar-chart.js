const templateBarChart = document.createElement("template");
templateBarChart.innerHTML = /*html*/ `
<div>
  <div class="square"></div>
</div>
<style>
  .square {
    width: 100%;
    height: calc(100vh - 120px);
    background-color: red;
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
    this.shadowRoot.append(templateBarChart.content.cloneNode(true));
    this.render();
  }

  render() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") newValue = JSON.parse(newValue);
    this[name] = newValue;
    this.render();
  }
}

customElements.define("x-bar-chart", BarChart);