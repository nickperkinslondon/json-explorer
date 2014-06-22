
module = angular.module 'jsonExplorer',[]

module.directive 'jsonExplorer', [
	'$timeout',($timeout)->

		restrict:'E'
		template:"""
<div tabindex="0" class="json-explorer"><span class="path">{{ path_expression }}</span>
  <table ng-if="is_object" class="attributes">
    <tr ng-repeat="a in attrs" ng-class="{selected: $index==index}">
      <td>{{ a.key  }}</td>
      <td>{{ a.type }}</td>
      <td>{{ a.display  }}</td>
    </tr>
  </table>
</div>"""	# replaced by Grunt
		replace:true
		scope:
			data:'='
			label:'@'
	
		link:(scope,element,attrs)->

			root = scope.data   # usually an Array or an Object
			scope.object = root # the current object being viewed
			scope.path = []     # the choices we made to get here

			scope.is_value = false # we are looking at a single Value ( like a String or Number ), not an Object or Array

			scope.path_expression = 'init'
			set_path_expression = ->
				expr = scope.label or "data"
				for p in scope.path
					expr += p.pkey
				expr += " = " + scope.value
				scope.path_expression = expr


			get_type = (thing)->
				if angular.isArray thing 
					return 'array'
				if angular.isObject thing 
					return 'object'
				if angular.isString thing
					return 'string'
				if angular.isNumber thing
					return 'number'
				if thing==true or thing==false
					return 'boolean'
				return '?'+(typeof thing)+'?'


			get_val = (thing)->
				t = get_type(thing)
				switch t
					when 'array'
						'[ '+thing.length+' ]'
					when 'object'
						# '{...}'
						s = JSON.stringify(thing)
						s = s.substr(1,39)
						return '{' + s + '...'

					when 'string'
						'"'+thing+'"'
					else
						''+thing


			get_attrs = (obj)->
				if angular.isObject(obj)
					make_attr = (key)->
						# only include what we need to show on the screen
						key      : if angular.isArray(obj) then parseInt(key,10) else key
						type     : get_type(obj[key])
						display  : get_val(obj[key])
					attrs = ( make_attr(k) for k in Object.keys(obj) )
					attrs.sort (a,b)->
						if a.type < b.type
							return -1
						else
							if a.key < b.key
								return -1
							else
								return 1
					return attrs

				else
					[]

			move_index = (n)->
				if scope.attrs?
					if scope.index >=0
						new_index = scope.index + n
					else
						new_index = 0
					if 0 <= new_index < scope.attrs.length
						scope.index = new_index


			set_object = ( new_obj )->
				scope.object = new_obj
				scope.attrs = get_attrs(new_obj)
				if scope.attrs.length > 0
					scope.index = 0
				else
					scope.index = null
				if angular.isObject new_obj
					scope.is_object = true
					scope.value = get_val(new_obj)


			select = ->
				if scope.index?
					a = scope.attrs[scope.index]
					new_thing = scope.object[a.key]
					scope.path.push
						key  : a.key
						pkey : if angular.isNumber(a.key) then ('[' + a.key + ']') else ('.'+a.key)
						obj  : new_thing
					if angular.isObject new_thing
						#
						# select OBJECT ( or array )
						# 
						scope.is_object = true
						set_object(new_thing)
					else
						#
						# select VALUE
						#
						scope.is_object = false
						scope.value = get_val(new_thing)
						scope.attrs = null
						scope.index = null
					set_path_expression()


			get_index = (key)->
				for a,i in scope.attrs
					if a.key == key
						return i
				return -1


			go_back = ->
				if scope.path.length > 0
					p = scope.path.pop()
					key = p.key
					if scope.path.length > 0
						#
						# up one level
						#
						last_path = scope.path[ scope.path.length - 1 ]
						new_obj = last_path.obj
						set_object(new_obj)

					else
						#
						# back to the ROOT
						#
						set_object( scope.data )

					set_path_expression()

					#
					# go back to the key that we were on last time
					#
					index = get_index(key)
					if index >= 0
						scope.index = index


			#
			# keyboard navigation:
			#
			element.bind 'keydown', (event)->
				k = event.keyCode
				scope.keycode = k
				switch k
					when 40 # down
						move_index +1
						event.preventDefault()
						scope.$digest()
					when 38 # up
						move_index -1
						event.preventDefault()
						scope.$digest()
					when 39 # right
						select()
						event.preventDefault()
						scope.$digest()
					when 37 # left
						go_back()
						event.preventDefault()
						scope.$digest()
					when 13 # enter
						select()
						event.preventDefault()
						scope.$digest()

			element[0].focus()

			set_object( scope.data )
			set_path_expression()

]
