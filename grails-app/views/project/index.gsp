<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'project.label', default: 'Proyectos')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <asset:stylesheet src="public/project.css"/>

</head>

<body>

<div ng-controller="ProjectController as projectCtrl">

    <h3 class="card-title teal-text">Lista de Proyectos</h3>

    <a href="#create-modal" class="waves-effect waves-light btn btn-create-padding modal-trigger"
       ng-click="projectCtrl.new()"><i
            class="material-icons left">add</i>Crear</a>

    <table class="responsive-table striped centered" ng-controller="TsTableController as tableCtrl">

        <thead>
        <tr class="tr-header-width-and-height">
            <th class="width-5"></th>
            <th class="width-15"><a href ng-click="tableCtrl.reverseOrder(client)">Cliente</a></th>
            <th class="width-15"><a href ng-click="tableCtrl.reverseOrder(name)">Nombre</a></th>
            <th class="width-15"><a href ng-click="tableCtrl.reverseOrder(short_name)">Sigla</a></th>
            <th class="width-15"><a href ng-click="tableCtrl.reverseOrder(start_date)">Fecha Inicio</a></th>
            <th class="width-20"><a href ng-click="tableCtrl.reverseOrder(enabled)">Habilitado</a></th>
            <th class="width-15"></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding width-5"></th>
            <th class="th-filter-padding width-15">
                <input-field-text ng-id="search_client" ng-model="tableCtrl.search.client.name"
                                  ng-placeholder="Ingrese Cliente"></input-field-text>
            </th>
            <th class="th-filter-padding width-15">
                <input-field-text ng-id="search_name" ng-model="tableCtrl.search.project_name"
                                  ng-placeholder="Ingrese Nombre"></input-field-text>
            </th>
            <th class="th-filter-padding width-15">
                <input-field-text ng-id="search_sname" ng-model="tableCtrl.search.short_name"
                                  ng-placeholder="Ingrese Sigla"></input-field-text>
            </th>
            <th class="th-filter-padding width-15"></th>
            <th class="th-filter-padding width-20">
                <select-status ng-model="tableCtrl.status"></select-status>
            </th>
            <th class="th-filter-padding width-15"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="project in projectCtrl.projects | orderBy:tableCtrl.sortType:tableCtrl.sortReverse |
            filter:tableCtrl.search:tableCtrl.startsWith | filterByStatus:tableCtrl.status"
            class="tr-body-width-and-height">
            <td class="width-5"><i class="material-icons center material-icons-line-heigth">work</i></td>
            <td class="width-15 truncate">{{ project.client.name }}</td>
            <td class="width-15 truncate">{{ project.name }}</td>
            <td class="width-15 truncate">{{ project.short_name }}</td>
            <td class="width-15 truncate">{{ project.start_date | date: 'dd-MM-yyyy'}}</td>
            <td class="width-20">
                <div class="switch">
                    <label>
                        <input disabled type="checkbox" ng-model="project.enabled">
                        <span class="lever"></span>
                    </label>
                </div>
            </td>
            <td class="width-15">
                <a href class="btn-flat btn-edit-padding z-depth-0 disabled" ng-show="!project.client.enabled"><i
                        class="material-icons left icon-margin">mode_edit</i>Editar</a>
                <a href="#edit-modal" ng-click="projectCtrl.edit(project)" ng-show="project.client.enabled"
                   class="waves-effect btn-flat btn-edit-padding z-depth-0 teal-text teal-hover modal-trigger"><i
                        class="material-icons left icon-margin">mode_edit</i>Editar</a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create Modal-->
    <div id="create-modal" class="modal modal-large">
        <form name="projectCtrl.createForm" ng-submit="projectCtrl.create()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title">Crear proyecto</h2>

                %{--Client Select--}%
                <div class="row">
                    <div class="col s12">
                        <select class="col s12 browser-default" name="client" ng-model="projectCtrl.clientSelected"
                                ng-options="client.name for client in projectCtrl.enabledClients track by client.name"
                                required>
                            <option value="" disabled selected>~ Elija un cliente ~</option>
                        </select>
                        <label class="modal-label modal-label-select left"
                               ng-class="{'has-error': projectCtrl.createForm.client.$invalid}">Cliente
                            <span ng-show="projectCtrl.createForm.client.$error.required"
                                  class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="50" ng-model="projectCtrl.projectToCreate.name"
                               required available url-to-check="/projects?name=">
                        <label ng-class="{'has-error': projectCtrl.createForm.name.$invalid}">Nombre de proyecto
                            <span ng-show="projectCtrl.createForm.name.$error.required"
                                  class="has-error">es obligatorio</span>
                            <span ng-show="projectCtrl.createForm.name.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Short Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="sname" type="text" maxlength="10" ng-model="projectCtrl.projectToCreate.short_name"
                               required available url-to-check="/projects?short_name=">
                        <label ng-class="{'has-error': projectCtrl.createForm.sname.$invalid}">Sigla
                            <span ng-show="projectCtrl.createForm.sname.$error.required"
                                  class="has-error">es obligatoria</span>
                            <span ng-show="projectCtrl.createForm.sname.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Date Field--}%
                <div class="row">
                    <div class="col s12">
                        <ng-combo-date-picker class="modal-date" id="dateComboCreate"
                                              ng-model="projectCtrl.dateSelected"
                                              ng-months="{{ projectCtrl.months }}" ng-min-date="2005-01-01"
                                              ng-max-date="2020-12-31"></ng-combo-date-picker>
                        <label class="modal-label modal-label-date left">Fecha Inicio</label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="enable" type="checkbox" class="filled-in"
                               ng-model="projectCtrl.projectToCreate.enabled">
                        <label for="enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="projectCtrl.createForm.$invalid"
                        ng-class="{'teal-text teal-hover': projectCtrl.createForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

    <!--Edit Modal-->
    <div id="edit-modal" class="modal modal-large">
        <form name="projectCtrl.editForm" ng-submit="projectCtrl.update()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title">Editar projecto</h2>

                %{--Client Select--}%
                <div class="row">
                    <div class="col s12">
                        <select class="col s12 browser-default" ng-model="projectCtrl.clientSelected"
                                ng-options="client.name for client in projectCtrl.enabledClients track by client.name">
                            <option value="" disabled>~ Elija un cliente ~</option>
                        </select>
                        <label class="modal-label modal-label-select left">Cliente</label>
                    </div>
                </div>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="project_name" type="text" maxlength="50"
                               ng-model="projectCtrl.projectToEdit.name" required available
                               original-value="projectCtrl.project.name" url-to-check="/projects?name=">
                        <label ng-class="{'has-error': projectCtrl.editForm.project_name.$invalid}">Nombre de proyecto
                            <span ng-show="projectCtrl.editForm.project_name.$error.required"
                                  class="has-error">es obligatorio</span>
                            <span ng-show="projectCtrl.editForm.project_name.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Short Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="sname" type="text" maxlength="10"
                               ng-model="projectCtrl.projectToEdit.short_name" required available
                               original-value="projectCtrl.project.short_name" url-to-check="/projects?short_name=">
                        <label ng-class="{'has-error': projectCtrl.editForm.sname.$invalid}">Sigla
                            <span ng-show="projectCtrl.editForm.sname.$error.required"
                                  class="has-error">es obligatorio</span>
                            <span ng-show="projectCtrl.editForm.sname.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Date Field--}%
                <div class="row">
                    <div class="col s12">
                        <ng-combo-date-picker id="dateComboEdit" class="modal-date" ng-model="projectCtrl.dateSelected"
                                              ng-months="{{ projectCtrl.months }}" ng-min-date="2005-01-01"
                                              ng-max-date="2020-12-31"></ng-combo-date-picker>
                        <label class="modal-label modal-label-date left">Fecha Inicio</label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="edit_enable" type="checkbox" class="filled-in"
                               ng-model="projectCtrl.projectToEdit.enabled">
                        <label for="edit_enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="projectCtrl.editForm.$invalid"
                        ng-class="{'teal-text teal-hover': projectCtrl.editForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

</div>

<asset:javascript src="angular-controllers/project.js"/>
<asset:javascript src="angular-controllers/ts-table.js"/>

</body>
</html>