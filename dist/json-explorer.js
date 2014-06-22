(function() {
  var module;

  module = angular.module('jsonExplorer', []);

  module.directive('jsonExplorer', [
    '$timeout', function($timeout) {
      return {
        restrict: 'E',
        template: "<div tabindex=\"0\" class=\"json-explorer\">\n  <h3>{{ label }}</h3>\n  <table class=\"path\">\n    <tr ng-repeat=\"p in path\">\n      <td>{{ p.pkey }}</td>\n      <td>{{ get_type(obj) }}</td>\n    </tr>\n  </table>\n  <div ng-if=\"!is_object\" class=\"value\">{{ value }}</div>\n  <table ng-if=\"is_object\" class=\"attributes\">\n    <tr ng-repeat=\"a in attrs\" ng-class=\"{selected: $index==index}\">\n      <td>{{ a.key  }}</td>\n      <td>{{ a.type }}</td>\n      <td>{{ a.display  }}</td>\n    </tr>\n  </table>\n  <h1>{{ focus }}</h1>\n  <h2>{{ index }}</h2>\n  <pre>{{ selected_attr | json }}</pre>\n</div>",
        replace: true,
        scope: {
          data: '=',
          label: '@'
        },
        link: function(scope, element, attrs) {
          var get_attrs, get_type, get_val, go_back, move_index, root, select, set_object;
          root = scope.data;
          scope.object = root;
          scope.path = [];
          scope.is_value = false;
          get_type = function(thing) {
            if (angular.isArray(thing)) {
              return 'array';
            }
            if (angular.isObject(thing)) {
              return 'object';
            }
            if (angular.isString(thing)) {
              return 'string';
            }
            if (angular.isNumber(thing)) {
              return 'number';
            }
            return '?' + (typeof thing) + '?';
          };
          get_val = function(thing) {
            var t;
            t = get_type(thing);
            switch (t) {
              case 'array':
                return '[ ' + thing.length + ' ]';
              case 'object':
                return '{...}';
              default:
                return '' + thing;
            }
          };
          get_attrs = function(obj) {
            var k, make_attr;
            if (angular.isObject(obj)) {
              make_attr = function(key) {
                return {
                  key: angular.isArray(obj) ? parseInt(key, 10) : key,
                  type: get_type(obj[key]),
                  display: get_val(obj[key])
                };
              };
              attrs = (function() {
                var _i, _len, _ref, _results;
                _ref = Object.keys(obj);
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  k = _ref[_i];
                  _results.push(make_attr(k));
                }
                return _results;
              })();
              return attrs;
            } else {
              return [];
            }
          };
          move_index = function(n) {
            var new_index;
            if (scope.index >= 0) {
              new_index = scope.index + n;
            } else {
              new_index = 0;
            }
            if ((0 <= new_index && new_index < scope.attrs.length)) {
              return scope.index = new_index;
            }
          };
          set_object = function(new_obj) {
            scope.object = new_obj;
            scope.attrs = get_attrs(new_obj);
            if (scope.attrs.length > 0) {
              scope.index = 0;
            } else {
              scope.index = null;
            }
            if (angular.isObject(new_obj)) {
              return scope.is_object = true;
            }
          };
          select = function() {
            var a, new_thing;
            if (scope.index != null) {
              a = scope.attrs[scope.index];
              new_thing = scope.object[a.key];
              scope.path.push({
                key: a.key,
                pkey: angular.isNumber(a.key) ? '[' + a.key + ']' : '.' + a.key,
                obj: new_thing
              });
              if (angular.isObject(new_thing)) {
                scope.is_object = true;
                set_object(new_thing);
                return scope.value = null;
              } else {
                scope.is_object = false;
                scope.value = "" + new_thing;
                scope.attrs = null;
                return scope.index = null;
              }
            }
          };
          go_back = function() {
            var last_path, new_obj;
            if (scope.path.length > 0) {
              scope.path.pop();
              if (scope.path.length === 0) {
                return set_object(scope.data);
              } else {
                last_path = scope.path[scope.path.length - 1];
                new_obj = last_path.obj;
                return set_object(new_obj);
              }
            }
          };
          element.bind('keydown', function(event) {
            var k;
            k = event.keyCode;
            scope.keycode = k;
            switch (k) {
              case 40:
                move_index(+1);
                event.preventDefault();
                return scope.$digest();
              case 38:
                move_index(-1);
                event.preventDefault();
                return scope.$digest();
              case 39:
                select();
                event.preventDefault();
                return scope.$digest();
              case 37:
                go_back();
                event.preventDefault();
                return scope.$digest();
              case 13:
                select();
                event.preventDefault();
                return scope.$digest();
            }
          });
          element[0].focus();
          return set_object(scope.data);
        }
      };
    }
  ]);

}).call(this);
