let map;

$(document).ready(function () {
    initMap();
    toggleModal();
});

function login() {

    let email = $("#email").val();
    let password = $("#password").val();

    check_inputs(email, password);

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

function check_inputs(email, password) {
    if (email.empty() || password.isEmpty) {
        return false;
    } else return true;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.126413, lng: 33.429859}, // Cyprus
        zoom: 9
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

function toggleModal() {
    modal_instance.isOpen ? modal_instance.close() : modal_instance.open();
}

// Collapsible
let collapsible = document.querySelector('.collapsible.expandable');
let collapsible_instance = M.Collapsible.init(collapsible, {
    accordion: false
});



