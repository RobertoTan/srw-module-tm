var path = require('path');
var glob = require('glob');
var manifest = require('./manifest');
var baseDirs = require('./baseDirs');

var ROOT_DIR = baseDirs.ROOT_DIR;
var BUILD_DIR = baseDirs.BUILD_DIR;
var SRC_DIR = baseDirs.SRC_DIR;

var CORE_SRC_DIR = path.resolve(path.join(ROOT_DIR, 'core'));

function getPath(env, dir, step) {
    dir = dir || '';
    step = step ? ('step-' + step) : '';

    var p = path.join(BUILD_DIR, step, env, dir);
    return path.resolve(p);
}

var codepaths = [
    path.join(BUILD_DIR, 'src', manifest.escapedModuleName + '.ts'),
    path.join(BUILD_DIR, 'src', manifest.escapedModuleName, '**/*.ts'),
    path.join(SRC_DIR, 'typings/**/*.d.ts')
];

var deps = manifest.manifest.dependencies || [];

var coreTypings = glob
    .sync(path.join(CORE_SRC_DIR, 'typings/*'))
    .map(function(p) {
        return path.parse(p).base;
    })
    .filter(function(pluginOrModuleName) {
        var isPlugin = pluginOrModuleName.indexOf('.') < 0;
        var isDepModule = deps.indexOf(pluginOrModuleName) >= 0;
        return isPlugin || isDepModule;
    })
    .map(function(pluginOrModuleName) {
        return path.join(CORE_SRC_DIR, 'typings', pluginOrModuleName, '**/*');
    });

codepaths = codepaths.concat(coreTypings);

module.exports = {
    getPath     : getPath,
    ROOT_DIR    : ROOT_DIR,
    BUILD_DIR   : BUILD_DIR,
    SRC_DIR     : SRC_DIR,
    CORE_SRC_DIR: CORE_SRC_DIR,
    CODE_PATHS  : codepaths
};