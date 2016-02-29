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

    <a href="#create-modal" class="waves-effect waves-light btn btn-create-padding modal-trigger" ng-click="clientCtrl.new()"><i
            class="material-icons left">enhanced_encryption</i>Crear</a>

    <table class="responsive-table striped centered">

        <thead>
        <tr class="tr-header-width-and-height">
            <th></th>
            <th><a href ng-click="clientCtrl.reverseOrder(name)">Nombre del cliente</a></th>
            <th><a href ng-click="clientCtrl.reverseOrder(short_name)">Sigla del cliente</a></th>
            <th><a href ng-click="clientCtrl.reverseOrder(enabled)">Habilitado</a></th>
            <th></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding"></th>
            <th class="th-filter-padding">
                <input-field-text ng-id="search_name" ng-model="clientCtrl.search.name"
                                  ng-placeholder="Ingrese Nombre"></input-field-text>
            </th>
            <th class="th-filter-padding">
                <input-field-text ng-id="search_sname" ng-model="clientCtrl.search.short_name"
                                  ng-placeholder="Ingrese Sigla"></input-field-text>
            </th>
            <th class="th-filter-padding">
                <select-status ng-model="clientCtrl.status"></select-status>
            </th>
            <th class="th-filter-padding"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="client in clientCtrl.clients | orderBy:clientCtrl.sortType:clientCtrl.sortReverse |
        filter:clientCtrl.search:clientCtrl.startsWith | filterByStatus:clientCtrl.status"
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
                <a href="#edit-modal" ng-click="clientCtrl.edit(client)"
                   class="waves-effect waves-light btn-flat btn-edit-padding teal-text teal-hover z-depth-0 modal-trigger"><i
                        class="material-icons left icon-margin">mode_edit</i>Editar</a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create Modal-->
    <div id="create-modal" class="modal modal-large">
        <form name="clientCtrl.createForm" ng-submit="clientCtrl.create()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title">Crear cliente</h2>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="30" ng-model="clientCtrl.clientToCreate.name" required
                               available url-to-check="/clients?name=">
                        <label ng-class="{'has-error': clientCtrl.createForm.name.$invalid}">Nombre
                            <span ng-show="clientCtrl.createForm.name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="clientCtrl.createForm.name.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Short Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="sname" type="text" maxlength="5" ng-model="clientCtrl.clientToCreate.short_name"
                               required available url-to-check="/clients?short_name=">
                        <label ng-class="{'has-error': clientCtrl.createForm.sname.$invalid}">Sigla
                            <span ng-show="clientCtrl.createForm.sname.$error.required" class="has-error">es obligatoria</span>
                            <span ng-show="clientCtrl.createForm.sname.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="enable" type="checkbox" class="filled-in" ng-model="clientCtrl.clientToCreate.enabled">
                        <label for="enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="clientCtrl.createForm.$invalid"
                        ng-class="{'teal-text teal-hover': clientCtrl.createForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

    <!--Edit Modal-->
    <div id="edit-modal" class="modal modal-large">
        <form name="clientCtrl.editForm" ng-submit="clientCtrl.update()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title--}%
                <h2 class="card-title teal-text modal-card-title">Editar cliente</h2>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="30" ng-model="clientCtrl.clientToEdit.name"
                               required available original-value="clientCtrl.client.name" url-to-check="/clients?name=">
                        <label ng-class="{'has-error': clientCtrl.editForm.name.$invalid}">Nombre
                            <span ng-show="clientCtrl.editForm.name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="clientCtrl.editForm.name.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Short Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="sname" type="text" maxlength="5" ng-model="clientCtrl.clientToEdit.short_name"
                               ng-model="clientCtrl.clientToEdit.short_name" required available
                               original-value="clientCtrl.client.short_name" url-to-check="/clients?short_name=">
                        <label ng-class="{'has-error': clientCtrl.editForm.sname.$invalid}">Sigla
                            <span ng-show="clientCtrl.editForm.sname.$error.required" class="has-error">es obligatoria</span>
                            <span ng-show="clientCtrl.editForm.sname.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="edit_enable" type="checkbox" class="filled-in" ng-model="clientCtrl.clientToEdit.enabled">
                        <label for="edit_enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="clientCtrl.editForm.$invalid"
                        ng-class="{'teal-text teal-hover': clientCtrl.editForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

</div>

<asset:javascript src="angular-controllers/client.js"/>

</body>
</html>