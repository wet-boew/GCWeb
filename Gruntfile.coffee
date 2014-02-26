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
			"htmlcompressor"
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
			"assemble:index"
			"assemble:partners"
		]
	)

	@registerTask(
		"build"
		"Produces unminified files"
		[
			"clean:dist"
			"hub"
			"copy:wetboew"
			"copy:json"
			"assets"
			"css"
			"js"
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
		"server"
		"Run the Connect web server for local repo"
		[
			"connect:server:keepalive"
		]
	)

	@registerTask(
		"deploy"
		"Build and deploy artifacts to wet-boew-dist"
		[
			"copy:deploy"
			"gh-pages:travis"
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
			"copy:assets_min"
			"copy:fonts_min"
		]
	)

	@registerTask(
		"assets"
		"INTERNAL: Process non-CSS/JS assets to dist"
		[
			"copy:site"
			"copy:assets"
			"copy:fonts"
		]
	)

	@registerTask(
		"js"
		"INTERNAL: Brings in the custom JavaScripts."
		[
			"copy:customJS"
			"copy:json"
			"copy:json_min"
			"uglify"
		]
	)

	@initConfig
		pkg: @file.readJSON "package.json"
		banner: "/*!\n * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)\n * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n" +
				" * <%= pkg.version %> - " + "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n *\n */"

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
							"**/*.hbs"
						]
						dest: "dist/unmin"
					,
						#docs
						expand: true
						cwd: "lib/wet-boew/site/pages/docs"
						src: [
							"**/*.hbs"
						]
						dest: "dist/unmin/docs"
					,
						#plugins
						expand: true
						cwd: "lib/wet-boew/site/pages/demos"
						src: [
							"**/*.hbs"
						]
						dest: "dist/unmin/demos"
					,
						expand: true
						cwd: "lib/wet-boew/src/plugins"
						src: [
							"**/*.hbs"
						]
						dest: "dist/unmin/demos"
					,
						expand: true
						cwd: "lib/wet-boew/src/polyfills"
						src: "**/*.hbs"
						dest: "dist/unmin/demos"
					,
						expand: true
						cwd: "lib/wet-boew/src/other"
						src: "**/*.hbs"
						dest: "dist/unmin/demos"
					,
						#mobile centre
						expand: true
						cwd: "site/pages/mobile-centre"
						src: [
							"*.hbs"
						]
						dest: "dist/unmin/mobile-centre/"
						flatten: true
					,
						#social_media_centre
						expand: true
						cwd: "site/pages/social-media-centre"
						src: [
							"*.hbs"
						]
						dest: "dist/unmin/social-media-centre/"
						flatten: true
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
					"*.hbs",
					"!index.hbs"
				]
				dest: "dist/unmin/experimental"
				expand: true

			index:
				options:
					layout: "splash.hbs"
					assets: "dist/unmin"
				cwd: "site/pages"
				src: [
					"index.hbs"
				]
				dest: "dist/unmin/"
				expand: true

			partners:
				options:
					layout: "partners.hbs"
					assets: "dist/unmin"
				cwd: "site/pages/partners"
				src: [
					"*.hbs"
				]
				dest: "dist/unmin/partners/"
				expand: true

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
							"**/*.hbs",
							"!index.hbs"
						]
						dest: "dist"
					,
						#index
						expand: true
						cwd: "site/pages"
						src: [
							"index.hbs"
						]
						dest: "dist"
					,
						#docs
						expand: true
						cwd: "lib/wet-boew/site/pages/docs"
						src: [
							"**/*.hbs"
						]
						dest: "dist/docs"
					,
						#plugins
						expand: true
						cwd: "lib/wet-boew/site/pages/demos"
						src: [
							"**/*.hbs"
						]
						dest: "dist/demos"
					,
						expand: true
						cwd: "lib/wet-boew/src/plugins"
						src: [
							"**/*.hbs"
						]
						dest: "dist/demos"
					,
						expand: true
						cwd: "lib/wet-boew/src/polyfills"
						src: "**/*.hbs"
						dest: "dist/demos"
					,
						expand: true
						cwd: "lib/wet-boew/src/other"
						src: "**/*.hbs"
						dest: "dist/demos"
					,
						#mobile centre
						expand: true
						cwd: "site/pages/mobile-centre"
						src: [
							"*.hbs"
						]
						dest: "dist/mobile-centre/"
						flatten: true
					,
						#social_media_centre
						expand: true
						cwd: "site/pages/social-media-centre"
						src: [
							"*.hbs"
						]
						dest: "dist/social-media-centre/"
						flatten: true
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

			index_min:
				options:
					layout: "splash.hbs"
					environment:
						suffix: ".min"
					assets: "dist"
				cwd: "site/pages"
				src: [
					"index.hbs"
				]
				dest: "dist"
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
				dest: "dist/partners/"
				expand: true
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

			messages:
				expand: true
				cwd: "src/sass"
				src: "messages*.scss"
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
				cwd: "dist/unmin/css"
				src: [
					"**/*.css"
					"!**/*.min.css"
				]
				dest: "dist/unmin/css"
				expand: true
				flatten: true

		cssmin:
			options:
				banner: "/*!\n * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)\n * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n" +
						" * <%= pkg.version %> - " + "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n *\n */"
			dist:
				cwd: "dist/unmin/css"
				src: [
					"**/*.css"
					"!**/wet-boew.css"
					"!**/ie8-wet-boew.css"
					"!**/*.min.css"
					"!**/ie8*.css"
				]
				ext: ".min.css"
				dest: "dist/css"
				expand: true

			distWET:
				options:
					banner: ""
				cwd: "dist/unmin/css"
				src: [
					"**/wet-boew.css"
					"**/ie8-wet-boew.css"
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
					"!**/favicon*.*"
					"!demos/**/*.*"
					"!theme/**/*.*"
					"!unmin/demos/**/*.*"
					"!**/logo.*"
				]
				dest: "dist/"
			site:
				expand: true
				cwd: "site/img"
				src: "**/*.*"
				dest: "dist/unmin/img"
			assets:
				expand: true
				cwd: "src/assets"
				src: "**/*.*"
				dest: "dist/unmin/assets"
			assets_min:
				expand: true
				cwd: "src/assets"
				src: "**/*.*"
				dest: "dist/assets"
			json:
				expand: true
				cwd: "site/pages/ajax"
				src: "**/*.json"
				dest: "dist/unmin/ajax"
			json_min:
				expand: true
				cwd: "site/pages/ajax"
				src: "**/*.json"
				dest: "dist/ajax"
			fonts:
				expand: true
				cwd: "src/fonts"
				src: "**/*.*"
				dest: "dist/unmin/fonts"
			site_min:
				expand: true
				cwd: "site/img"
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
				dest: "dist/unmin/js/customJS"

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
				cwd: "dist/unmin/js/customJS"
				src: ["*.js"]
				dest: "dist/js/customJS"
				ext: ".min.js"

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
				clone: "themes-dist"
				base: "dist"

			travis:
				options:
					repo: "https://" + process.env.GH_TOKEN + "@github.com/wet-boew/themes-dist.git"
					branch: "<%= pkg.name %>"
					message: "Travis build " + process.env.TRAVIS_BUILD_NUMBER
					silent: true
				src: [
					"**/*.*"
				]

		connect:
			options:
				port: 8000

			server:
				options:
					base: "dist"
					middleware: (connect, options) ->
						middlewares = []
						middlewares.push(connect.compress(
							filter: (req, res) ->
								/json|text|javascript|dart|image\/svg\+xml|application\/x-font-ttf|application\/vnd\.ms-opentype|application\/vnd\.ms-fontobject/.test(res.getHeader('Content-Type'))
						))
						middlewares.push(connect.static(options.base));
						middlewares

	# These plugins provide necessary tasks.
	@loadNpmTasks "assemble"
	@loadNpmTasks "grunt-autoprefixer"
	@loadNpmTasks "grunt-contrib-clean"
	@loadNpmTasks "grunt-contrib-connect"
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

