var tsBuild = require('../../utils/build/ts');
var envs = require('../../utils/envs');

module.exports = function(gulp, c3) {
    return {
        description: 'Compiles TypeScript',
        deps       : ['sources:ts'],
        task       : function(cb) {
            var env = c3.getMetaData().env || envs.PROD_ENV;
            new tsBuild.Builder(gulp, env).build(cb);
        }
    };
};
