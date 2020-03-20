'use strict';
window.addEventListener("load", handleLoad);

function handleLoad() {
    let select = document.createElement("select");
    select.setAttribute("id", "select_person");
    let divoutput = document.getElementById("selectoutput");
    divoutput.appendChild(select);

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
            for (let person of persons) {
                let option = document.createElement("option");
                select.appendChild(option);
                option.setAttribute("value", `${person.id}`);
                option.appendChild(document.createTextNode(person.name));
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
    let id = selectionValue.selectedIndex + 1;
    console.log("Controle log/ id: " + id); // kan zowel name als id gebruiken voor de eerste fetch te doen

    let url = 'http://localhost:3000/persons/';
    let output = document.getElementById("output");
    makeElementEmpty(output);
    fetch(url + `?id=${id}`)
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

            let search = ["?"];
            for (let friend of friends) {
                search.push("id=" + friend); // eerst een array maken dan .join(&) gebruiken om van array naar string te gaan
            }
            search = search.join("&");
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
            console.log("Controle log/ aantal vrienden: " + friends.length);

            for (let friend = 0; friend < friends.length; friend++) {
                if (friend === 0) {
                    outputFriends += `${name} heeft vriend(en) ${friends[friend].name}`;
                } else {
                    outputFriends += `, ${friends[friend].name}`;
                }
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
        .then((data) => {
            output.appendChild(document.createTextNode(`${data.id} ${data.name}`));
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
