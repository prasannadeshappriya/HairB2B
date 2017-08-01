/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('app')
    .factory('SearchService',['$localStorage', function ($localStorage) {
        var service = {};
        service.getSearchHistory = getSearchHistory;
        service.writeSearchHistory = writeSearchHistory;
        service.clearHistory = clearHistory;
        return service;

        function getSearchHistory() {
            if($localStorage.search_history){
                return $localStorage.search_history;
            }else{
                return null;
            }
        }

        function clearHistory() {
            delete $localStorage.search_history;
        }

        function writeSearchHistory(type_id, skill_id, callback) {
            try {
                $localStorage.search_history = {
                    type_id: type_id,
                    skill_id: skill_id
                };
                callback(true);
            }catch  (err){
                console.log('error writing local storage');
                callback(false);
            }
        }
    }]);