// variables

var employeeData = [];
var urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
var card = document.querySelectorAll(".card");
var cDiv = document.querySelector(".employees");
var clicked = document.querySelector('.overlay');

// fetch data from an API

fetch(urlAPI)
.then(data => data.json()
.then(displayEmployees)
.catch(err => console.log(err)));

function displayEmployees(userdata) {
    employeeData = userdata; 
    const cardsForEmployees = employeeData.results.map( (item, index) => 

    `
    <div class="card" index="${index}">

        <div class="card-profile-pic">
            <img src="${item.picture.large}" alt="employee">
        </div>

        <div class="card-content">
            <h3 class="name">${item.name.first} ${item.name.last}</h3>
            <p>${item.email}</p>
            <p>${item.location.city}</p>
        </div>

    </div>

    `).join('')

    document.querySelector(".employees").innerHTML = cardsForEmployees;
}

function displayModal(index) {
        var modal = employeeData.results[index];
        var cel = modal.phone;
        var location = modal.location;
        var picture = modal.picture.large;
        var streetCode = location.postcode;
        var birthDate = modal.dob;
        var streetNr = location.street.number;
        var streetState = location.state;
        var streetName = location.street.name;
        var name =`${modal.name.first} ${modal.name.last}`;
        var email = `${modal.email}`;
        var city = `${modal.location.city}`;
        var date = new Date(birthDate.date); 
        
        const windowPop = 

        `
        <div class="html-modal" nmbr="${index}">

            <p class="close"> X </p>

        <div class="card-profile-pic">
            <img src="${picture}" alt="employee">
        </div>

        <div class="card-content">
            <h3 class="name"> ${name} </h3>
            <p> ${email} </p>
            <p> ${city} </p>
        </div>

        <div>
            <hr>
        </div>

        <div class="items-modal">
            <p> ${cel} </p>
            <p> ${streetNr} ${streetName}, ${streetState} ${streetCode} </p>
            <p> Birthday: ${date.getMonth()}/${date.getDay()}/${date.getFullYear()} </p>
        </div>
        
        `;
        
        clicked.innerHTML = windowPop;  
}


//event listeners

cDiv.addEventListener("click", (e) => {
    if (e.target !== cDiv) {
        clicked.style.display = "block"; 
        let modalC = e.target.closest(".card"); 
        let modalCardInput = modalC.innerHTML; 
        let index = modalC.getAttribute("index"); 
        
        displayModal(index, modalCardInput);   

    }
});

clicked.addEventListener("click", (e) => {
    const close = document.querySelector(".close");
    if (e.target === close) {
        clicked.style.display = "none";
    }
});