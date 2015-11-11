<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Login</title>
    <asset:javascript src="application.js"></asset:javascript>
    <asset:stylesheet src="vendor/materialize.min.css"></asset:stylesheet>

    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <style>

    body, html {
        margin: 0;
        min-height: 100%;
        background-image: radial-gradient(ellipse farthest-side at center top, #00a8ff 50%, #0078c0 75%, #004890 90%, #003078 100%);
    }

    .login-card {
        background-color: white;
        height: 600px;
        width: 500px;
        margin-top: 20px;
    }

    .flex-container {
        height: 100%;
        display: flex;
    }

    .material-icons {
        line-height: 1.5;
    }

    </style>
</head>

<body>

<div class="flex-container">
    <!-- Login Card -->
    <div class="row">
        <div class="s12 m4 l8">
            <div class="card login-card z-depth-2">
                <div class="card-content">
                    <div class="row center-align">
                        <h1 class="center-align">Timesheet</h1>
                    </div>

                    <div class="row center-align">
                        <img class="responsive-img" src="assets/account_box.png" width="145px;" height="145px;">
                    </div>

                    <form class="col s12" action="/login" method="post">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">email</i>
                                <input id="username" type="text" name="username">
                                <label for="username">Correo Electrónico</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">vpn_key</i>
                                <input id="password" type="password" name="password" maxlength="8">
                                <label for="password">Contraseña</label>
                            </div>
                        </div>

                        <div class="row center-align">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light">Iniciar sesión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>