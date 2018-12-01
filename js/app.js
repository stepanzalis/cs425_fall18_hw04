let map;
let objects;
let selectedId;
let collapsible_instance;
let markers = [];

$(document).ready(function () {

    // Collapsible
    let collapsible = document.querySelector('.collapsible.expandable');
    collapsible_instance = M.Collapsible.init(collapsible, {
        accordion: false
    });

    initMap();
    getMarkers();
});

// logout
function logout() {
    sessionStorage.setItem('token', '');
    window.location.href = '/cs425_hw4/index.html';
}

// get all markers from API
function getMarkers() {

    $.ajax({
        type: 'GET',
        url: "./api/general/read.php",
        headers: {
            "Authorization": sessionStorage.getItem("token"),
        },
        dataType: 'JSON',
        success: function (response, status, xhr) {
            objects = response; // hold data in memory
            parsePositions(response);
        },
        error: function (xhr, status, error) {
            checkStatusCode(xhr.status);
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

// initializations of the map
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.126413, lng: 33.429859}, // Cyprus
        zoom: 9
    });

    map.addListener('click', function (event) {
        let latLng = event.latLng;

        newModalWithLatLng(latLng.lat(), latLng.lng());
        hideModalAction(1);
        collapsible_instance.open(0);

        toggleModal();
    });
}

function uploadPhoto() {

    let formData = new FormData();

    let file = $('#file-chooser')[0].files[0];
    formData.append('image', file);

    $.ajax({
        type: 'POST',
        url: "./api/general/upload.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response, status, xhr) {
            // done
        },
        error: function (xhr, status, error) {
            if (xhr.status === 401) {
                swal("Login", "Please, login first!", "error");
            } else {
                swal("Sorry :(", "Something went wrong, could not show markers on map. Please, try it later.", "error");
            }
        }
    });
}

// Adds a marker to the map and push to the array.
function addMarker(location, id) {

    let markerIcon = {
        url: './icons/ic_marker.png',
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0), // used if icon is a part of sprite, indicates image position in sprite
        anchor: new google.maps.Point(20, 40) // lets offset the marker image
    };

    let marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: markerIcon,
        id: id // custom attribute
    });

    // add listener to a marker
    google.maps.event.addListener(marker, 'click', function () {

        selectedId = id;

        let data = getMarkerDataById(id);
        if (data != null) {
            toggleModal();
            fillModal(data);
        }
    });

    markers.push(marker);
}

// fills the modal window with information about the PVß
function fillModal(marker) {

    $("#name").val(marker.name);
    $("#date").val(marker.date);
    $("#operator").val(marker.operator);
    $("#desc").val(marker.description);
    $("#lat").val(marker.latitude);
    $("#lot").val(marker.longitude);
    $("#address").val(marker.address);
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

    $("#upload-photo").attr("src", marker.photo_path);

    window.M.updateTextFields();
    hideModalAction(0) // hide save button
}

function newModalWithLatLng(lat, lng) {

    $("#name").val("");
    $("#date").val("");
    $("#operator").val("");
    $("#desc").val("");
    $("#lat").val(lat);
    $("#lot").val(lng);
    $("#address").val("");
    $("#power").val("");
    $("#production").val("");
    $("#co2").val("");
    $("#reimbursement").val("");
    $("#panels").val("");
    $("#sensors").val("");
    $("#azimuth").val("");
    $("#inclination").val("");
    $("#inverter").val("");
    $("#communication").val("");

    $("#upload-photo").attr("src", "https://via.placeholder.com/200");

    window.M.updateTextFields();
}

// Dynamic validator
// To add new required validated fields, just add name an selector
function validateFromInputs() {

    let inputs = new Map();
    let errors = [];

    // general + address
    inputs.set("Name", $("#name").val());
    inputs.set("Operator name", $("#operator").val());
    inputs.set("Address", $("#address").val());
    inputs.set("Latitude", $("#lat").val());
    inputs.set("Longitude", $("#lot").val());

    // efficiency
    inputs.set("System power", $("#power").val());
    inputs.set("Annual production", $("#production").val());
    inputs.set("CO2 avoided", $("#co2").val());
    inputs.set("Reimbursement", $("#reimbursement").val());

    for (const [key, value] of inputs.entries()) {
        if (value.length === 0) {
            errors.push(" " + key);
        }
    }

    if (errors.length === 0) return true;
    else {
        swal("Fill the inputs", errors.toString(), "warning");
        return false;
    }
}

