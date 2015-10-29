// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= require vendor/jquery-2.1.4.min
//= require vendor/moment.min
//= require_tree vendor
//= require_tree vendor/lang
//= require_self
//= require_tree angular-directives
//= require_tree angular-filters

if (typeof jQuery !== 'undefined') {
    (function($) {
        $('#spinner').ajaxStart(function() {
            $(this).fadeIn();
        }).ajaxStop(function() {
            $(this).fadeOut();
        });
    })(jQuery);
}

angular.module('directives', []);
angular.module('filters', []);
angular.module('myApp', ['directives', 'filters']);

