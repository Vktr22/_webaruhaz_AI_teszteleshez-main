# AI segítségével felépített Webáruház MVC modellel

Első prompt után elég ötletszerűen válogatta az UML ábra adatait. A modell osztályt kiegészítettem. 
Úgy pontosítottam, hogy "a Termek.js fájl alapján késztsd el az UML ábrát". Ekkor már egész jó választ kaptam. 


|      Model       |
|------------------|
| - #termekLista[] |
| - #kosarLista[]  |
|------------------|
| + getKosarLista(): Array |
| + getTermekLista(): Array |
| + addTermek(termek)(): void |
| + addKosar(termek)(): void |
| + addKosar(termek: Object): void |
| + removeTermekById(id: number): void |
| + removeKosarItem(id: number): void |
| + increaseQuantity(id: number): void |
| + decreaseQuantity(id: number): void |
| + rendezTermekLista(irany: string): void |
| + szuresTermekLista(keresesoKifejezes: string): Array |
| + getKosarDarabszam(): number |



|    Controller    |
|------------------|
| - model: Model   |
| - szuloElem: HTMLElement |
| - kosarDBElem: HTMLElement |
| - kosar: Kosar   |
| - termekek: Termekek |
|------------------|
| + constructor(szuloElem: HTMLElement, oldal: string, modell: Model): Controller |
| + kosarDbKiir(): void |
| + initKosar(): void |
| + initTermekek(lista: Array = null): void |
| + initEventListeners(): void |



|      Kosar       |
|------------------|
| - #lista: Array  |
| - #szuloElem: HTMLElement |
|------------------|
| + constructor(lista: Array, szuloElem: HTMLElement): Kosar |
| + megjelenit(lista: Array): void |
| + bindEventListeners(): void |


|     Termekek     |
|------------------|
| - #termekLista: Array |
| - szuloElem: HTMLElement |
| - termekElem: HTMLElement |
|------------------|
| + constructor(szuloElem: HTMLElement, termekLista: Array): Termekek |
| + init(lista: Array): void |
| + szuresrendezesGombok(): void |



|      Termek      |
|------------------|
| - #obj: Object   |
| - #szuloElem: HTMLElement |
| - #index: number |
| - #termekElem: HTMLElement |
|------------------|
| + constructor(obj: Object, szuloElem: HTMLElement, index: number): Termek |
| + megjelenit(): void |
| + esemenykezelo(): void |


#### Kapcsolatok
**Controller → Model**: A Controller osztály a Model példányát használja az adatok kezelésére.
**Controller → Kosar**: A Controller osztály a Kosar példányát használja a kosár megjelenítésére.
**Controller → Termekek**: A Controller osztály a Termekek példányát használja a terméklista megjelenítésére.
**Termekek → Termek**: A Termekek osztály több Termek példányt kezel a terméklista megjelenítéséhez.

## osztály**Tagfüggvények** feladatai


#### Model osztály
- **getKosarLista()**: Visszaadja a kosárban lévő termékek listáját.
- **addKosar(termek)**: Hozzáad egy terméket a kosárhoz. Ha a termék már létezik, növeli a mennyiségét.
- **removeKosarItem(id)**: Eltávolítja a megadott azonosítójú terméket a kosárból.
- **increaseQuantity(id)**: Növeli a megadott azonosítójú termék mennyiségét a kosárban.
- **decreaseQuantity(id)**: Csökkenti a megadott azonosítójú termék mennyiségét a kosárban. Ha a mennyiség 1, eltávolítja a terméket.
- **rendezTermekLista(irany)**: Rendezési irány alapján rendezi a terméklistát (név vagy ár szerint, növekvő vagy csökkenő sorrendben).
- **szuresTermekLista(keresesoKifejezes)**: Szűri a terméklistát a megadott keresési kifejezés alapján.
- **getKosarDarabszam()**: Visszaadja a kosárban lévő összes termék mennyiségének összegét.

#### Controller osztály

**Adattagok**:

**model**: A Model osztály példánya, amely az adatok kezeléséért felelős.
**szuloElem**: Az a HTML elem, amelybe a nézetek megjelennek.
**kosarDBElem**: A kosár darabszámát megjelenítő HTML elem.
**kosar**: A Kosar osztály példánya, amely a kosár megjelenítéséért felelős.
**termekek**: A Termekek osztály példánya, amely a terméklista megjelenítéséért felelős.

**Tagfüggvények**:

**constructor(szuloElem, oldal, modell)**: Inicializálja a vezérlőt a szülőelemmel, az oldal típusa alapján (kosár vagy terméklista), és a modellel.
**kosarDbKiir()**: Frissíti a kosár darabszámát a felhasználói felületen.
**initKosar()**: Inicializálja a kosár nézetét a kosárban lévő termékekkel.
**initTermekek(lista)**: Inicializálja a termékek nézetét a megadott vagy az alapértelmezett terméklistával.
**initEventListeners()**: Eseményfigyelőket állít be a kosár és a terméklista interakcióihoz.

#### Kosar osztály

**Adattagok**:

**#lista**: A kosárban lévő termékek listája.
**#szuloElem**: Az a HTML elem, amelybe a kosár megjelenik.

**Tagfüggvények**:

**constructor(lista, szuloElem)**: Inicializálja a kosár nézetét a megadott terméklistával és szülőelemmel.
**megjelenit(lista)**: Megjeleníti a kosár tartalmát a felhasználói felületen.
**bindEventListeners()**: Hozzáadja az eseménykezelőket a kosár műveleteihez (növelés, csökkentés, törlés).

#### Termekek osztály

**Adattagok**:

**#termekLista**: A termékek listáját tartalmazó privát tömb.
**szuloElem**: Az a HTML elem, amelybe a termékek megjelennek.
**termekElem**: A termékek megjelenítésére szolgáló HTML elem.

**Tagfüggvények**:

**constructor(szuloElem, termekLista)**: Létrehozza a termékek nézetét, és inicializálja a szűrési és rendezési gombokat.
**init(lista)**: Inicializálja a termékek listáját a megadott termékekkel, és megjeleníti azokat a nézetben.
**szuresrendezesGombok()**: Létrehozza a szűrési és rendezési gombokat, és eseményfigyelőket állít be a szűrési és rendezési műveletekhez.

#### Termek osztály

**Adattagok**:

**#obj**: A termék adatait tartalmazó objektum.
**#szuloElem**: Az a HTML elem, amelybe a termék megjelenik.
**#index**: A termék indexe a listában.
**#termekElem**: A termékhez tartozó HTML elem.

**Tagfüggvények**:

**constructor(obj, szuloElem, index)**: Létrehozza a termék példányát az adatokkal, szülőelemmel és indexszel.
**megjelenit()**: Megjeleníti a termék adatait a felhasználói felületen.
**esemenykezelo()**: Hozzáadja az eseménykezelőt a "Kosárba" gombhoz, amely egyedi eseményt vált ki.