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
    .when('/dashboardAdmin', {
      templateUrl: 'addRecipe.html',  // Halaman untuk menambahkan resep baru
      controller: 'addRecipeCtrl'
    });
})
.run(function($rootScope, $location) {
  // Create a $rootScope variable to track background image status
  $rootScope.backgroundImageClass = '';

  // Listen to route changes
  $rootScope.$on('$routeChangeStart', function() {
    // Set the background image class based on the path
    if ($location.path() === '/home') {
      $rootScope.backgroundImageClass = '';
    } else {
      $rootScope.backgroundImageClass = 'background-image';
    }
  });
});
