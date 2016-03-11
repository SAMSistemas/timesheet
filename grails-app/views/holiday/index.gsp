<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'holiday.label', default: 'Holiday')}"/>
    <title>Feriados del año</title>

    <asset:stylesheet src="public/holiday.css"/>

</head>

<body>

<div ng-controller="HolidayController as holidayCtrl">

    <div id='calendar'></div>

    <!--Create and Update Modal-->
    <div id="cu-modal" class="modal modal-large">
        <form name="holidayCtrl.cuForm" novalidate>
            <div class="modal-content">

                %{--Title--}%
                <ts-modal-title action="{{holidayCtrl.actionToPerform}}" object="feriado"></ts-modal-title>

                %{--Name Field--}%
                <div class="row">
                    <div class="col s12">
                        <input id="title" type="text" name="title" ng-model="holidayCtrl.cuEvent.title"
                               required>
                        <label ng-class="{'has-error': holidayCtrl.cuForm.title.$invalid}">Nombre
                            <span ng-show="holidayCtrl.cuForm.title.$error.required"
                                  class="has-error">es obligatorio</span>
                        </label>
                    </div>
                </div>

                %{--Date Field--}%
                <div class="row">
                    <div class="col s12">
                        <input id="date" type="text"
                               ng-value="holidayCtrl.cuEvent.date | date: 'dd-MM-yyyy'" disabled>
                        <label for="date">Fecha</label>
                    </div>
                </div>

                %{--Button Row--}%
                <div class="modal-footer">
                    <button class="modal-action modal-close btn-flat disabled"
                            ng-disabled="holidayCtrl.cuForm.$invalid" ng-click="holidayCtrl.createOrUpdate()"
                            ng-class="{'teal-text teal-hover': holidayCtrl.cuForm.$valid}">{{holidayCtrl.actionToPerform}}</button>
                    <a href class="modal-action modal-close btn-flat teal-text teal-hover" ng-show="holidayCtrl.cuEvent.id !== null"
                       ng-click="holidayCtrl.delete()">Eliminar</a>
                    <a href class="modal-action modal-close btn-flat teal-text teal-hover">Cancelar</a>
                </div>

            </div>
        </form>
    </div>

</div>

<asset:javascript src="angular-controllers/holiday.js"/>

</body>
</html>