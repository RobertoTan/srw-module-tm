var path = require('path');
var dirs = require('../../utils/dirs');
var manifest = require('../../utils/manifest');

module.exports = function(gulp, c3) {
    return {
        description: 'Copies sources to build directory',
        task       : function(cb) {
            gulp.src(path.join(dirs.SRC_DIR, 'code/**/*'))
                .pipe(gulp.dest(path.join(dirs.BUILD_DIR, 'src', manifest.escapedModuleName)))
                .on('end', cb);
        }
    };
};
