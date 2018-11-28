let map;
let objects;

$(document).ready(function () {
    initMap();
    getMarkers();
});

// get all markers from API
function getMarkers() {

    $.ajax({
        type: 'GET',
        url: "./api/general/read.php",
        dataType: 'JSON',
        success: function (response, status, xhr) {
            objects = response; // hold data in memory
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

        let obj = objects[i];

        let latitude = parseFloat(obj.latitude);
        let longitude = parseFloat(obj.longitude);

        handlePositions(latitude, longitude, obj.id);
    }
}

// create object and call method to show markers
function handlePositions(latitude, longitude, id) {

    let position = {lat: latitude, lng: longitude};
    addMarker(position, id);
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

    // TODO: put data to modal
    map.addListener('click', function (event) {
        let latLng = event.latLng;

        alert(latLng);

        toggleModal();
    });
}

// Adds a marker to the map and push to the array.
function addMarker(location, id) {

    let marker = new google.maps.Marker({
        position: location,
        map: map,
        id: id
    });

    // add listener to a marker
    google.maps.event.addListener(marker, 'click', function () {

        let marker = findMarkerById(id);
        if (marker != null) {
            toggleModal();
            fillModal(marker);
        }
    });
}

// filing the modal window with information about the PVß
function fillModal(marker) {

    $("#solar-name").val(marker.name);
    $("#date").val(marker.date);
    $("#operator").val(marker.operator);
    $("#desc").val(marker.description);
    $("#lat").val(marker.latitude);
    $("#lot").val(marker.longitude);
    $("#power").val(marker.ef_system_power);
    $("#production").val(marker.ef_annual_production);
    $("#co2").val(marker.ef_co2_avoided);
    $("#reimbursement").val(marker.ef_reimbursement);
    $("#panels").val(marker.ha_solar_panel);
    $("#sensors").val(marker.ha_sensors);
    $("#azimuth").val(marker.ha_azimuth_angle);
    $("#inclination").val(marker.ha_inclination_angle);
    $("#inverter").val(marker.ha_inverter);
    $("#communication").val(marker.ha_communication);

    window.M.updateTextFields();
    hideModalAction(0) // hide save button
}

function hideModalAction(action) {

    switch (action) {
        case 0:
            $("#save-panel").hide();
            break;
        case 1:
            $("#update-panel").hide();
            break;
        case 2:
            $("#delete-panel").hide();
            break;
    }
}


// find a marker by ID in response [objects]
function findMarkerById(id) {

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];

        if (id === obj.id) {
            return obj;
        }
    }

    return null;
}

// login
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



