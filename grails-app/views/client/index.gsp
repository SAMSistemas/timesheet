<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'client.label', default: 'Client')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <style>

    .card-title {
        color: #009688 !important;
        font-size: 180% !important;
    }

    .transparent-green {
        background-color: transparent;
        color: #009688;
        padding-right: 10px;
        padding-left: 5px;
    }

    .transparent-green:hover {
        color: white;
    }

    #edit-icon {
        margin-right: 5px;
    }

    #create-btn {
        padding-left: 20px;
        padding-right: 25px;
    }

    .input-field {
        width: 100%;
        margin: 0 !important;
        height: 30px;
    }

    .input-field input[type="search"] {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        border-color: transparent !important;
    }

    .search_input {
        height: 30px !important;
    }

    .my-th {
        padding: 0px;
    }

    *::-moz-placeholder {
        color: #009688;
    }

    .filled-in[type="checkbox"]:not(:checked) + label::after {
        border: 2px solid #bdbdbd !important;
    }

    .search_input {
        height: 30px !important;
    }

    /*thead, tbody, tr, td, th { display: block; }*/

    /*tr:after {*/
        /*content: ' ';*/
        /*display: block;*/
        /*visibility: hidden;*/
        /*clear: both;*/
    /*}*/

    /*tbody td, thead th {*/
        /*width: 19.2%;*/
        /*float: left;*/
    /*}*/

    /*thead th {*/
        /*height: 50px;*/
    /*}*/

    /*thead {*/
        /*padding-right: 14px;*/
    /*}*/

    /*tbody {*/
        /*display: block;*/
        /*height:  calc(50vh - 1px);*/
        /*min-height: calc(200px + 1px);*/
        /*overflow-Y: scroll;*/
    /*}*/

    /*tr {*/
        /*display: block;*/
        /*overflow: hidden;*/
    /*}*/
        /**/
    </style>
</head>

<body>

<div id="list-client" class="content scaffold-list" role="main" ng-app="clientApp" ng-controller="mainController">

    <h3 class="card-title">Lista de Clientes</h3>

    <a href="#create-modal" id="create-btn" class="waves-effect waves-light btn modal-trigger"
       style="padding-bottom: 10px;" ng-click="new()"><i class="material-icons left">person_add</i>Crear</a>

    <div id="table">
        <table class="responsive-table striped centered">

            <thead>
            <tr>
                <th></th>
                <th><a href ng-click="reverseOrder(name)">Nombre del cliente</a></th>
                <th><a href ng-click="reverseOrder(short_name)">Sigla del cliente</a></th>
                <th><a href ng-click="reverseOrder(enabled)">Habilitado</a></th>
                <th></th>
            </tr>
            <tr class="grey darken-2" style="height: 56px;">
                <th class="my-th"></th>
                <th>
                    <div class="input-field white teal-text" style="margin-right: 5px;">
                        <input id="search_name" class="center search_input" type="search" required
                               placeholder="Ingrese nombre" onfocus="this.placeholder = ''"
                               onblur="this.placeholder = 'Ingrese nombre'" ng-model="search.name">
                        <label for="search_name"></label>
                    </div>
                </th>
                <th>
                    <div class="input-field white teal-text">
                        <input id="search_sname" class="center search_input" type="search" required
                               placeholder="Ingrese sigla" onfocus="this.placeholder = ''"
                               onblur="this.placeholder = 'Ingrese sigla'" ng-model="search.short_name">
                        <label for="search_sname"></label>
                    </div>
                </th>
                <th class="my-th" style="padding-left: 15px; padding-top: 13px;">
                    <input type="checkbox" id="check" class="filled-in center"/><label for="check"></label>
                </th>
                <th class="my-th"></th>
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
                <td><a href="#edit-modal" ng-click="edit(client)"
                       class="waves-effect waves-light btn transparent-green z-depth-0 modal-trigger"><i id="edit-icon"
                                                                                                         class="material-icons left">mode_edit</i>Editar
                </a></td>
            </tr>
            </tbody>

        </table>
    </div>

    <!--Create Modal-->
    <div id="create-modal" class="modal" style="width: 500px;">
        <div class="modal-content">
            <h2 class="card-title" style="padding-left: 15px; padding-bottom: 50px;">Crear cliente</h2>

            <div class="row align-center">
                <div class="input-field col s12">
                    <input id="name" type="text" ng-model="clientToCreate.name">
                    <label for="name">Nombre</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field col s12">
                    <input id="sname" type="text" ng-model="clientToCreate.short_name">
                    <label for="sname">Sigla</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field col s12">
                    <input id="enable" type="checkbox" class="filled-in" ng-model="clientToCreate.enabled">
                    <label for="enable">Habilitado</label>
                </div>
            </div>
        </div>

        <div class="modal-footer" style="padding-right: 50px;">
            <a href="#!" class="modal-action modal-close waves-effect waves-teal btn-flat"
               ng-click="create()">Guardar</a>
            <a href="#!" class="modal-action modal-close waves-effect waves-teal btn-flat">Cancelar</a>
        </div>
    </div>

    <!--Edit Modal-->
    <div id="edit-modal" class="modal" style="width: 500px;">
        <div class="modal-content">
            <h2 class="card-title" style="padding-left: 15px; padding-bottom: 50px;">Editar cliente</h2>

            <div class="row align-center">
                <div class="input-field col s12">
                    <input id="edit_name" placeholder="" type="text" ng-model="clientToEdit.name">
                    <label for="edit_name">Nombre</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field col s12">
                    <input id="edit_sname" placeholder="" type="text" ng-model="clientToEdit.short_name">
                    <label for="edit_sname">Sigla</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field col s12">
                    <input id="edit_enable" type="checkbox" class="filled-in" ng-model="clientToEdit.enabled">
                    <label for="edit_enable">Habilitado</label>
                </div>
            </div>
        </div>

        <div class="modal-footer" style="padding-right: 50px;">
            <a href="#!" class="modal-action modal-close waves-effect waves-teal btn-flat"
               ng-click="update()">Guardar</a>
            <a href="#!" class="modal-action modal-close waves-effect waves-teal btn-flat">Cancelar</a>
        </div>
    </div>

</div>

<asset:javascript src="public/client.js"/>

</body>
</html>