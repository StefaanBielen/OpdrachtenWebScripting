// naam: Stefaan Bielen

// hint: if( ! /^\d+$/.test(ingave) )


window.addEventListener("load", handleLoad);

function handleLoad () {
	let button_start_rekenen = document.getElementById("button_start_rekenen");
	button_start_rekenen.addEventListener("click",handleClick );
}


function handleClick () {
	let invoer = parseInt(document.getElementById("input_aantal").value);
	let uitvoer = document.getElementById("vermenigvuldigingen");
	if (!Number.isInteger(invoer)) {
		throw new Error("Foute ingave voor getal!");
	}
	for (let i = 0; i < invoer; i++) {
		let elementInvoer = document.createElement("input");
		elementInvoer.addEventListener("keyup", handleKeyupInput);
		elementInvoer.setAttribute("type", "text");
		let getal1 = parseInt(Math.random()*10);
		let getal2 = parseInt(Math.random()*10);
		let textUitvoer = document.createTextNode(`${getal1} * ${getal2} = `);
		let lineBreak = document.createElement("hr");
		uitvoer.appendChild(lineBreak);
		uitvoer.appendChild(textUitvoer);
		uitvoer.appendChild(elementInvoer);


	}
	uitvoer.appendChild(document.createElement("hr"));
}

function handleKeyupInput(event){
	let evenement = event.target;
	let waarde  = parseInt(evenement.value);
	console.log(evenement.value);
	if (!Number.isInteger(waarde)) {
		evenement.style.color = "red";
	}
}

