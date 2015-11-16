<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'person.label', default: 'Personas')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>
    <asset:stylesheet src="public/table.css"/>

    <style>
    #positionCreateSelect {
        display: inline;
    }

    #positionEditSelect {
        display: inline;
    }

    .label-name {
        color: #009688 !important;
        font-size: 120% !important;
        padding-right: 40px;
    }
    </style>
</head>

<body>

<div ng-controller="personController">

    <h3 class="card-title">Lista de Personas</h3>

    <a href="#create-modal" class="waves-effect waves-light btn btn-padding modal-trigger" ng-click="new()"><i
            class="material-icons left">person_add</i>Crear</a>

    <table class="responsive-table striped centered">

        <thead>
        <tr class="tr-header-width-and-height">
            <th class="width-5"></th>
            <th class="width-15"><a href ng-click="reverseOrder(name)">Nombre</a></th>
            <th class="width-15"><a href ng-click="reverseOrder(lastname)">Apellido</a></th>
            <th class="width-20"><a href ng-click="reverseOrder(username)">Usuario</a></th>
            <th class="width-20"><a href ng-click="reverseOrder(work_position)">Posicion</a></th>
            <th class="width-20"><a href ng-click="reverseOrder(enabled)">Habilitado</a></th>
            <th class="width-5"></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding width-5"></th>
            <th class="th-filter-padding width-15">
                <div class="input-field white teal-text">
                    <input id="search_name" class="center search_input" type="search"
                           placeholder="Ingrese nombre" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese nombre'" ng-model="search.name">
                    <label for="search_name"></label>
                </div>
            </th>
            <th class="th-filter-padding width-15">
                <div class="input-field white teal-text">
                    <input id="search_lastname" class="center search_input" type="search"
                           placeholder="Ingrese apellido" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese apellido'" ng-model="search.lastname">
                    <label for="search_lastname"></label>
                </div>
            </th>
            <th class="th-filter-padding width-20">
                <div class="input-field white teal-text">
                    <input id="search_username" class="center search_input" type="search"
                           placeholder="Ingrese usuario" onfocus="placeholder = ''"
                           onblur="placeholder = 'Ingrese usuario'" ng-model="search.username">
                    <label for="search_username"></label>
                </div>
            </th>
            <th class="th-filter-padding width-20"></th> <!-- Implementar buscador por posicion?? -->
            <th class="th-filter-padding width-20">
                <div class="input-field">
                    <select-status ng-model="status"></select-status>
                </div>
            </th>
            <th class="th-filter-padding width-5"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="person in people | orderBy:sortType:sortReverse | filter:search:startsWith | filterByStatus:status"
            class="tr-body-width-and-height">
            <td class="width-5"><i class="material-icons center material-icons-line-heigth">person</i></td>
            <td class="width-15 truncate">{{ person.name }}</td>
            <td class="width-15 truncate">{{ person.lastname }}</td>
            <td class="width-20 truncate">{{ person.username }}</td>
            <td class="width-20 truncate">{{ person.work_position | uppercase }}</td>
            <td class="width-20">
                <div class="switch">
                    <label>
                        <input disabled type="checkbox" ng-model="person.enabled">
                        <span class="lever"></span>
                    </label>
                </div>
            </td>
            <td class="width-5">
                <a href="#edit-modal" ng-click="edit(person)"
                   class="waves-effect waves-light btn btn-edit-padding transparent-green z-depth-0 modal-trigger"><i
                        class="material-icons center icon-margin">mode_edit</i></a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create Modal-->
    <div id="create-modal" class="modal modal-large">
        <form name="createForm" ng-submit="create()" novalidate>
            <div class="modal-content modal-content-padding">
                <h2 class="modal-card-title">Crear persona</h2>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="name" name="name" type="text" maxlength="30" ng-model="personToCreate.name"
                               required/>
                        <label for="name" ng-class="{'has-error': createForm.name.$invalid}">Nombre
                            <span ng-show="createForm.name.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="lastname" name="lastname" type="text" maxlength="30"
                               ng-model="personToCreate.lastname" required>
                        <label for="lastname" ng-class="{'has-error': createForm.lastname.$invalid}">Apellido
                            <span ng-show="createForm.lastname.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="username" name="username" type="text" maxlength="15"
                               ng-model="personToCreate.username" required
                               available
                               url-to-check="/person/existsUsername/">
                        <label for="username" ng-class="{'has-error': createForm.username.$invalid}">Usuario
                            <span ng-show="createForm.username.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="createForm.username.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="password" name="password" type="text" maxlength="8"
                               ng-model="personToCreate.password" ng-pattern="/[a-zA-Z]{8}/" required>
                        <label for="password" ng-class="{'has-error': createForm.password.$invalid}">Contraseña
                            <span ng-show="createForm.password.$error.required" class="has-error">es obligatoria</span>
                            <span ng-show="createForm.password.$error.pattern"
                                  class="has-error">debe ser de ocho letras</span>
                        </label>
                    </div>
                </div>

                <div id="create-person" class="row align-center">
                    <div class="input-field-modal col s12">
                        <label class="label-name left">Posición</label>
                        <select id="positionCreateSelect" class="col s12" ng-change="changeColor('create-person')"
                                ng-model="personToCreate.work_position"
                                ng-options="work_position.description as work_position.description for work_position in work_positions" required>
                            <option value="" disabled selected>- Elegí una de las siguientes opciones -</option>
                        </select>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="enable" type="checkbox" class="filled-in" ng-model="personToCreate.enabled"
                               checked="checked">
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
    <div id="edit-modal" class="modal modal-large">
        <form name="editForm" ng-submit="update()" novalidate>
            <div class="modal-content modal-content-padding">
                <h2 class="modal-card-title">Editar persona</h2>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_name" name="name" type="text" maxlength="30" ng-model="personToEdit.name"
                               required>
                        <label for="edit_name" ng-class="{'has-error': editForm.name.$invalid}">Nombre
                            <span ng-show="editForm.name.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_lastname" name="lastname" type="text" maxlength="30"
                               ng-model="personToEdit.lastname" required>
                        <label for="edit_lastname" ng-class="{'has-error': editForm.lastname.$invalid}">Apellido
                            <span ng-show="editForm.lastname.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_username" name="username" type="text" maxlength="15"
                               ng-model="personToEdit.username"
                               ng-model="personToEdit.username" required available original-value="person.username"
                               url-to-check="/person/existsUsername/">
                        <label for="edit_username" ng-class="{'has-error': editForm.username.$invalid}">Usuario
                            <span ng-show="editForm.username.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="editForm.username.$error.available"
                                  class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_password" name="password" type="text" maxlength="8"
                               ng-model="personToEdit.password"
                               ng-model="personToEdit.password" ng-pattern="/[a-zA-Z]{8}/" required>
                        <label for="edit_password" ng-class="{'has-error': editForm.password.$invalid}">Contraseña
                            <span ng-show="editForm.password.$invalid" class="has-error">es obligatorio</span>
                            <span ng-show="createForm.password.$error.pattern"
                                  class="has-error">debe ser de ocho letras</span>
                        </label>
                    </div>
                </div>

                <div id="edit-person" class="row align-center">
                    <div class="input-field-modal col s12">
                        <label class="label-name left">Posición</label>
                        <select id="positionEditSelect" class="col s12" ng-change="changeColor('edit-person')"
                                ng-model="personToEdit.work_position"
                                ng-options="work_position.description as work_position.description for work_position in work_positions" required>
                        </select>
                    </div>
                </div>

                <div class="row align-center">
                    <div class="input-field-modal col s12">
                        <input id="edit_enable" type="checkbox" class="filled-in" ng-model="personToEdit.enabled">
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

<asset:javascript src="public/person.js"/>

</body>
</html>