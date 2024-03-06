#global module:false
path = require("path")
sass = require("node-sass")
yaml = require("js-yaml")

module.exports = (grunt) ->

	# Default task.
	@registerTask(
		"default"
		"Default task, that runs the production build"
		[
			"debug"
		]
	)

	@registerTask(
		"test"
		"Run code quality test"
		[
			"eslint:all"
			"jsonlint:all"
			"sasslint:all"
			"lintspaces:all"
		]
	)

	@registerTask(
		"dist"
		"Build distribution files ready for production"
		[
			"checkDependencies"
			"check-wet-version"
			"test"
			"jekyll-theme"
			"core-dist-PROD"
			"site-contents"
			"deploy-packagejson"
		]
	)

	@registerTask(
		"debug"
		"Build a local working copy"
		[
			"checkDependencies"
			"check-wet-version"
			"jekyll-theme"
			"jekyll-theme-runLocal"
			"core-dist-DEBUG"
			"site-contents"
		]
	)

	@registerTask(
		"demo"
		"Build a demo ready version of the site"
		[
			"jekyll-theme"
			"jekyll-theme-runDemo"
			"core-dist-DEBUG"
			"site-contents"
		]
	)

	@registerTask(
		"méli-mélo"
		"Build méli-mélo files and run it in-place"
		[
			"checkDependencies"
			"check-wet-version"
			"jekyll-theme"
			"jekyll-theme-runLocal"
			"clean:mélimélo"
			"méli-mélo-build:inplace"
			"copy:méliméloGelé"
		]
	)

	@registerTask(
		"site-contents"
		"Build méli-mélo files"
		[
			"concat:common"
			"concat:components"
			"concat:templates"
			"concat:designPatterns"
			"concat:sites"
			"concat:wet-boew"
			"clean:wetboew_demos"
			"copy:wetboew_demos"
		]
	)

	@registerTask(
		"méli-mélo-remote"
		"Build méli-mélo files"
		[
			"clean:mélimélo"
			"méli-mélo-build:run"
			"copy:méliméloGelé"
		]
	)

	@registerTask(
		"méli-mélo-runLocal"
		"Build méli-mélo files"
		[
			"clean:mélimélo"
			"méli-mélo-build:runLocal"
			"copy:méliméloGelé"
		]
	)

	@registerTask(
		"dist-act"
		"Build distribution files ready for production"
		[
			"jekyll-theme"
			"core-dist-PROD"
			"site-contents"
			"deploy-packagejson"
		]
	)

	@registerTask(
		"jekyll-theme"
		"PROD - Build Jekyll theme"
		[
			"clean:jekyll"
			"clean:gemfileLock"
			"copy:layouts"
			"copy:includes"
			"copy:samples"
		]
	)

	@registerTask(
		"jekyll-theme-runLocal"
		"DEBUG - Jekyll theme but with the run local variant"
		[
			"usebanner:jekyllRunLocal"
			"copy:jekyllRunLocal"
		]
	)

	@registerTask(
		"jekyll-theme-runDemo"
		"DEBUG - Jekyll theme but with the run demo variant"
		[
			"usebanner:jekyllRunDemo"
			"copy:jekyllRunDemo"
		]
	)

	@registerTask(
		"core-dist-DEBUG"
		"Compile core GCWeb files"
		[
			"core-dist"
			"méli-mélo-runLocal"
			"core-dist-POST"
			"usebanner:jekyllRunUnminified"
		]
	)

	@registerTask(
		"core-dist-PROD"
		"Compile core GCWeb files"
		[
			"core-dist"
			"méli-mélo-remote"
			"uglify:dist"
			"postcss"
			"cssmin:theme"
			"cssmin:mélimélo"
			"core-dist-POST"
			"sri:theme"
		]
	)

	@registerTask(
		"core-dist"
		"Compile core GCWeb files"
		[
			"clean:dist"
			"sass:all"
			"concat:supports"
			"concat:plugins"
			"copy:assets"
			"copy:fonts"
			"copy:wetboew"
			"copy:depsJS_custom"
		]
	)

	@registerTask(
		"core-dist-POST"
		"Post task to complete the compilation of core GCWeb files"
		[
			"usebanner:css"
			"copy:depsJS"
			"clean:depsJS"
		]
	)

	@registerTask(
		"deploy-packagejson"
		"Generate a package.json file in the dist folder"
		->
			pkgOriginal = grunt.file.readJSON("package.json");
			addToRepo = "themes-cdn";
			writeTo = "dist/GCWeb/package.json";
			pkg = {
				name: "gcweb-compiled",
				version: pkgOriginal.version,
				description: pkgOriginal.name.toLowerCase() + " theme compiled"
				repository: {
					type: "git",
					url: "git+https://github.com/wet-boew/" + addToRepo + ".git"
				},
				author: "wet-boew-bot",
				license: "MIT",
				bugs: {
					url: "https://github.com/wet-boew/" + pkgOriginal.name.toLowerCase() + "/issues"
				},
				homepage: "https://github.com/wet-boew/" + addToRepo + "#readme"
			};
			grunt.file.write(writeTo, JSON.stringify(pkg, null, 2));
	)

	@registerTask(
		"linting"
		"Initial build setup"
		[
			"sasslint"
		]
	)

	@registerMultiTask(
		"méli-mélo-build"
		"Try to dynamically compile mélimelo",
		() ->
			méliméloData = this.data
			runType = méliméloData.runType
			packages = []
			if runType
				packages = méliméloData.config.packages
			else
				packages = méliméloData.packages
			iterator = 0
			for pack in packages
				console.log( "Creating... " + pack.nom )

				#
				# The iterator is used to ensure that all task are ran
				iterator++

				#
				# create global for task specific
				grunt.config( "curMéliPack" + iterator, pack.nom )
				grunt.config( "curMéliLibs" + iterator, pack.libs )

				#
				# Clean the méli-mélo package folder
				#
				#méliméloClean = clone( grunt.config.getRaw( "clean.méliméloPack" ) );
				#méliméloClean[0] = méliméloClean[0].replace( /curMéliPack/g, "curMéliPack" + iterator );
				#grunt.config( "clean.méliméloPack-" + iterator, méliméloClean )

				#
				# Concat the js
				# fyi - grunt.util._.clone() !== clone();
				méliméloJs = clone( grunt.config.getRaw( "concat.mélimélo" ) );
				méliméloJs.src[0] = méliméloJs.src[0].replace( "curMéliLibs", "curMéliLibs" + iterator );
				méliméloJs.src[1] = méliméloJs.src[1].replace( "curMéliLibs", "curMéliLibs" + iterator );
				méliméloJs.dest = méliméloJs.dest.replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "concat.mélimélo-" + iterator, méliméloJs )

				#
				# Create the CSS compiled file
				#
				# - Need to copy scss file in a temporary directory
				# - Remove the front matter
				# - Compile with sass
				# - Concat all CSS file
				# - Delete temporary directory
				#
				# méliméloScss
				# - copy scss file in a temporary directory
				méliméloScssCopy = clone( grunt.config.getRaw( "copy.méliméloScss" ) );
				méliméloScssCopy.src[0] = méliméloScssCopy.src[0].replace( "curMéliLibs", "curMéliLibs" + iterator );
				méliméloScssCopy.dest = méliméloScssCopy.dest.replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "copy.méliméloScss-" + iterator, méliméloScssCopy )
				# - Remove the front matter
				méliméloScssFM = clone( grunt.config.getRaw( "usebanner.méliméloScss" ) );
				méliméloScssFM.src = méliméloScssFM.src.replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "usebanner.méliméloScss-" + iterator, méliméloScssFM )
				# - compile Scss into Css
				méliméloSassRaw = grunt.config.getRaw( "sass.mélimélo" );
				méliméloSass =
					options: méliméloSassRaw.options # Workaround because unable to clone the options
					expand: clone( méliméloSassRaw.expand )
					src: clone( méliméloSassRaw.src )
					dest: clone( méliméloSassRaw.dest )
					ext: clone( méliméloSassRaw.ext )
				méliméloSass.src[0] = méliméloSass.src[0].replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "sass.mélimélo-" + iterator, méliméloSass )
				# - Concat all CSS file
				méliméloSassCss = clone( grunt.config.getRaw( "concat.méliméloCss" ) );
				méliméloSassCss.src[0] = méliméloSassCss.src[0].replace( /curMéliPack/g, "curMéliPack" + iterator );
				méliméloSassCss.dest = méliméloSassCss.dest.replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "concat.méliméloCss-" + iterator, méliméloSassCss )
				# - Delete temporary directory
				méliméloSassClean = clone( grunt.config.getRaw( "clean.méliméloWorkdir" ) );
				méliméloSassClean[0] = méliméloSassClean[0].replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "clean.méliméloWorkdir-" + iterator, méliméloSassClean )

				#
				# Copy the demos file, into the méli-mélo compiled folder
				méliméloDemo = clone( grunt.config.getRaw( "copy.mélimélo" ) );
				méliméloDemo.src[0] = méliméloDemo.src[0].replace( "curMéliLibs", "curMéliLibs" + iterator );
				méliméloDemo.dest = méliméloDemo.dest.replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "copy.mélimélo-" + iterator, méliméloDemo )

				#
				# Replace the font-matter property script and css by the compiled ones in the demos files
				# runLocal
				méliméloFMlocal = clone( grunt.config.getRaw( "usebanner.méliméloRunLocal" ) );
				méliméloFMlocal.src = méliméloFMlocal.src.replace( /curMéliPack/g, "curMéliPack" + iterator );
				méliméloFMlocal.options.props.script = méliméloFMlocal.options.props.script.replace( /curMéliPack/g, pack.nom );
				méliméloFMlocal.options.props.css = méliméloFMlocal.options.props.css.replace( /curMéliPack/g, pack.nom );
				grunt.config( "usebanner.méliméloRunLocal-" + iterator, méliméloFMlocal )
				# in place
				méliméloFMinplace = clone( grunt.config.getRaw( "usebanner.méliméloInplace" ) );
				méliméloFMinplace.src = méliméloFMinplace.src.replace( /curMéliPack/g, "curMéliPack" + iterator );
				méliméloFMinplace.options.props.script = méliméloFMinplace.options.props.script.replace( /curMéliPack/g, pack.nom );
				méliméloFMinplace.options.props.css = méliméloFMinplace.options.props.css.replace( /curMéliPack/g, pack.nom );
				grunt.config( "usebanner.méliméloInplace-" + iterator, méliméloFMinplace )
				# remote
				méliméloFMremote = clone( grunt.config.getRaw( "usebanner.méliméloRemote" ) );
				méliméloFMremote.src = méliméloFMremote.src.replace( /curMéliPack/g, "curMéliPack" + iterator );
				méliméloFMremote.options.props.script = méliméloFMremote.options.props.script.replace( /curMéliPack/g, pack.nom );
				méliméloFMremote.options.props.css = méliméloFMremote.options.props.css.replace( /curMéliPack/g, pack.nom );
				grunt.config( "usebanner.méliméloRemote-" + iterator, méliméloFMremote )

				#
				# Copy the assets
				méliméloAssets = clone( grunt.config.getRaw( "copy.méliméloAssets" ) );
				méliméloAssets.src[0] = méliméloAssets.src[0].replace( "curMéliLibs", "curMéliLibs" + iterator );
				méliméloAssets.src[1] = méliméloAssets.src[1].replace( "curMéliLibs", "curMéliLibs" + iterator );
				méliméloAssets.src[2] = méliméloAssets.src[2].replace( "curMéliLibs", "curMéliLibs" + iterator );
				méliméloAssets.dest = méliméloAssets.dest.replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "copy.méliméloAssets-" + iterator, méliméloAssets )

				#
				# Copy distributions files
				méliméloDist = clone( grunt.config.getRaw( "copy.méliméloDist" ) );
				méliméloDist.src[0] = méliméloDist.src[0].replace( /curMéliPack/g, "curMéliPack" + iterator );
				grunt.config( "copy.méliméloDist-" + iterator, méliméloDist )

				# Run all the task sequential
				if runType == "local"
					grunt.task.run( [
						#"clean:mélimélo-" + iterator,
						"concat:mélimélo-" + iterator,
						"copy:méliméloScss-" + iterator,
						"usebanner:méliméloScss-" + iterator,
						"sass:mélimélo-" + iterator,
						"concat:méliméloCss-" + iterator,
						"clean:méliméloWorkdir-" + iterator,
						"copy:mélimélo-" + iterator,
						"usebanner:méliméloRunLocal-" + iterator,
						"copy:méliméloAssets-" + iterator,
						"copy:méliméloDist-" + iterator
					] )
				else if runType == "inplace"
					grunt.task.run( [
						#"clean:mélimélo-" + iterator,
						"concat:mélimélo-" + iterator,
						"copy:méliméloScss-" + iterator,
						"usebanner:méliméloScss-" + iterator,
						"sass:mélimélo-" + iterator,
						"concat:méliméloCss-" + iterator,
						"clean:méliméloWorkdir-" + iterator,
						"copy:mélimélo-" + iterator,
						"usebanner:méliméloInplace-" + iterator,
						"copy:méliméloAssets-" + iterator,
						"copy:méliméloDist-" + iterator
					] )
				else
					grunt.task.run( [
						#"clean:mélimélo-" + iterator,
						"concat:mélimélo-" + iterator,
						"copy:méliméloScss-" + iterator,
						"usebanner:méliméloScss-" + iterator,
						"sass:mélimélo-" + iterator,
						"concat:méliméloCss-" + iterator,
						"clean:méliméloWorkdir-" + iterator,
						"copy:mélimélo-" + iterator,
						"usebanner:méliméloRemote-" + iterator,
						"copy:méliméloAssets-" + iterator,
						"copy:méliméloDist-" + iterator
					] )

	)

	@registerMultiTask(
		"a11y-report"
		"Try to dynamically compile a11y reporting",
		() ->

			a11yReportByComponent = [];
			a11yReportByTestRequirement = {};
			acrReportByConformity = {}

			reportConf = grunt.file.readJSON( this.data.reporting )
			dataSites = grunt.file.readJSON( this.data.sites )
			dataComponents = grunt.file.readJSON( this.data.components )
			dataCommons = grunt.file.readJSON( this.data.common )
			dataTemplates = grunt.file.readJSON( this.data.templates )
			dataDesignPatterns = grunt.file.readJSON( this.data.designPatterns )

			a11yReportByComponent = processComponentReporting( grunt, "sites", dataSites, a11yReportByTestRequirement, acrReportByConformity, reportConf )
			a11yReportByComponent = a11yReportByComponent.concat( processComponentReporting( grunt, "components", dataComponents, a11yReportByTestRequirement, acrReportByConformity, reportConf ) )
			a11yReportByComponent = a11yReportByComponent.concat( processComponentReporting( grunt, "common", dataCommons, a11yReportByTestRequirement, acrReportByConformity, reportConf ) )
			a11yReportByComponent = a11yReportByComponent.concat( processComponentReporting( grunt, "templates", dataTemplates, a11yReportByTestRequirement, acrReportByConformity, reportConf ) )
			a11yReportByComponent = a11yReportByComponent.concat( processComponentReporting( grunt, "designPatterns", dataDesignPatterns, a11yReportByTestRequirement, acrReportByConformity, reportConf ) )


			#
			# Reformat the Test Requirement view for parsing with Jekyll
			#
			tRequirementReformated = {}
			tRequirementReformated.allComponents = []
			tRequirementReformated.list = []

			for tReqId, tReqDet of a11yReportByTestRequirement
				tReqItem = tReqDet
				tReqItem.id = tReqId
				componentsList = tReqDet.components
				tReqItem.components = []

				for compId, compDet of componentsList
					comp = {}
					comp.name = compId
					comp.a11y = compDet

					if tRequirementReformated.allComponents.indexOf( compId ) == -1
						tRequirementReformated.allComponents.push( compId )

					tReqItem.components.push( comp )

				tRequirementReformated.list.push( tReqItem )

			#
			# Reformat the Conformity view for parsing with Jekyll
			#
			conformityReformated = {}
			conformityReformated.allComponents = []
			conformityReformated.list = []

			for conformId, conformDet of acrReportByConformity
				conformItem = conformDet
				conformItem.id = conformId
				componentsList = conformDet.components
				conformItem.components = []

				for compId, compDet of componentsList
					comp = {}
					comp.name = compId
					comp.acr = compDet

					if conformityReformated.allComponents.indexOf( compId ) == -1
						conformityReformated.allComponents.push( compId )

					conformItem.components.push( comp )

				conformityReformated.list.push( conformItem )

			grunt.file.write( "_data/a11yComponents.json", JSON.stringify( a11yReportByComponent ) )
			grunt.file.write( "_data/a11yTestRequirement.json", JSON.stringify( tRequirementReformated ) )
			grunt.file.write( "_data/acrConformity.json", JSON.stringify( conformityReformated ) )

	)

	@registerMultiTask(
		"check-wet-version"
		"Ensure WET-BOEW's version is the same in package as in node_modules",
		(src) ->
			installedFull = this.data[0]
			installed = installedFull.substring(installedFull.indexOf("#") + 2)
			expectedFull = this.data[1]
			expected = expectedFull.substring(expectedFull.indexOf("#") + 2)

			if (installed != expected)
				grunt.log.writeln(">> "['red'] + "wet-boew: installed: " + installed['red'] + ", expected: " + expected['green'])
				grunt.fail.fatal(">> "['red'] + "Invoke " + "npm install"['green'] + " to update WET-BOEW version")
			else
				grunt.log.writeln(">> "['green'] + "WET-BOEW version up to date with package's version.")
	)

	@initConfig

		# Metadata.
		pkg: @file.readJSON "package.json"
		pkgWET: @file.readJSON "node_modules/wet-boew/package.json"
		distFolder: "dist"
		themeDist: "<%= distFolder %>/<%= pkg.name %>"
		jekyllDist: "~jekyll-dist"
		jqueryVersion: grunt.file.readJSON(
			path.join require.resolve( "jquery" ), "../../package.json"
		).version
		jqueryOldIEVersion: "1.12.4"
		banner: "/*!\n * @title Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)\n * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n" +
				" * v<%= pkg.version %> - " + "<%= grunt.template.today('yyyy-mm-dd') %>\n *\n */"

		# Placeholder modal for multimélo task
		méliméloFolder: "méli-mélo-demos"
		curMéliPack: "mélimélo.js"
		curMéliLibs: [ ]

		checkDependencies:
			all:
				options:
					npmInstall: false
					checkGitUrls: true

		"check-wet-version":
			src: ["<%= pkgWET._from %>", "<%= pkg.dependencies['wet-boew'] %>"]

		"a11y-report":
			all:
				# Read those genrated json file only at runtime of the task
				sites: "_data/sites.json"
				components: "_data/components.json"
				templates: "_data/templates.json"
				designPatterns: "_data/design-patterns.json"
				common: "_data/common.json"
				reporting: "_data/reporting.json"

		clean:
			dist: [ "dist"]
			depsJS: ["<%= themeDist %>/deps-js"]
			jekyll: [ "<%= jekyllDist %>" ]
			wetboew_demos: [ "_wetboew-demos" ]
			mélimélo: [ "<%= méliméloFolder %>" ]
			méliméloPack: [ "<%= méliméloFolder %>/<%= curMéliPack %>" ]
			méliméloWorkdir: [ "<%= méliméloFolder %>/<%= curMéliPack %>/workdir" ]
			gemfileLock: [ "Gemfile.lock" ]

		"méli-mélo-build":
			run: @file.readJSON "_data/méli-mélo.json"
			runLocal:
				runType: "local"
				config: @file.readJSON "_data/méli-mélo.json"
			inplace:
				runType: "inplace"
				config: @file.readJSON "_data/méli-mélo.json"

		concat:
			plugins:
				options:
					stripBanners: true
					banner: "<%= banner %>"
				src: [
					"{sites,common,components,templates,design-patterns,wet-boew}/**/*.js"
					"!{sites,common,components,templates,design-patterns,wet-boew}/**/test.js"
					"!{sites,common,components,templates,design-patterns,wet-boew}/**/assets"
					"!{sites,common,components,templates,design-patterns,wet-boew}/**/demo"
					"!{sites,common,components,templates,design-patterns,wet-boew}/**/demos"
				]
				dest: "<%= themeDist %>/js/theme.js"
			common:
				options:
					banner: "["
					footer: "]\n"
					separator: ","
				src: "common/**/index.json-ld"
				dest: "_data/common.json"
			components:
				options:
					banner: "["
					footer: "]\n"
					separator: ","
				src: "components/**/index.json-ld"
				dest: "_data/components.json"
			templates:
				options:
					banner: "["
					footer: "]\n"
					separator: ","
				src: "templates/**/index.json-ld"
				dest: "_data/templates.json"
			designPatterns:
				options:
					banner: "["
					footer: "]\n"
					separator: ","
				src: "design-patterns/**/index.json-ld"
				dest: "_data/design-patterns.json"
			"wet-boew":
				options:
					banner: "["
					footer: "]\n"
					separator: ","
				src: "wet-boew/**/index.json-ld"
				dest: "_data/wet-boew.json"
			sites:
				options:
					banner: "["
					footer: "]\n"
					separator: ","
				src: "sites/**/index.json-ld"
				dest: "_data/sites.json"
			supports:
				options:
					stripBanners: false
				src: [
					"<%= themeDist %>/css/theme.css"
					"node_modules/wet-boew/src/polyfills/supports/*.css"
				]
				dest: "<%= themeDist %>/css/theme.css"

			# Placeholder modal for multimélo task
			mélimélo:
				options:
					stripBanners: false
				src: [
					"méli-mélo/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/*.js"
					"méli-mélo/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/js/*.js"
					"!méli-mélo/**/demo/"
					"!méli-mélo/*.js"
				]
				dest: "<%= méliméloFolder %>/<%= curMéliPack %>/<%= curMéliPack %>.js"
			méliméloCss:
				options:
					stripBanners: false
				src: [
					"<%= méliméloFolder %>/<%= curMéliPack %>/workdir/**/*.css"
				]
				dest: "<%= méliméloFolder %>/<%= curMéliPack %>/<%= curMéliPack %>.css"

		usebanner:
			css:
				options:
					banner: "@charset \"utf-8\";\n<%= banner %>"
					position: "replace"
					replace: "@charset \"UTF-8\";"
				files:
					src: [
						"<%= themeDist %>/css/*.*",
						"<%= themeDist %>/méli-mélo/*.css"
					]
			#
			# Use the name in the package.json as packageName in the theme
			# used to build the URL and to ease the reuse of this build script for derivated theme
			#
			#definePckName:
			#	options:
			#		banner: """{%- assign setting-packageName = "<%= pkg.name %>" -%}"""
			#	src: "_includes/settings.liquid"
			jekyllRunLocal:
				options:
					banner: """{%- assign setting-resourcesBasePathTheme = "/<%= distFolder %>/GCWeb" -%}{%- assign setting-resourcesBasePathWetboew = "/<%= distFolder %>/wet-boew" -%}{%- assign setting-siteBasePath = "/" -%}"""
					position: "bottom"
				src: "<%= jekyllDist %>/_includes/settings.liquid"
			jekyllRunDemo:
				options:
					banner: """{%- assign setting-resourcesBasePathTheme = "/wet-boew-demos/""" + grunt.option('branch') + """/<%= distFolder %>/GCWeb" -%}{%- assign setting-resourcesBasePathWetboew = "/wet-boew-demos/""" + grunt.option('branch') + """/<%= distFolder %>/wet-boew" -%}{%- assign setting-siteBasePath = "/wet-boew-demos/""" + grunt.option('branch') + """/" -%}"""
					position: "bottom"
				src: "<%= jekyllDist %>/_includes/settings.liquid"
			jekyllRunUnminified:
				options:
					banner: """{%- assign setting-minifiedSuffix = "" -%}"""
					position: "bottom"
				src: "<%= jekyllDist %>/_includes/settings.liquid"
			méliméloRunLocal:
				options:
					banner: ""
					props:
						script: "../../../<%= themeDist %>/méli-mélo/curMéliPack.js"
						css: "../../../<%= themeDist %>/méli-mélo/curMéliPack.css"
					position: "replace"
					replace: (fileContents, newBanner, insertPositionMarker, src, options) ->
						# Rewrite the front matter by the desired variable value
						patternFrontMatter = /^(---)([\s|\S]*?)(---)/
						frontmatter = yaml.load(fileContents.match( patternFrontMatter )[2] )
						for prop, val of options.props
							frontmatter[ prop ] = val
						options.banner = yaml.dump(frontmatter);
						return fileContents.replace( patternFrontMatter, "---\n" + insertPositionMarker + "---" )
				src: "<%= méliméloFolder %>/<%= curMéliPack %>/*/*.{md,html}"
			méliméloRemote:
				options:
					banner: ""
					props:
						script: "https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/méli-mélo/curMéliPack.js"
						css: "https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/méli-mélo/curMéliPack.css"
					position: "replace"
					replace: (fileContents, newBanner, insertPositionMarker, src, options) ->
						# Rewrite the front matter by the desired variable value
						patternFrontMatter = /^(---)([\s|\S]*?)(---)/
						frontmatter = yaml.load(fileContents.match( patternFrontMatter )[2] )
						for prop, val of options.props
							frontmatter[ prop ] = val
						options.banner = yaml.dump(frontmatter);
						return fileContents.replace( patternFrontMatter, "---\n" + insertPositionMarker + "---" )
				src: "<%= méliméloFolder %>/<%= curMéliPack %>/*/*.{md,html}"
			méliméloInplace:
				options:
					banner: ""
					props:
						script: "../curMéliPack.js"
						css: "../curMéliPack.css"
					position: "replace"
					replace: (fileContents, newBanner, insertPositionMarker, src, options) ->
						# Rewrite the front matter by the desired variable value
						patternFrontMatter = /^(---)([\s|\S]*?)(---)/
						frontmatter = yaml.load(fileContents.match( patternFrontMatter )[2] )
						for prop, val of options.props
							frontmatter[ prop ] = val
						options.banner = yaml.dump(frontmatter);
						return fileContents.replace( patternFrontMatter, "---\n" + insertPositionMarker + "---" )
				src: "<%= méliméloFolder %>/<%= curMéliPack %>/*/*.{md,html}"
			méliméloScss:
				options:
					banner: ""
					position: "replace"
					replace:/^---[\s|\S]*?---/
				src: "<%= méliméloFolder %>/<%= curMéliPack %>/workdir/**/*.scss"

		copy:
			layouts:
				expand: true
				flatten: true
				src: "{sites,components,templates,design-patterns,docs,wet-boew}/**/layouts/**.*"
				dest: "<%= jekyllDist %>/_layouts"
			includes:
				files: [
					expand: true
					src: [
						"{sites,components,templates,design-patterns,wet-boew}/**/*-{includes,inc}/**.html"
						"!{sites,components,templates,design-patterns,wet-boew}/**/includes/**.*"
					]
					dest: "<%= jekyllDist %>/_includes"
					rename: (dest, src) ->
						ret = dest + "/" + src
						if src.indexOf('/') isnt src.lastIndexOf('/')
							ret = dest + src.substring( src.indexOf('/') )
						return ret
				,
					expand: true
					src: [
						"{sites,components,templates,design-patterns,wet-boew}/**/includes/**.*"
					]
					dest: "<%= jekyllDist %>/_includes"
					rename: (dest, src) ->
						dest + src.substring( src.indexOf('/') ).replace( '/includes/', '/' )
				,
					expand: true
					src: "{sites,components,templates,design-patterns,wet-boew}/*/include.html"
					dest: "<%= jekyllDist %>/_includes"
					rename: (dest, src) ->
						dest + "/" + src.replace( '/include.html', '.html' )
				]
			samples:
				expand: true
				src: "{sites,common,components,templates,design-patterns,wet-boew}/**/samples/**.*"
				dest: "_includes"
				rename: (dest, src) ->
					dest + "/" + src.replace( 'samples/', '' )
			jekyllRunLocal:
				src: [
					"_includes/**.*",
					"_includes/**/*.*",
					"_layouts/**.*"
				]
				dest: "<%= jekyllDist %>/"
			jekyllRunDemo:
				src: [
					"_includes/**.*",
					"_includes/**/*.*",
					"_layouts/**.*"
				]
				dest: "<%= jekyllDist %>/"

			fonts:
				expand: true
				flatten: true
				src: [
					"{sites,common,components,templates,design-patterns,wet-boew}/**/fonts/**.*"
					"!**/*.scss"
				]
				dest: "<%= themeDist %>/fonts"
			assets:
				expand: true
				src: [
					"{sites,common,components,templates,design-patterns,wet-boew}/**/assets/**.*"
					"{sites,common,components,templates,design-patterns,wet-boew}/**/assets/**/*.*"
				]
				dest: "<%= themeDist %>/assets"
				rename: (dest, src) ->
					dest + src.substring( src.indexOf('/') ).replace( '/assets/', '/' )
			wetboew:
				expand: true
				cwd: "node_modules/wet-boew/dist"
				src: [
					"wet-boew/**/*.*"
				]
				dest: "dist"
			depsJS_custom:
				expand: true
				flatten: true
				src: "{sites,common,components,templates,design-patterns,wet-boew}/deps/**.js"
				dest: "<%= themeDist %>/deps-js"
			depsJS:
				expand: true
				flatten: true
				cwd: "<%= themeDist %>/deps-js"
				src: "**/*.*"
				dest: "dist/wet-boew/js/deps"

			wetboew_demos:
				expand: true
				src: [
					"node_modules/wet-boew/src/plugins/**/*.*",
					"!node_modules/wet-boew/src/plugins/**/*.js",
					"!node_modules/wet-boew/src/plugins/**/*.scss"
				]
				dest: "_wetboew-demos"
				rename: (dest, src) ->
					return dest + "/" + src.replace( 'node_modules/wet-boew/src/plugins/', '' ).replace( ".hbs", ".html" )
				options: {
					process: (content, srcpath) ->
						return content.replace(/{{>alertariahidden}}/g, "")
				}

			# méli-mélo tasks
			mélimélo:
				expand: true
				src: [
					"méli-mélo/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/*.{md,html}",
					"!méli-mélo/*.{md,html}"
				]
				dest: "<%= méliméloFolder %>/<%= curMéliPack %>"
				rename: (dest, src) ->
					return dest + src.substring( src.indexOf('/') )
			méliméloScss:
				expand: true
				src: [
					"méli-mélo/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/{*,css/*}.{scss,css}",
					"!méli-mélo/*.{md,html}"
				]
				dest: "<%= méliméloFolder %>/<%= curMéliPack %>/workdir"
				rename: (dest, src) ->
					return dest + src.substring( src.indexOf('/') )
			méliméloAssets:
				expand: true
				src: [
					"méli-mélo/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/{assets,docs,demos,img,ajax,data,tests,reports}/*.*",
					"!méli-mélo/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/{js,css}/*.*",
					"!méli-mélo/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/*.{md,html,js}",
					"!méli-mélo/**/*.{scss,css}"
				]
				dest: "<%= méliméloFolder %>/<%= curMéliPack %>"
				rename: (dest, src) ->
					return dest + src.substring( src.indexOf('/') )
			méliméloDist:
				expand: true
				flatten: true
				src: [
					"<%= méliméloFolder %>/<%= curMéliPack %>/<%= curMéliPack %>.{css,js}"
				]
				dest: "<%= themeDist %>/méli-mélo/"
			méliméloGelé:
				expand: true
				flatten: true
				src: [
					"méli-mélo/compilation-gelé/*.{css,js}"
				]
				dest: "<%= themeDist %>/méli-mélo/"

		sass:
			all:
				options:
					implementation: sass,
					includePaths: [
						"./node_modules"
						"./node_modules/wet-boew/node_modules"
						if grunt.file.exists( "misc/variant/_variant-default.scss" ) then "src/variant" else "src/variant-default"
					],
					indentType: "tab",
					indentWidth: 1
				expand: true
				cwd: "sites"
				src: [
					"*.scss"
					"!*-jekyll.scss"
				]
				dest: "<%= themeDist %>/css"
				ext: ".css"
			mélimélo:
				options:
					implementation: sass,
					indentType: "tab",
					indentWidth: 1
				expand: true
				src: [
					"<%= méliméloFolder %>/<%= curMéliPack %>/workdir/**/*.scss"
#					"<%= méliméloFolder %>/méli-mélo-2021-1/workdir/**/*.scss"
#					"<%= méliméloFolder %>/{<% _.forEach(curMéliLibs, function(lib) { %><%- lib %>,<% }); %>}/**/*.scss"
				]
				dest: ""
