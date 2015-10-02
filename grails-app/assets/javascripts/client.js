// app.js

angular.module('sortApp', [])

    .controller('mainController', function($scope) {
        $scope.clients = [];
        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.search   = '';     // set the default search/filter term
        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $scope.removeRow = function(id){
            var index = -1;
            var comArr = eval( $scope.clients );
            for( var i = 0; i < comArr.length; i++ ) {
                if( comArr[i].id === id ) {
                    index = i;
                    break;
                }
            }
            if( index === -1 ) {
                alert( "Something gone wrong" );
            }
            $scope.clients.splice( index, 1 );

            $.ajax({
                url: '/client/delete/' + id,
                type: 'DELETE'
            });
        };

        $.getJSON( "/client.json", function( data ) {
            $scope.clients = data;
            $scope.$apply();
        });

    });