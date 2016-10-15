var envs = require('../utils/envs');

module.exports = function(gulp, c3) {
    return {
        description: 'Turns development mode on',
        deps       : ['_', 'build', 'dev:watch'],
        task: function() {
            var metadata = c3.getMetaData();
            metadata.env = metadata.env || envs.DEBUG_ENV;
        }
    }
};
