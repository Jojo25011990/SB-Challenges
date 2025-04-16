"use strict";

// *** Select Elements ***
const overlay = document.querySelector(".overlay");
const headingPrimary = document.querySelectorAll(".heading__primary span");
const main = document.querySelector(".main");

// *** End of Select Elements ***

// *** Gsap - Heading Primary Animation ***
gsap.from(headingPrimary, {
	autoAlpha: 0,
	y: 150,
	stagger: 0.2,
	ease: "back.out(2)",
	onComplete: () => {
		gsap.to(overlay, {
			autoAlpha: 0,
			duration: 1,
			delay: 0.8,
			onComplete: () => {
				overlay.classList.add("hidden");
			},
		});
	},
});
// *** Gsap - End of Heading Primary Animation ***

// *** Fetch Data JSON ***
fetch("./data.json")
	.then((response) => response.json())
	.then((data) => {
		const filteredData = transformTransactions(data);

		console.log(filteredData); // *** Canceled Users ***

		htmlData(filteredData); // *** This data show in HTML ***
	})
	.catch((error) => console.log("Chybicka sa vloudila🥲 :", error));
// *** End of Fetch Data JSON ***

// *** Transform Transactions - Output Canceled Users ***
function transformTransactions(transactions) {
	return transactions
		.filter((transaction) => transaction.state === "canceled")
		.sort((a, b) => b.createdAt - a.createdAt)
		.reduce((accumulator, transaction) => {
			const year = new Date(transaction.createdAt).getFullYear();

			if (!accumulator[year]) accumulator[year] = [];

			accumulator[year].push({
				amount: transaction.amount,
				createdAt: transaction.createdAt,
				customerName: transaction.customerName,
			});

			return accumulator;
		}, {});
}
// *** End of Transform Transactions - Output Canceled Users ***

// *** Filtered Data - Html Visual ***
function htmlData(filteredDataByYear) {
	let html = "";

	for (const year in filteredDataByYear) {
		html += `<h2>${year}</h2> <ul>`;

		filteredDataByYear[year].forEach((transaction) => {
			html += `
            <li>
                
                <h3>${transaction.customerName}</h3>
                <p>${new Date(transaction.createdAt).getFullYear()}</p>
                <p>${transaction.amount.toFixed(2)} $</p>

            </li>`;
		});

		html += `</ul>`;
	}

	main.innerHTML = html;
}
// *** End of Filtered Data - Html Visual ***

// *** Moja Analyza alebo Postup k Ulohe ***
// *** Pripadne popis preco som pouzil co som pouzil ***
/*

// *** Fetch a Data json ***
1.transaction.txt som si preformatoval do json-u
2.pouzivam fetch a 2x then + catch na spracovanie dat namiesto async await.
- prvy spracuje odpoved 
- druhy spracuje data
- catch klasicky zachyti error ked sa nieco pokasle napr🤣
3.Zakladam const filteredData kde ukladam funkciu s vratenymi vyfiltrovanymi data ( vsetko canceled podla zadania ) a nasledne cez console log pozeram vysledok.

// *** Gsap Animation ***
- pouzil som methodu from, odkial sa z tych danych hodnot animuju spany v h1, autoAlpha ( opacity, vissibility ), y ( transform: translateY ), stagger ( delay medzi elementami,cize spanmi v tomto pripadne ),delay je tu na to aby ten overlay nezmizol hned, ease prechod animacie, tu je pouzita back.out(2) co je implementovana v gsape defaultne, onComplete methodu na overlay, spusti dalsi kod po dokonceni animacii spanov, methoda to je opak methody from cize sa animuje do tych hodnoch, duration 1 je klasicky 1000ms, onComplete methoda dalsia pripoji nastylovany class hidden k overlay-i, nespomenul som ale onComplete je fallback funkcia ale to je jasne ..

// *** Hlavna Funkcia Podla Zadania ***
1. declarujem funkciu transformTransactions(transactions), ktora vrati vyfiltrovane data z data json ojektu.
- pouzivam filter,sort,reduce methody 
- na zaciatku filtrujem podla stavu === "canceled"
- nasledne sortujem podla rokov najnovsi po najstarsi
- nasledne nadvazujem s reduce, aby som ziskal vysledny objekt kde kluce su roky podla zadania.
- zakladam const year, kde pouzivam date Api, new  new Date(transaction.createdAt).getFullYear() - kde si z toho vytahujem rok.
- kontrolujem ci v accumulatory existuje rok ako kluc, ak nie vytvaram nove prazdne pekne ciste krasne pole
- nasledne tam natlacim cez push metodu podla zadania danu transakciu cize - amount,createAt,customerName
-posledne vratim cez return accumulator

// *** Diagram podla zadania na dbdiagram.io ***
- robim to prvy krat v zivote, dufam ze to je dobre(cca pol roka do zadu som robil jeden flowchart..).
- jedna transaction === jedna entita === jedna tabulka.

// *** HtmlData Funkcia **
- declarujem funkciu, ktora ma zobrazit vyfiltrovane data v HTML, v funkcii inicializujem html ako cisty string, nasledne pouzivam cyklus for in pre objekty , kde prechadzam rok z vyfiltrovanych dat rokov, aktualizujem html a vkladam dynamicky do html(stranky) elementy h2,ul,li a p, stym ze v kazdom danom elemente zobrazujem tie vyfiltrovane data co som presiel cez foreach ako transaction.custoerName napriklad ..rok pouzivam timeStamp, amount pouzivam toFixed na 2 cisla, a pripajam do html ukocenie ul elementu ako celok, pod cyklom na element main vkladam tento vysledok do stranky ..

-  prepac pisem to s vlastnymi slovami✌️ htmldata funkciu a Gsap popis  som napisal uz len ako suvisly text bez bodov...

 ************ Zaver ************
- Písal som to na odľahčenie s trošku humorom, verím, že máte v práci veľa stresu, tak sa možno nad týmto pousmejete / zasmejete...
- Ďakujem veľmi pekne, že ste si to prečítali! :)
*/
