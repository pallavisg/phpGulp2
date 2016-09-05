module.exports = function() {

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
            projectKey: 'sonar:gulp-sonar-runner:1.0.0',
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
 return options;
};

