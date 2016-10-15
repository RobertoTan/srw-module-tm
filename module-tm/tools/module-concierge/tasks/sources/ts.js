module.exports = function(gulp, c3) {
    return {
        description: 'Generates TypeScript sources',
        deps       : [['sources:copy-sources', 'sources:generate-module-class', 'lint:tslint']]
    };
};
