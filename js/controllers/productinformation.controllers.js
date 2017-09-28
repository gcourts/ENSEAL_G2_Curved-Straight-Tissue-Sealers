/*
Copyright (C) 2017 eProSoft America Inc - All Rights Reserved.

All information contained herein is, and remains the property of eProSofrt America Inc. The intellectual and technical concepts contained herein are proprietary to eProSoft America Inc and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law. Dissemination, Appropriation or Redistribution of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from eProSoft America Inc
*/

curvedStraightControllers.controller('productinformationController', function ($scope, $modal, $timeout) {

    $scope.selected = '1';
    $scope.video_count = 0;
    $scope.img_bg_url = 'images/product_information/secure_sealing/secure_sealing/bg1.png';

    angular.element('a[data-toggle="tab"]').bind('shown.bs.tab', function (e) {
        $scope.img_url = false;
        $scope.img_url1 = false;
        $scope.img_url2 = false;
        $scope.img_url3 = false;
        $scope.$apply();
    });

    angular.element('.animation-video-tab').on('click', function () {
        angular.element('#animation-video').get(0).play();
    });

    angular.element('.jaw-left').on('click', function () {
        var video = angular.element('#jaw-left').get(0);
        angular.element('#jaw-left').get(0).play();
        angular.element('.jaw-right').hide();
        angular.element('.jaw-left').hide();
        angular.element('#jaw-left').bind('ended', function () {
            video.currentTime = 0;
            angular.element('.jaw-left').show();
            angular.element('.jaw-right').show();
        });
    });
    angular.element('.jaw-right').on('click', function () {
        var video = angular.element('#jaw-left').get(0);
        angular.element('#jaw-left').get(0).play();
        angular.element('.jaw-right').hide();
        angular.element('.jaw-left').hide();
        angular.element('#jaw-left').bind('ended', function () {
            video.currentTime = 0;
            angular.element('.jaw-right').show();
            angular.element('.jaw-left').show();
        });
    });
    angular.element('.sticking-right').on('click', function () {
        var video = angular.element('#sticking-left').get(0);
        angular.element('#sticking-left').get(0).play();
        angular.element('.sticking-right').hide();
        angular.element('.sticking-left').hide();
        angular.element('#sticking-left').bind('ended', function () {
            video.currentTime = 0;
            angular.element('.sticking-right').show();
            angular.element('.sticking-left').show();
        });
    });
    angular.element('.sticking-left').on('click', function () {
        var video = angular.element('#sticking-left').get(0);
        angular.element('#sticking-left').get(0).play();
        angular.element('.sticking-left').hide();
        angular.element('.sticking-right').hide();
        angular.element('#sticking-left').bind('ended', function () {
            video.currentTime = 0;
            angular.element('.sticking-left').show();
            angular.element('.sticking-right').show();
        });
    });
    $scope.versatileVideoInfo = {
        'videotext': 'This video includes a demonstration of the use of a surgical device; it is not intended to be used as a surgical training guide. Other surgeons may employ different techniques. The steps demonstrated may not be the complete steps of the procedure. Individual surgeon preference and experience, as well as patient needs, may dictate variation in procedure steps. Before using any medical device, including those demonstrated or referenced in this video, review all relevant package inserts, with particular attention to the indications, contraindications, warnings and precautions, and steps for use of the device.',
        'videonotext': ''
    }
    $scope.open = function (size, videoUrl, videoInfo) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                videoUrl: function () {
                    return videoUrl;
                },
                videoInfo: function () {
                    return $scope.versatileVideoInfo[videoInfo];
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            $scope.playingBtn = '';
        }, function () {
            $scope.playingBtn = '';
        });
        modalInstance.rendered.then(function () {
            angular.element($('#modalVid')).get(0).play();
        });
    };

    $scope.playButton = function ($event, video_id) {
        $scope.reset = false;
        $('.video-container').find('.blinker').addClass('hide');
        angular.element('#' + video_id + '').get(0).play();
        angular.element('#' + video_id + '').bind('play', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            if (!$scope.reset)
                $scope.video_count++;
        });
        angular.element('#' + video_id + '').bind('ended', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            $scope.loadGraph(video_id);
        });
    };
    angular.element('li[data-toggle="tab"]').bind('shown.bs.tab', function (e) {
        if ($.trim(angular.element(e.target).text()) === 'Compression') {
            $scope.resetImpl();
        }
    });
    angular.element('.video_reset').bind('click', function (e) {
        $scope.resetImpl();
    });
    $scope.resetImpl = function () {
        $scope.video_count = 0;
        $scope.reset = true;
        $('.video-container').find('.blinker').removeClass('hide');
        $('.video-container').find('video').each(function () {
            this.play();
            this.pause();
            this.currentTime = 0;
        });
        $('#graph-container').removeClass('graph-container-zoom');
        $('#graph-container').find(".gray.graph_animation").removeClass('graph_animation').addClass('graph_bg_gray');
        $('#graph-container').find(".red.graph_animation").removeClass('graph_animation').addClass('graph_bg_red');
        $('.close-btn').addClass('hide');
    };
    angular.element('#graph-container, #graph-container > *').bind('click', function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        elem = $('#graph-container');
        var state = elem.attr('zoom');
        if (state === undefined || 0 === parseInt(state)) {
            elem.addClass('graph-container-zoom');
            $('.close-btn').removeClass('hide');
            elem.attr('zoom', 1);
        } else {
            elem.removeClass('graph-container-zoom');
            $('.close-btn').addClass('hide');
            elem.attr('zoom', 0);
        }
    });
    $scope.loadGraph = function (video_id) {

        if (video_id === 'impact_video') {
            angular.element('.graph_bg_gray').removeClass('graph_bg_gray').addClass('graph_animation');
        } else if (video_id === 'super_video') {
            angular.element('.graph_bg_red').removeClass('graph_bg_red').addClass('graph_animation');
        }

        if ($scope.video_count <= 1) {
            $('.video-container').find('.blinker').not('.' + video_id + '_blinker').removeClass('hide');
            $('.video-container').find('video').not('#' + video_id + '').each(function () {
                this.currentTime = 0;
            });
        } else if ($scope.video_count = 2) {
            elem = $('#graph-container');
            $timeout(function () {
                elem.addClass('graph-container-zoom');
                $('.close-btn').removeClass('hide');
                elem.attr('zoom', 1);
            }, 3500);
        }

    };
    $scope.strPad = function (i, l, s) {
        var o = i.toString();
        if (!s) {
            s = '0';
        }
        while (o.length < l) {
            o = s + o;
        }
        return o;
    };
});
curvedStraightControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, videoUrl, videoInfo) {
    $scope.videoUrl = videoUrl;
    $scope.videoInfo = videoInfo;
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
