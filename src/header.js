const templateHeader = document.createElement("template");
templateHeader.innerHTML = /*html*/ `
<header>
  <div id="menu">
    <a href="index.html"><h2>Visualisation</h2></a>
    <a href="doc.html"><h2>Documentation</h2></a>
  </div>
</header>
<style>
  #menu {
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #aaaaaaff;
    height: 100px;
    width: 100vw;
    box-shadow: 2px 2px 5px 1px rgba(0,0,0,.8);
  }

  #menu a {
    display: flex;
    text-decoration: none;
    color: black;
    height: 100%;
    width: 40%;
    justify-content: center;
    align-items: center;
  }

  #menu a:hover {
    background-color: #ffffff40;
  }
  
  @media screen and (max-width: 800px) {
    #menu a {
      width: 50%;
    }
}
</style>
`

class Header extends HTMLElement {


  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.append(templateHeader.content.cloneNode(true));
  }
}

customElements.define("x-header", Header);
