var webpack = require('webpack');
var path = require('path');
var ts = require("gulp-typescript");
var dirs = require('../dirs');
var _ = require('lodash');
var merge2 = require('merge2');
var uglify = require('gulp-uglify');
var sourceMaps = require('gulp-sourcemaps');
var envs = require('../envs');
var manifest = require('../manifest');
var rename = require('gulp-rename');

function Builder(gulp, env) {
    var compilerOptions = _.extend(
        {},
        manifest.tsconfig.compilerOptions,
        {
            "outFile"  : 'module.js',
            "noResolve": true
        }
    );

    this.build = function(cb) {
        var outDir = dirs.getPath(env);

        var tsResult = gulp
            .src(dirs.CODE_PATHS, {
                base: dirs.SRC_DIR
            })
            .pipe(sourceMaps.init())
            .pipe(ts(compilerOptions, ts.reporter.longReporter()));

        if( env == envs.PROD_ENV ) {
            tsResult.js.pipe(uglify({
                mangle: false
            }));
        }

        return merge2([
            tsResult.js
                .pipe(sourceMaps.write('.', {sourceRoot: path.join(dirs.SRC_DIR, 'code')}))
                .pipe(gulp.dest(outDir)),

            tsResult.dts
                .pipe(rename(manifest.escapedModuleName + '.d.ts'))
                .pipe(gulp.dest(outDir))
        ]).on('queueDrain', cb);
    };
}

module.exports = {
    Builder: Builder
};
