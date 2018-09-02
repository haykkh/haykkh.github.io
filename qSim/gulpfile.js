var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');


var paths = {
    src: 'src/**/*',
    srcHTML: 'src/**/*.html',
    srcCSS: 'src/**/*.scss',
    srcTTF: 'src/**/*.ttf',
    srcWOFF: 'src/**/*.woff',
    srcIMG: 'src/img/*',

    tmp: 'tmp',
    tmpIndex: 'tmp/index.html',
    tmpCSS: 'tmp/**/*.css',
    tmpTTF: 'tmp/**/*.ttf',
    tmpWOFF: 'tmp/**/*.woff',
    tmpIMG: 'tmp/img/',
    
    dist: '',
    distIndex: 'index.html',
    distCSS: '**/*.css',
    distTTF: '**/*.ttf',
    distWOFF: '**/*.woff',
    distIMG: 'img/'
  };

gulp.task('html', function() {
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('css', function() {
    return gulp.src(paths.srcCSS).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.tmp));
});

gulp.task('ttf', function(){
    return gulp.src(paths.srcTTF).pipe(gulp.dest(paths.tmp));
});

gulp.task('woff', function(){
    return gulp.src(paths.srcWOFF).pipe(gulp.dest(paths.tmp))
});

gulp.task('img', function(){
    return gulp.src(paths.srcIMG).pipe(imagemin()).pipe(gulp.dest(paths.tmp));
});

gulp.task('copy', ['html', 'css', 'ttf', 'woff', 'img']);

gulp.task('inject', ['copy'], function() {
    var css = gulp.src(paths.tmpCSS);
    return gulp.src(paths.tmpIndex).pipe(inject( css, {relative:true})).pipe(gulp.dest(paths.tmp));
});

gulp.task('serve', ['inject'], function() {
    return gulp.src(paths.tmp)
        .pipe(webserver({
            port:3000,
            livereload:true
        }));
});

gulp.task('watch', ['serve'], function() {
    gulp.watch(paths.src, ['inject']);
});

gulp.task('html:dist', function() {
    return gulp.src(paths.srcHTML)
        .pipe(htmlclean())    
        .pipe(gulp.dest(paths.dist));
});

gulp.task('css:dist', function() {
    return gulp.src(paths.srcCSS)
        .pipe(concat('style.min.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('ttf:dist', function(){
    return gulp.src(paths.srcTTF).pipe(gulp.dest(paths.dist));
});

gulp.task('woff:dist', function(){
    return gulp.src(paths.srcWOFF).pipe(gulp.dest(paths.dist))
});

gulp.task('img:dist', function(){
    return gulp.src(paths.srcIMG).pipe(imagemin()).pipe(gulp.dest(paths.distIMG));
});


gulp.task('copy:dist', ['html:dist', 'css:dist', 'ttf:dist', 'woff:dist', 'img:dist']);

gulp.task('inject:dist', ['copy:dist'], function() {
    var css = gulp.src(paths.distCSS);
    return gulp.src(paths.distIndex)
        .pipe(inject( css, {relative:true})).pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);

gulp.task('clean', function() {
    del(paths.tmp);
});

gulp.task('default', ['watch']);