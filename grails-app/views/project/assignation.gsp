<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Asignación de Personas</title>

    <asset:stylesheet src="public/assignation.css"/>

</head>

<body>

<div ng-controller="AssignationController as assignCtrl">

    <h3 class="card-title teal-text">Asignación de Personas a Proyectos</h3>

    <form name="assignCtrl.form">

        <div class="div-wrapper row">
            <h6 class="col s6 label">Clientes habilitados</h6>

            <select name="clientSelect" class="col s6 browser-default" ng-change="assignCtrl.changeClient()"
                    ng-model="assignCtrl.clientSelected" ng-options="client.name for client in assignCtrl.clients" required>
                <option value="" disabled>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="divider"></div>

        <div class="div-wrapper row">
            <h6 class="col s6 label">Proyectos habilitados</h6>

            <select name="projectSelect" class="col s6 browser-default" ng-change="assignCtrl.changeProject()"
                    ng-model="assignCtrl.projectSelected" ng-options="project.name for project in assignCtrl.projects"
                    ng-disabled="assignCtrl.form.clientSelect.$error.required" required>
                <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="divider"></div>

        <div class="div-wrapper row">
            <h6 class="col s6 label">Personas habilitados</h6>

            <select name="personSelect" class="col s6 browser-default" ng-change="assignCtrl.changePerson()"
                    ng-model="assignCtrl.personSelected" ng-options="person.name for person in assignCtrl.people"
                    ng-disabled="assignCtrl.form.projectSelect.$error.required" required>
                <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
            </select>
        </div>

        <div class="center div-wrapper">
            <button class="waves-effect waves-light btn z-depth-0 center" ng-disabled="assignCtrl.form.$invalid"
                    ng-class="{'has-error': assignCtrl.form.$invalid}" ng-click="assignCtrl.submit()"><i
                    class="material-icons left">assignment_turned_in</i>Asignar</button>
            <span>{{assignCtrl.confirmation}}</span>
        </div>

    </form>

</div>

<asset:javascript src="angular-controllers/assignation.js"/>

</body>
</html>