#				dest: "méli-mélo/méli-mélo-2021-1/css"
#				dest: "méli-mélo/<%= curMéliPack %>/<%= curMéliPack %>.css"
				ext: ".css"
#				rename: (dest, src) ->
#					console.log( src )
#					console.log( dest )
#					return dest

		postcss:
			options:
				processors: [
					require("autoprefixer")()
				]
			modern:
				cwd: "<%= themeDist %>/css"
				src: [
					"*.css"
					"!ie8*.css"
				]
				dest: "<%= themeDist %>/css"
				expand: true

		cssmin:
			theme:
				expand: true
				cwd: "<%= themeDist %>/css"
				src: [
					"*.css"
					"!*.min.css"
				]
				ext: ".min.css"
				dest: "<%= themeDist %>/css"
			mélimélo:
				expand: true
				cwd: "<%= themeDist %>/méli-mélo"
				src: [
					"*.css"
					"!*.min.css"
				]
				ext: ".min.css"
				dest: "<%= themeDist %>/méli-mélo"

		uglify:
			options:
				preserveComments: (uglify,comment) ->
					return comment.value.match(/^!/i)
			dist:
				options:
					banner: "<%= banner %>"
				expand: true
				cwd: "<%= themeDist %>"
				src: [
					"**/*.js"
					"!**/*.min.js"
				]
				dest: "<%= themeDist %>"
				ext: ".min.js"

		htmllint:
			ajax:
				options:
					ignore: [
						"Element “head” is missing a required instance of child element “title”."
						"Element “li” not allowed as child of element “body” in this context. (Suppressing further errors from this subtree.)" # the menu item (li) in the AJAX fragment are not contained in a UL (menu)
					]
				src: [
					"dist/unmin/ajax/**/*.html"
					"dist/unmin/demos/menu/demo/*.html"
				]
			templates:
				src: [
					"dist/unmin/demos/data-json/template-en.html"
					"dist/unmin/demos/data-json/template-fr.html"
				]
			provisional:
				options:
					ignore: [
						"Consider using the “h1” element as a top-level heading only (all “h1” elements are treated as top-level headings by many screen readers and other tools)."
					]
				src: [
					"dist/unmin/xprmntl/pink-day-en.html"
					"dist/unmin/xprmntl/pink-day-fr.html"
				]
			all:
				options:
					ignore: [
						"A document must not include more than one “meta” element with its “name” attribute set to the value “description”."
						# TODO: Should be removed and fixed now that HTML5 specs updated
						"The “banner” role is unnecessary for element “header”."
						"The “main” role is unnecessary for element “main”."
						"The “navigation” role is unnecessary for element “nav”."
					]
				src: [
					"~sites/**/*.html"
					"!~sites/wetboew-demos/*"
				]

		bootlint:
			all:
				options:
					stoponerror: true
					stoponwarning: true
					showallerrors: true
					relaxerror: [
						# We recommend handling this through the server headers so it never appears in the markup
						"W002" # `<head>` is missing X-UA-Compatible `<meta>` tag that disables old IE compatibility modes
						# TODO: The rules below should be resolved
						"E013" # Only columns (`.col-*-*`) may be children of `.row`s
						"E014" # Columns (`.col-*-*`) can only be children of `.row`s or `.form-group`s
						"E031" # Glyphicon classes must only be used on elements that contain no text content and have no child elements.
						"E023" # `.panel-body` must have a `.panel` or `.panel-collapse` parent
						"E024" # `.panel-heading` must have a `.panel` parent
						"W010" # Using `.pull-left` or `.pull-right` as part of the media object component is deprecated as of Bootstrap v3.3.0. Use `.media-left` or `.media-right` instead.
						"E032" # `.modal-content` must be a child of `.modal-dialog`
						"W009" # Using empty spacer columns isn't necessary with Bootstrap's grid. So instead of having an empty grid column with `class="col-xs-12"` , just add `class="col-xs-offset-12"` to the next grid column.
						"E012" # `.input-group` and `.col-*-*` cannot be used directly on the same element. Instead, nest the `.input-group` within the `.col-*-*`
						"E017" # GCWeb wants to support explicit labels when using checkbox inputs under the .gc-chckbxrdio .checkbox classes
						"E018" # GCWeb wants to support explicit labels when using radio inputs under the .gc-chckbxrdio .radio classes
					]
				src: [
					"~sites/**/*.html"
					# Ignore wet-boew demos files
					"!~sites/wetboew-demos/*"
					# Ignore HTML fragments used for the menus
					"!~sites/**/assets/*.html"
					"!~sites/**/ajax/*.html"
					# Ignore deprecated page as it is just for testing
					"!~sites/**/deprecated-*.html"
					# Ignore Bootstrap 4 test page
					"!~sites/**/bootstrap-4.html"
				]
			bootstrap4:
				options:
					stoponerror: true
					stoponwarning: true
					showallerrors: true
					relaxerror: [
						# We recommend handling this through the server headers so it never appears in the markup
						"W002" # `<head>` is missing X-UA-Compatible `<meta>` tag that disables old IE compatibility modes
						# Ignore jQuery missing warning
						"W005" # Unable to locate jQuery, which is required for Bootstrap's JavaScript plugins to work; however, you might not be using Bootstrap's JavaScript
						# Ignore Bootstrap 4 usage warning
						"W015" # Detected what appears to be Bootstrap v4 or later. This version of Bootlint only supports Bootstrap v3.
					]
				src: [
					"~sites/**/bootstrap-4.html"
				]

		watch:
			gruntfile:
				files: "Gruntfile.coffee"
				tasks: [
					"build"
				]
			js:
				files: "<%= eslint.all.src %>"
				tasks: "js"

		eslint:
			options:
				configFile: if process.env.CI == "true" then "node_modules/wet-boew/.eslintrc.ci.json" else "node_modules/wet-boew/.eslintrc.json"
				quiet: true
			all:
				src: [
					"{sites,common,components,templates,design-patterns,wet-boew}/**/*.js"
				]
		jsonlint:
			all:
				src: [
					"{sites,common,components,templates,design-patterns,wet-boew}/**/*.json",
					"{sites,common,components,templates,design-patterns,wet-boew}/**/*.json-ld"
				]
				options: {
					indent: "\t"
				}
		sasslint:
			options:
				configFile: ".sass-lint.yml"
			all:
				expand: true
				src: [
						"{sites,common,components,templates,design-patterns,wet-boew}/**/*.scss"
						"!*-jekyll.scss"
						"!node_modules"
					]
		lintspaces:
			all:
				src: [
						# Root files
						".editorconfig"
						".git*"
						".*rc"
						"*.yml"
						"Gemfile*"
						"Gruntfile.coffee"
						"Licen?e-*.txt"
						"*.json"
						# "*.json-ld"
						"Rakefile"

						# Folders
						"{sites,common,components,templates,design-patterns,wet-boew}/**"

						#
						# Exemptions...
						#

						# Generated files
						"!Gemfile.lock"

						# Web contents
						"!{sites,common,components,templates,design-patterns,wet-boew}/**/*.md"
						# "{sites,components,templatesdesign-patterns}/*/*.{md,html}"
						# "{sites,components,templatesdesign-patterns}/*.{md, html}"
						# "!{sites,components,templatesdesign-patterns}/*/**/*.{md,html}"

						# Images
						"!{sites,common,components,templates,design-patterns,wet-boew}/**/*.{jpg,png,ico}"
						"!{sites,common,components,templates,design-patterns,wet-boew}/*.{ico,jpg,png}"

						# External fonts
						"!{sites,common,components,templates,design-patterns,wet-boew}/**/*.{eot,svg,ttf,woff}"

						# Docker environment file
						# File that gets created/populated in a manner that goes against .editorconfig settings during the main Travis-CI build.
						"!script/docker/env"
					],
				options:
					editorconfig: ".editorconfig",
					ignores: [
						"js-comments"
					],
					showCodes: true

		sri:
			options:
				pretty: true
			theme:
				options:
					dest: "<%= themeDist %>/payload.json"
				cwd: "<%= themeDist %>"
				src: [
					"{js,css,méli-mélo}/*.{js,css}"
				]
				expand: true

	require( "load-grunt-tasks" )( grunt )

	require( "time-grunt" )( grunt )
	@

