<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'client.label', default: 'Client')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>
</head>

<body>

<div ng-app="clientApp" ng-controller="mainController">

    <h3 class="card-title">Lista de Clientes</h3>

    <a href="#create-modal" class="waves-effect waves-light btn btn-padding modal-trigger" ng-click="new()"><i
            class="material-icons left">person_add</i>Crear</a>

    <table class="responsive-table striped centered">

        <thead>
        <tr class="tr-header-width-and-height">
            <th></th>
            <th><a href ng-click="reverseOrder(name)">Nombre del cliente</a></th>
            <th><a href ng-click="reverseOrder(short_name)">Sigla del cliente</a></th>
            <th><a href ng-click="reverseOrder(enabled)">Habilitado</a></th>
            <th></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding"></th>
            <th class="th-filter-padding">
                <div class="input-field white teal-text">
                    <input id="search_name" class="center search_input" type="search" required
                           placeholder="Ingrese nombre" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese nombre'" ng-model="search.name">
                    <label for="search_name"></label>
                </div>
            </th>
            <th class="th-filter-padding">
                <div class="input-field white teal-text">
                    <input id="search_sname" class="center search_input" type="search" required
                           placeholder="Ingrese sigla" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese sigla'" ng-model="search.short_name">
                    <label for="search_sname"></label>
                </div>
            </th>
            <th class="th-filter-padding">
                <div class="input-field">
                    <select-status ng-model="status"></select-status>
                </div>
            </th>
            <th class="th-filter-padding"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="client in clients | orderBy:sortType:sortReverse | filter:search:startsWith | filterByStatus:status"
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
                <a href="#edit-modal" ng-click="edit(client)"
                   class="waves-effect waves-light btn btn-edit-padding transparent-green z-depth-0 modal-trigger"><i
                        class="material-icons left icon-margin">mode_edit</i>Editar</a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create Modal-->
    <div id="create-modal" class="modal modal-width">
        <form name="createForm" ng-submit="create()" novalidate>
            <div class="modal-content modal-content-padding">
                <h2 class="card-title card-title-padding">Crear cliente</h2>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="name" name="name" type="text" ng-model="clientToCreate.name" required available
                               url-to-check="/client/existsName/">
                        <label for="name" ng-class="{'has-error': createForm.name.$invalid}">Nombre
                            <span ng-show="createForm.name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="createForm.name.$error.available" class="has-error">ya existe</span>
                        </label>

                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="sname" name="sname" type="text" ng-model="clientToCreate.short_name" required
                               available
                               url-to-check="/client/existsSName/">
                        <label for="sname" ng-class="{'has-error': createForm.sname.$invalid}">Sigla
                            <span ng-show="createForm.sname.$error.required" class="has-error">es obligatoria</span>
                            <span ng-show="createForm.sname.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="enable" type="checkbox" class="filled-in" ng-model="clientToCreate.enabled">
                        <label for="enable">Habilitado</label>
                    </div>
                </div>
            </div>

            <div class="modal-footer modal-footer-padding">
                <button ng-disabled="createForm.$invalid"
                        class="modal-action modal-close waves-effect btn-flat transparent-green"
                        ng-class="{'has-error': createForm.$invalid}">Guardar</button>
                <a href class="modal-action modal-close waves-effect btn-flat transparent-green">Cancelar</a>
            </div>
        </form>
    </div>

    <!--Edit Modal-->
    <div id="edit-modal" class="modal modal-width">
        <form name="editForm" ng-submit="update()" novalidate>
            <div class="modal-content modal-content-padding">
                <h2 class="card-title card-title-padding">Editar cliente</h2>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_name" name="name" type="text" ng-model="clientToEdit.name" required available
                               original-value="client.name" url-to-check="/client/existsName/">
                        <label for="name" ng-class="{'has-error': editForm.name.$invalid}">Nombre
                            <span ng-show="editForm.name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="editForm.name.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_sname" name="sname" type="text" ng-model="clientToEdit.short_name"
                               ng-model="clientToEdit.short_name" required available
                               original-value="client.short_name" url-to-check="/client/existsSName/">
                        <label for="sname" ng-class="{'has-error': editForm.sname.$invalid}">Sigla
                            <span ng-show="editForm.sname.$error.required" class="has-error">es obligatoria</span>
                            <span ng-show="editForm.sname.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_enable" type="checkbox" class="filled-in" ng-model="clientToEdit.enabled">
                        <label for="edit_enable">Habilitado</label>
                    </div>
                </div>
            </div>

            <div class="modal-footer modal-footer-padding">
                <button ng-disabled="editForm.$invalid"
                        class="modal-action modal-close waves-effect btn-flat transparent-green"
                        ng-class="{'has-error': editForm.$invalid}">Guardar</button>
                <a href class="modal-action modal-close waves-effect btn-flat transparent-green">Cancelar</a>
            </div>
        </form>
    </div>

</div>

<asset:javascript src="public/client.js"/>

</body>
</html>