var path = require('path');
var ROOT_DIR = path.join(__dirname, '..');

module.exports = {
    description: '',
    tasks      : {
        directories: [
            path.join(ROOT_DIR, 'tasks')
        ]
    },
    arguments  : []
};
