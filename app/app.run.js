/**
 * Created by prasanna on 7/16/17.
 */
//Run when refresh the page
app.run(['$localStorage','AuthService', '$http','$location',function ($localStorage,AuthService, $http,$location) {
    if ($localStorage.currentUser) {
        AuthService.setIsLogin(true);
        $http.defaults.headers.common.Authorization = 'JWT ' + $localStorage.currentUser.token;

        $http({
            method: "POST",
            url: "http://localhost:3000/auth/getVerifyStatus"
        }).then(function (resData){
            if(resData.data.verify){
                AuthService.setEmailVerifyed(true);
            }else{
                AuthService.setEmailVerifyed(false);
            }
        },function (error){
            if(error.status===401){AuthService.Logout();}
            console.log('error: ' + error);
        });
    }
}]);