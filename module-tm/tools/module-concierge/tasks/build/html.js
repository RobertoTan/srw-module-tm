var htmlBuild = require('../../utils/build/html');
var envs = require('../../utils/envs');

module.exports = function(gulp, c3) {
    return {
        description: 'Pre-compiles templates',
        task       : function(cb) {
            var env = c3.getMetaData().env || envs.PROD_ENV;

            new htmlBuild.Builder(gulp, env).build(cb);
        }
    };
};


