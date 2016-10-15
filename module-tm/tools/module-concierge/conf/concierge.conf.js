var path = require('path');
var ROOT_DIR = path.join(__dirname, '..');

module.exports = {
    description: 'Module builder configuration',
    tasks      : {
        directories: [
            path.join(ROOT_DIR, 'tasks')
        ]
    },
    arguments  : [
        {
            name       : 'env',
            description: 'Build environment',
            values     : ['prod', 'debug']
        }
    ]
};
