'use strict';
window.addEventListener("load", handleLoad);

function handleLoad() {
    let select = document.createElement("select");
    select.setAttribute("id", "select_person");
    let divoutput = document.getElementById("selectoutput");
    selectoutput.appendChild(select);

    let url = 'http://localhost:3000/persons/';

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `Error: ${response.status}`;
            }
        })
        .then((persons) => {
            let count = 1;
            for (let person of persons) {
                let option = document.createElement("option");
                select.appendChild(option);
                option.setAttribute("value", `${count}`);
                option.innerHTML = person.name;
                count++;
            }
        })
        .catch((error) => {
            console.log(error.message);
        });


    let getFriendsButton = document.getElementById("getFriends");
    getFriendsButton.addEventListener("click", handleGetFriends);
    let postPersonButton = document.getElementById("postPerson");
    postPersonButton.addEventListener("click", handlePostPerson);
}

function handleGetFriends() {
    let selectionValue = document.getElementById("select_person");
    let name = selectionValue[selectionValue.selectedIndex].text;
    console.log("Controle log/ naam: " + name); // kan zowel name als id gebruiken voor de eerste fetch te doen

    let url = 'http://localhost:3000/persons/';
    let output = document.getElementById("output");
    makeElementEmpty(output);
    fetch(url + "?name=" + name)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `error: ${response.status}`;
            }
        })
        .then((data) => {
            let person = data[0];
            let friends = person.friends;
            console.log("Controle log/ friends id: " + friends);
            let search = "";
            for (let friend of friends) {
                search += "?id=" + friend;
            }
            console.log("Controle log/ searchstring: " + search);
            return fetch(url + search);
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `error: ${response.status}`;
            }
        })
        .then((friends) => {
            let outputFriends = "";

            for (let person of friends) {
                outputFriends += `${name} heeft vriend(en) ${person.name}`;
            }
            output.appendChild(document.createTextNode(outputFriends));
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        })

}

function handlePostPerson() {
    let url = 'http://localhost:3000/persons/';
    let name = document.getElementById("txt_name").value;
    let person = {name: name, friends: []};
    let output = document.getElementById("output");
    makeElementEmpty(output);
    fetch(url, {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `error: ${response.status}`;
            }
        })

        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        })

}


function makeElementEmpty(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}
