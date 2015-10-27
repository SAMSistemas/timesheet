<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Asignar</title>

    <asset:stylesheet href="public/asignation.css"></asset:stylesheet>
</head>

<body>

<div ng-app="myApp" ng-controller="mainController">

    <h3 class="card-title">Asignación de Personas a Proyectos</h3>

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

    <div class="center div-wrapper">
        <a href class="waves-effect waves-light btn z-depth-0 center" ng-click="submit()"><i
                class="material-icons left">assignment_turned_in</i>Asignar</a>
    </div>

</div>

<asset:javascript src="public/asignation.js"/>

</body>
</html>
