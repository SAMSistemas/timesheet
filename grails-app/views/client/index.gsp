<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'client.label', default: 'Clientes')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <asset:stylesheet src="public/client.css"/>

</head>

<body>

<div ng-controller="ClientController as clientCtrl">

    <h3 class="card-title teal-text">Lista de Clientes</h3>

    <a href="#cu-modal" class="waves-effect waves-light btn btn-create-padding modal-trigger"
       ng-click="clientCtrl.new()"><i
            class="material-icons left">enhanced_encryption</i>Crear</a>

    <table class="responsive-table striped centered" ng-controller="TsTableController as tableCtrl">

        <thead>
        <tr class="tr-header-width-and-height">
            <th></th>
            <th><a href ng-click="tableCtrl.reverseOrder(name)">Nombre del cliente</a></th>
            <th><a href ng-click="tableCtrl.reverseOrder(short_name)">Sigla del cliente</a></th>
            <th><a href ng-click="tableCtrl.reverseOrder(enabled)">Habilitado</a></th>
            <th></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding"></th>
            <th class="th-filter-padding">
                <input-field-text ng-id="search_name" ng-model="tableCtrl.search.name"
                                  ng-placeholder="Ingrese Nombre"></input-field-text>
            </th>
            <th class="th-filter-padding">
                <input-field-text ng-id="search_sname" ng-model="tableCtrl.search.short_name"
                                  ng-placeholder="Ingrese Sigla"></input-field-text>
            </th>
            <th class="th-filter-padding">
                <select-status ng-model="tableCtrl.status"></select-status>
            </th>
            <th class="th-filter-padding"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="client in clientCtrl.clients | orderBy:tableCtrl.sortType:tableCtrl.sortReverse |
        filter:tableCtrl.search:tableCtrl.startsWith | filterByStatus:tableCtrl.status"
            class="tr-body-width-and-height">
            <td><i class="material-icons center material-icons-line-heigth">business</i></td>
            <td class="truncate">{{ client.name }}</td>
            <td class="truncate">{{ client.short_name }}</td>
            <td>
                <div class="switch">
                    <label>
                        <input disabled type="checkbox" ng-model="client.enabled">
                        <span class="lever"></span>
                    </label>
                </div>
            </td>
            <td>
                <a href="#cu-modal" ng-click="clientCtrl.edit(client)"
                   class="waves-effect waves-light btn-flat btn-edit-padding teal-text teal-hover z-depth-0 modal-trigger"><i
                        class="material-icons left icon-margin">mode_edit</i>Editar</a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create and Update Modal-->
    <div id="cu-modal" class="modal modal-large">
        <form name="clientCtrl.cuForm" ng-submit="clientCtrl.createOrUpdate()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <ts-modal-title action="{{clientCtrl.actionToPerform}}" object="cliente"></ts-modal-title>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="30" ng-model="clientCtrl.cuClient.name" required
                               available url-to-check="/clients?name=" original-value="clientCtrl.client.name">
                        <label ng-class="{'has-error': clientCtrl.cuForm.name.$invalid}">Nombre
                            <span ng-show="clientCtrl.cuForm.name.$error.required"
                                  class="has-error">es obligatorio</span>
                            <span ng-show="clientCtrl.cuForm.name.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Short Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="short_name" type="text" maxlength="5" ng-model="clientCtrl.cuClient.short_name"
                               required available url-to-check="/clients?short_name="
                               original-value="clientCtrl.client.short_name">
                        <label ng-class="{'has-error': clientCtrl.cuForm.short_name.$invalid}">Sigla
                            <span ng-show="clientCtrl.cuForm.short_name.$error.required"
                                  class="has-error">es obligatoria</span>
                            <span ng-show="clientCtrl.cuForm.short_name.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <ts-modal-checkbox label="Habilitado" ng-model="clientCtrl.cuClient.enabled"></ts-modal-checkbox>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="clientCtrl.cuForm.$invalid"
                        ng-class="{'teal-text teal-hover': clientCtrl.cuForm.$valid}">{{clientCtrl.actionToPerform}}</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

</div>

<asset:javascript src="angular-controllers/client.js"/>
<asset:javascript src="angular-controllers/ts-table.js"/>

</body>
</html>