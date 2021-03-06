<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'person.label', default: 'Personas')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <asset:stylesheet src="public/person.css"/>

</head>

<body>

<div ng-controller="personController as personCtrl">

    <h3 class="card-title teal-text">Lista de Personas</h3>

    <a href="#create-modal" class="waves-effect waves-light btn btn-create-padding modal-trigger" ng-click="personCtrl.new()"><i
            class="material-icons left">person_add</i>Crear</a>

    <table class="responsive-table striped centered">

        <thead>
        <tr class="tr-header-width-and-height">
            <th class="width-5"></th>
            <th class="width-15"><a href ng-click="personCtrl.reverseOrder(name)">Nombre</a></th>
            <th class="width-15"><a href ng-click="personCtrl.reverseOrder(lastname)">Apellido</a></th>
            <th class="width-15"><a href ng-click="personCtrl.reverseOrder(username)">Usuario</a></th>
            <th class="width-20"><a href ng-click="personCtrl.reverseOrder(work_position)">Posicion</a></th>
            <th class="width-10"><a href ng-click="personCtrl.reverseOrder(work_hours)">Asignacion</a></th>
            <th class="width-15"><a href ng-click="personCtrl.reverseOrder(enabled)">Habilitado</a></th>
            <th class="width-5"></th>
        </tr>
        <tr class="grey darken-2 tr-header-width-and-height">
            <th class="th-filter-padding width-5"></th>
            <th class="th-filter-padding width-15">
                <input-field-text ng-id="search_name" ng-model="personCtrl.search.name"
                                  ng-placeholder="Ingrese Nombre"></input-field-text>
            </th>
            <th class="th-filter-padding width-15">
                <input-field-text ng-id="search_lastname" ng-model="personCtrl.search.lastname"
                                  ng-placeholder="Ingrese Apellido"></input-field-text>
            </th>
            <th class="th-filter-padding width-15">
                <input-field-text ng-id="search_username" ng-model="personCtrl.search.username"
                                  ng-placeholder="Ingrese Usuario"></input-field-text>
            </th>
            <th class="th-filter-padding width-20">
                <input-field-text ng-id="search_position" ng-model="personCtrl.search.work_position"
                                  ng-placeholder="Ingrese Posición"></input-field-text>
            </th>
            <th class="th-filter-padding width-10">
                <input-field-text ng-id="search_hours" ng-model="personCtrl.search.work_hours"
                                  ng-placeholder="Ingrese Horas"></input-field-text>
            </th>
            <th class="th-filter-padding width-15">
                <select-status ng-model="personCtrl.status"></select-status>
            </th>
            <th class="th-filter-padding width-5"></th>
        </tr>
        </thead>

        <tbody id="table-body">
        <tr ng-repeat="person in personCtrl.people | orderBy:personCtrl.sortType:personCtrl.sortReverse |
        filter:personCtrl.search:personCtrl.startsWith | filterByStatus:personCtrl.status"
            class="tr-body-width-and-height">
            <td class="width-5"><i class="material-icons center material-icons-line-heigth">person</i></td>
            <td class="width-15 truncate">{{ person.name }}</td>
            <td class="width-15 truncate">{{ person.lastname }}</td>
            <td class="width-15 truncate">{{ person.username }}</td>
            <td class="width-20 truncate">{{ person.work_position | uppercase }}</td>
            <td class="width-10 truncate">{{ person.work_hours }}</td>
            <td class="width-15">
                <div class="switch">
                    <label>
                        <input disabled type="checkbox" ng-model="person.enabled">
                        <span class="lever"></span>
                    </label>
                </div>
            </td>
            <td class="width-5">
                <a href="#edit-modal" ng-click="personCtrl.edit(person)"
                   class="waves-effect btn-flat btn-edit-padding teal-text teal-hover z-depth-0 modal-trigger"><i
                        class="material-icons center icon-margin">mode_edit</i></a>
            </td>
        </tr>
        </tbody>

    </table>


    <!--Create Modal-->
    <div id="create-modal" class="modal modal-large">
        <form name="personCtrl.createForm" ng-submit="personCtrl.create()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title Field--}%
                <h2 class="card-title teal-text modal-card-title">Crear persona</h2>

                %{--Name Field --}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="30" ng-model="personCtrl.personToCreate.name"
                               required/>
                        <label ng-class="{'has-error': personCtrl.createForm.name.$invalid}">Nombre
                            <span ng-show="personCtrl.createForm.name.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Lastname Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="lastname" type="text" maxlength="30"
                               ng-model="personCtrl.personToCreate.lastname" required>
                        <label ng-class="{'has-error': personCtrl.createForm.lastname.$invalid}">Apellido
                            <span ng-show="personCtrl.createForm.lastname.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Username Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="username" type="text" maxlength="25"
                               ng-model="personCtrl.personToCreate.username" required available
                               url-to-check="/person/existsUsername/">
                        <label ng-class="{'has-error': personCtrl.createForm.username.$invalid}">Usuario
                            <span ng-show="personCtrl.createForm.username.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="personCtrl.createForm.username.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Password Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="password" type="text" maxlength="8"
                               ng-model="personCtrl.personToCreate.password" ng-pattern="/[a-zA-Z]{8}/" required>
                        <label ng-class="{'has-error': personCtrl.createForm.password.$invalid}">Contraseña
                            <span ng-show="personCtrl.createForm.password.$error.required" class="has-error">es obligatoria</span>
                            <span ng-show="personCtrl.createForm.password.$error.pattern" class="has-error">debe ser de ocho letras</span>
                        </label>
                    </div>
                </div>

                %{--Work Position Select--}%
                <div class="row">
                    <div class="col s12">
                        <select class="col s12 browser-default" name="position" ng-model="personCtrl.personToCreate.work_position"
                                ng-options="work_position.description as work_position.description for work_position in personCtrl.work_positions"
                                required>
                            <option value="" disabled selected>~ Elegí una posición ~</option>
                        </select>
                        <label class="modal-label modal-label-select left"
                               ng-class="{'has-error': personCtrl.createForm.position.$invalid}">Posición
                            <span ng-show="personCtrl.createForm.position.$error.required" class="has-error">es obligatoria</span>
                        </label>
                    </div>
                </div>

                %{--Hours Field--}%
                <div class="row">
                    <div class="col s12">
                        <select class="col s12 browser-default" name="workHours" ng-model="personCtrl.personToCreate.work_hours"
                                ng-options="work_hour for work_hour in personCtrl.work_hours" required>
                            <option value="" disabled selected>~ Elegí una hora ~</option>
                        </select>
                        <label class="modal-label modal-label-select left"
                               ng-class="{'has-error': personCtrl.createForm.workHours.$invalid}">Horas
                            <span ng-show="personCtrl.createForm.workHours.$error.required" class="has-error">es obligatoria</span>
                        </label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="enable" type="checkbox" class="filled-in" ng-model="personCtrl.personToCreate.enabled"
                               checked="checked">
                        <label for="enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="personCtrl.createForm.$invalid"
                        ng-class="{'teal-text teal-hover': personCtrl.createForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

    <!--Edit Modal-->
    <div id="edit-modal" class="modal modal-large">
        <form name="personCtrl.editForm" ng-submit="personCtrl.update()" novalidate>
            <div class="modal-content modal-content-padding">

                %{--Title Field--}%
                <h2 class="card-title teal-text modal-card-title">Editar persona</h2>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="name" type="text" maxlength="30" ng-model="personCtrl.personToEdit.name"
                               required>
                        <label ng-class="{'has-error': personCtrl.editForm.name.$invalid}">Nombre
                            <span ng-show="personCtrl.editForm.name.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Lastname Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="lastname" type="text" maxlength="30"
                               ng-model="personCtrl.personToEdit.lastname" required>
                        <label ng-class="{'has-error': personCtrl.editForm.lastname.$invalid}">Apellido
                            <span ng-show="personCtrl.editForm.lastname.$error.required" class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Username Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="username" type="text" maxlength="25"
                               ng-model="personCtrl.personToEdit.username" required available original-value="personCtrl.person.username"
                               url-to-check="/person/existsUsername/">
                        <label ng-class="{'has-error': personCtrl.editForm.username.$invalid}">Usuario
                            <span ng-show="personCtrl.editForm.username.$error.required" class="has-error">es obligatorio</span>
                            <span ng-show="personCtrl.editForm.username.$error.available" class="has-error">ya existe</span>
                        </label>
                    </div>
                </div>

                %{--Password Field--}%
                <div class="row">
                    <div class="col s12">
                        <input name="password" type="text" maxlength="8"
                               ng-model="personCtrl.personToEdit.password" ng-pattern="/[a-zA-Z]{8}/" required>
                        <label ng-class="{'has-error': personCtrl.editForm.password.$invalid}">Contraseña
                            <span ng-show="personCtrl.editForm.password.$invalid" class="has-error">es obligatorio</span>
                            <span ng-show="personCtrl.createForm.password.$error.pattern" class="has-error">debe ser de ocho letras</span>
                        </label>
                    </div>
                </div>

                %{--Work Position Select--}%
                <div class="row">
                    <div class="col s12">
                        <select class="col s12 browser-default" ng-model="personCtrl.personToEdit.work_position"
                                ng-options="work_position.description as work_position.description for work_position in personCtrl.work_positions">
                            <option value="" disabled selected>~ Elegí una posición ~</option>
                        </select>
                        <label class="modal-label modal-label-select left">Position</label>
                    </div>
                </div>

                %{--Hours Field--}%
                <div id="edit-hours" class="row">
                    <div class="col s12">
                        <select id="edit_hours" class="col s12 browser-default" ng-model="personCtrl.personToEdit.work_hours"
                                ng-options="work_hour for work_hour in personCtrl.work_hours">
                            <option value="" disabled selected>~ Elegí una hora ~</option>
                        </select>
                        <label class="modal-label modal-label-select left">Horas</label>
                    </div>
                </div>

                %{--Enabled Checkbox--}%
                <div class="row">
                    <div class="col s12">
                        <input id="edit_enable" type="checkbox" class="filled-in" ng-model="personCtrl.personToEdit.enabled">
                        <label for="edit_enable">Habilitado</label>
                    </div>
                </div>

            </div>

            %{--Button Row--}%
            <div class="modal-footer modal-footer-padding">
                <button class="modal-action modal-close btn-flat disabled" ng-disabled="personCtrl.editForm.$invalid"
                        ng-class="{'teal-text teal-hover': personCtrl.editForm.$valid}">Guardar</button>
                <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
            </div>

        </form>
    </div>

</div>

<asset:javascript src="angular-controllers/person.js"/>

</body>
</html>