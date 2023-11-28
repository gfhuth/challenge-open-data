const templateDiagramList = document.createElement("template");
templateDiagramList.innerHTML = /*html*/ `
<div id="container"></div>
<style>
  #container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
    gap: 0.6rem
  }

  .diagram {
    flex-grow: 1;
    min-height: 100px;
    min-width: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
`

class DiagramList extends HTMLElement {
  static observedAttributes = ["data", "diagram"];

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.append(templateDiagramList.content.cloneNode(true));
    this.data = []
    this.diagram = null
    this.render()
  }

  render() {
    const container = this.shadowRoot.getElementById("container");
    container.innerHTML = "";

    if (!this.diagram) return;
    this.data.forEach(d => {
      const diagram = document.createElement(this.diagram);
      diagram.setAttribute('data', JSON.stringify(d));
      diagram.classList.add('diagram')
      container.appendChild(diagram);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") newValue = JSON.parse(newValue);
    this[name] = newValue;
    this.render()
  }
}

customElements.define("x-diagram-list", DiagramList)