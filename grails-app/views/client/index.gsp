<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'client.label', default: 'Client')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>
</head>

<body>

<div id="list-client" class="content scaffold-list" role="main" ng-app="clientApp" ng-controller="mainController">

    <h3 class="card-title">Lista de Clientes</h3>

    <a href="#create-modal" class="waves-effect waves-light btn btn-padding modal-trigger" ng-click="new()"><i
            class="material-icons left">person_add</i>Crear</a>

    <table class="responsive-table striped centered">

        <thead>
        <tr>
            <th></th>
            <th><a href ng-click="reverseOrder(name)">Nombre del cliente</a></th>
            <th><a href ng-click="reverseOrder(short_name)">Sigla del cliente</a></th>
            <th><a href ng-click="reverseOrder(enabled)">Habilitado</a></th>
            <th></th>
        </tr>
        <tr class="grey darken-2 tr-filter-height">
            <th class="my-th"></th>
            <th>
                <div class="input-field white teal-text">
                    <input id="search_name" class="center search_input" type="search" required
                           placeholder="Ingrese nombre" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese nombre'" ng-model="search.name">
                    <label for="search_name"></label>
                </div>
            </th>
            <th>
                <div class="input-field white teal-text">
                    <input id="search_sname" class="center search_input" type="search" required
                           placeholder="Ingrese sigla" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese sigla'" ng-model="search.short_name">
                    <label for="search_sname"></label>
                </div>
            </th>
            <th class="th-padding">
                <input type="checkbox" id="check" class="filled-in center"/><label for="check"></label>
            </th>
            <th></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="client in clients | orderBy:sortType:sortReverse | filter:search:startsWith" on-last-repeat>
            <td><i class="material-icons center">business</i></td>
            <td>{{ client.name }}</td>
            <td>{{ client.short_name }}</td>
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
        <div class="modal-content modal-content-padding">
            <h2 class="card-title card-title-padding">Crear cliente</h2>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="name" type="text" ng-model="clientToCreate.name">
                    <label for="name">Nombre</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="sname" type="text" ng-model="clientToCreate.short_name">
                    <label for="sname">Sigla</label>
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
            <a href class="modal-action modal-close waves-effect btn-flat transparent-green"
               ng-click="create()">Guardar</a>
            <a href class="modal-action modal-close waves-effect btn-flat transparent-green">Cancelar</a>
        </div>
    </div>

    <!--Edit Modal-->
    <div id="edit-modal" class="modal modal-width">
        <div class="modal-content modal-content-padding">
            <h2 class="card-title card-title-padding">Editar cliente</h2>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="edit_name" placeholder="" type="text" ng-model="clientToEdit.name">
                    <label for="edit_name">Nombre</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="edit_sname" placeholder="" type="text" ng-model="clientToEdit.short_name">
                    <label for="edit_sname">Sigla</label>
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
            <a href class="modal-action modal-close waves-effect waves-teal btn-flat transparent-green"
               ng-click="update()">Guardar</a>
            <a href class="modal-action modal-close waves-effect waves-teal btn-flat transparent-green">Cancelar</a>
        </div>
    </div>

</div>

<asset:javascript src="public/client.js"/>

</body>
</html>