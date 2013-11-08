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

	@registerTask(
		"dist"
		"Produces the production files"
		[
			"build"
			"assets-dist"
			"assemble"
			#htmlcompressor"
		]
	)

	#Alternate External tasks
	@registerTask(
		"debug"
		"Produces unminified files"
		[
			"build"
			"assemble:demos"
			"assemble:ajax"
			"assemble:experimental"
			"assemble:partners"
			"assemble:mobile_centre"
			"assemble:social_media_centre"
		]
	)

	@registerTask(
		"build"
		"Produces unminified files"
		[
			"clean:dist"
			"hub"
			"assets"
			"css"
			"copy:wetboew"
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
			"cssmin"
		]
	)

	@registerTask(
		"assets-dist"
		"INTERNAL: Process non-CSS/JS assets to dist"
		[
			"copy:site_min"
			"copy:fonts_min"
		]
	)

	@registerTask(
		"assets"
		"INTERNAL: Process non-CSS/JS assets to dist"
		[
			"copy:site"
			"copy:fonts"
		]
	)

	@registerTask(
		"js"
		"INTERNAL: Copies custom JS to the dist folder"
		[
			"copy:customJS"
		]
	)

	@registerTask(
		"jsmin"
		"INTERNAL: Compile and minify JS, and then cleans up unminifed JS in dist"
		[
			"js"
			"uglify"
			"clean:jsUncompressed"
		]
	)

	@initConfig
		pkg: @file.readJSON "package.json"
		banner: "/*! Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n" +
			" - v<%= pkg.version %> - " +
			"<%= grunt.template.today('yyyy-mm-dd') %>\n" +
			"<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
			" License: <%= pkg.license %> */\n"

		assemble:
			options:
				prettify:
					indent: 2
				marked:
					sanitize: false
				production: false
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

			demos:
				options:
					assets: "dist/unmin"
				files: [
						#site
						expand: true
						cwd: "site/pages"
						src: [
							"*.hbs"
						]
						dest: "dist/unmin"
					,
						#plugins
						expand: true
						cwd: "lib/wet-boew/src/plugins"
						src: [
							"**/*.hbs"
						]
						dest: "dist/unmin/demos"
				]

			ajax:
				options:
					layout: "ajax.hbs"
					assets: "dist/unmin"
				cwd: "site/pages/ajax"
				src: [
					"*.hbs"
				]
				dest: "dist/unmin/ajax/"
				expand: true
				flatten: true

			experimental:
				options:
					experimental: true
					assets: "dist/unmin"
				cwd: "site/pages"
				src: [
					"*.hbs"
				]
				dest: "dist/unmin/experimental"
				expand: true

			partners:
				options:
					layout: "partners.hbs"
					assets: "dist/unmin"
				cwd: "site/pages/partners"
				src: [
					"*.hbs"
				]
				dest: "dist/unmin/demos/partners/"
				expand: true
				flatten: true

			mobile_centre:
				options:
					layout: "mobile-centre.hbs"
					assets: "dist/unmin"
				cwd: "site/pages/mobile-centre"
				src: [
					"*.hbs"
				]
				dest: "dist/unmin/mobile-centre/"
				expand: true
				flatten: true

			social_media_centre:
				options:
					layout: "social-media-centre.hbs"
					assets: "dist/unmin"
				cwd: "site/pages/social-media-centre"
				src: [
					"*.hbs"
				]
				dest: "dist/unmin/social-media-centre/"
				expand: true
				flatten: true

			demos_min:
				options:
					environment:
						suffix: ".min"
					assets: "dist"
				files: [
						#site
						expand: true
						cwd: "site/pages"
						src: [
							"*.hbs"
						]
						dest: "dist"
					,
						#plugins
						expand: true
						cwd: "lib/wet-boew/src/plugins"
						src: [
							"**/*.hbs"
						]
						dest: "dist/demos"
					
				]

			ajax_min:
				options:
					layout: "ajax.hbs"
					environment:
						suffix: ".min"
					assets: "dist"
				cwd: "site/pages/ajax"
				src: [
					"*.hbs"
				]
				dest: "dist/ajax/"
				expand: true
				flatten: true

			experimental_min:
				options:
					experimental: true
					environment:
						suffix: ".min"
					assets: "dist"
				cwd: "site/pages"
				src: [
					"*.hbs"
				]
				dest: "dist/experimental"
				expand: true

			partners_min:
				options:
					layout: "partners.hbs"
					environment:
						suffix: ".min"
					assets: "dist"
				cwd: "site/pages/partners"
				src: [
					"*.hbs"
				]
				dest: "dist/demos/partners/"
				expand: true
				flatten: true

			mobile_centre_min:
				options:
					layout: "mobile-centre.hbs"
					environment:
						suffix: ".min"
					assets: "dist"
				cwd: "site/pages/mobile-centre"
				src: [
					"*.hbs"
				]
				dest: "dist/mobile-centre/"
				expand: true
				flatten: true

			social_media_centre_min:
				options:
					layout: "social-media-centre.hbs"
					environment:
						suffix: ".min"
					assets: "dist"
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
				dest: "dist/unmin/css"
				ext: ".css"

			mobile_centre:
				expand: true
				cwd: "src/sass"
				src: "mobile-centre*.scss"
				dest: "dist/unmin/css"
				ext: ".css"

			social_media_centre:
				expand: true
				cwd: "src/sass"
				src: "social-media-centre*.scss"
				dest: "dist/unmin/css"
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
				cwd: "dist/unmin/css"
				src: [
					"**/*.css"
					"!**/*.min.css"
				]
				ext: ".min.css"
				dest: "dist/css"
				expand: true

		htmlcompressor:
			options:
				type: "html"
			all:
				cwd: "dist"
				src: [
					"**/*.html"
					"!unmin/**/*.html"
				]
				dest: "dist"
				expand: true

		copy:
			wetboew:
				expand: true
				cwd: "lib/wet-boew/dist"
				src: [
					"**/*.*"
					"!**/theme*.css"
				]
				dest: "dist/"
			site:
				expand: true
				cwd: "src/img"
				src: "**/*.*"
				dest: "dist/unmin/img"
			fonts:
				expand: true
				cwd: "src/fonts"
				src: "**/*.*"
				dest: "dist/unmin/fonts"
			site_min:
				expand: true
				cwd: "src/img"
				src: "**/*.*"
				dest: "dist/img"
			fonts_min:
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
			customJS:
				expand: true
				cwd: "src/js"
				src: "*.js"
				dest: "dist/js/customJS"

		clean:
			dist: [ "dist"]
			lib: ["lib"]
			non_mincss:
				expand: true
				src: [
					"dist/**/*.css"
					"!dist/**/*.min.css"
				]
			jsUncompressed: ["dist/js/**/*.js", "!dist/js/**/*<%= environment.suffix %>.js"]

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

		jshint:
			options:
				jshintrc: ".jshintrc"

			lib_test:
				src: [
					"src/**/*.js"
					"theme/**/*.js"
					"test/**/*.js"
					"tasks/*.js"
				]

		# Minify
		uglify:
			customJS:
				options:
					banner: "<%= banner %>"
				expand: true
				cwd: "dist/js/customJS"
				src: ["*.js"]				
				dest: "dist/js/customJS"
				ext: "<%= environment.suffix %>.js"

		hub:
			"wet-boew":
				src: [
					"lib/wet-boew/Gruntfile.coffee"
				]
				tasks: [
					"dist"
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
	@loadNpmTasks "grunt-contrib-jshint"
	@loadNpmTasks "grunt-contrib-uglify"
	@loadNpmTasks "grunt-contrib-watch"
	@loadNpmTasks "grunt-gh-pages"
	@loadNpmTasks "grunt-htmlcompressor"
	@loadNpmTasks "grunt-hub"
	@loadNpmTasks "grunt-install-dependencies"
	@loadNpmTasks "grunt-sass"

	@

