"use strict";
angular.module("ngDataCenter", [])
.factory('DataCenter', ['$rootScope', '$q', '$timeout', '$http',
	function($rootScope, $q, $timeout, $http) {

	var _factory = this;

	_factory.indexlist = function () {

		var defer = $q.defer();

		$http({
            //"http://119.81.167.114:7777/Index/list"
			url: "http://119.81.167.114:7777/Index/list",
			method: "GET",
			data: $.param({
			})
		}).success(function(data) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
			defer.reject(data);
		});
		return defer.promise;
	};
    
    _factory.newindex = function (newInfo) {

		var defer = $q.defer();
        console.log(newInfo);
		$http({
            //"http://119.81.167.114:7777/Index/list"
			url: "http://119.81.167.114:7777/Index/post/",
			method: "POST",
			data: newInfo,
            headers: {
				'Content-Type': 'application/json'
			}
		}).success(function(data) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
			defer.reject(data);
		});
		return defer.promise;
	};
    
    _factory.getContent = function (id) {

		var defer = $q.defer();

		$http({
            //"http://119.81.167.114:7777/Index/list"
			url: "http://119.81.167.114:7777/Content/find/index/" + id,
			method: "GET",
			data: $.param({
                
            })
		}).success(function(data) {
            console.log(data);
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
			defer.reject(data);
		});
		return defer.promise;
	};
    
    _factory.editContent = function (id, content) {

		var defer = $q.defer();
        console.log('editContent', id, content);
		$http({
            //"http://119.81.167.114:7777/Index/list"
			url: "http://119.81.167.114:7777/Content/update/" + id,
			method: "PUT",
			data: {
                'content': content
            },
            headers: {
				'Content-Type': 'application/json'
			},
		}).success(function(data) {
            console.log(data);
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
			defer.reject(data);
		});
		return defer.promise;
	};
    
    _factory.newContent = function (id, content) {

		var defer = $q.defer();
        console.log('newContent', id, content);
		$http({
            //"http://119.81.167.114:7777/Index/list"
			url: "http://119.81.167.114:7777/Content/post/" + id,
			method: "POST",
			data: {
                'content': content
            },
            headers: {
				'Content-Type': 'application/json'
			},
		}).success(function(data) {
            console.log(data);
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
			defer.reject(data);
		});
		return defer.promise;
	};
    
    _factory.getOrigin = function (id) {

		var defer = $q.defer();

		$http({
            //"http://119.81.167.114:7777/Index/list"
			url: "http://119.81.167.114:7777/Index/trace/id/" + id,
			method: "GET",
			data: $.param({
                
            })
		}).success(function(data) {
            console.log(data);
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
			defer.reject(data);
		});
		return defer.promise;
	};
    
	return _factory;
}])