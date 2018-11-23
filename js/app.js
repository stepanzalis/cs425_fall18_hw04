let map;

$(document).ready(function() {
    initMap();
});


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.126413, lng: 33.429859}, // Cyprus
        zoom: 9
    });
}

