var typedoc = require("gulp-typedoc");
var manifest = require('../utils/manifest');
var dirs = require('../utils/dirs');
var path = require('path');
var rename = require('gulp-rename');

module.exports = function(gulp) {
    return {
        description: 'Generates module documentation',
        task       : function(cb) {
            var compilerOptions = manifest.tsconfig.compilerOptions;

            var typedocOptions = {
                out                 : dirs.getPath('docs'),
                externalPattern     : '**/*.d.ts',
                module              : compilerOptions.module,
                target              : compilerOptions.target,
                includeDeclarations : true,
                name                : 'NGV module: ' + manifest.manifest.name,
                theme               : "default",
                ignoreCompilerErrors: false,
                version             : true,
                readme              : path.join(dirs.SRC_DIR, 'guides/README.md')
            };

            gulp
                .src(dirs.CODE_PATHS)
                .pipe(rename(function(it) {
                    it.dirname = it.dirname.replace(/^(core|src).typings.*/, '');
                }))
                // otherwise typedoc will generate shit
                .pipe(gulp.dest(dirs.getPath('docs', '', 'pre-docs')))
                .pipe(typedoc(typedocOptions))
                .on('end', cb);
        }
    }
}