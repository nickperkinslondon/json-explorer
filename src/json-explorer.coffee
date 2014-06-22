
module = angular.module 'jsonExplorer',[]

module.directive 'jsonExplorer', [
	'$timeout',($timeout)->

		restrict:'E'
		template:"""{html}"""	# replaced by Grunt
		replace:true
		scope:
			data:'='
			label:'@'
	
		link:(scope,element,attrs)->

			root = scope.data   # usually an Array or an Object
			scope.object = root # the current object being viewed
			scope.path = []     # the choices we made to get here

			scope.is_value = false # we are looking at a single Value ( like a String or Number ), not an Object or Array

			get_type = (thing)->
				if angular.isArray thing 
					return 'array'
				if angular.isObject thing 
					return 'object'
				if angular.isString thing
					return 'string'
				if angular.isNumber thing
					return 'number'
				return '?'+(typeof thing)+'?'

			get_val = (thing)->
				t = get_type(thing)
				switch t
					when 'array'
						'[ '+thing.length+' ]'
					when 'object'
						'{...}'
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
					return attrs
				else
					[]

			move_index = (n)->
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
						scope.value = null
					else
						#
						# select VALUE
						#
						scope.is_object = false
						scope.value = ""+new_thing
						scope.attrs = null
						scope.index = null


			go_back = ->
				if scope.path.length > 0 
					scope.path.pop()
					if scope.path.length == 0
						set_object( scope.data )
					else
						last_path = scope.path[ scope.path.length - 1 ]
						new_obj = last_path.obj
						set_object(new_obj)


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

]
