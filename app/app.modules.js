/**
 * Created by prasanna_d on 7/6/2017.
 */
var app = angular.module('app',[
    'ngStorage',
    'ui.router',
    'ngRoute',
    'signin',
    'signup',
    'ui.rCalendar',
    'multipleDatePicker'
])
    .constant('host_url', 'http://localhost:3000/')
    // .constant('host_url', 'https://hairbtob-server.herokuapp.com/')
;