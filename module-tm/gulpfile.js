var path = require('path');
var gulp = require('gulp');

ROOT_DIR = __dirname;
TOOLS_DIR = path.join(ROOT_DIR, 'tools');

var c3 = require(path.join(TOOLS_DIR, 'concierge/concierge3'));
var concierge = new c3.Concierge(gulp, [
    path.join(TOOLS_DIR, 'module-concierge/conf/concierge.conf.js'),
    path.join(TOOLS_DIR, 'custom-concierge/conf/concierge.conf.js')
]);
concierge.bootstrap();

