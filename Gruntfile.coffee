#global module:false
module.exports = ->

	@initConfig
		pkg: @file.readJSON 'package.json'
		banner: '/*! Web Experience Toolkit (WET) / Boîte à outils de l\'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n' +
			' - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			' License: <%= pkg.license %> */\n'

		environment:
			suffix: ".min"

		concat:
			options:
				banner: '<%= banner %>'

		assemble:
			options:
				prettify:
					indent: 2
				marked:
					sanitize: false
				production: false
				data: ['lib/wet-boew/site/data/**/*.{yml,json}', 'site/data/**/*.{yml,json}']
				helpers: ['lib/wet-boew/site/helpers/helper-*.js', 'site/helpers/helper-*.js']
				partials: ['lib/wet-boew/site/includes/**/*.hbs', 'site/includes/**/*.hbs']
				layoutdir: 'site/layouts'
				assets: 'dist'

			site:
				options:
					layout: 'default.hbs'
					environment:
						suffix: "<%= environment.suffix %>"

				expand: true
				cwd: 'site/pages'
				src: ['*.hbs']
				dest: 'dist/'

			plugins:
				options:
					layout: 'default.hbs'
					environment:
						suffix: "<%= environment.suffix %>"

				expand: true
				cwd: 'lib/wet-boew/src/plugins'
				src: ['**/*.hbs']
				dest: 'dist/demo/'
				flatten: true

			ajax:
				options:
					layout: 'ajax.hbs'
					ext: ".txt"
					environment:
						suffix: "<%= environment.suffix %>"

				expand: true
				cwd: 'site/pages/ajax'
				src: ['*.hbs']
				dest: 'dist/ajax/'

				flatten: true

		sass:
			base:
				expand: true
				cwd: 'src/sass'
				src: 'theme.scss'
				dest: 'dist/css'
				ext: '.css'

		autoprefixer:
			options:
				browsers: [
					"last 2 versions",
					"ff >= 17",
					"opera 12.1",
					"bb >= 7",
					"android >= 2.3",
					"ie >= 8",
					"ios 5"
				]
			all:
				cwd: "dist/css"
				src: [
					"**/*.css",
					"!**/*.min.css"
				]
				dest: "dist/css"
				expand: true
				flatten: true

		uglify:
			options:
				banner: '<%= banner %>'
			all:
				cwd: 'dist/js'
				src: '**/*.js'
				dest: 'dist'

		cssmin:
			dist:
				expand: true
				src: ['dist/css/**/*.css', '!dist/css/**/*.min.css']
				ext: '.min.css'

		coffee:
			all:
				cwd: 'src',
				src: '**/*.coffee',
				dest: 'dist'

		copy:
			wetboew:
				expand: true
				cwd: 'lib/wet-boew/dist'
				src: '**/*.*'
				dest: 'dist/'
			site:
				expand: true
				cwd: 'src/img'
				src: '**/*.*'
				dest: 'dist/img'


		clean:
			dist: [ 'dist']
			lib: ['lib']
			non_mincss:
				expand: true
				src: [
					'dist/**/*.css',
					'!dist/**/*.min.css'
				]

		watch:
			gruntfile:
				files: 'Gruntfile.coffee'
				tasks: ['build']
			lib_test:
				files: '<%= jshint.lib_test.src %>'
				tasks: ['jshint:lib_test']
			source:
				files: '<%= jshint.lib_test.src %>'
				tasks: ['build']
				options:
					interval: 5007
					livereload: true

		hub:
			wetboew:
				src: ['lib/wet-boew/Gruntfile.coffee']
				tasks: ['default']

		'install-dependencies':
			options:
				cwd: 'lib/wet-boew'
				failOnError: false


		jshint:
			options:
				curly: true
				eqeqeq: true
				immed: true
				latedef: true
				newcap: true
				noarg: true
				sub: true
				undef: true
				unused: true
				boss: true
				eqnull: true
				browser: true
				globals:
					jQuery: true
			lib_test:
				src: 'src/**/*.js'

	# These plugins provide necessary tasks.
	@loadNpmTasks 'grunt-autoprefixer'
	@loadNpmTasks 'grunt-contrib-concat'
	@loadNpmTasks 'grunt-contrib-copy'
	@loadNpmTasks 'grunt-contrib-uglify'
	@loadNpmTasks 'grunt-contrib-jshint'
	@loadNpmTasks 'grunt-contrib-watch'
	@loadNpmTasks 'grunt-contrib-coffee'
	@loadNpmTasks 'grunt-contrib-clean'
	@loadNpmTasks 'grunt-contrib-cssmin'
	@loadNpmTasks 'grunt-install-dependencies'
	@loadNpmTasks 'grunt-hub'
	@loadNpmTasks 'grunt-sass'
	@loadNpmTasks 'assemble'

	# Default task.
	@registerTask 'build', ['coffee', 'css', 'concat', 'uglify', 'copy', 'cssmin', 'clean:non_mincss', 'assemble']
	@registerTask 'css', ['sass', 'autoprefixer']
	@registerTask 'test', ['jshint']
	@registerTask 'html', ['assemble']
	@registerTask 'wipe', ['clean:dist']
	@registerTask 'buildwet', ['hub']
	@registerTask 'default', ['clean:dist', 'build', 'test']
	@registerTask 'init', ['depbuild', 'buildwet']
	@registerTask 'depbuild', ['install-dependencies', 'hub']
