var dirs = require('../utils/dirs');
var envs = require('../utils/envs');

module.exports = function(gulp, c3) {
    return {
        description: 'Builds application',
        deps       : [['build:ts', 'build:html', 'build:less', 'build:assets'], 'build:manifest'],
        task       : function(cb) {
            var env = c3.getMetaData().env || envs.PROD_ENV;
            if( env == envs.PROD_ENV ) {
                gulp
                    .src([
                        dirs.getPath(envs.PROD_ENV, '**/*.*'),
                        '!**/*.map',
                        '!**/*.ts'
                    ])
                    .pipe(gulp.dest(dirs.getPath(envs.DIST_ENV)))
                    .on('end', cb);
            } else {
                cb();
            }
        }
    };
};
