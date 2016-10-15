var path = require('path');
var dirs = require('../../utils/dirs');
var clean = require('gulp-clean');

module.exports = function(gulp, c3) {
    return {
        description: 'Cleans generated sources directory',
        task       : function(cb) {
            return gulp.src(path.join(dirs.BUILD_DIR, 'src'))
                .pipe(clean());
        }
    };
};
