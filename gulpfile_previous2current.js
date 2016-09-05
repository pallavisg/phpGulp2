var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var args = require('yargs').argv;
var config = require('./gulp.config');
var util = require('util');

var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var htmlhint = require('gulp-htmlhint');

var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');




//GULP-RIMRAF
gulp.task('rimraf-it', function() {
  return gulp.src(config.rimraf2clean , { read: false }) 
    .pipe(ignore('node_modules/**'))
    .pipe(rimraf());
});


//PHPUnit
gulp.task('phpunit', ['rimraf-it'],function() {
    gulp.src('phpunit.xml')
      .pipe($.phpunit('', {notify: true}));
  });

//PHP-CodeSniffer
gulp.task('checkstyle', function () {    
 return gulp.src(config.configphp)
        .pipe($.phpcs({bin: 'vendor/bin/phpcs', standard: 'PSR2', warningSeverity: 0}))
        .pipe($.phpcs.reporter('log'));
});


//SonarQube
gulp.task('sonar', function () {       
    return gulp.src(config.configphp)
       .pipe($.sonar(config.options))
       .on('error', util.log);
});



//JSHint 
gulp.task('jshint', function() {
   
    return gulp.src(config.configjs)
           .pipe($.if(args.verbose, $.print()))
           .pipe($.jshint())
           .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
           .pipe($.jshint.reporter('fail'));
});

//CSSLint
gulp.task('csslint', function() {
  return gulp.src(config.configcss)
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});

//GULP-CONCAT
gulp.task('concat', function() {
      return gulp.src(config.concatsrc)
    .pipe($.concat({ path: 'new.php', stat: { mode: 777 }}))
    .pipe(gulp.dest('./concat/'));
});


//HTMLHint
gulp.task('htmlhint', function () {
    return gulp.src(config.confightml)
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter())
});

//.pipe(htmlhint.reporter());

//Gulp-Uglify

gulp.task('uglify', function() {
  return gulp.src(config.configjs)
    .pipe(uglify())
    .pipe(gulp.dest(config.uglify_dest));
});


//GULP-MINIFY-HTML

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src(config.confightml)
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest(config.minifyHTML_dest));
});


//GULP-MINIFY-CSS
 
gulp.task('minify-css', function() {
  return gulp.src(config.configcss)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.minifyCSS_dest));
});

gulp.task( 'default',['rimraf-it','phpunit','checkstyle', 'sonar', 'jshint', 'csslint','concat','htmlhint','uglify','minify-html','minify-css']);





//PHP Copy-paste detector
gulp.task('cpd', function () {
    return gulp.src(config.configphp)
        .pipe($.phpcpd({bin: './vendor/bin/phpcpd', minLines: 20 , minTokens: 100 , verbose: true, reportFile: './phpcpd.xml'}));
});


//PHPSpec 
gulp.task('phpspec', function() {
    var options = {debug: false};
    var notification = {notify: true};
    var display = {verbose: 2};
    return gulp.src(config.configphp)
    .pipe($.phpspec('./vendor/phpspec/ run',options,notification,display));
});






