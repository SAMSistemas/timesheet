<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'project.label', default: 'Projectos')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <style>
        .select-modal input.select-dropdown {
            color: #757575 !important;
            border-color: #bdbdbd !important;
            margin-bottom: 30px !important;
            line-height: 3rem !important;
        }

        .select-modal span.caret {
            top: 7px !important;
            color: #757575 !important;
        }

        .combodate select {
            display: inline;
            text-align: center;
            color: #009688;
            width: 20% !important;
        }

    </style>

</head>

<body>

<div ng-app="projectApp" ng-controller="mainController">

    <h3 class="card-title">Lista de Projectos</h3>

    <a href="#create-modal" class="waves-effect waves-light btn btn-padding modal-trigger" ng-click="new()"><i
            class="material-icons left">add</i>Crear</a>

    <table class="responsive-table striped centered">

        <thead>
        <tr class="tr-header-width-and-height">
            <th class="width-5"></th>
            <th class="width-15"><a href ng-click="reverseOrder(client)">Cliente</a></th>
            <th class="width-15"><a href ng-click="reverseOrder(name)">Nombre</a></th>
            <th class="width-15"><a href ng-click="reverseOrder(short_name)">Sigla</a></th>
            <th class="width-15"><a href ng-click="reverseOrder(start_date)">Fecha Inicio</a></th>
            <th class="width-20"><a href ng-click="reverseOrder(enabled)">Habilitado</a></th>
            <th class="width-15"></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding width-5"></th>
            <th class="th-filter-padding width-15">
                <div class="input-field white teal-text">
                    <input id="search_client" class="center search_input" type="search"
                           placeholder="Ingrese cliente" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese cliente'" ng-model="search.client_name">
                    <label for="search_client"></label>
                </div>
            </th>
            <th class="th-filter-padding width-15">
                <div class="input-field white teal-text">
                    <input id="search_name" class="center search_input" type="search"
                           placeholder="Ingrese nombre" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese nombre'" ng-model="search.project_name">
                    <label for="search_name"></label>
                </div>
            </th>
            <th class="th-filter-padding width-15">
                <div class="input-field white teal-text">
                    <input id="search_sname" class="center search_input" type="search"
                           placeholder="Ingrese sigla" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese sigla'" ng-model="search.short_name">
                    <label for="search_sname"></label>
                </div>
            </th>
            <th class="th-filter-padding width-15"></th>
            <th class="th-filter-padding width-20">
                <div class="input-field">
                    <select-status ng-model="status"></select-status>
                </div>
            </th>
            <th class="th-filter-padding width-15"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="project in projects | orderBy:sortType:sortReverse | filter:search:startsWith | filterByStatus:status"
            class="tr-body-width-and-height">
            <td class="width-5"><i class="material-icons center material-icons-line-heigth">work</i></td>
            <td class="width-15 truncate">{{ project.client_name }}</td>
            <td class="width-15 truncate">{{ project.project_name }}</td>
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
                <a href="#edit-modal" ng-click="edit(project)"
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
                <h2 class="card-title card-title-padding">Crear projecto</h2>

                <div id="create-project" class="row align-center">
                    <div class="input-field-modal col s12">
                        <select class="select-modal" ng-change="changeColor('create-project')"
                                ng-model="clientSelected" ng-options="client.name for client in clients track by client.name">
                        </select>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="name" name="name" type="text" ng-model="projectToCreate.project_name" required available
                               url-to-check="/project/existsName/">
                        <label for="name" ng-class="{'has-error': createForm.name.$invalid}">Nombre
                            <span ng-show="createForm.name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="createForm.name.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="sname" name="sname" type="text" ng-model="projectToCreate.short_name" required
                               available url-to-check="/project/existsSName/">
                        <label for="sname" ng-class="{'has-error': createForm.sname.$invalid}">Sigla
                            <span ng-show="createForm.sname.$error.required" class="has-error">es obligatoria</span>
                            <span ng-show="createForm.sname.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        %{--<input id="date" name="start_date" type="text" ng-model="projectToCreate.start_date"--}%
                               %{--mo-date-input="dd-MM-yyyy" required>--}%
                        %{--<label for="date" ng-class="{'has-error': createForm.start_date.$invalid}">Fecha--}%
                            %{--<span ng-show="createForm.start_date.$error.required" class="has-error">es obligatoria</span>--}%
                        %{--</label>--}%
                        <input id="date" type="text"  data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"
                               ng-model="daySelected">
                    </div>
                </div>

                <div class="row align-center">
                    <span> DaySelected: {{daySelected}}</span>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="enable" type="checkbox" class="filled-in" ng-model="projectToCreate.enabled">
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
                <h2 class="card-title card-title-padding">Editar projecto</h2>

                <div id="edit-project" class="row align-center">
                    <div class="input-field-modal col s12">
                        <select class="select-modal" ng-change="changeColor('edit-project')"
                                ng-model="clientSelected" ng-options="client.name for client in clients track by client.name">
                        </select>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_name" name="project_name" type="text" ng-model="projectToEdit.project_name" required available
                               original-value="project.project_name" url-to-check="/project/existsName/">
                        <label for="edit_name" ng-class="{'has-error': editForm.project_name.$invalid}">Nombre
                            <span ng-show="editForm.project_name.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="editForm.project_name.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_sname" name="sname" type="text" ng-model="projectToEdit.short_name" required available
                               original-value="project.short_name" url-to-check="/project/existsSName/">
                        <label for="edit_sname" ng-class="{'has-error': editForm.sname.$invalid}">Sigla
                            <span ng-show="editForm.sname.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="editForm.sname.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_date" name="date" type="text" ng-model="projectToEdit.start_date" required>
                        <label for="edit_date" ng-class="{'has-error': editForm.start_date.$invalid}">Fecha
                            <span ng-show="editForm.start_date.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_enable" type="checkbox" class="filled-in" ng-model="projectToEdit.enabled">
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

<asset:javascript src="public/project.js"/>
</body>
</html>