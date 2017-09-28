/*
Copyright (C) 2017 eProSoft America Inc - All Rights Reserved.

All information contained herein is, and remains the property of eProSofrt America Inc. The intellectual and technical concepts contained herein are proprietary to eProSoft America Inc and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law. Dissemination, Appropriation or Redistribution of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from eProSoft America Inc
*/

curvedStraightControllers.controller('productuseController', ['$scope', 'ngDialog', '$timeout', function ($scope, ngDialog, $timeout) {
        $scope.imageOpen = function (size, imgUrl) {
            size:size,
                    ngDialog.open({
                        template: 'partials/imageZoomer.html',
                        controller: 'imgZoomerInstanceCtrl',
                        className: 'ngdialog-theme-default imagezoomer',
                        resolve: {
                            imgUrl: function () {
                                return imgUrl;
                            }
                        },
                        disableAnimation: false,
                        showClose: false,
                        closeByDocument: true,
                        scope: $scope
                    });
        };

        $(function () {
            document.getElementById("audio1").load();
            document.getElementById("audio2").load();
            document.getElementById("audio3").load();

            document.getElementById("audio1").onended = function () {
                document.getElementById("audio2").play();
            };
            document.getElementById("audio2").onended = function () {
                document.getElementById("audio2").play();
            };
            document.getElementById("audio3").onended = function () {
                document.getElementById("audio1").load();
                document.getElementById("audio2").load();
                document.getElementById("audio3").load();
                $("#stapleSlideBar").slider("enable").slider("option", "value", 0).fadeTo(1);
                $('#stapleSlideBarIndex').attr('src', 'images/product_use/sealing_experience/eagle_flexible_sealing_cycle_0000.png');
            };
            var playSequence = function (value) {
                if (value > 90) {
                    document.getElementById("audio1").pause();
                    document.getElementById("audio2").pause();
                    document.getElementById("audio3").play();
                } else {
                    if (document.getElementById("audio1").currentTime !== document.getElementById("audio1").duration) {
                        document.getElementById("audio1").play();
                    } else if (document.getElementById("audio2").currentTime !== document.getElementById("audio2").duration) {
                        document.getElementById("audio2").play();
                    }
                }
            };

            angular.element('#stapleSlideBar').slider({
                min: 0,
                max: 101,
                step: 1,
                value: 0,
                start: function (event, ui) {
                    playSequence(ui.value);
                },
                slide: function (event, ui) {
                    $scope.$apply(function () {
                        $scope.stapleSlideImage = "images/product_use/sealing_experience/eagle_flexible_sealing_cycle_000" + ui.value + ".png";
                    });
                    playSequence(ui.value);
                },
                stop: function (event, ui) {
                    if (ui.value > 90) {
                        playSequence(ui.value);
                        $("#stapleSlideBar").slider("disable").fadeTo(0.5);
                    } else {
                        document.getElementById("audio1").pause();
                        document.getElementById("audio2").pause();
                        document.getElementById("audio3").pause();
                        document.getElementById("audio1").load();
                        document.getElementById("audio2").load();
                        document.getElementById("audio3").load();
                    }
                }
            });
        });
        $scope.energy_image_index = "00000";
        $scope.energy_blink = 0;
        angular.element('li[data-toggle="tab"]').bind('show.bs.tab', function () {
            $scope.energy_blink = 0;
            $scope.energy_image_index = "00000";
            $scope.$apply();
            $('.integrated-swipe').hide();
        });
        $scope.animateTo = function (start, range, callback) {
            var xyz = setInterval(function () {
                start++;
                if (start === range) {
                    clearInterval(xyz);
                    if (callback)
                        callback();
                }
                var temp = "" + start;
                var audioElement = document.getElementById('integrated-audio');
                if (temp >= 50 && temp <= 60) {
                    audioElement.play();
                }
                var pad = "00000";
                $scope.energy_image_index = pad.substring(0, pad.length - temp.length) + temp;
                //           console.log('url(images/product_use/integrated_energy_activation_button/eagle_ieabib/eagle_ieabibr_' + $scope.energy_image_index + '.png)');
                $scope.$apply();
            }, 10);
        };
        $scope.animateTrigger = function () {
            if ($scope.energy_blink === 0) {
                $scope.energy_blink = -1;
                $scope.animateTo(0, 60, function () {
                    $scope.energy_blink = 1;
                });
            }
            $('.integrated-swipe').hide();
        };
        $scope.animateTriggerLock = function () {
            if ($scope.energy_blink === 1) {
                $scope.energy_blink = -1;
                $scope.animateTo(60, 90, function () {
                    $scope.energy_blink = 2;
                    $('.integrated-swipe').show();
                });
            }
        };
        $scope.moveTriggerIndex = 60;
        $scope.moveTrigger = function ($event, value) {
            if ($scope.energy_blink === 2) {
                var ele = $($event.target).closest('.integrated_energy');
                value *= 2;
                var result = Math.round($scope.moveTriggerIndex + value);
                if (result >= 0 && result <= 60) {
                    var pad = "00000";
                    result = "" + (150 - result);
                    result = pad.substring(0, pad.length - result.length) + result;
                    ele.css({'background-image': 'url(images/product_use/integrated_energy_activation_button/eagle_ieabib/eagle_ieabibr_' + result + '.png)'});
                    $scope.moveTriggerIndex += value;
                }
            }
        };
    }]);
curvedStraightControllers.controller('imgZoomerInstanceCtrl', function ($scope, ngDialog, imgUrl) {
    $scope.imgUrl = imgUrl;
    $scope.closeDialog = function () {
        ngDialog.close();
    };
});
//function moveTrigger(event) {
//    event.stopPropagation()
//    $scope = angular.element(event.target).scope();
//    if ($scope.energy_blink === 2) {
//        var ele = $(event.target).closest('.integrated_energy');
//        var result = Math.round((event.layerX * 0.64 * 100) / ele.width());
//        if (result >= 0 && result <= 60) {
//            var pad = "00000";
//            result = "" + (150 - result);
//            result = pad.substring(0, pad.length - result.length) + result;
//            ele.css({'background-image': 'url(images/product_use/integrated_energy_activation_button/eagle_ieabib/eagle_ieabibr_' + result + '.png)'});
////            console.log('url(images/product_use/integrated_energy_activation_button/eagle_ieabib/eagle_ieabibr_' + result + '.png)');
//        }
//    }
//}