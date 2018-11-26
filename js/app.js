let map;

$(document).ready(function () {
    initMap();
    toggleModal();

    // $('.collapsible').collapse({options: {accordion: false}});
    $('.datepicker').datepicker();

});


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.126413, lng: 33.429859}, // Cyprus
        zoom: 9
    });
}

// Modal
let modal_instance;
document.addEventListener('DOMContentLoaded', function () {
    let modal = document.querySelector('.modal');
    modal_instance = M.Modal.init(modal);
});

let elem = document.querySelector('.collapsible.expandable');
let instance = M.Collapsible.init(elem, {
    accordion: false
});

function toggleModal() {
    modal_instance.isOpen ? modal_instance.close() : modal_instance.open();
}


