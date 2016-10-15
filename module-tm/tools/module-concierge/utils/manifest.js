var dirs = require('./baseDirs');
var path = require('path');

var manifest = require(path.join(dirs.SRC_DIR, 'manifest.json'));
var tsconfig = require(path.join(dirs.ROOT_DIR, 'tsconfig.json'));
var tslint = require(path.join(dirs.ROOT_DIR, 'tslint.json'));

module.exports = {
    manifest         : manifest,
    escapedModuleName: manifest.name.replace(/[^a-zA-Z0-9]/g, '_'),
    tsconfig         : tsconfig,
    tslint           : tslint
};
