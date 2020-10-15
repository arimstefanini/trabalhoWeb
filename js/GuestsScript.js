import ControllerGuests from "./classes/guests/ControllerGuests.js"
import localData from "./classes/LocalDatabase.js";

const url = "https://hostel-app-back-end-api.herokuapp.com/customers"

const controller = new ControllerGuests();
controller.update()

if(localStorage.removeItem("asNewGuest") === true){
    const name = localStorage.removeItem("firstName")
    const last = localStorage.removeItem("lastName")
    const phone = localStorage.removeItem("phone")
    const email = localStorage.removeItem("email")
    const id = localStorage.removeItem("id")
    localData.add(id, phone, name, last, email)
}

function request() {
    const httpRqst = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    httpRqst.open("GET", url, true)
    httpRqst.onreadystatechange = (httpRqst) => { if (httpRqst.readyState === 4 && httpRqst.status === 200) { localData.addAll(JSON.parse(httpRqst.responseText)) } }
    httpRqst.send()
}

request()

//função para teste -----------------------
//localData.addAll(getLocaleJson())
function getLocaleJson() {
    return [{
        "id": 1,
        "firstName": "Jay",
        "lastName": "Gatsby",
        "emailAddress": "jay@gmail.com",
        "address": "1187  Fleming Street",
        "country": "United States",
        "state": "AL",
        "phoneNumber": "+1-205-555-0178"
    }, {
        "id": 2,
        "firstName": "Holden",
        "lastName": "Caulfield",
        "emailAddress": "holden@mit.edu",
        "address": "3998  Davis Lane",
        "country": "United States",
        "state": "CO",
        "phoneNumber": "+1-303-555-0137"
    }, {
        "id": 3,
        "firstName": "Humbert",
        "lastName": "Humbert",
        "emailAddress": "humbert@gmail.com",
        "address": "499  McKinley Avenue",
        "country": "United States",
        "state": "CO",
        "phoneNumber": "+1-303-555-0156"
    }, {
        "id": 4,
        "firstName": "Leopold",
        "lastName": "Bloom",
        "emailAddress": "bloom@blogs.com",
        "address": "4239  Marigold Lane",
        "country": "United States",
        "state": "FL",
        "phoneNumber": "+1-561-555-0145"
    }, {
        "id": 5,
        "firstName": "Rabbit",
        "lastName": "Angstrom",
        "emailAddress": "angstrom@hotmail.com",
        "address": "4306  Jacobs Street",
        "country": "United States",
        "state": "FL",
        "phoneNumber": "+1-561-555-0135"
    }, {
        "id": 6,
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "emailAddress": "holmes@aol.com",
        "address": "1395  Dola Mine Road",
        "country": "United States",
        "state": "AK",
        "phoneNumber": "+1-907-555-0187"
    }, {
        "id": 7,
        "firstName": "Atticus",
        "lastName": "Finch",
        "emailAddress": "finch@hotmail.com",
        "address": "3566  Parkway Drive",
        "country": "United States",
        "state": "AZ",
        "phoneNumber": "+1-480-555-0198"
    }, {
        "id": 8,
        "firstName": "Molly",
        "lastName": "Bloom",
        "emailAddress": "molly@microsoft.com",
        "address": "4206  Mulberry Avenue",
        "country": "United States",
        "state": "AR",
        "phoneNumber": "+1-501-555-0120"
    }, {
        "id": 9,
        "firstName": "Stephen",
        "lastName": "Dedalus",
        "emailAddress": "dedalus@apple.com",
        "address": "359  Hide A Way Road",
        "country": "United States",
        "state": "CA",
        "phoneNumber": "+1-510-555-0183"
    }, {
        "id": 10,
        "firstName": "Lily",
        "lastName": "Bart",
        "emailAddress": "bart@gmail.com",
        "address": "639  Airplane Avenue",
        "country": "United States",
        "state": "CT",
        "phoneNumber": "+1-860-555-0154"
    }, {
        "id": 11,
        "firstName": "Holly",
        "lastName": "Golightly",
        "emailAddress": "golightly@gmail.com",
        "address": "3786  Scenic Way",
        "country": "United States",
        "state": "IL",
        "phoneNumber": "+1-847-555-0127"
    }, {
        "id": 12,
        "firstName": "Gregor",
        "lastName": "Samsa",
        "emailAddress": "samsa@yahoo.com",
        "address": "1833  Don Jackson Lane",
        "country": "United States",
        "state": "HI",
        "phoneNumber": "+1-808-555-0162"
    }, {
        "id": 13,
        "firstName": "Aureliano",
        "lastName": "Buendia",
        "emailAddress": "buendia@yahoo.com",
        "address": "2195  Eagle Street",
        "country": "United States",
        "state": "IL",
        "phoneNumber": "+1-847-555-0151"
    }, {
        "id": 14,
        "firstName": "Clarissa",
        "lastName": "Dalloway",
        "emailAddress": "dalloway@gmail.com",
        "address": "1632  Pearlman Avenue",
        "country": "United States",
        "state": "KS",
        "phoneNumber": "+1-785-555-0189"
    }, {
        "id": 15,
        "firstName": "Ignatius",
        "lastName": "Reilly",
        "emailAddress": "reilly@gmail.com",
        "address": "1632  Pearlman Avenue",
        "country": "United States",
        "state": "WI",
        "phoneNumber": "+1-920-555-0109"
    }, {
        "id": 16,
        "firstName": "George",
        "lastName": "Smiley",
        "emailAddress": "smiley@gmail.com",
        "address": "2436  Williams Lane",
        "country": "United States",
        "state": "KS",
        "phoneNumber": "+1-785-555-0132"
    }, {
        "id": 17,
        "firstName": "Winnie",
        "lastName": "Pooh",
        "emailAddress": "pooh@yahoo.com",
        "address": "3529  Cheshire Road",
        "country": "United States",
        "state": "CT",
        "phoneNumber": "+1-860-555-0146"
    }, {
        "id": 18,
        "firstName": "Bigger",
        "lastName": "Thomas",
        "emailAddress": "thomas@hotmail.com",
        "address": "3091  Doctors Drive",
        "country": "United States",
        "state": "CA",
        "phoneNumber": "+1-510-555-0112"
    }, {
        "id": 19,
        "firstName": "Nick",
        "lastName": "Adams",
        "emailAddress": "adams@gmail.com",
        "address": "3199  Ryan Road",
        "country": "United States",
        "state": "SD",
        "phoneNumber": "+1-605-555-0121"
    }, {
        "id": 20,
        "firstName": "Scarlett",
        "lastName": "OHara",
        "emailAddress": "ohara@gmail.com",
        "address": "3502  Station Street",
        "country": "United States",
        "state": "CA",
        "phoneNumber": "+1-510-555-0187"
    }, {
        "id": 21,
        "firstName": "Scout",
        "lastName": "Finch",
        "emailAddress": "finch@gmail.com",
        "address": "2552  Cedar Street",
        "country": "United States",
        "state": "AR",
        "phoneNumber": "+1-501-555-0132"
    }, {
        "id": 22,
        "firstName": "Philip",
        "lastName": "Marlowe",
        "emailAddress": "marlowe@hotmail.com",
        "address": "2810  Polk Street",
        "country": "United States",
        "state": "AZ",
        "phoneNumber": "+1-480-555-0147"
    }, {
        "id": 23,
        "firstName": "Cosimo",
        "lastName": "di Rondo",
        "emailAddress": "dirondo@gmail.com",
        "address": "4772  Pinewood Drive",
        "country": "United States",
        "state": "AK",
        "phoneNumber": "+1-907-555-0178"
    }]
}
