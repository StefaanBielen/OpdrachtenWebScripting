// naam: Stefaan Bielen
'use strict';
window.addEventListener("load", handleWindowload);

function handleWindowload() {
    let url = 'http://localhost:3000/country/';
    let select = document.getElementById("div_select");
    let selectElement = document.createElement("select");
    select.appendChild(selectElement);
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `Error with status: ${response.status}`;
            }
        })
        .then((data) => {
            for (let country of data) {
                let option = document.createElement("option");
                selectElement.appendChild(option);
                option.appendChild(document.createTextNode(country.name));
                option.setAttribute("value", `${country.id}`);
            }
        })
        .catch((error) => {
            select.appendChild(document.createTextNode(error))
        });

    let shipsButton = document.getElementById("get_ships");
    shipsButton.addEventListener("click", handleGetShips);
}

function handleGetShips() {
    let url = 'http://localhost:3000/ship/';
    let output = document.getElementById("div_output");
    let ul = document.createElement("ul");
    let select = document.getElementsByTagName("select")[0];
    let countryId = select[select.selectedIndex].value;
    console.log(select[select.selectedIndex].value);
    output.appendChild(ul);
    fetch(url + "?country_id=" + countryId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `Error with status: ${response.status}`;
            }
        })
        .then((data) => {
            console.log(data);
            let maxSpeed = 0;
            for (let ships of data) {
                if (ships.speed > maxSpeed) {
                    maxSpeed = ships.speed;
                }
            }
            for (let ships of data) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(`${ships.id}, ${ships.name}`));
                ul.appendChild(li);
                if (ships.speed === maxSpeed) {
                    li.style.color = "red";
                }
            }
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error))
        })
}
