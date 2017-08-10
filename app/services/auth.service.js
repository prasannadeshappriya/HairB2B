/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('app')
    .factory('AuthService',['$localStorage', '$http', function ($localStorage, $http) {
        var isLogin = false;
        var isEmailVerifyed = false;
        var isProfileExist = false;
        var service = {};

        service.getToken = getToken;

        service.Login = login;
        service.Logout = logout;
        service.getUser = getUser;

        service.isLogin = isLogin;
        service.isEmailVerifyed = isEmailVerifyed;
        service.isProfileExist = isProfileExist;

        service.setIsLogin = setIsLogin;
        service.setEmailVerifyed = setEmailVerifyed;
        service.setProfileStatus = setProfileStatus;
        service.isLoginStatus = isLoginStatus;
        service.isEmailVerifyedStatus = isEmailVerifyedStatus;
        service.isProfileExistStatus = isProfileExistStatus;

        return service;

        //For Watchers in other controllers
        function isLoginStatus() {return isLogin;}
        function isEmailVerifyedStatus() {return isEmailVerifyed;}

        //Set the variable values
        function setIsLogin(flag) {isLogin = flag;}
        function setEmailVerifyed(flag) {isEmailVerifyed = flag;}

        function setProfileStatus(flag) {isProfileExist = flag;}
        function isProfileExistStatus() {return isProfileExist;}

        function getUser() {
            if($localStorage.currentUser){
                return $localStorage.currentUser;
            }else{
                isLogin = false;
                return null;
            }
        }

        function login(id,auth_token, email, firstname, lastname, callback) {
            try {
                $localStorage.currentUser = {
                    id: id,
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

        function getToken(){
            if($localStorage.currentUser){
                return $localStorage.currentUser.token;
            }
            return '';
        }

        function logout() {
            setIsLogin(false);
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }]);