<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'holiday.label', default: 'Holiday')}" />
        <title>Feriados del año</title>

        <asset:stylesheet src="public/holiday.css"/>
    </head>
    <body>

    <div id='calendar'></div>

    <!--Create Modal-->
    <div id="create_modal" class="modal" style="width: 400px;">
        <div class="modal-content">
            <h2 class="card-title" style="text-align: center; color: #009688">Crear feriado</h2>
            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="create_name" type="text" ng-model="holiday.name">
                    <label for="create_name">Nombre</label>
                </div>
            </div>
            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="create_date" type="text" ng-model="holiday.date" disabled>
                    <label for="create_date">Fecha</label>
                </div>
            </div>
            <div class="modal-footer" style="padding-right: 50px;">
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Guardar</a>
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Cancelar</a>
            </div>
        </div>
    </div>

    <!--Edit Modal-->
    <div id="edit_modal" class="modal" style="width: 400px;">
        <div class="modal-content">
            <h2 class="card-title" style="text-align: center; color: #009688">Editar feriado</h2>
            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="edit_name" type="text" ng-model="holiday.name">
                    <label for="edit_name">Nombre</label>
                </div>
            </div>
            <div class="row align-center">
                <div class="input-field-modal col s12">
                    <input id="edit_date" type="text" ng-model="holiday.date" disabled>
                    <label for="edit_date">Fecha</label>
                </div>
            </div>
            <div class="modal-footer" style="padding-right: 50px;">
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Guardar</a>
                <a href="#!" class=" modal-action modal-close waves-effect waves-teal btn-flat">Cancelar</a>
            </div>
        </div>
    </div>

    <asset:javascript src="public/holiday.js"/>

    </body>
</html>