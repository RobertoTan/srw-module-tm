var path = require('path');
var fs = require('fs');
var modules = require('../../utils/modules');
var dirs = require('../../utils/dirs');
var manifest = require('../../utils/manifest');

module.exports = function(gulp, c3) {
    return {
        description: 'Generates submodule exposing public classes',
        deps       : ['sources:copy-sources'],
        task       : function(cb) {
            var name = manifest.escapedModuleName;
            var submodulePrefix = './' + name;

            var exposedClasses = modules
                .getSubmodules(submodulePrefix)
                .filter(function(moduleName) {
                    return moduleName != submodulePrefix + '/Main';
                })
                .map(function(moduleName, idx) {
                    var tmpName = '_' + idx;
                    var splitted = moduleName.split('/');
                    var baseName = splitted[splitted.length - 1];

                    splitted.pop();
                    splitted.shift();
                    splitted.unshift('exposedClasses');

                    var ns = splitted.join('.');

                    var exportStatement = 'import * as ' + tmpName + ' from "' + moduleName + '"; ';

                    if( ns ) {
                        exportStatement += 'namespace ' + ns + ' { ';
                    }

                    exportStatement += 'export let ' + baseName + ': any = <any>((<{"' + baseName + '":any}>' + tmpName + ')["' + baseName + '"]);'

                    if( ns ) {
                        exportStatement += ' }';
                    }

                    return exportStatement;
                })
                .join('\n');

            var moduleClassContent = '/* tslint:disable */\n' +
                exposedClasses +
                '\n' +
                '\n' +
                'import {Main} from \'./' + name + '/Main\';\n' +
                '\n' +
                'export default class ' + name + '_Module extends Main {\n' +
                '    getExposedClasses() : Object {\n' +
                '        if( this.autoExposeClasses ) {\n' +
                '            return $.extend({}, exposedClasses, super.getExposedClasses())\n' +
                '        } else {\n' +
                '            return super.getExposedClasses();\n' +
                '        }\n' +
                '    }\n' +
                '}\n';

            var moduleClassFileName = path.join(dirs.BUILD_DIR, 'src', name + '.ts');

            fs.writeFileSync(moduleClassFileName, moduleClassContent);

            cb();
        }
    };
};
