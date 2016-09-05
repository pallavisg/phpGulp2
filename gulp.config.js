     var configphp = ['./**/*.php', '!vendor/**/*.*', '!node_modules/**/*.*','!uglifyjs/**/*.*','!minifyHTML/**/*.*','!concat/**/*.*','!coverage/**/*.*'];
     var configcss = ['./**/*.css', '!vendor/**/*.*', '!node_modules/**/*.*','!uglifyjs/**/*.*','!minifyHTML/**/*.*','!concat/**/*.*'];
     var configjs =  ['./**/*.js' , '!vendor/**/*.*', '!node_modules/**/*.*','!uglifyjs/**/*.*','!minifyHTML/**/*.*','!concat/**/*.*','!coverage/**/*.*'];
     var concatsrc = 'src/**/*.php';
     var rimraf2clean = ['coverage','Reports','uglifyjs/*','concat/*'];
     var confightml = ['./**/*.html', '!vendor/**/*.*', '!node_modules/**/*.*','!uglifyjs/**/*.*','!minifyHTML/**/*.*','!concat/**/*.*'];
     var uglify_dest = 'uglifyjs/';
     var minifyHTML_dest = 'minifyHTML/';
     var minifyCSS_dest = 'minifyCSS/';

module.exports.configphp = configphp;
module.exports.configcss = configcss;
module.exports.configjs = configjs;
module.exports.concatsrc = concatsrc;
module.exports.rimraf2clean = rimraf2clean;
module.exports.confightml = confightml;
module.exports.uglify_dest = uglify_dest;
module.exports.minifyHTML_dest = minifyHTML_dest;
module.exports.minifyCSS_dest = minifyCSS_dest;


//sonar configurations
var options = {
        sonar: {
            host: {
                url: 'http://172.27.59.62:9080'
            },
            jdbc: {
                url: 'jdbc:mysql://172.27.59.62:3306/sonar',
                username: 'sonar',
                password: 'sonar'
            },
            projectKey: 'sonar:gulp-sonar-runner:3.0.0',
            projectName: 'Pallavi-gulp',
            projectVersion: '1.0.0',
            // comma-delimited string of source directories 
            sources: 'src',
            language: 'php',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: './sonar_report/lcov.info'
                }
            }
        }
};

module.exports.options = options;
