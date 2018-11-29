let map;
let objects;
let selectedId;
let markers = [];

$(document).ready(function () {

    // checkLoggedIn();

    initMap();
    getMarkers();
});

// checks if user is logged in
function checkLoggedIn() {

    if (sessionStorage.getItem('status') === 'false') {
        swal({
            title: "Sorry",
            text: "You have to log in first",
            type: "error"
        }).then(function () {
            window.location.replace("/cs425_hw4/");
        });
    }
}

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

// initializations of the map
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
        id: id // custom attribute
    });

    // add listener to a marker
    google.maps.event.addListener(marker, 'click', function () {

        selectedId = id;

        let mar = findMarkerById(id);
        if (mar != null) {
            toggleModal();
            fillModal(mar);
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

/*
    Hide action button depending:
    0 -> hide "Save" (when detail)
    1 -> hide "Update" and "Delete" (when creating)
 */
function hideModalAction(action) {

    switch (action) {
        case 0:
            $("#save-panel").hide();
            break;
        case 1:
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
        success: function (response, status, xhr) {
            toggleModal();
            deactivateMarkers(selectedId);
            getMarkers();
        },
        error: function (xhr, status, error) {
            swal("Sorry", "Something went wrong!", "error");
        }
    });
}

// deletes marker just from map
function deactivateMarkers(id) {

    for (let i = 0; i < markers.length; i++) {
        let m = markers[i];

        if (id === m.id){
            m.setMap(null);
        }
    }
}

// deactivates all markers from map
function deleteMarkersFromMap() {

    for (let i = 0; i < markers.length; i++) {

        let m = markers[i];
        m.setMap(null);
    }
}

// updates marker
function updateMarker() {

    // code to json
    let json = JSON.stringify(getDataFromInput());

    $.ajax({
        type: 'PUT',
        url: "./api/general/update.php",
        data: json,
        dataType: 'JSON',
        success: function (response, status, xhr) {
            toggleModal();
            deleteMarkersFromMap();
            getMarkers();
        },
        error: function (xhr, status, error) {
            swal("Sorry", "Something went wrong!", "error");
        }
    });

}

// returns data from an modal pop up
function getDataFromInput() {

    return {
        "id": selectedId,
        "name": $("#name").val(),
        "latitude": $("#lat").val(),
        "longitude": $("#lot").val(),
        "operator": $("#operator").val(),
        "date": $("#date").val(),
        "description": $("#desc").val(),
        "photo_path": "",
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



