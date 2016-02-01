<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Ingreso al Timesheet</title>
    <link rel="shortcut icon" href="assets/favicon.ico">
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <asset:stylesheet src="public/login.css"/>

</head>

<body>

<div ng-app="myApp" ng-controller="loginController">
    <!-- Login Card -->
    <div class="row">
        <div class="card login-card z-depth-2">
            <div class="card-content">
                <div class="row center-align">
                    <h1 class="center-align">Timesheet</h1>
                </div>

                %{--Logo--}%
                <div class="row center-align">
                    <img class="logo" src="assets/timesheet-logo.png">
                </div>

                %{--Error Message--}%
                <div class="row">
                    <div class="input-field col s12 center-align">
                        <span class="has-error">{{errorMsg}}</span>
                    </div>
                </div>

                %{--Form--}%
                <form class="col s12" name="loginForm" ng-submit="login()" novalidate>

                    %{--Username--}%
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">accessibility</i>
                            <input id="username" type="text" name="username" maxlength="25" ng-model="user"
                                   required>
                            <label for="username">Usuario</label>
                        </div>
                    </div>

                    %{--Password--}%
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

                    %{--Button--}%
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

<asset:javascript src="application.js"/>
<asset:javascript src="angular-controllers/login.js"/>

</body>
</html>