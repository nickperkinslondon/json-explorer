
module.exports = (grunt)->  

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'


    stylus:
      dev:
        files:
          'dist/json-explorer.css':'src/json-explorer.stylus'
          'test/testpage.css':'test/testpage.stylus'


    jade:
      dev:
        options:
          pretty:true
        files:
          'temp/template.html':'src/json-explorer.jade'
          'test/testpage.html':'test/testpage.jade'
              

    "string-replace":
      dev:
        files:
          #
          # substitute the "template html" into an intermediate coffeescript file
          # ( to take advantage of triple-quoted strings )
          #
          'temp/json-explorer-with-template.coffee':'src/json-explorer.coffee'
        options:
          replacements:[
            pattern: "{html}"
            replacement: (match, p1, offset, string)->
              grunt.file.read('temp/template.html')
          ]

    coffee:
      dev:
        options:
          bare:false
        files:
          #
          # the _temp.coffee file has the "template html" baked-in by Grunt
          #
          'dist/json-explorer.js':'temp/json-explorer-with-template.coffee'
          'test/testpage.js':'test/testpage.coffee'




    watch:

      jade:
        files:['**/*.jade']
        tasks:['jade','string-replace']
        options:
          livereload:true

      stylus:
        files:['**/*.stylus']
        tasks:['stylus']
        options:
          livereload:true

      css:
        files:['**/*.css'] 
        tasks:[]     
        options:
          livereload:true

      coffee:
        files:['**/*.coffee']
        tasks:['jade','string-replace','coffee']
        options:
          livereload:true

  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-string-replace'


  grunt.registerTask 'default', [
    'jade',
    'stylus',
    'string-replace',
    'coffee',
    'watch'
  ]



