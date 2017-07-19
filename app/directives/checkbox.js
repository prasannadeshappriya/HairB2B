/**
 * Created by prasanna_d on 7/19/2017.
 */
angular.module('app')
    .directive('checkbox',
    [
        function() {
            return {
                restrict: 'A',
                link: function(scope, element, attribute, model) {
                    if (! attribute.checkbox) {
                        return false;
                    }
                    scope.$watch(attribute.checkbox, function(state) {
                        if (state) {
                            element.addClass('checked');
                        } else {
                            element.removeClass('checked');
                        }
                    });
                }
            };
        }
    ]
);