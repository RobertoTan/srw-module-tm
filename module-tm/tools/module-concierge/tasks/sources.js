module.exports = function(gulp, c3) {
    return {
        description: 'Pre-processes sources',
        deps       : ['sources:clean', 'sources:ts']
    };
};
