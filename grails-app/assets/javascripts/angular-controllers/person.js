//= require default
//= require shared/table-body-observer
//= require_self

app.controller('personController', function (personService, workPositionService) {

        /** Capturing controller instance **/
        var vm = this;

        vm.sortType = 'name'; // set the default sort type
        vm.sortReverse = false;  // set the default sort order
        vm.search = '';     // set the default search/filter term
        vm.status = 'all';

        vm.people = [];
        vm.personToCreate = null;
        vm.personToEdit = null;
        vm.person = null;

        vm.createForm = null;
        vm.editForm = null;

        vm.work_hours = [4,6,8];
        vm.work_positions = [];



        /** Callback Handlers **/

        function getSuccess(response) {
            vm.people = response.data;
        }

        function createSuccess(response) {
            vm.personToCreate.id = response.data.id;
            vm.addToTable(vm.people, vm.personToCreate);
            vm.writeToLog(response, 'created');
        }

        function updateSuccess(response) {
            vm.updateInTable(vm.people, vm.personToEdit);
            vm.writeToLog(response, 'updated');
        }

        function getWorkPositionSuccess(response) {
            vm.work_positions = response.data;
        }

        function callbackError(response) {
            vm.writeToLog(response, 'error');
        }

        /** Person ABM **/

        personService.getPeople(getSuccess, callbackError);

        workPositionService.getWorkPositions(getWorkPositionSuccess, callbackError);

        vm.new = function () {
            vm.personToCreate = {
                name: "",
                lastname: "",
                username: "",
                password: "",
                work_hours: "",
                work_position: "",
                enabled: true
            };

            // To clear the errors from previous create forms
            if (vm.createForm !== null) {
                vm.createForm.username.$setValidity('available', true);
            }
        };

        vm.create = function () {
            if (vm.createForm.$valid) {
                personService.createPerson(vm.personToCreate, createSuccess, callbackError);
            }
        };

        vm.edit = function (person) {
            vm.personToEdit = angular.copy(person);
            vm.person = person;

            // To clear the errors from previous edit forms
            if (vm.editForm !== null) {
                vm.editForm.username.$setValidity('available', true);
            }
        };

        vm.update = function () {
            if (vm.editForm.$valid) {
                personService.updatePerson(vm.personToEdit, updateSuccess, callbackError);
            }
        };



        /** Utils **/

        vm.reverseOrder = function (sortType) {
            vm.sortType = sortType;
            vm.sortReverse = !vm.sortReverse
        };

        vm.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        vm.addToTable = function (items, item) {
            items.push(item);
        };

        vm.updateInTable = function (items, item) {
            for (var i = 0; i < items.length; i++)
                if (items[i].id === item.id)
                    items[i] = item;
        };

        vm.changeColor = function (divId) {
            $("#" + divId).css("cssText", " color: #009688 !important;");
        };

        //Write result message to console
        vm.writeToLog = function(response, result){

            var resultMessage = {
                result: result,
                status: response.status,
                data: response.data
            };

            console.log(JSON.stringify(resultMessage));
        };

    });