clone = (obj) ->
	if not obj? or typeof obj isnt 'object'
		return obj

	if obj instanceof Date
		return new Date(obj.getTime())

	if obj instanceof RegExp
		flags = ''
		flags += 'g' if obj.global?
		flags += 'i' if obj.ignoreCase?
		flags += 'm' if obj.multiline?
		flags += 'y' if obj.sticky?
		return new RegExp(obj.source, flags)

	newInstance = new obj.constructor()

	for key of obj
		newInstance[key] = clone obj[key]

	return newInstance

getA11yReportSummary = ( fname, componentName, reportData, wcag21AAList, refTestRequirements ) ->

	a11yReport = {}
	a11yReport.allStates = [ ]
	a11yReport.date = reportData[ "dct:date" ];

	allPassed = true
	applicableTestRequirement = Object.assign( [], wcag21AAList );

	reportData[ "earl:result" ].forEach ( result ) ->

		outcome = result[ "earl:outcome" ]
		testId = result[ "earl:test" ]
		isApplicable = false

		# Log all outcomes this report contains
		if a11yReport.allStates.indexOf( outcome ) == -1
			a11yReport.allStates.push( outcome )

		# Check if the test requirement has passed
		if outcome != "earl:passed" && outcome != "earl:inapplicable"
			allPassed = false;

		# Remove this test requirement for the list of all applicable test requirement
		tReqIdx = applicableTestRequirement.indexOf( testId )
		if tReqIdx != -1
			applicableTestRequirement.splice( tReqIdx, 1 )
			isApplicable = true


		#
		# Reporting from a Test Requirement perspective
		#

		# Create the test requirement placeholder if required or retreive it
		refTestRequirements[ testId ] = { } if !refTestRequirements[ testId ]
		tRequirementDetail = refTestRequirements[ testId ]

		# Set the test requirement information if not initialized
		if !tRequirementDetail[ "earl:test" ]
			tRequirementDetail[ "earl:test" ] = testId
			tRequirementDetail.nbPassed = 0
			tRequirementDetail.nbFailed = 0
			tRequirementDetail.nbCantTell = 0
			tRequirementDetail.nbInapplicable = 0
			tRequirementDetail.nbUntested = 0

		# Count the total number of outcome
		if outcome == "earl:passed"
			tRequirementDetail.nbPassed = tRequirementDetail.nbPassed + 1
		else if outcome == "earl:failed"
			tRequirementDetail.nbFailed = tRequirementDetail.nbFailed + 1
		else if outcome == "earl:cantTell"
			tRequirementDetail.nbCantTell = tRequirementDetail.nbCantTell + 1
		else if outcome == "earl:inapplicable"
			tRequirementDetail.nbInapplicable = tRequirementDetail.nbInapplicable + 1
		else if outcome == "earl:untested"
			tRequirementDetail.nbUntested = tRequirementDetail.nbUntested + 1

		# Create the association between the test and the component
		tRequirementDetail.components = {} if !tRequirementDetail.components
		tRequirementDetail.components[ componentName ] = [] if !tRequirementDetail.components[ componentName ]

		# Add the component test requirement information
		tRequirementDetail.components[ componentName ].push( {
			"outcome": outcome,
			"isApplicable": isApplicable,
			"date": result[ "dct:modified" ] || a11yReport.date,
			"link": fname
		})

	#
	# Reporting from a component perspective
	#

	# Indication if it is partial, like we did succeed to empty the list of all applicable test requirement
	if applicableTestRequirement.length
		a11yReport.isPartial = true
	else
		a11yReport.isPartial = false

	a11yReport.testRequirementNotCovered = applicableTestRequirement

	if allPassed
		a11yReport.state = "Pass"
	else if a11yReport.allStates.length > 1
		a11yReport.state = "Mixed"
	else
		a11yReport.state = a11yReport.allStates[ 0 ];

	a11yReport.link = fname

	return a11yReport

