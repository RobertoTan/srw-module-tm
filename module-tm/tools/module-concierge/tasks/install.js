module.exports = function(gulp) {
    return {
        description: 'Installs and updates NPM dependencies',
        task: function() {
            throw new Error('This task must be executed with `ngv` Concierge script');
        }
    };
};
