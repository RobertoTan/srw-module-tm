var path = require('path');
var dirs = require('../../utils/dirs');
var envs = require('../../utils/envs');

module.exports = function(gulp, c3) {
    return {
        description: 'Prepares assets',
        task       : function(cb) {
            var env = c3.getMetaData().env || envs.PROD_ENV;
            gulp
                .src(path.join(dirs.SRC_DIR, 'assets/**/*.*'))
                .pipe(gulp.dest(dirs.getPath(env, 'assets')))
                .on('end', cb);
        }
    }
};

