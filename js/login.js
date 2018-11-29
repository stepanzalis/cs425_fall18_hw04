$(document).ready(function () {
    sessionStorage.setItem('status','false');
});

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
            sessionStorage.setItem('status','true');
            window.location.href = '/map.html';
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

// checking the login input from user
function checkInputs(email, password) {

    let elength = email.length;
    let plength = password.length;


    if (elength === 0 && plength === 0) return "email and password";

    if (elength === 0) return "email";
    if (plength === 0) return "password";

    else return "";
}