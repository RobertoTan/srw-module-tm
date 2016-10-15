module.exports = function(gulp) {
    return {
        description: 'Performs static analysis of source code',
        deps       : ['_', 'lint:tslint']
    };
};


