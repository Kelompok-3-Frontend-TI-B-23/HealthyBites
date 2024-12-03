angular.module('mainApp', ['ngRoute'])
.config(function($locationProvider, $routeProvider) {
  // Enable HTML5 mode for clean URLs (without hashbangs)
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'index.html',  // Halaman create akun
      controller: 'createAccountCtrl'
    })
    .when('/home', {
        templateUrl: 'home.html',  // Halaman utama (home)
        controller: 'homeCtrl'
      })
    .when('/recipe', {
      templateUrl: 'recipe.html',  // Halaman untuk menampilkan semua resep
      controller: 'recipeCtrl'
    })
    .when('/login', {
      templateUrl: 'login.html',  // Halaman login
      controller: 'loginCtrl'
    })
    .when('/addRecipe', {
      templateUrl: 'addRecipe.html',  // Halaman untuk menambahkan resep baru
      controller: 'addRecipeCtrl'
    })
    .when('/detailRecipe/:recipeId', {
        templateUrl: 'recipeDetail.html', 
        controller: 'recipeDetailCtrl' 
      });

});



