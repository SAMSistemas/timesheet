<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><g:layoutTitle default="Grails"/></title>
    <link rel="shortcut icon" href="assets/favicon.ico">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <asset:stylesheet src="public/main.css"/>
    <asset:javascript src="application.js"/>

    <g:layoutHead/>

</head>

<body ng-app="myApp" ng-controller="MainController as mainCtrl">

<header>

    <nav class="fixed blue darken-3" ng-controller="LoginController as loginCtrl">
        <div class="container">
            <div class="nav-wrapper">
                <a class="brand-logo">Timesheet</a>
                <ul id="nav-botton-ul" class="right hide-on-med-and-down">
                    <li id="nav-botton-li"><a href class="waves-effect waves-light btn"
                                              ng-click="loginCtrl.logout()">Cerrar Sesión</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <a href="#" data-activates="side-nav" class="button-collapse top-nav hide-on-large-only"><i
                class="mdi-navigation-menu"></i></a>
    </div>


    <ul id="side-nav" class="side-nav fixed">
        <li class="teal waves-teal">
            <div class="row user-picture-padding">
                <img class="user-picture responsive-img left" src="/assets/account_circle.png">
            </div>

            <div class="row user-data-padding" ng-controller="SessionInfoController as sessionInfoCtrl">
                <span class="user-info white-text truncate">{{ sessionInfoCtrl.name }}</span>
                <span class="user-info white-text truncate">{{ sessionInfoCtrl.user }}@samsistemas.com.ar</span>
            </div>
        </li>
        <li>
            <a href="/person" class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">people</i>Personal</a>
        </li>
        <li>
            <a href="/client" class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">business</i>Clientes</a>
        </li>
        <li>
            <a href="/project" class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">work</i>Proyectos</a>
        </li>
        <li>
            <a href="/taskType" class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">assignment</i>Tipo de Tarea</a>
        </li>
        <li>
            <a href="/projects/assignation" class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">today</i>Asignar</a>
        </li>
        <li>
            <a id="modalTrigger" href="#report-modal" class="waves-effect waves-teal btn-flat modal-trigger"
               ng-click="mainCtrl.clean()">
                <i class="material-icons left">book</i>Reportes</a>
        </li>
        <li>
            <a href="/holiday" class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">today</i>Feriados</a>
        </li>
    </ul>

</header>

<div id="report-modal" class="modal modal-large">
    <div class="modal-content">
        <h2 class="card-title teal-text modal-card-title">Reporte de horas</h2>

        %{--Client Select--}%
        <div class="row">
            <div class="col s12">
                <select id="clientSelect" class="col s12 browser-default" ng-model="mainCtrl.clientSelected"
                        ng-change="mainCtrl.changeClient()" ng-options="client.name for client in mainCtrl.clients">
                    <option value="" selected>- Elegí una de las siguientes opciones -</option>
                </select>
                <label class="modal-label modal-label-select">Cliente</label>
            </div>
        </div>

        %{--Projects Select--}%
        <div class="row">
            <div class="col s12">
                <select id="projectSelect" class="col s12 browser-default" ng-model="mainCtrl.projectSelected"
                        ng-options="project.name for project in mainCtrl.projects">
                    <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
                </select>
                <label class="modal-label modal-label-select">Proyecto</label>
            </div>
        </div>

        %{--From Date Selection--}%
        <div class="row">
            <div class="col s12">
                <ng-combo-date-picker id="dateFrom" class="modal-date" ng-model="mainCtrl.fromDateSelected"
                                      ng-months="{{ mainCtrl.months }}" ng-min-date="2010-01-01"
                                      ng-max-date="2020-12-31"></ng-combo-date-picker>
                <label class="modal-label modal-label-date left">Desde</label>
            </div>
        </div>

        %{--To Date Selection--}%
        <div class="row">
            <div class="col s12">
                <ng-combo-date-picker id="dateTo" class="modal-date" ng-model="mainCtrl.toDateSelected"
                                      ng-months="{{ mainCtrl.months }}" ng-min-date="2010-01-01"
                                      ng-max-date="2020-12-31"></ng-combo-date-picker>
                <label class="modal-label modal-label-date left">Hasta</label>
            </div>
        </div>

        %{--Radio Buttons--}%
        <div class="row">
            <div class="col s12">
                <input class="with-gap" name="group1" type="radio" id="test3"/>
                <label for="test3"
                       class="modal-label modal-label-radioButton">Reporte de horas por proyecto</label>
            </div>
        </div>

    </div>

    <div class="modal-footer modal-footer-padding">
        <a href class="modal-action modal-close btn-flat teal-text teal-hover"
           ng-click="mainCtrl.export()">Exportar</a>
        <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
    </div>
</div>

<section>
    <div class="container">
        <div class="card z-depth-2">
            <div class="card-content card-content-padding"><g:layoutBody/></div>
        </div>
    </div>
</section>

<script>
    $(".button-collapse").sideNav();
</script>

<asset:javascript src="angular-controllers/main.js"/>
<asset:javascript src="angular-controllers/login.js"/>
<asset:javascript src="angular-controllers/ts-session-info.js"/>

</body>
</html>
