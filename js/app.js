let map;

$(document).ready(function () {
    initMap();
    toggleModal();
});

function login() {

    let email = $("#email").val();
    let password = $("#password").val();

    let missing = checkInputs(email, password);
    if (!missing.isEmpty) {
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

function checkInputs(email, password) {

    let elength = email.length;
    let plength = password.length;


    if (elength === 0 && plength === 0) return "email and password";

    if (elength === 0) return "email";
    if (plength === 0) return "password";

    else return "";
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



