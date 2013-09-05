(function(window, angular) {
'use strict';

angular.module('query', ['ng']).

  factory('Query', ['$http', function($http) {

    var noop = angular.noop,
        forEach = angular.forEach,
        extend = angular.extend,
        copy = angular.copy,
        isFunction = angular.isFunction;


      function Query(url, httpParams, config){

        var defaultParams = httpParams ||
          {
            method: 'GET',
            url: url,
            params: {},
            cache: false
          };

        this.httpParams = extend({}, defaultParams, httpParams);
        this.config = extend({}, config);

        this.data = [];

        /**
         * Filter properties
         */
        this.limit = this.config.limit||15;
        this.filters = {};
        this.lastSearch = false;

        /**
         * Paging properties
         */
        this.page = 1;
        this.pages = 1;
        this.count = 0;

        /**
         * Sorting properties
         */
        this.sortBy = '';
        this.sortAsc = false;


      }

      /**
       * Main Query/Find Function
       */
      Query.prototype.find = function (params) {

        var self = this,
            params = {limit: this.limit, page: this.page};

        /**
         * Query Filters/Conditions
         */
        if (!$.isEmptyObject(this.filters)) {
          $.each(this.filters, function (prop, val) {
            params['q_'+prop] = val;
          });
        }
        // If filter was changed, reset the page to 1, update the query
        this.page = this.lastSearch !== this.filters ? 1 : this.page;


        /**
         * Query Sorting
         */
        if (this.sortBy) {
          params.sort = this.sortBy;
          params.sortAsc = !!this.sortAsc ? '' : '-';
        }

        /**
         * Build query-string
         */
        this.httpParams.url = this.httpParams.url.split('?')[0] + '?' + $.param(params);

        /**
         * Start Request
         */
        $http(this.httpParams).then(function(response) {

              var data = response.data;

              if (data) {

                /**
                 * Instantiate record Models
                 *  - if config:  {useModel: <Model>}
                 */
                if (self.config.useModel) {
                  self.data = [];
                  $.each(data.data, function (i, dt) {
                    self.data.push(new self.config.useModel(dt));
                  });

                // Load basic collection
                } else {
                  self.data = data.data;
                }

                // Paging/count
                self.count = data.count;
                self.pages = Math.ceil(data.count / self.limit);
              }

              /**
               * Success Callback
               */
              (self.success||noop)(response)

          }, (self.error||noop));

      }
      
      /**
       * Request for a sorted result
       * @param  {string} field     property/field to be sorted
       * @param  {mixed} direction  true | 'asc' = ascending
       *                            else   = descending
       * @return {array}           result set
       */
      Query.prototype.sort = function (prop, direction) {
        this.sortBy = prop || this.sortBy;
        this.sortAsc = this.sortBy == prop
          ? !this.sortAsc
          : false;

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
        this.movePage(this.page + 1);
      }
      
      /**
       * Move to previous page
       * @return {array} ResultSet
       */
      Query.prototype.prev = function () {
        this.movePage(this.page - 1);
      }
      
      /**
       * Returns a range of pages
       */
      Query.prototype.getPages = function () {
        function range (a, b, step) {
            var A= [];if(typeof a== 'number'){A[0]= a;step= step || 1;while(a+step<= b){A[A.length]= a+= step;}}else{var s= 'abcdefghijklmnopqrstuvwxyz';if(a=== a.toUpperCase()){b=b.toUpperCase();s= s.toUpperCase();}s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);A= s.split('');        }return A;
        }
        return range(1, this.pages);
      }

      return Query;


  }]);


})(window, window.angular);