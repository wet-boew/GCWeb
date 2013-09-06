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
			},
			plugins: {
				options: {
					stripBanners: true
				},
				src: ['dist/js/theme.js', 'src/plugins/**/*.js'],
				dest: 'dist/js/theme.js',
			}
		},
		assemble: {
			options: {
				prettify: {indent: 2},
				marked: {sanitize: false},
				production: false,
				data: 'src/templates/data/*.yml',
				assets: 'dist/assets',
				helpers: 'src/helpers/helper-*.js',
				layoutdir: 'src/templates/layouts',
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
			},
			plugins: {
				options: {
					layout: 'plugins.hbs'
				},
				expand: true,
				cwd: 'src/plugins',
				src: ['**/*.hbs'],
				dest: 'dist/demo/',
				flatten: true
			}
		},
		sass: {
			all: {
				expand: true,
				cwd: 'src/base',
				src: ['**/*.scss', '!**/_*.scss'],
				dest: 'dist/css/',
				ext: '.css'
			}
		},
		uglify: {
			polyfills: {
				options: {
					preserveComments : 'some'
				},
				expand: true,
				cwd: 'src/polyfills',
				src: ['**/*.js'],
				dest: 'dist/js/polyfills/',
				ext: '.min.js',
				flatten: true
			},
			core: {
				options: {
					preserveComments : 'some'
				},
				files: {
					'dist/js/vapour.min.js': 'dist/js/vapour.js'
				}
			},
			plugins: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'dist/js/wet-boew.min.js': 'dist/js/wet-boew.js'
				}
			},
			i18n: {
				options: {
					banner: '<%= banner %>'
				},
				expand: true,
				cwd: 'dist/js/i18n',
				src: ['**/*.js'],
				dest: 'dist/js/i18n',
				ext: '.min.js'
			},
			lib: {
				options: {
					preserveComments : 'some'
				},
				files: {
					'dist/js/deps/jquery.pjax.min.js': 'lib/jquery-pjax/jquery.pjax.js'
				}
			}

		},
		coffee: {
			vapour: {
				options: {
					bare: true,
				},
				files: {
					'dist/js/vapour.js': 'src/core/vapour.coffee'
				}
			},
			plugins: {
				options: {
					bare: true
				},
				files: {
					'dist/js/wet-boew.js': ['src/core/helpers.coffee','src/plugins/**/*.coffee']
				}
			}

		},
		copy: {
			wetboew: {
				files: {
					'dist/css/bootstrap.min.css': 'lib/bootstrap/dist/css/bootstrap.min.css'
				}
			}
		},

		clean: [
			'dist', 'lib'
		],
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile', 'build']
			},
			lib_test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['jshint:lib_test', 'qunit']
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
					'src/**/*.js',
					'!src/**/*min.js',
					'!src/polyfills/**/*.js',
					'test/**/*.js'
				]
			}
		},
		i18n: {
			options: {
				template: 'src/i18n/base.js',
				csv: 'src/i18n/i18n.csv'
			},
			src: 'src/js/i18n/formvalid/*.js'
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
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks("assemble");
	grunt.loadTasks('tasks');

	// Default task.
	grunt.registerTask('build', ['coffee','sass','concat', 'i18n', 'uglify', 'copy', 'assemble']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('html', ['assemble']);
	grunt.registerTask('wipe', ['clean']);
	grunt.registerTask('default', ['clean', 'build', 'test']);
	grunt.registerTask('init', ['bower']);
};
