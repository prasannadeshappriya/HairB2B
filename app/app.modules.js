/**
 * Created by prasanna_d on 7/6/2017.
 */
var app = angular.module('app',[
    'ngStorage',
    'ui.router',
    'ngRoute',
    'signin',
    'signup',
    'ui.rCalendar'
])
    .constant('host_url', 'http://localhost:3000/')
;

// 'https://hairbtob-server.herokuapp.com/'
// 'http://localhost:3000/'