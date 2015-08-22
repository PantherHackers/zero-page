var myApp = angular.module('mainApp', [])

myApp.controller('mainController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	
	$scope.name = '';
	$scope.campusId = '';
	$scope.didPass = true;
	$scope.nameError = '';
	$scope.campusIdError = '';
	$scope.result = '';
	$scope.experience = 'none';
	$scope.signUp = true;
	
	$scope.submit = function() {
		
		if ($scope.name.length !== 0 && $scope.campusId.length !== 0) {
			
			$scope.resultError = '';
			$scope.nameError = '';
			$scope.campusIdError = '';
			
			var info = {
				
				"name": $scope.name,
				"campusId": $scope.campusId,
				"experience": $scope.experience,
				"signUp": $scope.signUp
			};
			
			var script_url = "https://script.google.com/macros/s/AKfycbxlDE99VBlCgPxYlGjlA2Qow5RZST9MYn0eyMoyL1lEcj7dgcM/exec";
			$.ajax({
				method:'POST',
				url: script_url,
				data: info
			})
				.done(function(){
					$scope.$apply(function() {
						
						$scope.result = $sce.trustAsHtml('<br>Thanks for RSVPing. We look forward to meeting you!');
					});
				})
				.fail(function() {
					$scope.$apply(function() {
						
						$scope.resultError = 'my-alert';
						$scope.result = $sce.trustAsHtml('<br>An error has ocurred. Please refresh the website and try again or contact <a href="mailto:help@pantherhackers.com">help@pantherhackers.com</a>');
					});
				});
			
			
			
		} else {
			
			$scope.resultError = 'my-alert';
			$scope.result = $sce.trustAsHtml('<br>Please fill in all fields.');
			$scope.nameError = 'my-error';
			$scope.campusIdError = 'my-error';
			
		}
	}
}]);