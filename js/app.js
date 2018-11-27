let map;

$(document).ready(function () {
    initMap();
    toggleModal();

});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.126413, lng: 33.429859}, // Cyprus
        zoom: 9
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#upload-photo')
                .attr('src', e.target.result)
                .width(250)
                .height(200);
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

// Collapsible
let collapsible = document.querySelector('.collapsible.expandable');
let collapsible_instance = M.Collapsible.init(collapsible, {
    accordion: false
});

function toggleModal() {
    modal_instance.isOpen ? modal_instance.close() : modal_instance.open();
}


