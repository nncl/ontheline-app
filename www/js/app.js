// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic' , 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', function($scope, ConnectivityMonitor){
  $scope.connect = ConnectivityMonitor;

  $scope.check = function(){
    $scope.isOnline = ConnectivityMonitor.isOnline();
  }
})

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork, $ionicPopup){

  var self =  {
    'status' : null,
    'results' : [
      'Hello World',
      'Hello William',
      'See you next time',
      'Go go go!!',
      'Run Forrest, run...'
    ],
    'isOnline': function(){
      if(ionic.Platform.isWebView()){
        self.status = $cordovaNetwork.isOnline();
      } else {
        self.status = navigator.onLine;
      }
    },
    'isOffline': function(){
      if(ionic.Platform.isWebView()){
        self.status = !$cordovaNetwork.isOnline();
      } else {
        self.status = !navigator.onLine;
      }
    },
    'startWatching': function(){
      if(ionic.Platform.isWebView()){

        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          self.status = true;
          console.log("went online");
          var pop = $ionicPopup.alert({
            title : 'Status Alert',
            template : 'You went on the line'
          });

          pop.then(function(){
            // new requisition
            self.results = [
              'Hello World',
              'Hello William',
              'See you next time',
              'Go go go!!',
              'Run Forrest, run...'
            ];
          });
        });

        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          self.status = false;
          console.log("went offline");
          var pop = $ionicPopup.alert({
            title : 'Status Alert',
            template : 'You went out of the line'
          });

          pop.then(function(){
            self.results = [
              'Off 1',
              'Off 2',
              'Off 3'
            ];
          });
        });

      }
      else {

        window.addEventListener("online", function(e) {
          self.status = true;
          console.log("went online");
          var pop = $ionicPopup.alert({
            title : 'Status Alert',
            template : 'You went on the line'
          });

          pop.then(function(){
            self.results = [
              'Hello World',
              'Hello William',
              'See you next time',
              'Go go go!!',
              'Run Forrest, run...'
            ];
          });
        }, false);

        window.addEventListener("offline", function(e) {
          self.status = false;
          console.log("went offline");
          var pop = $ionicPopup.alert({
            title : 'Status Alert',
            template : 'You went out of the line'
          });

          pop.then(function(){
            self.results = [
              'Off 1',
              'Off 2',
              'Off 3'
            ];
          });
        }, false);

      }
    }
  };

  // self.isOnline();

  return self;
})