
// login
function login() {

    let email = $("#email").val();
    let password = $("#password").val();

    let missing = checkInputs(email, password);
    if (missing.length !== 0) {
        swal("Write your " + missing, "Please, write your registration " + missing, "warning");
        return;
    }

    if (!validEmail(email)) {
        swal("Invalid email!", "Please, write valid email address", "warning");
        return;
    }

    let json = JSON.stringify({email: email, password: password});

    $.ajax({
        type: 'POST',
        url: "./api/login.php",
        data: json,
        dataType: 'JSON',
        success: function (response, status, xhr) {
            sessionStorage.setItem('status', 'true');
            sessionStorage.setItem('token', response["token"]);
            window.location.href = '/cs425_hw4/map.html';
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

// check email
function validEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

