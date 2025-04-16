"use strict";

// zamestnanci
let employees = [];

function addEmployee(id, name, rate) {
	const employee = {
		id,
		name,
		rate,
		attendance: [],
	};

	employees.push(employee);
}

function markAttendance(employeeId, date, status, projectId) {
	const employee = employees.find((emp) => emp.id === employeeId);
	if (employee) {
		employee.attendance.push({
			date,
			status,
			projectId,
		});
	}
}

addEmployee(1, "John Doe", 20);
addEmployee(5, "John Bravo", 50);
markAttendance(1, "2025-04-15", "on time");
console.log(employees);

// sklad matros
let materials = [];

function addMaterial(name, quantity, unitPrice) {
	const material = {
		name,
		quantity,
		unitPrice,
	};
	materials.push(material);
}

function useMaterials(name, quantity) {
	const material = materials.find((material) => material.name === name);

	if (material && material.quantity >= quantity) {
		material.quantity -= quantity;
	}
}

addMaterial("Cement", 100, 5);
useMaterials("Cement", 10);
console.log(materials);

// naradie a auticka
let tools = [];

function addTool(name, category, status) {
	const tool = {
		name,
		category,
		status,
		history: [],
	};

	tools.push(tool);
}

function borrowTool(name, employeeId, projectId) {
	const tool = tools.find(
		(tool) => tool.name === name && tool.status === "available"
	);

	if (tool) {
		tool.status = "borrowed";
		tool.history.push({
			employeeId,
			projectId,
			date: new Date().toLocaleDateString(),
		});
	}
}

addTool("drill", "power Tool", "available");
borrowTool("drill", 1, 1);

console.log(tools);

// localstorage
function saveToLocalStorage() {
	localStorage.setItem("employees", JSON.stringify(employees));
	localStorage.setItem("tools", JSON.stringify(tools));
	localStorage.setItem("materials", JSON.stringify(materials));
}

function loadFromLocalStorage() {
	employees = JSON.parse(localStorage.getItem("employees")) || [];
	tools = JSON.parse(localStorage.getItem("tools")) || [];
	materials = JSON.parse(localStorage.getItem("materials")) || [];
}

saveToLocalStorage();
loadFromLocalStorage();

// *** Moja Analyza alebo Postup k Ulohe ***
// *** Pripadne popis preco som pouzil co som pouzil ***
/*
- Chcem povedat najprv ze tu len ukazujem aspon niejaku logiku a tak dalej, toto neni komplexny fullstack projekt, osobne by som to nestihol do toho stvrtka ani, tak som sa snazil aspon takto ukazat vam, ze to chapem ..
*/

/*
  ************ Rozdelenie na bloky systematicky ************
- v kazdom bloku inicializujem pole pre ten dany blok napr zamestnanci,naradia,material v tomto slabsom javascripte
- neviem backend, tak som akoze simuloval localStorage na ukazku ..
- Isiel som podla mojej analyzy tejto ulohy co mam v inom textovom subore 
- pouzil som : let, const premenne, declaration funnciu,object literal (skrateny zapis napr name, a nie name: name), polia samozrejme, podmienky if bez else, logicke operatory and ( && ) a or (||), methody find,push, strict mode a Date Api.
- striktne od zaciatku nepouzivam var, == ,atd ..kvoli tomu aby som mal menej bugov === better life 🤣 
-

  ************ Zamestnanci ************
- funkcia addEmployee ma tri parametre id, name, rate 
- v nutri bloku definujem pole zamestnanca, ktore berie tieto parametre + tam definujem dochadzku prazdne pole
- nasledne v funkcii natlacim do employees pushnem zamestnanca 

- funkcia markAttendance ma styri parametre id zamestnanca, datum, status,id projektu
- zakladam constantu zamestnanca, kde hladam z polia employees cez methodu  find daneho zamestnanca z ID ktory sa robia parametru employeedId, ked sa to zhoduje ideme dalej na ifko
- v if bloku pushujem zamestnanca do dochadzky cez chaning dot notation (to pole som si vytvorili empty v prvej funkcii), a nastavujem tam tie tri parametre datum,status,project idcko ..vsade pouzivam shorthand zapis ak sa da. 


 ************ Material ************
- funkcia addMaterial v podstate robi to iste do employees stym rozdielom ze sa jedna o material, tam nie je co riesit.

- funkcia useMaterials prijima dva parametre meno a mnozstvo
- vytvaram constantu material, v nej hladam cez methodi find meno material, ak sa zhoduje, ze som ho nasiel prechadza sa na ifko
- v if bloku ak plati podmienka cez logicky operator AND, a je vacsia alebo rovna vtom danom mnozstve, tak sa spusti kod co odpocita dane mnozstvo co si zobral pracovnik na stavbe, vtomto pripadne nie o jedna ale je jedno ci 5-10 alebo 20 milion 

 ************ Tools ************
 - funnkcia addTool robi to iste co predtym tie dve funkcie len rozdielom na nastroje + vytvaram prazdne pole historia.
 - funkcia borrowTool ma tri parametre meno , id zamestnanca a project id 
 - vytvaram constantu tool, v nej cez methodu find hladam a porovnavam cez logicky operator AND konkretne naradie a jeho dostupnost, ak je ideme dalej na ifko ak nie tak nejdem nikde klasicky🤣 
 - v if bloku nastavujem status naradia na pozicany, a dane naradie pushujem do history z hodnotami id zamestnanca, id projektu a datum, ktory nastavujem pomocou Date API ako lokalny datum new Date().toLocaleDateString(); 

 ************ Zaver ************
- Písal som to na odľahčenie s trošku humorom, verím, že máte v práci veľa stresu, tak sa možno nad týmto pousmejete / zasmejete...
- Ďakujem veľmi pekne, že ste si to prečítali! :)
*/
