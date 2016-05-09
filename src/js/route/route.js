angular.module('todoApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('enroll', {
      url: "/enroll",
      templateUrl: "src/view/enroll.tmpl"
    })
    .state('home', {
      url: "/home",
      templateUrl: "src/view/homelogin.tmpl"
    })
});
