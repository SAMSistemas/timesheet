<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'holiday.label', default: 'Holiday')}"/>
    <title>Feriados del año</title>

    <asset:stylesheet src="public/holiday.css"/>

</head>

<body>

<div ng-controller="holidayController">

    <div id='calendar'></div>

    <!--Create Modal-->
    <div id="create_modal" class="modal" style="width: 400px;">
        <div class="modal-content">
            <h2 class="card-title" style="text-align: center; color: #009688">Crear feriado</h2>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="create_name" type="text" ng-model="holidayToCreate.description">
                    <label for="create_name">Nombre</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="create_date" type="text" ng-model="holidayToCreate.holiday_date" disabled>
                    <label for="create_date">Fecha</label>
                </div>
            </div>

            <div class="modal-footer" style="padding-right: 50px;">
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat" ng-click="create(holidayToCreate)">Guardar</a>
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Cancelar</a>
            </div>
        </div>
    </div>

    <!--Edit Modal-->
    <div id="edit_modal" class="modal" style="width: 450px;">
        <div class="modal-content">
            <h2 class="card-title" style="text-align: center; color: #009688">Editar feriado</h2>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="edit_name" type="text" ng-model="holidayAfter.description">
                    <label for="edit_name">Nombre</label>
                </div>
            </div>

            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="edit_date" type="text" ng-model="holidayAfter.holiday_date" disabled>
                    <label for="edit_date">Fecha</label>
                </div>
            </div>

            <div class="modal-footer" style="padding-right: 50px;">
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat"  ng-click="delete(holidayAfter)">Eliminar</a>
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat"  ng-click="edit(holidayAfter)">Guardar</a>
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Cancelar</a>
            </div>
        </div>
    </div>

</div>

<asset:javascript src="public/holiday.js"/>

</body>
</html>