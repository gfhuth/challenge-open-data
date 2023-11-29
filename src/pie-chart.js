const templatePieChart = document.createElement("template");
templatePieChart.innerHTML = /*html*/ `
<p id="name">Nom du plat</p>
<div>
  <span class="rond"></span>
</div>
<style>
  .rond {
    display: block;
    background-color: red;
    border-radius: 1000px;
    height: 200px;
    width: 200px;
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
    this.shadowRoot.getElementById('name').innerHTML = this.data.name;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") newValue = JSON.parse(newValue);
    this[name] = newValue;
    this.render();
  }
}

customElements.define("x-pie-chart", PieChart);