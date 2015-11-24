<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'taskType.label', default: 'Tipo de Tareas')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <asset:stylesheet src="public/tasktype.css"/>

</head>

<body>

<div ng-controller="taskTypeController">

    <h3 class="card-title teal-text">Lista de Tipos de Tarea</h3>

    <a href="#create-modal" class="waves-effect waves-light btn btn-create-padding modal-trigger" ng-click="new()"><i
            class="material-icons left">note_add</i>Crear</a>

    <table class="responsive-table striped centered">

        <thead>
        <tr class="tr-header-width-and-height">
            <th class="width-10"></th>
            <th class="width-40"><a href ng-click="reverseOrder(name)">Nombre</a></th>
            <th class="width-25"><a href ng-click="reverseOrder(enabled)">Habilitado</a></th>
            <th class="width-25"></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding width-10"></th>
            <th class="th-filter-padding width-40">
                <input-field-text ng-id="search_name" ng-model="search.name"
                                  ng-placeholder="Ingrese Nombre"></input-field-text>
            </th>
            <th class="th-filter-padding width-25">
                <select-status ng-model="status"></select-status>
            </th>
            <th class="th-filter-padding width-25"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="taskType in taskTypes | orderBy:sortType:sortReverse | filter:search:startsWith | filterByStatus:status"
            class="tr-body-width-and-height">
            <td class="width-10"><i class="material-icons center material-icons-line-heigth">assignment</i></td>
            <td class="width-40 truncate">{{ taskType.name | uppercase }}</td>
            <td class="width-25">
                <div class="switch">
                    <label>
                        <input disabled type="checkbox" ng-model="taskType.enabled">
                        <span class="lever"></span>
                    </label>
                </div>
            </td>
            <td class="width-25">
                <a href="#edit-modal" ng-click="edit(taskType)"
                   class="waves-effect btn-flat btn-edit-padding teal-text teal-hover z-depth-0 modal-trigger"><i
                        class="material-icons left icon-margin">mode_edit</i>Editar</a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create Modal-->
    <div id="create-modal" class="modal modal-large">
        <form name="createForm" ng-submit="create()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title teal-text">Crear tipo de tarea</h2>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="30" ng-model="taskTypeToCreate.name"
                               required available url-to-check="/taskType/existsName/">
                        <label ng-class="{'has-error': createForm.name.$invalid}">Nombre
                            <span ng-show="createForm.name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="createForm.name.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="enable" type="checkbox" class="filled-in" ng-model="taskTypeToCreate.enabled">
                        <label for="enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="createForm.$invalid"
                        ng-class="{'teal-text teal-hover': createForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

    <!--Edit Modal-->
    <div id="edit-modal" class="modal modal-large">
        <form name="editForm" ng-submit="update()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title teal-text">Editar tipo de tarea</h2>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="30" ng-model="taskTypeToEdit.name"
                               required available original-value="taskType.name" url-to-check="/taskType/existsName/">
                        <label ng-class="{'has-error': editForm.name.$invalid}">Nombre
                            <span ng-show="editForm.name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="editForm.name.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="edit_enable" type="checkbox" class="filled-in" ng-model="taskTypeToEdit.enabled">
                        <label for="edit_enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="editForm.$invalid"
                        ng-class="{'teal-text teal-hover': editForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

</div>

<asset:javascript src="angular-controllers/tasktype.js"/>

</body>
</html>