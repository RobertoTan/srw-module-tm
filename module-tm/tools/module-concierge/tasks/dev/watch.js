var path = require('path');
var dirs = require('../../utils/dirs');
var gulpSequence = require('gulp-sequence');

module.exports = function(gulp, c3) {
    return {
        description: 'Watches changes and auto-rebuilds',
        task       : function() {
            var metadata = c3.getMetaData();
            metadata.env = metadata.env || envs.DEBUG_ENV;

            var noop = function() {
            };

            gulp.watch([
                'code/**/*.ts',
                'typings/**/*.ts'
            ], {
                interval: 1000,
                cwd     : dirs.SRC_DIR
            }, function() {
                gulpSequence('build:ts::atom')(noop);
            });

            gulp.watch([
                'templates/**/*.html'
            ], {
                interval: 1000,
                cwd     : dirs.SRC_DIR
            }, function() {
                gulpSequence('build:html::atom')(noop);
            });

            gulp.watch([
                'styles/**/*.less'
            ], {
                interval: 1000,
                cwd     : dirs.SRC_DIR
            }, function() {
                gulpSequence('build:less::atom')(noop);
            });

            gulp.watch([
                'assets/**/*.*'
            ], {
                interval: 1000,
                cwd     : dirs.SRC_DIR
            }, function() {
                gulpSequence('build:assets::atom')(noop);
            });

            gulp.watch([
                'manifest.json'
            ], {
                interval: 1000,
                cwd     : dirs.SRC_DIR
            }, function() {
                gulpSequence('build:manifest::atom')(noop);
            });
        }
    }
};
