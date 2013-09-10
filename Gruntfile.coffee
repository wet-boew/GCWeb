#global module:false
module.exports = ->

	@initConfig
		pkg: @file.readJSON 'package.json'
		banner: '/*! Web Experience Toolkit (WET) / Boîte à outils de l\'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n' +
			' - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			' License: <%= pkg.license %> */\n'

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
				data: 'site/data/*.{yml,json}'
				assets: 'dist'
				helpers: 'site/helpers/helper-*.js'
				layoutdir: 'site/layouts'
				partials: ['site/includes/**/*.hbs']

			site:
				options:
					layout: 'default.hbs'

				expand: true
				cwd: 'site'
				src: ['*.hbs']
				dest: 'dist/'

		sass:
			base:
				files:
					'dist/css/theme.css': 'src/sass/theme.scss'

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
				src: ['lib/wet-boew/Gruntfile.js']
				tasks: ['clean:dist', 'build']

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
	@registerTask 'build', ['coffee', 'sass', 'concat', 'uglify', 'copy', 'cssmin', 'clean:non_mincss', 'assemble']
	@registerTask 'test', ['jshint']
	@registerTask 'html', ['assemble']
	@registerTask 'wipe', ['clean:dist', 'clean:lib']
	@registerTask 'buildwet', ['hub']
	@registerTask 'default', ['clean:dist', 'build', 'test']
	@registerTask 'init', ['depbuild', 'buildwet']
	@registerTask 'depbuild', ['install-dependencies', 'hub']
