module.exports = function(grunt) {
	grunt.initConfig({

        coffee: {

            glob_to_multiple: {
                expand: true,
                flatten: true,
                cwd: '',
                src: ['src/routes/*.coffee'],
                dest: 'routes/',
                ext: '.js'
            },

            glob_to_multiple_2: {
                expand: true,
                flatten: true,
                cwd: '',
                src: ['src/models/*.coffee'],
                dest: 'models/',
                ext: '.js'
            },

            glob_to_multiple_3: {
                expand: true,
                flatten: true,
                cwd: '',
                src: ['src/*.coffee'],
                dest: '',
                ext: '.js'
            },
            
        },
        


        watch: {
            options: {
                spawn: false,
                livereload: true,
            },
            scripts: {
                files: [ '**/*.coffee' ],
                tasks: [ 'coffee']
            }

        }
 
      
	});


    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.registerTask('default', ['watch','coffee']);
};