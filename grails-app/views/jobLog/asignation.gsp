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

    <form name="myForm">

        <div class="div-wrapper row">
            <h6 class="col s6 label">Clientes habilitadas</h6>

            <select name="clientSelect" class="col s6" ng-change="changeClient()" ng-model="clientSelected"
                    ng-options="client.name for client in clients" required>
                <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="divider"></div>

        <div class="div-wrapper row">
            <h6 class="col s6 label">Proyectos habilitados</h6>

            <select name="projectSelect" class="col s6" ng-change="changeProject()" ng-model="projectSelected"
                    ng-options="project.project_name for project in projects"
                    ng-disabled="myForm.clientSelect.$error.required" required>
                <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="divider"></div>

        <div class="div-wrapper row">
            <h6 class="col s6 label">Personas habilitados</h6>

            <select name="personSelect" class="col s6" ng-change="changePerson()" ng-model="personSelected"
                    ng-options="person.name for person in people" ng-disabled="myForm.projectSelect.$error.required"
                    required>
                <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="center div-wrapper">
            <button class="waves-effect waves-light btn z-depth-0 center" ng-disabled="myForm.$invalid"
                    ng-class="{'has-error': myForm.$invalid}" ng-click="submit()"><i
                    class="material-icons left">assignment_turned_in</i>Asignar</button>
        </div>

    </form>

</div>

<asset:javascript src="public/asignation.js"/>

</body>
</html>
