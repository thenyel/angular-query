#Angular-Query
-==============
+AngularQuery is a Model Factory that allows high level methods for server-side filtering, paging and sorting.
+##Getting Started
+- Clone the repo `git clone git@github.com:ducondez/angular-query.git` or just [download](https://github.com/ducondez/angular-query/archive/master.zip) to your angular resources folder
+- Inject the `ngQuery` module into your app
 
+>
+``` javascript
+var app = angular.module('ngQuery', ['ngQuery']);
+```
 
-Server-side Filtering, Paging and Sorting
+Take note that our master branch is our active, unstable development branch and that if you're looking to download a stable copy of the repo, check the [tagged downloads](https://github.com/maker/ratchet/tags).
+
+
+##Usage
+###Creating a QueryModel
+The QueryModel accepts a [REST URL, ngResource or VModel(coming soon)] and returns an instance of the QueryModel. The instance has a property called `rows` which is an array containing the results of the query.
+- URL link
+
+>
+``` javascript
+var Cars = new QueryModel('http://mylink.com/cars');
+```
+
+- $resource
+
+>
+``` javascript
+var carsResource = $resource('http://mylink.com/cars');
+var Cars = new QueryModel(carsResource);
+```
+
+- VModel (future: ngResource wrapper superset features)
+
+###Filtering / Querying
+
+>
+``` javascript
+// In the Controller
+var Cars = new QueryModel(carsResource);
+cars.find();
+```
+
+>
+``` html
+<!-- Search box -->
+<input type="text" ng-model="carQuery">
+<button ng-click="cars.find(carQuery)">Find</button>
+<!-- Cars List -->
+<ul>
+  <li ng-repeat="car in cars.rows">car.name</li>
+</ul>
+```
+
+###Pagination
+
+>
+``` html
+<!-- Next -->
+<button ng-click="cars.next()">Next</button>
+<!-- Will create 5 page buttons before and after the current page when applicable -->
+<button ng-repeat="page in cars.pageNumbers(5)" ng-click="cars.movePage(page)"></button>
+<!-- Previous Page -->
+<button ng-click="cars.prev()">Next</button>
+```
+
+###Sorting
+
+>
+``` html
+<table>
+  <thead>
+    <th ng-click="cars.sort('make')">Make</th>
+    <th ng-click="cars.sort('model')">Model</th>
+    <th ng-click="cars.sort('year')">Year</th>
+  </thead>
+</table>
+```
+
+
+
+
+##Roadmap
+- Features/Ideas
+  - Resultset Model instatntiation (for $resource or VModel)
+  - Flexible client-side caching
+- Bower repo
+- Tests
+
+##Reporting bugs & contributing
+Please file a GitHub issue to report a bug.
