import Kosar from "./Kosar.js";
import Termekek from "./Termekek.js";

class Controller {
  constructor(szuloElem, oldal, modell) {
    this.model = modell;
    this.szuloElem = szuloElem;
    oldal === "kosar" ? this.initKosar() : this.initTermekek();
    // new Termekek(szuloElem, this.model.getTermekLista());
    this.initEventListeners();
    this.kosarDBElem = document.querySelector("#kosarDb");
    this.kosarDbKiir();
  }
  kosarDbKiir() {
    this.kosarDBElem.innerHTML = this.model.getKosarDarabszam();
    this.kosarDBElem.classList.add("badge", "bg-primary", "rounded-pill");
  }
  initKosar() {
    const kosarLista = this.model.getKosarLista();
    console.log(kosarLista);
    this.kosar = new Kosar(kosarLista, this.szuloElem);
    console.log(this.kosar);
  }
  initTermekek(lista = null) {
    // Megjelenít egy animált gif karikát a terméklista frissítése előtt
    const loadingSpinner = document.createElement("div");
    loadingSpinner.innerHTML = '<img src="./kepek/loading.gif" alt="Betöltés..." style="display: block; margin: 0 auto;">';
    this.szuloElem.innerHTML = ""; // Törli a meglévő tartalmat
    this.szuloElem.appendChild(loadingSpinner);

    // Frissíti a terméklistát
    setTimeout(() => {
        this.termekek = new Termekek(this.szuloElem, lista || this.model.getTermekLista());
        loadingSpinner.remove(); // Eltávolítja az animált gif karikát
    }, 300); // Szimulált késleltetés a jobb felhasználói élmény érdekében
  }
  initEventListeners() {
    window.addEventListener("kosarbaTesz", (event) => {
      const { id } = event.detail;
      const termek = this.model.getTermekLista().find((t) => t.id === id);
      if (termek) {
        this.model.addKosar(termek);
        this.kosarDbKiir();
      } else {
        console.error("Termék nem található:", id);
      }
    });

    window.addEventListener("torles", (event) => {
      const id = event.detail;
      this.model.removeKosarItem(id);
      this.kosar.megjelenit(this.model.getKosarLista());
      this.kosarDbKiir(); // Frissíti a kosár darabszámát
    });

    window.addEventListener("novel", (event) => {
      const  id  = event.detail;
      console.log(event.detail);
      this.model.increaseQuantity(id);
      this.kosar.megjelenit(this.model.getKosarLista());
      this.kosarDbKiir();
    });

    window.addEventListener("csokkent", (event) => {
      const  id  = event.detail;
      this.model.decreaseQuantity(id);
      console.log(this.kosar);
      this.kosar.megjelenit(this.model.getKosarLista());
      this.kosarDbKiir();
    });

    window.addEventListener("rendezes", (event) => {
      const { irany } = event.detail;
      this.model.rendezTermekLista(irany);
       this.termekek.init(this.model.getTermekLista());
    });

    window.addEventListener("szures", (event) => {
      const { keresesoKifejezes } = event.detail;
      const szurtLista = this.model.szuresTermekLista(keresesoKifejezes);
     this.termekek.init(szurtLista);
    });
  }
}

export default Controller;
