<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><g:layoutTitle default="Grails"/></title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <asset:stylesheet src="application.css"/>
    <asset:javascript src="application.js"/>

    <g:layoutHead/>
    <style>

        .select-modal input.select-dropdown {
            color: #757575 !important;
            border-color: #bdbdbd !important;
            margin-bottom: 30px !important;
            line-height: 3rem !important;
        }

        .select-modal span.caret {
            top: 7px !important;
            color: #757575 !important;
        }

        .combodate select {
            display: inline;
            text-align: center;
            color: #009688;
            width: 20% !important;
        }

        .combodate{
            margin-left: 10%;
        }

        #clientSelect{
            display: inline;
        }

        #projectSelect{
            display: inline;
        }
    </style>

</head>

<body ng-app="myApp">

<header>

    <nav class="fixed blue darken-3">
        <div class="container">
            <div class="nav-wrapper">
                <a class="brand-logo">Timesheet</a>
                <ul id="nav-botton-ul" class="right hide-on-med-and-down">
                    <li id="nav-botton-li"><a href="/logout" class="waves-effect waves-light btn">Cerrar Sesión</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <a href="#" data-activates="side-nav" class="button-collapse top-nav hide-on-large-only"><i
                class="mdi-navigation-menu"></i></a>
    </div>


    <ul id="side-nav" class="side-nav fixed">
        <li class="user-panel li-no-hover">
            <div class="user-info">
                <div class="row user-picture-padding">
                    <img class="responsive-img left" src="/assets/account_circle.png" height="75px" width="75px">
                </div>

                <div class="row user-data-padding">
                    <span class="white-text truncate">Leandro Alessandrello</span>
                    <span class="white-text truncate">leandro.alessandrello@samsistemas.com.ar</span>
                </div>
            </div>
        </li>
        <li>
            <a href="/person" class="waves-effect waves-teal btn-flat"><i class="material-icons left">people</i>Personal</a>
        </li>
        <li>
            <a href="/client" class="waves-effect waves-teal btn-flat"><i class="material-icons left">business</i>Clientes</a>
        </li>
        <li>
            <a href="/project" class="waves-effect waves-teal btn-flat"><i class="material-icons left">work</i>Proyectos</a>
        </li>
        <li>
            <a href="/taskType" class="waves-effect waves-teal btn-flat"><i class="material-icons left">assignment</i>Tipo de Tarea</a>
        </li>
        <li>
            <a href="/jobLog/asignation" class="waves-effect waves-teal btn-flat"><i class="material-icons left">today</i>Asignar</a>
        </li>
        <li>
            <a id="modalTrigger" href="#report-modal" class="waves-effect waves-teal btn-flat  modal-trigger"><i class="material-icons left">book</i>Reportes</a>
        </li>
        <li>
            <a href="/holiday" class="waves-effect waves-teal btn-flat"><i class="material-icons left">today</i>Feriados</a>
        </li>
    </ul>

</header>

<div  ng-controller="mainController" id="report-modal" class="modal" style="width: 500px;">
    <div class="modal-content">
        <h2 class="card-title" style="padding-left: 15px; padding-bottom: 20px;">Reporte de horas</h2>
        %{--Radio Buttons--}%
        <div class="row align-center" style="padding-bottom: 20px;">
            <div class="input-field-modal col s12">
                <input class="with-gap" name="group1" type="radio" id="test3"/>
                <label for="test3" class="label-radioButton">Reporte de horas por proyecto</label>
            </div>
        </div>

        <div class="row align-center">
            <div class="input-field-modal col s12">
                <label class="label-name">Cliente</label>
                %{--<select id="clientSelect" class="select-modal" ng-change="changeClient()"--}%
                        %{--ng-model="clientSelected" ng-options="client.name for client in clients track by client.name">--}%
                %{--</select>--}%
                <select id="clientSelect" class="col s12" ng-model="ttttttttttttttttt" ng-change="changeClient()" ng-options="client.name for client in clients">
                    <option value="" selected>- Elegí una de las siguientes opciones -</option>
                </select>

            </div>
        </div>


        %{--Projects Select--}%
        <div class="row align-center">
            <div class="input-field-modal col s12">
                <label class="label-name">Proyecto</label>
                %{--<select id="projectSelect" class="select-modal" ng-model="projectSelected" ng-options="project.project_name for project in projects" >--}%
                <select id="projectSelect" class="col s12" ng-model="projectSelected" ng-options="project.project_name for project in projects">
                    <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
                </select>

            </div>
        </div>

        %{--Date Selection--}%

        <div class="row align-center">
            <div class="input-field-modal col s12">
                <label class="label-name left">Desde </label>
                <div class="row">
                    <span id="dateFrom" ng-combo-date-picker="exp" ng-model="fromDateSelected" ng-months="{{ months }}"
                          ng-min-date="2010-01-01" ng-max-date="2015-12-31"></span>
                </div>
            </div>
        </div>

        <div class="row align-center">
            <div class="input-field-modal col s12">
                <label class="label-name left">Hasta </label>
                <div class="row">
                    <span id="dateTo" ng-combo-date-picker="exp" ng-model="toDateSelected" ng-months="{{ months }}"
                          ng-min-date="2010-01-01"></span>
                </div>
            </div>
        </div>

    </div>
    <div class="modal-footer" style="padding-right: 50px;">
        <a href="/jobLog/projectForHour/" class=" modal-action modal-close waves-effect waves-teal btn-flat" ng-click="export()">Exportar</a>
        <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Cancelar</a>
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
<asset:javascript src="public/main.js"/>
</body>
</html>
