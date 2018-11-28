let map;
let markers = [];

$(document).ready(function () {
    initMap();
    getMarkers();
});

function login() {

    let email = $("#email").val();
    let password = $("#password").val();

    let missing = checkInputs(email, password);
    if (missing.length !== 0) {
        swal("Write your " + missing, "Please, write your registration " + missing, "warning");
        return;
    }

    let json = JSON.stringify({email: email, password: password});

    $.ajax({
        type: 'POST',
        url: "./api/login.php",
        data: json,
        dataType: 'JSON',
        success: function (response, status, xhr) {
            window.location.href = '/cs425_hw4/index.html';
        },
        error: function (xhr, status, error) {
            if (xhr.status === 404) {
                swal("Sorry", "You have to register first!", "error");
            } else if (xhr.status === 401) {
                swal("Ohh", "Incorrect email or password.", "warning");
            }
        }
    });

}

function getMarkers() {

    $.ajax({
        type: 'GET',
        url: "./api/general/read.php",
        dataType: 'JSON',
        success: function (response, status, xhr) {
            parsePositions(response);
        },
        error: function (xhr, status, error) {
            swal("Sorry :(", "Something went wrong, could not show markers on map. Please, try it later.", "error");
        }
    });
}

// iteration throw json object
function parsePositions(objects) {

    for (let i = 0; i < objects.length; i++) {

        let latitude = parseFloat(objects[i].latitude);
        let longitude = parseFloat(objects[i].longitude);

        handlePositions(latitude, longitude);
    }
}

// create object and call method to show markes
function handlePositions(latitude, longitude) {
    let position = { lat: latitude, lng: longitude};

    markers.push(position);
    addMarker(position);
}

// checking the login input from user
function checkInputs(email, password) {

    let elength = email.length;
    let plength = password.length;


    if (elength === 0 && plength === 0) return "email and password";

    if (elength === 0) return "email";
    if (plength === 0) return "password";

    else return "";
}

// initialization of the map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.126413, lng: 33.429859}, // Cyprus
        zoom: 9
    });

    map.addListener('click', function (event) {
        // show modal and add data to it
    });

}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// upload image
function readURL(input) {

    const width = 250, height = 200;

    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#upload-photo')
                .attr('src', e.target.result)
                .width(width)
                .height(height);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Modal
let modal_instance;
document.addEventListener('DOMContentLoaded', function () {
    let modal = document.querySelector('.modal');
    modal_instance = M.Modal.init(modal);
});

// close or open modal
function toggleModal() {
    modal_instance.isOpen ? modal_instance.close() : modal_instance.open();
}

// Collapsible
let collapsible = document.querySelector('.collapsible.expandable');
let collapsible_instance = M.Collapsible.init(collapsible, {
    accordion: false
});



