/**
 * Created by acidghost on 24/05/14.
 */
module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

		wintersmith: {
			build: {},
			preview: {
				options: {
					action: "preview"
				}
			}
		},

		less: {
			build: {
				options: {
					cleancss: true
				},
				files: {
					'contents/style.min.css': 'contents/exclude/less/style.less'
				}
			}
		},

		concat: {
			js: {
				src: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/bootstrap/dist/js/bootstrap.js',
					'contents/exclude/js/main.js'
				],
				dest: 'contents/main.js'
			}
		},

		uglify : {
			js: {
				files: {
					'contents/main.min.js' : [ 'contents/main.js' ]
				}
			}
		},

		watch: {
			styles: {
				files: ['contents/exclude/less/style.less'],
				tasks: ['less:build', 'wintersmith:build']
			},
			scripts: {
				files: ['contents/exclude/js/main.js'],
				tasks: ['concat:js', 'uglify:js', 'wintersmith:build']
			},
			templates: {
				files: ['templates/**/*.jade'],
				tasks: ['wintersmith:build']
			},
			contents: {
				files: ['contents/**/*', '!contents/exclude/**/*', '!contents/**/*.min.*'],
				tasks: ['wintersmith:build']
			},
			config: {
				files: ['config.json'],
				tasks: ['wintersmith:build']
			}
		}

	});

  grunt.registerTask('build', ['less:build', 'concat:js', 'uglify:js', 'wintersmith:build']);

	grunt.registerTask('preview', ['build', 'wintersmith:preview']);
};