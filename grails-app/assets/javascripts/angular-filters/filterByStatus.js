(function() {
    'use strict';

    angular
        .module('filters')
        .filter('filterByStatus', filterByStatus);

    function filterByStatus() {
        return function (items, status) {
            var filtered = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (status === 'all') {
                    filtered.push(item);
                }
                if (status === 'enabled' && item.enabled === true) {
                    filtered.push(item);
                }
                if (status === 'disabled' && item.enabled === false) {
                    filtered.push(item);
                }
            }

            return filtered;
        }
    }
})();