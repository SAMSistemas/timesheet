<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Asignar</title>

    <asset:stylesheet href="public/assignation.css"></asset:stylesheet>

</head>

<body>

<div ng-controller="assignationController">

    <h3 class="card-title teal-text">Asignación de Personas a Proyectos</h3>

    <form name="myForm">

        <div class="div-wrapper row">
            <h6 class="col s6 label">Clientes habilitados</h6>

            <select name="clientSelect" class="col s6 browser-default" ng-change="changeClient()" ng-model="clientSelected"
                    ng-options="client.name for client in clients" required>
                <option value="" disabled>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="divider"></div>

        <div class="div-wrapper row">
            <h6 class="col s6 label">Proyectos habilitados</h6>

            <select name="projectSelect" class="col s6 browser-default" ng-change="changeProject()" ng-model="projectSelected"
                    ng-options="project.project_name for project in projects"
                    ng-disabled="myForm.clientSelect.$error.required" required>
                <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="divider"></div>

        <div class="div-wrapper row">
            <h6 class="col s6 label">Personas habilitados</h6>

            <select name="personSelect" class="col s6 browser-default" ng-change="changePerson()" ng-model="personSelected"
                    ng-options="person.name for person in people" ng-disabled="myForm.projectSelect.$error.required"
                    required>
                <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="center div-wrapper">
            <button class="waves-effect waves-light btn z-depth-0 center" ng-disabled="myForm.$invalid"
                    ng-class="{'has-error': myForm.$invalid}" ng-click="submit()"><i
                    class="material-icons left">assignment_turned_in</i>Asignar</button>
            <span>{{confirmation}}</span>
        </div>

    </form>

</div>

<asset:javascript src="angular-controllers/assignation.js"/>

</body>
</html>