getAcrSummary = ( fname, componentName, reportData, wcag21AAList, refConformityRequirements ) ->

	acrReport = {}
	acrReport.allStates = [ ]
	acrReport.date = reportData[ "dct:issued" ] || reportData[ "dct:modified" ] || reportData[ "dct:created" ] || reportData[ "dct:date" ];

	satisfactionAll = true
	satisfactionNot = false
	satisfactionFurtherTest = false
	applicableConformityRequirement = Object.assign( [], wcag21AAList );

	reportData[ "acr:conformity" ].forEach ( result ) ->

		conformance = result[ "acr:conformance" ]
		reqId = result[ "acr:requirement" ]
		isApplicable = false

		# Check if the all requirement are satisfied
		if conformance != "acr:satisfied"
			satisfactionAll = false;
		if conformance == "acr:notSatisfied"
			satisfactionNot = true;
		if conformance == "acr:furtherTestNeeded"
			satisfactionFurtherTest = true;

		# Remove this conformity for the list of all applicable conformance
		tConformIdx = applicableConformityRequirement.indexOf( reqId )
		if tConformIdx != -1
			applicableConformityRequirement.splice( tConformIdx, 1 )
			isApplicable = true


		#
		# Reporting from a conformity perspective
		#

		# Create the test requirement placeholder if required or retreive it
		refConformityRequirements[ reqId ] = { } if !refConformityRequirements[ reqId ]
		tConformityDetail = refConformityRequirements[ reqId ]

		# Set the test requirement information
		tConformityDetail[ "acr:requirement" ] = reqId

		# Create the association between the test and the component
		tConformityDetail.components = {} if !tConformityDetail.components
		tConformityDetail.components[ componentName ] = [] if !tConformityDetail.components[ componentName ]

		# Add the component test requirement information
		tConformityDetail.components[ componentName ].push( {
			"conformance": conformance,
			"isApplicable": isApplicable,
			"date": result[ "dct:modified" ] || acrReport.date,
			"link": fname
		})

	#
	# Reporting from a component perspective
	#

	# Indication if it is partial, like we did succeed to empty the list of all applicable test requirement
	if applicableConformityRequirement.length
		acrReport.isPartial = true
	else
		acrReport.isPartial = false

	acrReport.conformityNotCovered = applicableConformityRequirement


	# Validate the ACR conformity summary reported
	stateCalculated = "Undefined"
	if satisfactionAll
		acrReport.conformity = "Satisfied"
		stateCalculated = "acr:satisfied"
	else if satisfactionNot && satisfactionFurtherTest
		acrReport.conformity = "Further test needed and not satisfied"
		stateCalculated = "acr:furtherTestNeeded"
	else if satisfactionNot
		acrReport.conformity = "Not satisfied"
		stateCalculated = "acr:notSatisfied"
	else if satisfactionFurtherTest
		acrReport.conformity = "Further test needed"
		stateCalculated = "acr:furtherTestNeeded"
	else
		acrReport.conformity = "Error, undefined";

	if stateCalculated != reportData[ "acr:conformance" ]
		acrReport.conformity = "Mismatch conformity - " + acrReport.conformity

	acrReport.link = fname

	# Determine the state of the ACR (In progress (Draft), Issued, Outdated, Archived )

	dModified = reportData[ "dct:modified" ]
	dCreated = reportData[ "dct:created" ]
	dIssued = reportData[ "dct:issued" ];
	dExpires = reportData[ "schema:expires" ]
	isReplaced = reportData[ "dct:isReplacedBy" ]
	hasVersion = reportData[ "dct:hasVersion" ]

	validIssued = dIssued && dCreated && dModified

	if validIssued && dExpires && ( isReplaced || hasVersion )
		acrReport.state = "Archived"
		acrReport.issuedOn = dIssued
		acrReport.expiredOn = dExpires
	else if validIssued && ( isReplaced || hasVersion )
		acrReport.state = "Missing expiry date"
		acrReport.issuedOn = dIssued
	else if validIssued && dExpires
		acrReport.state = "Outdated"
		acrReport.issuedOn = dIssued
		acrReport.expiredOn = dExpires
	else if validIssued && !acrReport.isPartial
		acrReport.state = "Issued"
		acrReport.issuedOn = dIssued
	else if validIssued && acrReport.isPartial
		acrReport.state = "Issued on partial"
		acrReport.issuedOn = dIssued
	else if !validIssued && ( dExpires || isReplaced || hasVersion )
		acrReport.state = "Cancelled"
	else if dCreated && dModified
		acrReport.state = "In progress"
	else
		acrReport.state = "Empty and incomplete"

	acrReport.createdOn = dCreated
	acrReport.modifiedOn = dModified

	return acrReport

