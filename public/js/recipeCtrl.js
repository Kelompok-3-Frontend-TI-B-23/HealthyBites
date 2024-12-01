angular.module('mainApp')
.controller('recipeCtrl', function($scope, $http, $routeParams) {
  const recipeTitle = $routeParams.title; 
  $http.get('/api/recipes/' + recipeTitle)
    .then(function(response) {
      $scope.recipe = response.data;  
    })
    .catch(function(error) {
      console.error('Error fetching recipe:', error);
    });
});

