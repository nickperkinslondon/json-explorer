(function() {
  var module;

  module = angular.module('jsonExplorer', []);

  module.directive('jsonExplorer', [
    '$timeout', function($timeout) {
      return {
        restrict: 'E',
        template: "<div tabindex=\"0\" class=\"json-explorer\"><span class=\"path\">{{ path_expression }}</span>\n  <table ng-if=\"is_object\" class=\"attributes\">\n    <tr ng-repeat=\"a in attrs\" ng-class=\"{selected: $index==index}\">\n      <td>{{ a.key  }}</td>\n      <td>{{ a.type }}</td>\n      <td>{{ a.display  }}</td>\n    </tr>\n  </table>\n</div>",
        replace: true,
        scope: {
          data: '=',
          label: '@'
        },
        link: function(scope, element, attrs) {
          var get_attrs, get_index, get_type, get_val, go_back, move_index, root, select, set_object, set_path_expression;
          root = scope.data;
          scope.object = root;
          scope.path = [];
          scope.is_value = false;
          scope.path_expression = 'init';
          set_path_expression = function() {
            var expr, p, _i, _len, _ref;
            expr = scope.label || "data";
            _ref = scope.path;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              p = _ref[_i];
              expr += p.pkey;
            }
            expr += " = " + scope.value;
            return scope.path_expression = expr;
          };
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
            if (thing === true || thing === false) {
              return 'boolean';
            }
            return '?' + (typeof thing) + '?';
          };
          get_val = function(thing) {
            var s, t;
            t = get_type(thing);
            switch (t) {
              case 'array':
                return '[ ' + thing.length + ' ]';
              case 'object':
                s = JSON.stringify(thing);
                s = s.substr(1, 39);
                return '{' + s + '...';
              case 'string':
                return '"' + thing + '"';
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
              attrs.sort(function(a, b) {
                if (a.type < b.type) {
                  return -1;
                } else {
                  if (a.key < b.key) {
                    return -1;
                  } else {
                    return 1;
                  }
                }
              });
              return attrs;
            } else {
              return [];
            }
          };
          move_index = function(n) {
            var new_index;
            if (scope.attrs != null) {
              if (scope.index >= 0) {
                new_index = scope.index + n;
              } else {
                new_index = 0;
              }
              if ((0 <= new_index && new_index < scope.attrs.length)) {
                return scope.index = new_index;
              }
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
              scope.is_object = true;
              return scope.value = get_val(new_obj);
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
              } else {
                scope.is_object = false;
                scope.value = get_val(new_thing);
                scope.attrs = null;
                scope.index = null;
              }
              return set_path_expression();
            }
          };
          get_index = function(key) {
            var a, i, _i, _len, _ref;
            _ref = scope.attrs;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              a = _ref[i];
              if (a.key === key) {
                return i;
              }
            }
            return -1;
          };
          go_back = function() {
            var index, key, last_path, new_obj, p;
            if (scope.path.length > 0) {
              p = scope.path.pop();
              key = p.key;
              if (scope.path.length > 0) {
                last_path = scope.path[scope.path.length - 1];
                new_obj = last_path.obj;
                set_object(new_obj);
              } else {
                set_object(scope.data);
              }
              set_path_expression();
              index = get_index(key);
              if (index >= 0) {
                return scope.index = index;
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
          set_object(scope.data);
          return set_path_expression();
        }
      };
    }
  ]);

}).call(this);
