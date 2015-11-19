<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Login</title>
    <asset:stylesheet src="shared/has-error.css"></asset:stylesheet>
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

    .logo {
        width: 100px;
        height: auto;
    }
    </style>
</head>

<body>

<div class="flex-container" ng-app="myApp" ng-controller="loginController">
    <!-- Login Card -->
    <div class="row">
        <div class="s12 m4 l8">
            <div class="card login-card z-depth-2">
                <div class="card-content">
                    <div class="row center-align">
                        <h1 class="center-align">Timesheet</h1>
                    </div>

                    <div class="row center-align">
                        <img class="logo" src="assets/timesheet-logo.png">
                    </div>

                    <div class="row">
                        <div class="input-field col s12 center-align">
                            <span class="has-error">{{errorMsg}}</span>
                        </div>
                    </div>

                    <form class="col s12" name="loginForm" ng-submit="login()" novalidate>

                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">accessibility</i>
                                <input id="username" type="text" name="username" maxlength="15" ng-model="user"
                                       required>
                                <label for="username">Usuario</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">vpn_key</i>
                                <input id="password" type="password" name="password" maxlength="8"
                                       ng-pattern="/[a-zA-Z]{8}/" ng-model="pass" required>
                                <label for="password"
                                       ng-class="{'has-error': loginForm.password.$error.pattern}">Contraseña <span
                                        ng-show="loginForm.password.$error.pattern"
                                        class="has-error">debe ser de ocho letras</span>
                                </label>
                            </div>
                        </div>

                        <div class="row center-align">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light" ng-disabled="loginForm.$invalid"
                                        ng-click="storeData()">Iniciar sesión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<asset:javascript src="application.js"></asset:javascript>
<asset:javascript src="public/login.js"></asset:javascript>

</body>
</html>