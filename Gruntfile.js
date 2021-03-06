module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            client: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js',
            },
            adminjs: {
                src: 'client/scripts/admin.js',
                dest: 'server/public/assets/scripts/admin.min.js',
            }
        },
        copy: {
            html: {
                expand: true,
                cwd: "client",
                src: [
                    "views/index.html",
                    "views/register.html",
                    "views/users.html",
                    "views/another.html",
                    "views/login.html",
                    "views/admin.html"
                ],
                dest: "server/public/assets/"
            },
            style: {
                expand: true,
                cwd: "client",
                src: ['styles/style.css','styles/admin.css'],
                dest: 'server/public/assets/'
            },
            jquery: {
                expand: true,
                cwd: 'node_modules',
                src: 'jquery/dist/jquery.min.js',
                dest: 'server/public/vendors'
            },
            bootstrap: {
                expand: true,
                cwd: "node_modules",
                src: ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap/dist/css/bootstrap-theme.min.css', 'bootstrap/dist/js/bootstrap.min.js'],
                dest:'server/public/vendors'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};