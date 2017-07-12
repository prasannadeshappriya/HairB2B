/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('app')
    .factory('AuthService',['$localStorage', '$http', function ($localStorage, $http) {
        var isLogin = false;
        var service = {};

        service.Login = login;
        service.Logout = logout;
        service.getUser = getUser;
        service.isLogin = isLogin;
        service.setIsLogin = setIsLogin;
        service.isLogins = isLogins;

        return service;

        function isLogins() {
            return isLogin;
        }

        function setIsLogin(flag) {
            isLogin = flag;
        }

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
                $http.defaults.headers.common.Authorization = 'JWT ' + auth_token;
                setIsLogin(true);
                callback(true);
            }catch  (err){
                setIsLogin(false);
                console.log('error writing local storage');
                callback(false, false);
            }
        }

        function logout() {
            setIsLogin(false);
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }]);