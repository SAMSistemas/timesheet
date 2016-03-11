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

    <a href="#cu-modal" class="waves-effect waves-light btn btn-create-padding modal-trigger"
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
                <a href="#cu-modal" ng-click="projectCtrl.edit(project)" ng-show="project.client.enabled"
                   class="waves-effect btn-flat btn-edit-padding z-depth-0 teal-text teal-hover modal-trigger"><i
                        class="material-icons left icon-margin">mode_edit</i>Editar</a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create and Update Modal-->
    <div id="cu-modal" class="modal modal-large">
        <form name="projectCtrl.cuForm" ng-submit="projectCtrl.createOrUpdate()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <ts-modal-title action="{{projectCtrl.actionToPerform}}" object="projecto"></ts-modal-title>

                %{--Client Select--}%
                <div class="row">
                    <div class="col s12">
                        <select class="col s12 browser-default" name="client" ng-model="projectCtrl.clientSelected"
                                ng-options="client.name for client in projectCtrl.enabledClients track by client.name"
                                required>
                            <option value="" disabled selected>~ Elija un cliente ~</option>
                        </select>
                        <label class="modal-label modal-label-select left"
                               ng-class="{'has-error': projectCtrl.cuForm.client.$invalid}">Cliente
                            <span ng-show="projectCtrl.cuForm.client.$error.required"
                                  class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="50" ng-model="projectCtrl.cuProject.name"
                               required available url-to-check="/projects?name=" original-value="projectCtrl.project.name">
                        <label ng-class="{'has-error': projectCtrl.cuForm.name.$invalid}">Nombre de proyecto
                            <span ng-show="projectCtrl.cuForm.name.$error.required"
                                  class="has-error">es obligatorio</span>
                            <span ng-show="projectCtrl.cuForm.name.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Short Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="short_name" type="text" maxlength="10" ng-model="projectCtrl.cuProject.short_name"
                               required available url-to-check="/projects?short_name=" original-value="projectCtrl.project.short_name">
                        <label ng-class="{'has-error': projectCtrl.cuForm.short_name.$invalid}">Sigla
                            <span ng-show="projectCtrl.cuForm.short_name.$error.required"
                                  class="has-error">es obligatoria</span>
                            <span ng-show="projectCtrl.cuForm.short_name.$error.available"
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
                               ng-model="projectCtrl.cuProject.enabled">
                        <label for="enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="projectCtrl.cuForm.$invalid"
                        ng-class="{'teal-text teal-hover': projectCtrl.cuForm.$valid}">{{projectCtrl.actionToPerform}}</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

</div>

<asset:javascript src="angular-controllers/project.js"/>
<asset:javascript src="angular-controllers/ts-table.js"/>

</body>
</html>