processComponentReporting = ( grunt, componentType, components, a11yReportByTestRequirement, acrReportByConformity, reportConf ) ->

	ret = [];

	for feat in components
		console.log( "component... " + feat.title.en )
		componentState = {}

		componentState.name = feat.title.en
		componentState.a11y = []
		componentState.acr = []

		isMainACR = feat.acr || false

		filesFound = grunt.file.expand( componentType + "/" + feat.componentName + "/**/*.json" )

		filesFound.forEach ( f ) ->
			# Load the JSON file
			jfile = grunt.file.readJSON( f )

			isAllyReport = true if ( jfile[ "@type" ] == "acr:AssessmentReport" || Array.isArray( jfile[ "@type" ] ) && jfile[ "@type" ].indexOf( "acr:AssessmentReport" ) != -1 )

			isAcrReport = true if ( jfile[ "@type" ] == "acr:ConformanceReport" || Array.isArray( jfile[ "@type" ] ) && jfile[ "@type" ].indexOf( "acr:ConformanceReport" ) != -1 )

			if isAllyReport
				a11yReport = getA11yReportSummary( f, feat.componentName, jfile, reportConf.wcag21AAList, a11yReportByTestRequirement )
				componentState.a11y.push( a11yReport )

			if isAcrReport
				acrReport = getAcrSummary( f, feat.componentName, jfile, reportConf.wcag21AAList, acrReportByConformity )
				componentState.acr.push( acrReport )


		ret.push( componentState )

	return ret
