<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen"/>
    <link rel="stylesheet" href="css/main.css">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">

    <title>VP | Login</title>
</head>
<body>

<?php

require_once("config/config.php");

if (isset($_POST['submit'])) {

    // TODO: change to REST api

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $sql = "select * from users where email = '" . $email . "'";

    $rs = mysqli_query($conn, $sql);
    $numRows = mysqli_num_rows($rs);

    if ($numRows == 1) {
        $row = mysqli_fetch_assoc($rs);

        if (password_verify($password, $row['password'])) {
            header("location: index.html");
        } else {
            echo "<p>Wrong Password</p>";
        }
    } else {
        echo "<p>Not found</p>";
    }
}
?>

<nav>
    <div class="nav-wrapper grey darken-4">
        <a href="index.html" class="brand-logo">VP Login</a>
    </div>
</nav>

<div class="valign-wrapper row login-box" style="margin-top: 80px">

    <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">

        <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">

            <div class="card-content">
                <span class="card-title">Log in to enter</span>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="email">Email address</label>
                        <input type="email" class="validate" name="email" id="email"/>
                    </div>
                    <div class="input-field col s12">
                        <label for="password">Password </label>
                        <input type="password" class="validate" name="password" id="password"/>
                    </div>
                </div>
            </div>
            <div class="card-action right-align">
                <input type="reset" id="reset" class="btn-flat grey-text waves-effect">
                <button class="btn green waves-effect waves-light" type="submit" name="submit">Submit</button>
            </div>

        </form>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgA1PL3Gjc7Kf7ZJQRRR7nt66DZYl4X8A&callback=initMap"></script>
<script type="text/javascript" src="js/app.js"></script>
</body>

</html>