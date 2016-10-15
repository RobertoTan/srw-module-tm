var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var path = require('path');
var dirs = require('../dirs');
var envs = require('../envs');
var manifest = require('../manifest');

function Builder(gulp, env) {
    this.build = function(cb) {
        var p = gulp
            .src(path.join(dirs.SRC_DIR, 'templates/**/*.*'))
            .pipe(handlebars({
                handlebars: require('handlebars')
            }))
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace  : 'app.templates',
                noRedeclare: true,
                processName: function(filePath) {
                    var tempPath = filePath.split('templates');
                    var template = tempPath[1]
                        .substr(1)
                        .replace('.js', '')
                        .replace(/\\/g, '/');
                    return manifest.escapedModuleName + ':' + template;
                }
            }))
            .pipe(concat('templates.js'));

        if( env == envs.PROD_ENV ) {
            p.pipe(uglify({
                mangle: false
            }));
        }

        p
            .pipe(gulp.dest(dirs.getPath(env)))
            .on('end', cb);
    }
}

module.exports = {
    Builder: Builder
};
