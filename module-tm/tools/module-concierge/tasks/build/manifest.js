var dirs = require('../../utils/dirs');
var envs = require('../../utils/envs');
var modules = require('../../utils/modules');
var path = require('path');
var fs = require('fs');

module.exports = function(gulp, c3) {
    return {
        description: 'Prepares manifest',
        task       : function(cb) {
            var env = c3.getMetaData().env || envs.PROD_ENV;

            var manifestJsonFilename = path.join(dirs.SRC_DIR, 'manifest.json');
            var manifestJson = require(manifestJsonFilename);

            manifestJson.submodules = modules.getSubmodules();

            var outputFilename = path.join(dirs.getPath(env), 'manifest.json');
            fs.writeFileSync(outputFilename, JSON.stringify(manifestJson));

            cb();
        }
    };
};
