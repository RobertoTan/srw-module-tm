var dirs = require('./dirs');
var manifest = require('./manifest');
var path = require('path');
var glob = require('glob');

function getSubmodules(prefix) {
    prefix = prefix || manifest.escapedModuleName;

    var moduleDirectory = path.join(dirs.SRC_DIR, 'code');
    var extensionRegex = /\.ts$/;
    var separatorRegex = /\\/g;

    return glob
        .sync(path.join(moduleDirectory, '**/*.ts'))
        .map(function(it) {
            return path.relative(moduleDirectory, it);
        })
        .map(function(it) {
            return it.replace(separatorRegex, '/');
        })
        .map(function(it) {
            return it.replace(extensionRegex, '');
        })
        .map(function(it) {
            return prefix + '/' + it;
        });
}

module.exports = {
    getSubmodules: getSubmodules
};
