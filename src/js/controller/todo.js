var myApp = angular.module('todoApp', ['ui.router']);
  myApp.controller('TodoListController', ['$http', '$scope', function ($http, $scope, $rootscpoe) {
    $scope.enroll = []

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
      for(i = 0; i<$scope.enroll.length; i++) {
        if($scope.enroll[i] == course){
          isAdd = false;
        }
      }
      if(isAdd){
        $scope.enroll.push(course)
      }
    }

    todoList.drop = function () {
      var index = $scope.enroll.indexOf($scope.goingToDrop)
      $scope.enroll.splice(index,1)
    }

    todoList.goingToDrop = function (course) {
      $scope.goingToDrop = course
    }

    todoList.toJSON = function () {
      $scope.json = $scope.enroll
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