const templateList = document.createElement("template");
templateList.innerHTML = /*html*/ `
<div id="container">
  <div id="selected-items">
    <!-- Liste des plats sélectionnés -->
    <div id="select-item">
      <!-- Sélection d'un nouveau plat  -->
      <div id="select-item-list" style="display:none;"></div>
    </div>
  </div>
</div>
<style>
  #container {
    padding: 2rem;
  }

  #container,
  #selected-items {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
  }

  #select-item {
    width: 32px;
    height: 32px;
    display: block;
    background-color: #fff;
    border-radius: 16px;
    position: relative;
    cursor: pointer;
  }

  #select-item::after,
  #select-item::before {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    content: '';
    display: block;
    background-color: black;
  }

  #select-item::before {
    height: 60%;
    width: 2px;
  }

  #select-item::after {
    height: 2px;
    width: 60%;
  }

  #select-item-list {
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

  .dropdown-item {
    padding: 0.2rem 0.3rem;
    background-color: white;
    white-space: nowrap;
  }

  .chip-item {
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

  .delete-chip-item {
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

  .delete-chip-item::before {
    height: 70%;
    width: 2px;
  }

  .delete-chip-item::after {
    height: 2px;
    width: 70%;
  }

  .delete-chip-item::before,
  .delete-chip-item::after {
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

class ListChangedEvent extends Event {
  constructor(data) {
    super("listitemschanged", {
      detail: {
        message: "list items changed",
      },
    });
    this.data = data;
  }
}

class List extends HTMLElement {
  static observedAttributes = ["items"];

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.append(templateList.content.cloneNode(true));

    this.items = [];
    this.selectedItems = [];
    this.selectionInProgress = false;
    this.shadowRoot.getElementById("select-item").onclick =
      this.selectItem.bind(this);
    document.addEventListener("click", () => {
      this.selectionInProgress = false;
      this.showOrHide();
    });
  }

  showOrHide() {
    if (!this.selectionInProgress) {
      this.shadowRoot.getElementById("select-item-list").style.display =
        "none";
    } else {
      this.shadowRoot.getElementById("select-item-list").style.display =
        "";
    }
    return this.selectionInProgress;
  }

  selectItem(event) {
    event.stopPropagation();
    this.selectionInProgress = !this.selectionInProgress;
    if (!this.showOrHide()) return;

    const items = this.items;
    const list = this.shadowRoot.getElementById("select-item-list");
    list.innerHTML = "";
    items
      .filter((item) => this.selectedItems.indexOf(item.id) < 0).forEach((item) => {
        const elem = document.createElement("span");
        elem.classList.add("dropdown-item");
        elem.innerHTML = item.name;
        elem.onclick = () => this.addItem(item.id);
        list.appendChild(elem);
      });

    const createItem = document.createElement("span");
    createItem.classList.add("dropdown-item");
    createItem.innerHTML = "Créer un plat";
    createItem.onclick = this.createItem.bind(this);
    list.appendChild(createItem);
  }

  createItem() {}

  notify() {
    this.dispatchEvent(new ListChangedEvent(this.selectedItems));
  }

  addItem(itemId) {
    if (this.selectedItems.indexOf(itemId) >= 0) return;
    this.selectedItems.push(itemId);
    this.updateItems();
    this.notify();
  }

  removeItem(itemId) {
    if (this.selectedItems.indexOf(itemId) < 0) return;
    this.selectedItems.splice(this.selectedItems.indexOf(itemId), 1);
    this.updateItems();
    this.notify();
  }
  updateItems() {
    const items = this.selectedItems;
    const list = this.shadowRoot.getElementById("selected-items");
    const children = list.querySelectorAll('.chip-item');
    children.forEach(child => list.removeChild(child))
    const lastChild = list.querySelector("#select-item")

    items.forEach((itemId) => {
      const item = this.items.find(item => item.id === itemId);
      if (!item) return;

      const elem = document.createElement("span");
      elem.classList.add("chip-item");
      const cross = document.createElement("span");
      cross.classList.add("delete-chip-item");
      cross.onclick = () => this.removeItem(itemId);
      elem.innerText = item.name;
      elem.appendChild(cross);
      list.insertBefore(elem, lastChild);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "items") newValue = JSON.parse(newValue);
    this[name] = newValue;
  }
}

customElements.define("x-list", List);