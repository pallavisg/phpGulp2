# phpGulp2

#pre-requisite - composer installation on machine
@install php 
->yum groupinstall -y 'Web Server' 'MySQL Database' 'PHP Support'
->yum install -y php-mysql
->service httpd start
->php --version

@install composer
 curl -sS https://getcomposer.org/installer | php
 
 
 #gulp task for composer
 https://www.npmjs.com/package/gulp-composer
 -> npm i gulp-composer --save-dev(downloads and installs the packages of gulp-composer)
 -> adding following will not only execute your composer task of gulp-file but will instal composer in your machine if it's not available
 
 //GULP-COMPOSER
 var composer = require("gulp-composer"); [not required after the gulp-composer enterspackage.json post "npm i gulp-composer --save-dev"]
 gulp.task('composer', function () {
    $.composer('require "squizlabs/php_codesniffer=*"', {});
    $.composer('require `"neuralys/sonar-runner": "^2.4"`', {});
    $.composer('require "theseer/phpdox=*"', {});
    $.composer('require "sebastian/phpcpd=*"', {});
    $.composer('require "phpunit/phpunit=*"', {});
    $.composer(); //default install
    $.composer('dumpautoload', {optimize: true});

});





Commands for CI execution
->npm install 
->npm install -g gulp
->gulp composer
->gulp ci
