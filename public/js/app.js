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
    .when('/dashboardAdmin', {
      templateUrl: 'dashboardAdmin.html', // Halaman dashboard admin
      controller: 'homeCtrl'
    })
    .when('/editRecipe', {
      templateUrl: 'editRecipe.html', // Halaman edit dan delet resep
      controller: 'editRecipeCtrl'
    })
    .when('/bmi', {
      templateUrl: 'bmi.html', // Halaman edit dan delet resep
      controller: 'bmiCtrl'
    })
    .when('/bbi', {
      templateUrl: 'bbi.html', // Halaman edit dan delet resep
      controller: 'bbiCtrl'
    })
    .when('/addNutrition', {
      templateUrl: 'addNutrition.html', 
      controller: 'addNutritionCtrl'
    })
    .when('/nutrition', {
      templateUrl: 'nutrition.html',
      controller: 'nutritionCtrl'
    })
    .when('/editNutrition', {
      templateUrl: 'editNutrition.html',
      controller: 'editNutritionCtrl'
    })
    .when('/profile', {
      templateUrl: 'profile.html',
      controller: 'profileCtrl'
    })
    .when('/berita', {
      templateUrl: 'berita.html', // Halaman edit dan delet resep
      controller: 'newsCtrl'
    })
    .when('/addNews', {
      templateUrl: 'addNews.html', // Halaman edit dan delet resep
      controller: 'addNewsCtrl'
    })
    .when('/editNews', {
      templateUrl: 'editNews.html', // Halaman edit dan delet resep
      controller: 'editNewsCtrl'
    })
    ;

}).run(function($rootScope, $location) {
  // Set default background class
  $rootScope.backgroundImageClass = '';

  // Listen to route changes
  $rootScope.$on('$routeChangeStart', function() {
    // Set the background image class based on the path
    switch($location.path()) {
      case '/':
        $rootScope.backgroundImageClass = 'background-image';  // No background for home
        break;
      case '/home':
        $rootScope.backgroundImageClass = '';  // No background for home
        break;
      case '/login':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for login
        break;
      case '/profile':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/dashboardAdmin':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/editRecipe':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/editNews':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/addRecipe':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/addNews':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/editNutrition':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/addNutrition':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/bbi':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      case '/bmi':
        $rootScope.backgroundImageClass = 'background-image'; // Specific background for profile
        break;
      default:
        $rootScope.backgroundImageClass = 'background-default'; // Default background for all other pages
        break;
    }
  });
});




 
