module.exports = function (grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: "\n\n"
            },
            dev: {
                src: ['LucityWeb/resources/js/**/*.js'],
                dest: 'LucityWeb/<%= pkg.name %>.js'
            },
            deps: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angularjs/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/abdmob/x2js/xml2json.min.js'
                ],
                dest: 'LucityWeb/<%= pkg.name %>-deps.js'
            },
            dist: {
                files: {
                    'bin/<%= pkg.name %>.min.js': ['LucityWeb/<%= pkg.name %>.min.js'],
                    'bin/<%= pkg.name %>-deps.js': ['LucityWeb/<%= pkg.name %>-deps.js']
                }
            },
            moveMap: {
                src: ['bower_components/angularjs/angular.min.js.map'],
                dest: 'LucityWeb/angular.min.js.map'
            },
            moveRoute: {
                src: ['bower_components/angular-route/angular-route.min.js.map'],
                dest: 'LucityWeb/angular-route.min.js.map'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: 'LucityWeb/<%= pkg.name %>.js',
                        ext: '.annotated.js',
                        extDot: 'last'
                    }
                ]
            }
        },

        sass: {
            dev: {
                files: {
                    'LucityWeb/resources/css/lucity.css': 'LucityWeb/resources/css/lucity.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    noCache: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("mm-dd-yyyy") %> */'
                },
                files: [{
                    expand: true,
                    src: '*/resources/css/lucity.scss',
                    dest: 'bin/',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("mm-dd-yyyy") %> */'
            },
            distJS: {
                files: {
                    'LucityWeb/<%= pkg.name %>.min.js': ['LucityWeb/<%= pkg.name %>.js']
                }
            }
        },

        watch: {
            scripts: {
                files: ['LucityWeb/resources/js/**/*.js'],
                tasks: ['concat:dist', 'concat:dev']
            },
            styles: {
                files: ['LucityWeb/resources/css/**/*.scss'],
                tasks: ['sass:dev']
            }
        },
        copy: {
            main: {
                src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                dest: 'LucityWeb/resources/css/bootstrap.min.css'
            }
        }
    });

    //npm tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-ngdocs');

    //tasks
    grunt.registerTask('default', 'Default Task Alias', ['build']);

    grunt.registerTask('build', 'Build the application',
        ['sass:dev', 'concat:dist', 'ngAnnotate:dist', 'concat:moveMap', 'concat:moveRoute', 'copy:main'
        ]);
}