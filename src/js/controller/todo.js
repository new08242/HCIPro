var myApp = angular.module('todoApp', ['ui.router']);
  myApp.controller('TodoListController', ['$http', '$scope', '$rootScope', function ($http, $scope, $rootScope) {

    $rootScope.enroll = undefined
    if($rootScope.enroll == undefined){
      $http.get('http://52.37.98.127:3000/v1/5610546753?pin=1234').success(function(data){
        if(data[$rootScope.currentUserId] == undefined){
          $rootScope.enroll = []
        }
        else{
          $rootScope.enroll = data[$rootScope.currentUserId]
        }
      });
    }

    $rootScope.user = undefined
    if($rootScope.user == undefined){
      $http.get('http://52.37.98.127:3000/v1/5610546753?pin=1234').success(function(data){
        if(data[$rootScope.currentUserId] == undefined){
          $rootScope.user = {}
        }
        else{
          $rootScope.user = {[$rootScope.currentUserId] : data[$rootScope.currentUserId]}
        }
      });
    }

    var todoList = this
    todoList.todos = [
      {text: 'learn angular', done: true},
      {text: 'build an angular app', done: false}]    

    todoList.addTodo = function () {
      todoList.todos.push({text: todoList.todoText, done: false})
      todoList.todoText = ''
    }

    todoList.remaining = function () {
      var count = 0
      angular.forEach(todoList.todos, function (todo) {
        count += todo.done ? 0 : 1
      })
      return count
    }

    todoList.archive = function () {
      var oldTodos = todoList.todos
      todoList.todos = []
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) todoList.todos.push(todo)
      })
    }

    todoList.course = function () {
      $http.get('https://whsatku.github.io/skecourses/combined.json').success(function(data){
        todoList.course = data;
      });
    }
    todoList.course()

    todoList.courseDes = function (courseDes) {
      $scope.courseDes = courseDes
    }

    todoList.enroll = function (course) {
      var isAdd = true;
      for(i = 0; i<$rootScope.enroll.length; i++) {
        if($rootScope.enroll[i] == course){
          isAdd = false;
        }
      }
      if(isAdd){
        $rootScope.enroll.push(course)
        var temp = {[$rootScope.currentUserId] : $rootScope.enroll}
        $rootScope.user = temp
        $http.post('http://52.37.98.127:3000/v1/5610546753?pin=1234',$rootScope.user).success(function(data){
          
        });
      }
    }

    todoList.drop = function () {
      var index = $rootScope.enroll.indexOf($scope.goingToDrop)
      $rootScope.enroll.splice(index,1)
      var temp = {[$rootScope.currentUserId] : $rootScope.enroll}
      console.log(temp)
      $rootScope.user = temp
      $http.post('http://52.37.98.127:3000/v1/5610546753?pin=1234',$rootScope.user).success(function(data){
          
      });
    }

    todoList.goingToDrop = function (course) {
      $scope.goingToDrop = course
    }

    todoList.Login = function (currentUserId) {
      $rootScope.currentUserId = currentUserId
    }

}]);

myApp.filter('objFilter', function($filter){
  return function(input, query){
    if(!query) return input;
      var result = [];

      angular.forEach(input, function(v,k){
          result.push(v);          
      });

      var refined = $filter('filter')(result,query);

      return refined;
  };
});