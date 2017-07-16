/**
 * Created by prasanna on 7/16/17.
 */
//Run when refresh the page
app.run(['$localStorage','AuthService', '$http',function ($localStorage,AuthService, $http) {
    if ($localStorage.currentUser) {
        AuthService.setIsLogin(true);
        $http.defaults.headers.common.Authorization = 'JWT ' + $localStorage.currentUser.token;

        $http({
            method: "POST",
            url: "http://localhost:3000/auth/getVerifyStatus"
        }).then(function (resData){
            if(resData.data.verify){
                console.log('app.run: ' + 'data came as true');
                AuthService.setEmailVerifyed(true);
            }else{
                console.log('app.run: ' + 'data came as false');
                AuthService.setEmailVerifyed(false);
            }
        },function (error){
            console.log('error: ' + error);
        });
    }
}]);