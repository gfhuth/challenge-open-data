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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #83818199;
    margin-top: 0;
    height: 100px;
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
