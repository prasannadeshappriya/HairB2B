/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('app')
    .factory('AuthService',['$localStorage', '$http', function ($localStorage, $http) {
        var isLogin = false;
        isEmailVerifyed = false;
        var service = {};

        service.Login = login;
        service.Logout = logout;
        service.getUser = getUser;

        service.isLogin = isLogin;
        service.isEmailVerifyed = isEmailVerifyed;

        service.setIsLogin = setIsLogin;
        service.setEmailVerifyed = setEmailVerifyed;
        service.isLoginStatus = isLoginStatus;
        service.isEmailVerifyedStatus = isEmailVerifyedStatus;

        return service;

        //For Watchers in other controllers
        function isLoginStatus() {return isLogin;}
        function isEmailVerifyedStatus() {return isEmailVerifyed;}

        //Set the variable values
        function setIsLogin(flag) {isLogin = flag;}
        function setEmailVerifyed(flag) {isEmailVerifyed = flag;}

        function getUser() {
            if($localStorage.currentUser){
                return $localStorage.currentUser;
            }else{
                isLogin = false;
                return null;
            }
        }

        function login(auth_token, email, firstname, lastname, callback) {
            try {
                $localStorage.currentUser = {
                    email: email,
                    token: auth_token,
                    firstname: firstname,
                    lastname: lastname
                };
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