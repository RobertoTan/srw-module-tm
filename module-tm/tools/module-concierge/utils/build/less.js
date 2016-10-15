var dirs = require('../dirs');
var envs = require('../envs');
var path = require('path');
var sourceMaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');

function Builder(gulp, env) {
    this.build = function(cb) {
        var p = gulp.src(path.join(dirs.SRC_DIR, 'styles/styles.less'))
            .pipe(sourceMaps.init())
            .pipe(less());

        if( env == envs.PROD_ENV ) {
            p = p.pipe(cleanCss());
        }

        p
            .pipe(sourceMaps.write('.'))
            .pipe(gulp.dest(dirs.getPath(env)))
            .on('end', cb);
    }
}

module.exports = {
    Builder: Builder
};
