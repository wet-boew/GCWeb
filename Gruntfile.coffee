#global module:false
module.exports = (grunt) ->

	# Default task.
	@registerTask(
		"default"
		"Default task, that runs the production build"
		[
			"dist"
		]
	)

	#Alternate External tasks
	@registerTask(
		"debug"
		"Produces unminified files"
		[
			"wipe"
			"hub:wet-boew-debug"
			"css"
			"copy:wetboew"
			"demos"
		]
	)

	@registerTask(
		"dist"
		"Produces the production files"
		[
			"wipe"
			"css"
			"hub:wet-boew-dist"
			"copy:wetboew"
			"cssmin"
			"clean:non_mincss"
			"demos"
		]
	)

	@registerTask(
		"init"
		"Only needed when the repo is first cloned"
		[
			"install-dependencies"
		]
	)

	@registerTask(
		"deploy"
		"Build and deploy artifacts to wet-boew-dist"
		[
			"dist"
			"copy:deploy"
			"gh-pages"
		]
	)

	@registerTask(
		"css"
		"INTERNAL: Compiles Sass and vendor prefixes the result"
		[
			"sass"
			"autoprefixer"
		]
	)

	@registerTask(
		"demos"
		"INTERNAL: Compile the demo files"
		[
			"copy:site"
			"copy:fonts"
			"assemble"
		]
	)

	@registerTask(
		"wipe"
		"INTERNAL: Cleans out the dist director"
		[
			"clean:dist"
		]
	)

	@initConfig
		pkg: @file.readJSON "package.json"
		banner: "/*! Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n" +
			" - v<%= pkg.version %> - " +
			"<%= grunt.template.today('yyyy-mm-dd') %>\n" +
			"<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
			" License: <%= pkg.license %> */\n"

		environment:
			suffix: if grunt.cli.tasks.indexOf("debug") > -1 then "" else ".min"

		assemble:
			options:
				prettify:
					indent: 2
				marked:
					sanitize: false
				production: false
				environment:
					suffix: "<%= environment.suffix %>"
				data: [
					"lib/wet-boew/site/data/**/*.{yml,json}"
					"site/data/**/*.{yml,json}"
				]
				helpers: [
					"lib/wet-boew/site/helpers/helper-*.js"
					"site/helpers/helper-*.js"
				]
				partials: [
					"lib/wet-boew/site/includes/**/*.hbs"
					"site/includes/**/*.hbs"
				]
				layoutdir: "site/layouts"
				layout: "default.hbs"
				assets: "dist"

			site:
				expand: true
				cwd: "site/pages"
				src: [
					"*.hbs"
				]
				dest: "dist"

			experimental:
				expand: true
				cwd: "site/pages"
				options:
					layout: "experimental.hbs"
				src: [
					"*.hbs"
				]
				dest: "dist/experimental"

			plugins:
				expand: true
				cwd: "lib/wet-boew/src/plugins"
				src: [
					"**/*.hbs"
				]
				dest: "dist/demos"

			ajax:
				options:
					layout: "ajax.hbs"
					ext: ".txt"
				cwd: "site/pages/ajax"
				src: [
					"*.hbs"
				]
				dest: "dist/ajax/"
				expand: true
				flatten: true

			partners:
				options:
					layout: "partners.hbs"
					ext: ".html"
				cwd: "site/pages/partners"
				src: [
					"*.hbs"
				]
				dest: "dist/demos/partners/"
				expand: true
				flatten: true

			mobile_centre:
				options:
					layout: "mobile-centre.hbs"
					ext: ".html"
				cwd: "site/pages/mobile-centre"
				src: [
					"*.hbs"
				]
				dest: "dist/mobile-centre/"
				expand: true
				flatten: true

			social_media_centre:
				options:
					layout: "social-media-centre.hbs"
					ext: ".html"
				cwd: "site/pages/social-media-centre"
				src: [
					"*.hbs"
				]
				dest: "dist/social-media-centre/"
				expand: true
				flatten: true

		sass:
			base:
				expand: true
				cwd: "src/sass"
				src: "theme.scss"
				dest: "dist/css"
				ext: ".css"

			mobile_centre:
				expand: true
				cwd: "src/sass"
				src: "mobile-centre*.scss"
				dest: "dist/css"
				ext: ".css"

			social_media_centre:
				expand: true
				cwd: "src/sass"
				src: "social-media-centre.scss"
				dest: "dist/css"
				ext: ".css"

		autoprefixer:
			options:
				browsers: [
					"last 2 versions"
					"ff >= 17"
					"opera 12.1"
					"bb >= 7"
					"android >= 2.3"
					"ie >= 8"
					"ios 5"
				]
			all:
				cwd: "dist/css"
				src: [
					"**/*.css"
					"!**/*.min.css"
				]
				dest: "dist/css"
				expand: true
				flatten: true

		cssmin:
			dist:
				expand: true
				src: [
					"dist/css/**/*.css"
					"!dist/css/**/*.min.css"
				]
				ext: ".min.css"

		htmlcompressor:
			options:
				type: "html"
			all:
				cwd: "dist"
				src: [
					"**/*.html"
				]
				dest: "dist"
				expand: true

		copy:
			wetboew:
				expand: true
				cwd: "lib/wet-boew/dist"
				src: [
					"**/*.*"
					"!**/theme.css"
				]
				dest: "dist/"
			site:
				expand: true
				cwd: "src/img"
				src: "**/*.*"
				dest: "dist/img"
			fonts:
				expand: true
				cwd: "src/fonts"
				src: "**/*.*"
				dest: "dist/fonts"
			deploy:
				src: [
					"*.txt"
					"README.md"
				]
				dest: "dist"
				expand: true

		clean:
			dist: [ "dist"]
			lib: ["lib"]
			non_mincss:
				expand: true
				src: [
					"dist/**/*.css"
					"!dist/**/*.min.css"
				]

		watch:
			gruntfile:
				files: "Gruntfile.coffee"
				tasks: [
					"build"
				]
			lib_test:
				files: "<%= jshint.lib_test.src %>"
				tasks: [
					"jshint:lib_test"
				]
			source:
				files: "<%= jshint.lib_test.src %>"
				tasks: [
					"build"
				]
				options:
					interval: 5007
					livereload: true

		hub:
			"wet-boew-dist":
				src: [
					"lib/wet-boew/Gruntfile.coffee"
				]
				tasks: [
					"dist"
				]
			"wet-boew-debug":
				src: [
					"lib/wet-boew/Gruntfile.coffee"
				]
				tasks: [
					"debug"
				]

		"install-dependencies":
			options:
				cwd: "lib/wet-boew"
				failOnError: false

		"gh-pages":
			options:
				repo: "https://" + process.env.GH_TOKEN + "@github.com/bci-web/GCWeb-dist.git"
				branch: process.env.build_branch
				clone: "GCWeb-dist"
				message: "Travis build " + process.env.TRAVIS_BUILD_NUMBER
				silent: true
				base: "dist"
			src: [
				"**/*.*"
			]

	# These plugins provide necessary tasks.
	@loadNpmTasks "assemble"
	@loadNpmTasks "grunt-autoprefixer"
	@loadNpmTasks "grunt-contrib-clean"
	@loadNpmTasks "grunt-contrib-copy"
	@loadNpmTasks "grunt-contrib-cssmin"
	@loadNpmTasks "grunt-contrib-watch"
	@loadNpmTasks "grunt-gh-pages"
	@loadNpmTasks "grunt-htmlcompressor"
	@loadNpmTasks "grunt-hub"
	@loadNpmTasks "grunt-install-dependencies"
	@loadNpmTasks "grunt-sass"

	@

