#global module:false
module.exports = (grunt) ->

    @initConfig
        pkg: @file.readJSON 'package.json'
        banner: '/*! Web Experience Toolkit (WET) / Boîte à outils de l\'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n' +
            ' - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            ' License: <%= pkg.license %> */\n'

        environment:
            suffix: if grunt.cli.tasks.indexOf('debug') > -1 then "" else ".min"

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

            partners:
                options:
                    layout: 'partners.hbs'
                    ext: ".html"
                    environment:
                        suffix: "<%= environment.suffix %>"

                expand: true
                cwd: 'site/pages/partners'
                src: ['*.hbs']
                dest: 'dist/partners/'

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
            deploy:
                src: [
                    "*.txt"
                    "README.md"
                ]
                dest: "dist"
                expand: true

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
            "wet-boew-dist":
                src: ['lib/wet-boew/Gruntfile.coffee']
                tasks: ['dist']
            "wet-boew-debug":
                src: ['lib/wet-boew/Gruntfile.coffee']
                tasks: ['debug']

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

        "gh-pages":
            options:
                repo: "https://" + process.env.GH_TOKEN + "@github.com/bci-web/GCWeb.git"
                branch: process.env.build_branch
                clone: "GCWeb-dist"
                message: "Travis build " + process.env.TRAVIS_BUILD_NUMBER
                silent: true
                base: "dist"
            src: [
                "**/*.*"
            ]

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
    @loadNpmTasks "grunt-gh-pages"
    @loadNpmTasks 'grunt-hub'
    @loadNpmTasks 'grunt-install-dependencies'
    @loadNpmTasks 'grunt-sass'
    @loadNpmTasks 'assemble'

    # Default task.
    @registerTask 'debug', ['wipe', 'buildwetdebug', 'coffee', 'css', 'concat', 'copy:wetboew', 'html']
    @registerTask 'build', ['wipe','coffee', 'css', 'concat', 'uglify', 'copy:wetboew', 'cssmin', 'clean:non_mincss', 'html']
    @registerTask 'css', ['sass', 'autoprefixer']
    @registerTask 'test', ['jshint']
    @registerTask 'html', ['copy:site','assemble']
    @registerTask 'wipe', ['clean:dist']
    @registerTask 'buildwet', ['hub:wet-boew-dist']
    @registerTask 'buildwetdebug', ['hub:wet-boew-debug']
    @registerTask 'default', ['clean:dist', 'build', 'test']
    @registerTask 'init', ['depbuild', 'buildwet']
    @registerTask 'depbuild', ['install-dependencies']
    @registerTask('deploy', ['copy:deploy','gh-pages'])
