/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! Web Experience Toolkit (WET) / Boîte à outils de l\'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html\n' +
			' - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			' License: <%= pkg.license %> */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>'
			}
		},
		assemble: {
			options: {
				prettify: {
					indent: 2
				},
				marked: {
					sanitize: false
				},
				production: false,
				data: 'src/templates/data/*.yml',
				assets: 'dist/assets',
				helpers: 'src/helpers/helper-*.js',
				layoutdir: 'lib/wet-boew/src/templates/layouts',
				partials: ['src/templates/includes/**/*.hbs']
			},
			site: {
				options: {
					layout: 'default.hbs'
				},
				expand: true,
				cwd: 'src/templates/pages',
				src: ['*.hbs'],
				dest: 'dist/'
			}
		},
		sass: {
			base: {
				'dist/css/theme.css': 'src/base/theme.scss'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			all: {
				cwd: 'dist/js',
				src: '**/*.js',
				dest: 'dist'
			}
		},
		coffee: {
			all: {
				cwd: 'src',
				src: '**/*.coffee',
				dest: 'dist'
			}
		},
		copy: {
			wetboew: {
				expand: true,
				cwd: 'lib/wet-boew/dist',
				src: '**/*.*',
				dest: 'dist/'
			}
		},

		clean: {
			dist: [ 'dist'],
			lib : ['lib']
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile', 'build']
			},
			lib_test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['jshint:lib_test']
			},
			source: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['build'],
				options: {
					interval: 5007,
					livereload: true
				}
			}
		},
		hub: {
			wetboew: {
				src: ['lib/wet-boew/Gruntfile.js'],
				tasks: ['init', 'build'],
			},
		},
		"install-dependencies": {
				options : {
					cwd: 'lib/wet-boew'
				}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test: {
				src: [
					'src/**/*.js'
				]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-install-dependencies');
	grunt.loadNpmTasks('grunt-hub');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('assemble');

	// Default task.
	grunt.registerTask('build', ['coffee', 'sass', 'concat', 'uglify', 'copy', 'assemble']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('html', ['assemble']);
	grunt.registerTask('wipe', ['clean:dist']);
	grunt.registerTask('buildwet', ['hub']);
	grunt.registerTask('default', ['clean:dist', 'build', 'test']);
	grunt.registerTask('init', ['clean:lib', 'depbuild', 'buildwet']);
	grunt.registerTask('depbuild', ['install-dependencies', 'hub']);
};
