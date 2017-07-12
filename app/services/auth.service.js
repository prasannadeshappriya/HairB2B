/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('app')
    .factory('AuthService',['$localStorage', '$http', function ($localStorage, $http) {
        var service = {};
        var isLogin = false;

        service.Login = login;
        service.Logout = logout;
        service.getUser = getUser;
        service.isLogin = isLogin;

        return service;

        function getUser() {
            if($localStorage.currentUser){
                return $localStorage.currentUser;
            }else{
                isLogin = false;
                return null;
            }
        }

        function login(auth_token, email, callback) {
            try {
                $localStorage.currentUser = {email: email, token: auth_token};
                console.log($localStorage.currentUser);
                $http.defaults.headers.common.Authorization = 'JWT ' + auth_token;
                isLogin = true;
                console.log('service:' + isLogin);
                callback(true);
            }catch  (err){
                isLogin = false;
                console.log('error writing local storage');
                callback(false);
            }
        }

        function logout() {
            isLogin = false;
            delete $localStorage.currentUser;
            console.log('service:' + isLogin);
            $http.defaults.headers.common.Authorization = '';
        }
    }]);