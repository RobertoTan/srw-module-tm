var _ = require('lodash');
var glob = require('glob');
var path = require('path');
var colors = require('colors/safe');
var sprintf = require('sprintf');
var gulpSequence = require('gulp-sequence');

function Concierge(gulp, config) {
    if( !_.isArray(config) ) {
        config = [config];
    }

    config = _.chain(config)
        .map(function(it) {
            try {
                return _.isString(it) ? require(it) : it;
            } catch( e ) {
                return undefined;
            }
        })
        .filter(_.isObject)
        .reduce(function(result, part) {
            if( part.description ) {
                result.description = part.description;
            }

            if( part.tasks && part.tasks.directories ) {
                result.tasks.directories = result.tasks.directories.concat(part.tasks.directories);
            }

            if( part.arguments ) {
                result.arguments = result.arguments.concat(part.arguments);
            }

            return result;
        }, {
            description: '',
            tasks      : {
                directories: []
            },
            arguments  : []
        })
        .value();

    var self = this;
    var tasks = {};
    var bootstrapped = false;

    function ensureNotBootstrapped() {
        if( bootstrapped ) {
            throw new Error("Cannot take this action. Concierge already bootstrapped!")
        }
    }

    var emptyTask = function(cb) {
        cb();
    };

    self.bootstrap = function() {
        ensureNotBootstrapped();
        bootstraped = true;
        printHelloMessage();
        addTasksFromConfig();
        registerDefaultTask();
        registerAllTasks();
    };

    function addTasksFromConfig() {
        _.each(config.tasks.directories, function(tasksDir) {
            self.addTasksFromDir(tasksDir);
        });
    }

    function registerDefaultTask() {
        gulp.task('default', function(cb) {
            printTaskList();
            cb();
        });
    }

    function printHelloMessage() {
        console.log('');
        console.log(colors.bold.yellow('NGV Concierge 3.0'));
        console.log(colors.bold.yellow('================='));

        if( config.description ) {
            console.log(colors.bold.grey(config.description));
        }

        console.log('');
    }

    function taskComparator(a, b) {
        var result = (a.prio || 0) - (b.prio || 0);

        if( result == 0 ) {
            result = a.fullName < b.fullName ? -1 : (a.fullName > b.fullName ? 1 : 0);
        }

        return result;
    }

    function printTaskList() {
        var argumentHeader = 'Argument';
        var maxTaskNameLength = argumentHeader.length;
        var leftColumnFormat;
        var rightColumnFormat;

        console.log('');
        console.log(
            colors.bold.grey('Usage: ') +
            colors.bold.white('ngv ') +
            colors.bold.blue('<task-name>') +
            colors.bold.green(' [--<arg-name>=<arg-value>, ...]')
        );
        console.log('');

        _.chain(tasks)
            .values()
            .sort(taskComparator)
            .map(function(task) {
                var displayName = joinWithPrefix(task.prefix, task.displayName || task.name);
                var description = task.description || ('The ' + task.fullName + ' task');
                var depsWithSelfTask = getDepsWithSelfTask(task);
                var taskChain;

                if( depsWithSelfTask.length > 1 ) {
                    taskChain = _.chain(depsWithSelfTask)
                        .map(function(it) {
                            return _.isArray(it) ? ('(' + it.join(', ') + ')') : it;
                        })
                        .join(' -> ')
                        .value();
                } else {
                    taskChain = '';
                }

                return {
                    displayName: displayName,
                    description: description,
                    taskChain  : taskChain
                };
            })
            .each(function(it) {
                if( it.displayName.length > maxTaskNameLength ) {
                    maxTaskNameLength = it.displayName.length;
                }
            })
            .tap(function() {
                leftColumnFormat = '%' + (maxTaskNameLength + 1) + 's';
                rightColumnFormat = ' %-50s %s';

                console.log(sprintf(leftColumnFormat + rightColumnFormat, 'Task', 'Description', 'Task chain'));
                console.log(sprintf(leftColumnFormat + rightColumnFormat, '----', '-----------', '----------'));
            })
            .map(function(it) {
                var displayName = sprintf(leftColumnFormat, it.displayName);

                var colonCount = displayName.split(':').length - 1;
                var displayColors = [
                    colors.bold.red,
                    colors.bold.blue,
                    colors.blue,
                    colors.grey
                ];

                if( displayColors[colonCount] ) {
                    displayName = displayColors[colonCount](displayName);
                }

                return displayName + sprintf(rightColumnFormat, it.description, it.taskChain);
            })
            .join('\n')
            .tap(function(tasks) {
                console.log(tasks);
                console.log('');
            })
            .value();

        if( config.arguments ) {
            _.chain(config.arguments)
                .tap(function() {
                    console.log(sprintf(leftColumnFormat + rightColumnFormat, argumentHeader, 'Description', 'Possible values'));
                    console.log(sprintf(leftColumnFormat + rightColumnFormat, '--------', '-----------', '---------------'));
                })
                .values()
                .map(function(it) {
                    var displayName = sprintf(leftColumnFormat, it.name);
                    displayName = colors.bold.green(displayName);

                    var possibleValues = (it.values || []).join(', ');

                    return displayName + sprintf(rightColumnFormat, it.description, possibleValues);
                })
                .join('\n')
                .tap(function(args) {
                    console.log(args);
                    console.log('');
                })
                .value();
        }
    }

    function joinWithPrefix(prefix, name) {
        prefix = prefix ? (prefix + ':') : '';
        return prefix + name;
    }

    function getDepsWithSelfTask(task) {
        var deps = task.deps ? _.clone(task.deps) : [];
        var selfTaskIndex = _.indexOf(deps, '_');

        if( selfTaskIndex < 0 ) {
            deps.push('_');
        }

        return deps;
    }

    function getTaskDeps(task) {
        var deps = getDepsWithSelfTask(task);

        var atomTaskName = getAtomTaskName(task);
        var selfTaskIndex = _.indexOf(deps, '_');

        deps[selfTaskIndex] = atomTaskName;

        return deps;
    }

    function getAtomTaskName(task) {
        var atomTaskName = task.fullName + '::atom';
        return atomTaskName;
    }

    function registerAtomTask(task) {
        var atomTaskName = getAtomTaskName(task);
        var atomTaskFunction = task.task || emptyTask;
        gulp.task(atomTaskName, [], atomTaskFunction);
    }

    function registerTask(task) {
        registerAtomTask(task);

        var name = task.fullName;
        var deps = getTaskDeps(task);
        var taskFunction;

        if( deps.length != 2 ) {
            taskFunction = function(cb) {
                var args = deps.concat([cb]);
                console.log('Executing task dependencies of [' + name + ']');
                gulpSequence.apply(this, args);
            };

            gulp.task(name, taskFunction);
        } else {
            var atomDep;

            if( Array.isArray(deps[0]) ) {
                atomDep = deps[1];
                deps = deps[0];
            } else if(Array.isArray(deps[1])) {
                atomDep = deps[0];
                deps = deps[1];
            } else if(deps[0].indexOf('::atom') >= 0 ) {
                atomDep = deps[0];
                deps = [deps[1]];
            } else {
                atomDep = deps[1];
                deps = [deps[0]];
            }

            taskFunction = function(cb) {
                var args = [atomDep].concat([cb]);
                console.log('Task dependencies executed before [' + name + ']');
                gulpSequence.apply(this, args);
            };

            gulp.task(name, deps, taskFunction);
        }
    }

    function registerAllTasks() {
        _.chain(tasks)
            .each(function(task) {
                registerTask(task);
            })
            .value();
    }

    self.addTask = function(task, taskExtension) {
        ensureNotBootstrapped();

        task = _.extend(taskExtension, task);

        task.fullName = joinWithPrefix(task.prefix, task.name);

        if( tasks[task.fullName] ) {
            throw new Error('Task already registred!');
        }

        tasks[task.fullName] = task;
    };

    self.addTasksFromPath = function(patterns, taskExtension) {
        ensureNotBootstrapped();

        if( !_.isArray(patterns) ) {
            patterns = [patterns];
        }

        _.chain(patterns)
            .map(function(pattern) {
                return glob.sync(pattern);
            })
            .thru(_.flatten)
            .uniq()
            .map(function(filename) {
                var task = require(filename)(gulp, self);
                task.name = task.name || path.win32.basename(filename, path.extname(filename));
                return task;
            })
            .each(function(it) {
                self.addTask(it, taskExtension);
            })
            .value();
    };

    self.addTasksFromDir = function(dirname, taskExtension) {
        ensureNotBootstrapped();

        taskExtension = taskExtension || {};
        var pattern = path.join(dirname, '**/*.js');

        _.chain(glob.sync(pattern))
            .each(function(filename) {
                var relativePath = path.relative(dirname, filename);
                var prefix = path.parse(relativePath).dir.replace(path.sep, ':');

                var extension = _.extend({}, taskExtension, {
                    prefix: joinWithPrefix(taskExtension.prefix, prefix)
                });

                self.addTasksFromPath(filename, extension);
            })
            .value();
    };

    var argv = require('yargs').argv;
    var metadata = {};

    for( var i in config.arguments ) {
        var key = config.arguments[i].name;
        metadata[key] = argv[key];
    }

    self.getMetaData = function() {
        return metadata;
    };
}

module.exports = {
    Concierge: Concierge
};
