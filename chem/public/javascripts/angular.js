var app = angular.module('aces_high', ['ngRoute','ngResource']);

app.config(['$routeProvider' , function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : 'partials/home.html',
			controller : 'HomeCtrl'
		})
		.when('/add-a-medicine', {
            templateUrl: 'partials/add.html',
            controller : 'AddCtrl'
        })
        .when('/edit-medicine/:id', {
	        templateUrl: 'partials/add.html',
	        controller: 'EditCtrl'
	    })
	    .when('/delete-medicine/:id', {
	        templateUrl: 'partials/delete.html',
	        controller : 'DeleteCtrl'
	    })
		.otherwise({
			redirectTo : '/'
		});
}]);


app.controller('HomeCtrl',['$scope', '$resource', function($scope, $resource){
	var resource_api = $resource('/api/medicines');
	resource_api.query(function(medicines){
		$scope.medicines = medicines;
	});
}]);
app.controller('AddCtrl',['$scope', '$resource', '$location', function($scope, $resource, $location){
	$scope.save =function(){
		if($scope.medicine.bef_bf==false && $scope.medicine.aft_bf==false && $scope.medicine.bef_ln==false && $scope.medicine.aft_ln==false && $scope.medicine.bef_dn==false&& $scope.medicine.aft_dn==false){
			$scope.medicine.sos=true;
		}
		var resource_api = $resource('api/medicines');
		resource_api.save($scope.medicine,function(){
			$location.path('/');
		});
	};
}]);

app.controller('EditCtrl',['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){
		var resource_api = $resource('api/medicines/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        resource_api.get({id: $routeParams.id}, function(medicine){
        	$scope.medicine = medicine;
        });

		$scope.save =function(){
			resource_api.update($scope.medicine, function(){
				$location.path('/');
			});
		}
	}]);


app.controller('DeleteCtrl',['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){
		var resource_api = $resource('api/medicines/:id');

        resource_api.get({id: $routeParams.id}, function(medicine){
        	$scope.medicine = medicine;
        });

		$scope.delete =function(){
			resource_api.delete({id: $routeParams.id}, function(){
				$location.path('/');
			});
		}
	}]);