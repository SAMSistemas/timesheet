<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'holiday.label', default: 'Holiday')}"/>
    <title>Feriados del año</title>

    <asset:stylesheet src="public/holiday.css"/>

</head>

<body>

<div ng-controller="holidayController">

    <div id='calendar'></div>

    <!--Create Modal-->
    <div id="create_modal" class="modal modal-medium">
        <form name="createForm" ng-submit="create()" novalidate>
            <div class="modal-content">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title">Crear feriado</h2>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input id="create_name" type="text" name="name" ng-model="eventToCreate.title" required>
                        <label ng-class="{'has-error': createForm.name.$invalid}">Nombre
                            <span ng-show="createForm.name.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Date Field--}%
                <div class="row">
                    <div class="col s12">
                        <input id="create_date" type="text" ng-model="eventToCreate.start" disabled>
                        <label for="create_date">Fecha</label>
                    </div>
                </div>

                %{--Button Row--}%
                <div class="modal-footer">
                    <button class="modal-action modal-close btn-flat disabled" ng-disabled="createForm.$invalid"
                            ng-class="{'teal-text teal-hover': createForm.$valid}">Guardar</button>
                    <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
                </div>

            </div>
        </form>
    </div>

    <!--Edit Modal-->
    <div id="edit_modal" class="modal modal-large">
        <form name="editForm" ng-submit="update()" novalidate>
            <div class="modal-content">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title">Editar feriado</h2>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input id="edit_name" type="text" name="name" ng-model="eventToUpdate.title" required>
                        <label ng-class="{'has-error': editForm.name.$invalid}">Nombre
                            <span ng-show="editForm.name.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Date Field--}%
                <div class="row">
                    <div class="col s12">
                        <input id="edit_date" type="text" ng-model="eventToUpdate.start" disabled>
                        <label for="edit_date">Fecha</label>
                    </div>
                </div>

                %{--Button Row--}%
                <div class="modal-footer">
                    <button class="modal-action modal-close btn-flat disabled" ng-disabled="editForm.$invalid"
                            ng-class="{'teal-text teal-hover': editForm.$valid}">Guardar</button>
                    <a href class="modal-action modal-close btn-flat teal-text teal-hover"
                       ng-click="delete()">Eliminar</a>
                    <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
                </div>

            </div>
    </div>

</div>

<asset:javascript src="angular-controllers/holiday.js"/>

</body>
</html>