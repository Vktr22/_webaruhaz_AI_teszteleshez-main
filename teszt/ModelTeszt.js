import Model from "../PUBLIC/Model.js";

/**
 * JSON.stringify
 * a js objektumok osszehasonlitasaban segit-> atalakitja az ojektumot
 * stringge (karakterlancca), igy masik objektummal konnyen ossze lehe hasonlitani
 *    miert?
 *     mert am ket obj akk egyenlo, ha a memoriacimuk is ugyan oda mutat(=== ezzel lehet osszeh)
 *     vagyis nem csak a tartalmat ellenorzi, amire nekunk szuksegunk lenne
 */

// Teszt uj termek hozzaad
function addKosarTeszt_UjTermekEseten() {
    const modell = new Model();
    const termek = {
        id: 2,
        nev: "termek",
        ar: 10,
        kep: "./kepek/placeholder.jpg",
        leiras: "példa termek"
    };
    modell.addKosar(termek);
    termek.mennyiseg = 1;
    const kosar = modell.getKosarLista(); //modell.getKosarLista([0])
    const elso = kosar[0];
    //obj szovegge ellenorzeshez
    console.assert(JSON.stringify(termek) === JSON.stringify(elso), "hiba: addKosarTeszt_UjTermekEseten()");
}
addKosarTeszt_UjTermekEseten();

// teszt mar benne levo termekbol meg
function addKosarTeszt_MarBenneVan() {
    const modell = new Model();
    const termek = {
        id: 4,
        nev: "termek2",
        ar: 22,
        kep: "placeholder.jpg",
        leiras: "valami leiras"
    };
    modell.addKosar(termek);
    modell.addKosar(termek);
    termek.mennyiseg = 2;
    const kosar = modell.getKosarLista();
    console.assert(kosar.length === 1 && kosar[0].mennyiseg === 2, "Hiba: addKosarTeszt_MarBenneVan()");
}
addKosarTeszt_MarBenneVan();

// 
function removeKosarTeszt() {
    const modell = new Model();
    const termek = {
        id: 5,
        nev: "termek3",
        ar: 500,
        kep: "placeholder.jpg",
        leiras: "leiras"
    };
    modell.addKosar(termek);
    //termek eltav - itt azert kell az id fent meg hozzaadasnal nem,
    // mert ott mindent at kell adni, viszont utana eltavolitasnal elg csak az id-alapjan "keresni"
    modell.removeKosarItem(termek.id);
    const kosar = modell.getKosarLista();
    console.assert(kosar.length === 0, "hiba: removeKosarTeszt()");
}
removeKosarTeszt();

// kosar menny nov
function kosarMennyNovelTeszt() {
    const modell = new Model();
    const termek = {
        id: 2,
        nev: "termek4",
        ar: 300,
        kep: "placeholder.jpg",
        leiras: "leiras"
    };
    modell.addKosar(termek);
    modell.increaseQuantity(termek.id);
    const kosar = modell.getKosarLista();
    console.assert(kosar[0].mennyiseg === 2, "hiba: kosarMennyNovelTeszt()-> nem növelte a mennyiséget");
}
kosarMennyNovelTeszt();

// kosar menny csokk
function kosarMennyCSOKKTeszt() {
    const modell = new Model();
    const termek = {
        id: 9,
        nev: "termek5",
        ar: 999,
        kep: "placeholder.jpg",
        leiras: "leiras"
    };
    modell.addKosar(termek);
    modell.addKosar(termek);
    modell.decreaseQuantity(termek.id);
    let kosar = modell.getKosarLista();
    console.assert(kosar.length === 1 && kosar[0].mennyiseg === 1, "hiba: kosarMennyCSOKKTeszt()-> nem csokk");
    modell.decreaseQuantity(termek.id);
    console.assert(modell.getKosarLista().length === 0, "kosarMennyCSOKKTeszt()-- nem torolte a kosarbol a termeket 0nal");
}
kosarMennyCSOKKTeszt();

// rendezesi irany
function rendezTermekListaTeszt() {
    const modell = new Model();
    modell.rendezTermekLista("nevSzerintCsokkeno");
    let lista = modell.getTermekLista();
    console.assert(lista[0].nev > lista[1].nev, "Hiba: nem nevSzerintCsokkeno");

    modell.rendezTermekLista("arSzerintNovevo");
    lista = modell.getTermekLista();
    console.assert(lista[0].ar <= lista[1].ar, "Hiba: nem arSzerintNovevo");
}
rendezTermekListaTeszt();

// szures
function szuresTeszt() {
    const modell = new Model();
    const lista = modell.getTermekLista();
    let szurt = modell.szuresTermekLista("");
    console.assert(szurt.length === lista.length, "ures keresésre nem az egesz listat adta vissza");

    const reszlet = lista[0].nev.slice(0, 2);
    szurt = modell.szuresTermekLista(reszlet);
    console.assert(szurt.some(t => t.id === lista[0].id), "Nem talalta reszlet alapjan");

    szurt = modell.szuresTermekLista("valamiamiNincs");
    console.assert(szurt.length === 0, "ures lista kellett volna legyen");
}
szuresTeszt();

// kosar db lekerese
function getKosarDarabszamTeszt() {
    const modell = new Model();
    const termek1 = { id: 1, nev: "egy", ar: 100, kep: "", leiras: "" };
    const termek2 = { id: 2, nev: "ketto", ar: 200, kep: "", leiras: "" };

    modell.addKosar(termek1);
    modell.increaseQuantity(termek1.id); // 2 db

    modell.addKosar(termek2); // 1 db
    const darab = modell.getKosarDarabszam();
    console.assert(darab === 3, `Hiba: a db nem 3, hanem ${darab}`);
}
getKosarDarabszamTeszt();
