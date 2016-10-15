var clean = require('gulp-clean');
var path = require('path');
var dirs = require('../utils/dirs');

module.exports = function(gulp) {
    return {
        description: 'Cleans previous builds',
        task       : function() {
            return gulp
                .src(dirs.BUILD_DIR)
                .pipe(clean({
                    force: true
                }));
        }
    };
};
