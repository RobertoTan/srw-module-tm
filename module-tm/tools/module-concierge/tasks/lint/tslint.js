module.exports = function(gulp) {
    return {
        description: 'Performs static analysis of TS source code',
        task       : function() {
            var path = require('path');
            var dirs = require('../../utils/dirs');
            var gulpTslint = require('gulp-tslint');

            return gulp.src(path.join(dirs.SRC_DIR, 'code/**/*.ts'))
                .pipe(gulpTslint({
                    formatter: 'verbose'
                }))
                .pipe(gulpTslint.report());
        }
    };
};


