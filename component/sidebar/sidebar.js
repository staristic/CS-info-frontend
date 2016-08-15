var sidebar = angular.module('sidebar', ["ngDataCenter"]);

sidebar.directive('sideBar', function($timeout) {
	return {
		restrict: 'C',
		templateUrl: '/component/sidebar/sidebar.html',
		link: function(scope, element) {
		}
	};
});

sidebar.controller("SideBarController", ['$scope', '$rootScope', '$timeout', '$http', 'DataCenter',
    function($scope, $rootScope, $timeout, $http, DataCenter) {

        $scope.list_tree = [];
    
        var recurcive_render_list = function(data, target, parent_ID){
            for(var i = 0; i < data.length; i++){
                if(!parent_ID && !data[i].parent){
                    target.push(data[i]);
                    data.splice(i,1);
                    i = -1;
                    target[target.length-1].nodes = [];
                    recurcive_render_list(data, target[target.length-1].nodes, target[target.length-1]["_id"]);
                }else if(parent_ID && data[i].parent && (parent_ID == data[i].parent) ){
                    target.push(data[i]);
                    data.splice(i,1);
                    i = -1;
                    target[target.length-1].nodes = [];
                    recurcive_render_list(data, target[target.length-1].nodes, target[target.length-1]["_id"]);
                }
            }
        }
        
        var loadindexlist = function() {
            var id = "",
                start = 0;
            len = 8;
            DataCenter.indexlist().then(function(resp) {
                console.log(resp);
                recurcive_render_list(resp, $scope.list_tree);
            });
        };

        var init = function() {
            loadindexlist();

        };
        
        init();

    }
]);