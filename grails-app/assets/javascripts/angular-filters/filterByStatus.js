(function() {
    var app = angular.module('filters');

    app.filter('filterByStatus', function () {
        return function (items, status) {
            var filtered = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (status === 'todos') {
                    filtered.push(item);
                }
                if (status === 'habilitados' && item.enabled === true) {
                    filtered.push(item);
                }
                if (status === 'deshabilitados' && item.enabled === false) {
                    filtered.push(item);
                }
            }

            return filtered;
        }
    });

})();