var gulp = require('gulp');
var config = require('./gulp.config');
var util = require('util');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy:true});

var ignore = require('gulp-ignore');
var uglify = require('gulp-uglifyjs');



//GULP-RIMRAF
gulp.task('rimraf-it', function() {
  return gulp.src(config.rimraf2clean , { read: false }) 
    .pipe(ignore('node_modules/**'))
    .pipe($.rimraf());
});



//GULP-COMPOSER
gulp.task('composer', function () {
    $.composer('require "squizlabs/php_codesniffer=*"', {});
    $.composer('require `"neuralys/sonar-runner": "^2.4"`', {});
    $.composer('require "theseer/phpdox=*"', {});
    $.composer('require "sebastian/phpcpd=*"', {});
    $.composer('require "phpunit/phpunit=*"', {});
    $.composer(); //default install
    $.composer('dumpautoload', {optimize: true});
    
});


//GULP-BOWER 

gulp.task('bower', function() {
  return $.bower()
});


gulp.task('dev', ['rimraf-it','bower','composer']);



//PHPUnit
gulp.task('phpunit',function() {
    gulp.src('phpunit.xml')
      .pipe($.phpunit('', {notify: true}));
  });

//PHP-CodeSniffer
gulp.task('phpcs',function () {    
 return gulp.src(config.configphp)
        .pipe(ignore(config.ignore))
        .pipe($.phpcs({bin: 'vendor/bin/phpcs', standard: 'PSR2', warningSeverity: 0}))
        .pipe($.phpcs.reporter('log'));
});


//SonarQube
gulp.task('sonar',function () {       
    return gulp.src(config.configphp)
       .pipe($.sonar(config.options))
       .on('error', util.log);
});


//PHPDOX
gulp.task('phpdox',function() {
    gulp.src(config.concatsrc)
    .pipe($.phpdox())
    .pipe(gulp.dest('doc/'));
});

//JSHint 
gulp.task('jshint', function() {
   
    return gulp.src(config.configjs)
           .pipe(ignore('bower_components/**'))
           .pipe($.if(args.verbose, $.print()))
           .pipe($.jshint())
           .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
           .pipe($.jshint.reporter());
});

//CSSLint
gulp.task('csslint', function() {
  return gulp.src(config.configcss)
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});

//HTMLHint
gulp.task('htmlhint', function () {
    return gulp.src(config.confightml)
    .pipe($.htmlhint())
    .pipe($.htmlhint.reporter());
});

//.pipe($.htmlhint.failReporter())



//GULP-CONCAT
gulp.task('concat',function() {
      return gulp.src(config.concatsrc)
    .pipe($.concat({ path: 'new.php', stat: { mode: 777 }}))
    .pipe(gulp.dest('concat/'));
});




//GULP-MINIFY-HTML

gulp.task('minify-html',function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src(config.confightml)
    .pipe(ignore('node_modules/**'))
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('minifyHTML_dest/'));
});


//GULP-MINIFY-CSS
 
gulp.task('minify-css',function() {
  return gulp.src(config.configcss)
    .pipe(ignore('node_modules/**'))
    .pipe($.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('minifyCSS_dest/'));
});




gulp.task( 'ci',['phpunit','phpcs','phpdox','jshint','csslint','htmlhint','concat','minify-html','minify-css']);


//working-phpunit,phpcs,jshint,csslint,htmlhint,concat,minify-html,minify-css
//not working-sonar

