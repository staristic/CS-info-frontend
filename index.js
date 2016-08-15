var app = angular.module('admin', ["ngDataCenter", 'summernote', 'sidebar', 'ngSanitize'])
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    });

app.controller("IndexController", ['$scope', '$window', '$rootScope', '$timeout', '$http', '$location','DataCenter', '$sce',
    function($scope, $window, $rootScope, $timeout, $http, $location, DataCenter, $sce) {
        var fix_height = function(window_height){
            if(window_height){
                var win_h = window_height;
            }else{
                var win_h = $window.innerHeight;
            }
            var header_height = $("header").height();
            var h = win_h - header_height;
            console.log("new high", h);
            $(".sideBar").height(h);
            $(".main-block").height(h);
        }
        
        var fix_width = function(window_width){
            if(window_width){
                var win_w = window_width;
            }else{
                var win_w = $window.innerWidth;
            }
            var sidebar_width = $(".sideBar").width();
            var w = win_w - sidebar_width - 81;
            console.log("new width", w);
            $(".main-block").width(w);
        }
        
        var win = angular.element($window);
        win.bind("resize",function(e){
            fix_height(e.target.innerHeight);
            fix_width(e.target.innerWidth);
        })
        
        fix_height();
        fix_width();
        $scope.Content = '';
        $scope.editContent = '';
        $scope.origin = [];
        $scope.edit_id = '';
        $scope.new_mode = false;
        $scope.show_editblock = false;
        $scope.new_index_name_ch = '';
        $scope.new_index_name_en = '';
        var index_id = '';
        
        $scope.new_index = function(){
            
            if($scope.new_index_name_en == ''){
                alert("請輸入英文名稱");
                return ;
            }
            var english = /^[A-Za-z0-9]*$/;
            if(!english.test($scope.new_index_name_en)){
                alert("請輸入正確的英文名稱");
                return ;
            }
            
            var newInfo = {
                "parent": index_id,
                "displayName": {
                    "繁體中文": $scope.new_index_name_ch,
                    "English": $scope.new_index_name_en
                }
            };
            console.log(newInfo);
            DataCenter.newindex(newInfo).then(function(resp) {
                console.log(resp);
            });
        }
        
        $scope.edit_now = function(){
            console.log('show edit block')
            $scope.show_editblock = true;
        }
        
        var init = function(){
            var para = $location.search();
            console.log(para);
            $scope.Content = '';
            $scope.editContent = '';
            $scope.origin = [];
            $scope.edit_id = '';
            $scope.new_mode = false;
            $scope.show_editblock = true;
            if(para.id){
                $scope.noContent = false;
                DataCenter.getContent(para.id).then(function(resp) {
                    console.log(resp);
                    if(resp && resp.content){
                        console.log('in Content');
                        index_id = resp.index;
                        $scope.Content = $sce.trustAsHtml(resp.content);
                        $scope.edit_id = resp["_id"];
                        //$scope.Content = resp.content;
                        var tmep = jQuery.extend(true, {}, resp);
                        $scope.editContent = tmep.content;
                        console.log($scope.Content);
                        $scope.new_mode = false;
                        $scope.show_editblock = false;
                    }else{
                        if(!resp || (resp && resp.content == "")){
                            console.log('no content');
                            $scope.edit_id = para.id;
                            $scope.new_mode = true; 
                        }
                    }
                    
                });
                
                DataCenter.getOrigin(para.id).then(function(resp) {
                    console.log('origin', resp);
                    var temp = resp;
                    while(temp){
                        temp2 = jQuery.extend(true, {}, temp);
                        console.log(temp2);
                        $scope.origin.push(temp2);
                        temp = temp.parent;
                        //temp = jQuery.extend(true, {}, temp.parent);
                    }
                    //console.log($scope.origin);
                });
            }else{
                $scope.noContent = true;
            }
        }
        
        $scope.updateContent = function(){
            if($scope.new_mode){
                DataCenter.newContent($scope.edit_id, $scope.editContent).then(function(resp) {
                    console.log(resp);
                    if(resp && resp.result.ok == 1){
                        console.log('re init this page');
                        init();
                    }
                });
            }else{
                DataCenter.editContent($scope.edit_id, $scope.editContent).then(function(resp) {
                    console.log(resp);
                    if(resp && resp["ok"] == 1){
                        console.log('re init this page');
                        init();
                    }
                });
            } 
        }

        $scope.inited = false;
        $scope.$watch(function () {
            return $location.search();
        }, function (value) {
            if(!$scope.inited){
                init();
            }else{
                $scope.inited = false;
            }
        });

        if(!$scope.inited){
            init();
            $scope.inited = true;
        }
        
    }
]);