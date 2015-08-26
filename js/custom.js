function squareObject(group) {
	
	group.each(function () {
		
		$(this).height($(this).width());
	});
}

function equalHeight(group) {    
    tallest = 0;    
    group.each(function() {       
        thisHeight = $(this).height();       
        if(thisHeight > tallest) {          
            tallest = thisHeight;       
        }    
    });
	
    group.each(function() {
		
		$(this).height(tallest);
	});
} 

$(window).load(function() {
	
	squareObject($(".map"));
		
	if ($(window).width() >= 768) {
			
		equalHeight($("#details .thumbnail"));			
	}
	
	$(window).resize(function() {
		
		squareObject($(".map"));
		
		if ($(window).width() >= 768) {
			
			equalHeight($("#details .thumbnail"));			
		}
	});
});

var myApp = angular.module('mainApp', [])

myApp.controller('mainController', ['$scope', '$http', '$sce', '$log' function($scope, $http, $sce, $log) {
	
	$scope.name = '';
	$scope.campusId = '';
	$scope.didPass = true;
	$scope.nameError = '';
	$scope.campusIdError = '';
	$scope.result = '';
	$scope.experience = 'none';
	$scope.signUp = true;
	$scope.buttonStatus = true;
	$scope.signedUp = false;
	
	$scope.doneSign = function () {
		
		return $scope.signedUp;
	}
	
	$scope.isDisabled = function () {
		
		return !$scope.buttonStatus;
	};
	
	$scope.submit = function() {
		
		if ($scope.name.length !== 0 && $scope.campusId.length !== 0) {
			
			if ($scope.buttonStatus) {
				
				$scope.buttonStatus = false;
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
				.done(function() {
					$scope.$apply(function() {
						
						$scope.signedUp = true;
						if ($(window).width() >= 768) {
								
							$scope.result = $sce.trustAsHtml('<br>Thanks for RSVPing. We look forward to meeting you<br><br>' +
							'<a target="_blank" href=\"https://www.google.com/calendar/event?action=TEMPLATE&tmeid=ZDIwdTFwcmw3MTA4bWJ0c3M0M2M0cm1zamMgZmVycmVybHVpczk3QG0&tmsrc=ferrerluis97%40gmail.com" class="btn btn-default btn-lg">Add to Google Calendar!</a>');
						} else {
							
							$scope.result = $sce.trustAsHtml('<br>Thanks for RSVPing. We look forward to meeting you');
						}
					});
				})
				.fail(function(xhr) {
					$log.error(xhr.responseText);
					$scope.$apply(function() {
						
						$scope.signedUp = true;						
						$scope.resultError = 'my-alert';
						$scope.result = $sce.trustAsHtml('<br>An error has ocurred. Please refresh the website and try again or contact <a href="mailto:clewis57@student.gsu.edu">clewis57@student.gsu.edu</a>');
					});
				});
			}
				
		} else {
			
			$scope.resultError = 'my-alert';
			$scope.result = $sce.trustAsHtml('<br>Please fill in all fields.');
			$scope.nameError = 'my-error';
			$scope.campusIdError = 'my-error';
		}
	}
}]);