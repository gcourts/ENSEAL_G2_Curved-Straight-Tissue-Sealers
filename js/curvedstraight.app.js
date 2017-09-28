/*
Copyright (C) 2017 eProSoft America Inc - All Rights Reserved.

All information contained herein is, and remains the property of eProSofrt America Inc. The intellectual and technical concepts contained herein are proprietary to eProSoft America Inc and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law. Dissemination, Appropriation or Redistribution of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from eProSoft America Inc
*/

angular.module('curvedStraightApp', ['ngRoute', 'hmTouchEvents', 'curvedStraightControllers', 'ui.bootstrap', 'ngDragDrop', 'ngDialog']).config(function ($routeProvider) {
    $routeProvider.when('/productinformation', {
        templateUrl: 'partials/productinformation.html',
        controller: 'productinformationController'
    }).when('/productuse', {
        templateUrl: 'partials/productuse.html',
        controller: 'productuseController'
    }).otherwise({
        redirectTo: '/productinformation'
    });
}).run(function () {
    FastClick.attach(document.body);
}).directive("etaTouchstart", function () {
    return function (scope, elem, attrs) {
        elem.bind("touchstart click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            scope.$apply(attrs["etaTouchstart"]);
        });
    };
});