/*
    Hide action button depending:
    0 -> hide "Save" (when detail)
    1 -> hide "Update" and "Delete" (when creating)
 */
function hideModalAction(action) {

    switch (action) {
        case 0:
            $("#save-panel").hide();
            $("#update-panel").show();
            $("#delete-panel").show();
            break;
        case 1:
            $("#save-panel").show();
            $("#update-panel").hide();
            $("#delete-panel").hide();
            break;
    }
}

// deletes marker
function deleteMarker() {

    let json = JSON.stringify({id: selectedId});

    $.ajax({
        type: 'DELETE',
        url: "./api/general/delete.php",
        data: json,
        dataType: 'JSON',
        headers: {
            "Authorization": sessionStorage.getItem("token"),
        },
        success: function (response, status, xhr) {
            deactivateMarkerById(selectedId);
            toggleModal();
            // getMarkers();
        },
        error: function (xhr, status, error) {
            checkStatusCode(xhr.status);
        }
    });

}

// deletes marker just from map
function deactivateMarkerById(id) {

    for (let i = 0; i < markers.length; i++) {
        let m = markers[i];
        if (id === m.id) {
            m.setMap(null);
            markers.splice(i, 1);
        }
    }
}

// deactivates all markers from map
function deactivateAllMarkers() {

    for (let i = 0; i < markers.length; i++) {

        let m = markers[i];
        m.setMap(null);
    }

    markers = [];
}

// updates marker
function updateMarker() {

    // code to json
    let json = getDataFromInputs();

    $.ajax({
        type: 'PUT',
        url: "./api/general/update.php",
        data: json,
        dataType: 'JSON',
        headers: {
            "Authorization": sessionStorage.getItem("token"),
        },
        success: function (response, status, xhr) {
            deactivateAllMarkers();
            getMarkers();
            toggleModal();
        },
        error: function (xhr, status, error) {
            checkStatusCode(xhr.status);
        }
    });

}

// returns data from an modal pop up
function getDataFromInputs() {

    // check file name
    let selector = $('#file-chooser')[0].files[0];
    let file = selector == null ? "" : selector.name;

    let data = {
        "id": selectedId,
        "name": $("#name").val(),
        "latitude": $("#lat").val(),
        "longitude": $("#lot").val(),
        "operator": $("#operator").val(),
        "date": $("#date").val(),
        "description": $("#desc").val(),
        "photo_path": "./images/" + "" + file, // photo path
        "address": $("#address").val(),
        "ef_system_power": $("#power").val(),
        "ef_annual_production": $("#production").val(),
        "ef_co2_avoided": $("#co2").val(),
        "ef_reimbursement": $("#reimbursement").val(),
        "ha_solar_panel": $("#panels").val(),
        "ha_azimuth_angle": $("#azimuth").val(),
        "ha_inclination_angle": $("#inclination").val(),
        "ha_communication": $("#sensors").val(),
        "ha_inverter": $("#inverter").val(),
        "ha_sensors": $("#sensors").val()
    };

    return JSON.stringify(data);
}

// find a marker by ID in response [objects]
function getMarkerDataById(id) {

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];

        if (id === obj.id) {
            return obj;
        }
    }

    return null;
}

// uploads image
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

function createNewMarker() {

    if (!validateFromInputs()) {
        return;
    }

    let json = getDataFromInputs();

    $.ajax({
        type: 'POST',
        url: "./api/general/create.php",
        data: json,
        dataType: 'JSON',
        headers: {
            "Authorization": sessionStorage.getItem("token"),
        },
        success: function (response, status, xhr) {
            toggleModal();
            deactivateAllMarkers();
            getMarkers();
            uploadPhoto();
        },
        error: function (xhr, status, error) {
            checkStatusCode(xhr.status);
        }
    });
}

function checkStatusCode(code) {
    if (code === 401) {
        swal({
            title: "Sorry",
            text: "You have to log in first",
            type: "error"
        }).then(function () {
            window.location.replace("/index.html");
        });
    } else {
        swal("Sorry :(", "Something went wrong, could not show markers on map. Please, try it later.", "error");
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




