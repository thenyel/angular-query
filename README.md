#Angular-Query
`Status: Conception / Initial Prototype`  
AngularQuery is a Model Factory that allows high level methods for server-side filtering, paging and sorting.  

##Getting Started
- Clone the repo `git clone git@github.com:ducondez/angular-query.git` or just [download](https://github.com/ducondez/angular-query/archive/master.zip) to your angular resources folder
- Inject the `ngQuery` module into your app

>
``` javascript
var app = angular.module('ngQuery', ['ngQuery']);
```

Take note that our master branch is our active, unstable development branch and there is **no stable version** yet.


##Usage
###Creating an instance
The QueryModel accepts 2 parameters. The `<source>` and `<options>` where the `<source>` can be any of the following:
- URL link

>
``` javascript
var cars = new QueryModel('http://mylink.com/cars');
```

- $resource

>
``` javascript
var carsResource = $resource('http://mylink.com/cars');
var cars = new QueryModel(carsResource);
```

- VModel (future: ngResource wrapper superset features)

###Options

>
``` javascript
// Example option
var options = {afterFind: function() { ... } };
var cars = new QueryModel('http://mylink.com/cars', options);
```

AngularQuery defines serveral options
- `(after|before)Find` [function] - calls the before/afterFind function respectively after a successfull find query.
- `(after|before)Sort` [function] - calls the before/afterSort function respectively after a successfull sort query.
- `(after|before)PageMove` [function] - calls the before/afterPageMove function respectively after a successfull pagination query.
- `instantiateRows` [boolean] - (default to `true`) intantiate a `$resource` or `VModel` object for every records returned by the query.

###Results and promises
Query Methods `find()`, `sort()`, and `next()` etc... returns a promise object. The resulting data from the queries are stored in the `data` propery of the AngularQuery instance.

>
``` javascript
// keep the promise
var carsPromise = cars.next();
carsPromise.success(function() {
  alert('Found a couple more cars!');
});
// check data
console.log(cars.data); // [ {...}, {...}, ... ]
```

###Filtering / Querying

>
``` javascript
// In the Controller
var cars = new QueryModel(carsResource);
cars.find();
```

>
``` html
<!-- Search box -->
<input type="text" ng-model="carQuery">
<button ng-click="cars.find(carQuery)">Find</button>
<!-- Cars List -->
<ul>
  <li ng-repeat="car in cars.data">car.name</li>
</ul>
```

###Pagination

>
``` html
<!-- Next -->
<button ng-click="cars.next()">Next</button>
<!-- Will create 5 page buttons before and after the current page when applicable -->
<button ng-repeat="page in cars.pageNumbers(5)" ng-click="cars.movePage(page)"></button>
<!-- Previous Page -->
<button ng-click="cars.prev()">Next</button>
```

###Sorting

>
``` html
<table>
  <thead>
    <th ng-click="cars.sort('make')">Make</th>
    <th ng-click="cars.sort('model')">Model</th>
    <th ng-click="cars.sort('year')">Year</th>
  </thead>
</table>
```




##Roadmap
- Make it work
- Features/Ideas
  - Resultset Model instatntiation (for $resource or VModel)
  - Flexible client-side caching
- Bower repo
- Tests

##Reporting bugs & contributing
Please file a GitHub issue to report a bug.
