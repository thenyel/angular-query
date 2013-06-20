/**
 * @license AngularJS v1.0.7
 * (c) 2010-2012 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) {
'use strict';

/**
 * @ngdoc overview
 * @name ngResource
 * @description
 */

angular.module('ngQuery', ['ng']).

  factory('$query', ['$http', function($http) {

    var noop = angular.noop,
        forEach = angular.forEach,
        extend = angular.extend,
        copy = angular.copy,
        isFunction = angular.isFunction;


    function QueryFactory(url, httpParams, config) {
      var http = $http(url);

      var defaultParams = httpParams ||
        {
          method: 'GET',
          url: url,
          params: {},
          cache: true
        };

      this.httpParams = extend({}, defaultParams, httpParams);
      this.config = extend({}, config);
      
      
      function Query(value){
        copy(value || {}, this);

        this.rows = [];

        this.history = {};


        /**
         * Filter properties
         */
        this.filters

        /**
         * Paging properties
         */
        this.page = 0;
        this.pages = 0;
        this.count = 0;

        /**
         * Sorting properties
         */
        this.sortProperty = '';
        this.sortAsc = true;


      }

      /**
       * Main Query/Find Function
       */
      Query.prototype.find = function (params) {

        var self = this;

        $http(this.httpParams).then(function(response) {
              var data = response.data;

              if (data) {
                self.rows = data;
              }

              // do extra callback
              (self.success||noop)(value, response.headers);

            }, self.error);

      }
      
      /**
       * Request for a sorted result
       * @param  {string} field     property/field to be sorted
       * @param  {mixed} direction  true | 'asc' = ascending
       *                            else   = descending
       * @return {array}           result set
       */
      Query.prototype.sort = function (prop, direction) {
        this.sortProperty = prop || this.sortProperty;
        this.sortAsc = typeof direction === 'undefined'
          ? !this.sortAsc
          : direction === true || direction === 'asc';

        this.find();
      }


      /**
       * Move page number for server side pagination
       * @param  {number} pageNum page to move to
       * @return {array}         resultset
       */
      Query.prototype.movePage = function (pageNum) {
        if (~~pageNum > 0 && ~~pageNum <= this.pages) {
          this.page = pageNum;
          this.find();
        }
      }

      /**
       * Move to next page
       * @return {array} Resultset
       */
      Query.prototype.next = function () {
        this.movePage(this.page + 1;)
      }
      
      /**
       * Move to previous page
       * @return {array} ResultSet
       */
      Query.prototype.prev = function () {
        this.movePage(this.page - 1;)
      }

      return Query;

    }

    return QueryFactory;

  }]);


})(window, window.angular);
