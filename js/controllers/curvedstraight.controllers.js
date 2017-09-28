/*
Copyright (C) 2017 eProSoft America Inc - All Rights Reserved.

All information contained herein is, and remains the property of eProSofrt America Inc. The intellectual and technical concepts contained herein are proprietary to eProSoft America Inc and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law. Dissemination, Appropriation or Redistribution of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from eProSoft America Inc
*/

var curvedStraightControllers = angular.module('curvedStraightControllers', ['ngTouch', 'ui.bootstrap']);

curvedStraightControllers.controller('MainController', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    };
    $scope.selected = '1';
});

