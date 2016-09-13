'use strict';

/**
 * @ngdoc service
 * @name midotApp.rows
 * @description
 * # rows
 * Factory in the midotApp.
 */
angular.module('midotApp')
  .factory('rows', function (Tabletop, $q, $window, $loading) {
    $loading.start('data');
    return $q(function(resolve) {
      if ( $window.localStorage && $window.localStorage.data && parseInt($window.localStorage.date) + 3600*1000 > Date.now() ) {
        $loading.finish('data');
        resolve(JSON.parse($window.localStorage.data));
      } else {
        Tabletop.then(function(t) {
          var sheet = 'amutot-multiple-years';
          var data = {
            amutot: t[0][sheet].elements.slice(1),
            columns: t[0][sheet].column_names,
            headers: t[0][sheet].elements[0]
            //,
            //subjects: _.object(_.map(t[0].subjects.elements,function(d){
            //  return [d.subject.trim(), d.text];
            //}))
          };
          data.headers = _.map(t[0][sheet].column_names, function(h) {
            return data.headers[h];
          });
          var curYear = (new Date()).getFullYear();
          data.amutot = _.map(data.amutot, function(row) {
            row = _.mapObject(row, function(val) {
              val = val.trim();
              if ( val === '' ) {
                val = null;
              }
              if ( val === '√' ) {
                val = 'קיים';
              }
              if ( val === 'X' ) {
                val = 'אין';
              }
              return val;
            });
            var maxYear=2013;
            row.finance = {};
            row = _.mapObject(row, function(val, key) {
              var m = key.match(/_(20[0-9][0-9])$/);
              if (m) {
                var year = m[1];
                if (val) {
                  if (year>maxYear) {
                    maxYear = year;
                  }
                  var prefix = key.slice(0, -5);
                  if (!row.finance[year]) {
                    row.finance[year] = {};
                  }
                  row.finance[year][prefix] = val;
                }
              }
              return val;
            });
            row.financeYears = _.sortBy(_.keys(row.finance));
            row.financeYear = ""+maxYear;
            _.extend(row, row.finance[maxYear]);
            row.found_year = parseInt(row.found_year);
            row.reg_year = parseInt(row.reg_year);
            row.year =
              (!!row.reg_year && !!row.found_year) && _.min([row.reg_year,row.found_year]) ||
              !!row.reg_year && row.reg_year ||
              !!row.found_year && row.found_year ||
              null;

            row.age = row.year ? curYear - row.year : null;
            return row;
          });
          if ( $window.localStorage ) {
            $window.localStorage.data = JSON.stringify(data);
            $window.localStorage.date = Date.now();
          }
          $loading.finish('data');
          resolve(data);
        });
      }
    });
  });
