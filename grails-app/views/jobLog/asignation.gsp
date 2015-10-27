<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Asignar</title>
    <style>
    select {
        display: inherit;
    }

    /** Select styles **/
    .select-wrapper input.select-dropdown {
        color: #9e9e9e !important;
        padding-top: 0 !important;
        border-color: transparent !important;
        border-bottom-width: 0 !important;
        margin: 0 !important;
        text-align: center !important;
    }

    .dropdown-content {
        overflow-x: hidden;
        overflow-y: scroll;
        height: 150px;
    }

    .select-wrapper {
        width: 50%;
    }

    .title {
        padding: 30px 25px 30px 25px;
    }

    .row {
        margin-top: 20px;
    }

    .div-wrapper {
        padding: 30px 25px 30px 25px;
    }

    .label {
        text-align: center;
        height: 45px !important;
        margin: 0 !important;
        line-height: 45px !important;
        color: #1565c0 !important;
    }
    </style>
</head>

<>

<div ng-app="myApp" ng-controller="mainController">

    <div class="card large" style="height: 650px;">
        <div class="card-container container">

            <div class="title">
                <h3 class="card-title">Asignación de Personas a Proyectos</h3>
            </div>

            <div class="divider"></div>

            <div class="div-wrapper row">
                <h6 class="col s6 label">Clientes habilitadas</h6>

                <select class="col s6" ng-change="changeClient()" ng-model="clientSelected"
                        ng-options="client.name for client in clients">
                </select>
            </div>

            <div class="divider"></div>

            <div class="div-wrapper row">
                <h6 class="col s6 label">Proyectos habilitados</h6>

                <select class="col s6" ng-change="changeProject()" ng-model="projectSelected"
                        ng-options="project.project_name for project in projects">
                </select>
            </div>

            <div class="divider"></div>

            <div class="div-wrapper row">
                <h6 class="col s6 label">Personas habilitados</h6>

                <select class="col s6" ng-change="changePerson()" ng-model="personSelected"
                        ng-options="person.name for person in people">
                </select>
            </div>

            <div class="divider"></div>

            <div class="center div-wrapper">
                <a href class="waves-effect waves-light btn z-depth-0 center" ng-click="submit()"><i
                        class="material-icons left">assignment_turned_in</i>Asignar</a>
            </div>

        </div>
    </div>
</div>

<asset:javascript src="public/asignation.js"/>

</body>
</html>
