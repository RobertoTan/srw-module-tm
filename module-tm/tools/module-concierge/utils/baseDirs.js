var path = require('path');

var ROOT_DIR = path.resolve(path.join(__dirname, '../../..'));
var BUILD_DIR = path.resolve(path.join(ROOT_DIR, 'build'));
var SRC_DIR = path.resolve(path.join(ROOT_DIR, 'src'));

module.exports = {
    ROOT_DIR : ROOT_DIR,
    BUILD_DIR: BUILD_DIR,
    SRC_DIR  : SRC_DIR
};