var lessBuild = require('../../utils/build/less');
var envs = require('../../utils/envs');

module.exports = function(gulp, c3) {
    return {
        description: 'Compiles LESS styles',
        task       : function(cb) {

            var env = c3.getMetaData().env || envs.PROD_ENV;
            new lessBuild.Builder(gulp, env).build(cb);
        }
    }
};
