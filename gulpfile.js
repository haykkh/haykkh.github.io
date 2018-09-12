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
    srcJS: 'src/**/*.js',
    srcCSS: 'src/**/*.scss',
    srcTTF: 'src/**/*.ttf',
    srcWOFF: 'src/**/*.woff',
    srcWOFF2: 'src/**/*.woff2',
    srcIMG: 'src/img/*',

    tmp: 'tmp',
    tmpIndex: 'tmp/index.html',
    tmpJS: 'tmp/**/*.js',
    tmpCSS: 'tmp/**/*.css',
    tmpTTF: 'tmp/**/*.ttf',
    tmpWOFF: 'tmp/**/*.woff',    
    tmpWOFF2: 'tmp/**/*.woff2',
    tmpIMG: 'tmp/img/',
    
    dist: '',
    distIndex: 'index.html',
    distJS: 'js/**/*.js',
    distCSS: 'css/**/*.css',
    distTTF: 'fonts/**/*.ttf',
    distWOFF: 'fonts/**/*.woff',
    distWOFF2: 'fonts/**/*.woff2',
    distIMG: 'img/'
  };

gulp.task('html', function() {
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('js', function() {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
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
gulp.task('woff2', function(){
    return gulp.src(paths.srcWOFF2).pipe(gulp.dest(paths.tmp))
});
gulp.task('img', function(){
    return gulp.src(paths.srcIMG).pipe(imagemin()).pipe(gulp.dest(paths.tmpIMG));
});

gulp.task('copy', ['html', 'css', 'ttf', 'woff', 'woff2', 'img', 'js']);

gulp.task('inject', ['copy'], function() {
    var css = gulp.src(paths.tmpCSS);
    var js = gulp.src(paths.tmpJS);
    return gulp.src(paths.tmpIndex)
        .pipe(inject( css, {relative:true}))
        .pipe(inject( js, {relative:true}))
        .pipe(gulp.dest(paths.tmp));
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

gulp.task('js:dist', function() {
    return gulp.src(paths.srcJS)
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('css:dist', function() {
    return gulp.src(paths.srcCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('ttf:dist', function(){
    return gulp.src(paths.srcTTF).pipe(gulp.dest(paths.dist));
});

gulp.task('woff:dist', function(){
    return gulp.src(paths.srcWOFF).pipe(gulp.dest(paths.dist));
});

gulp.task('woff2:dist', function(){
    return gulp.src(paths.srcWOFF2).pipe(gulp.dest(paths.dist));
});
gulp.task('img:dist', function(){
    return gulp.src(paths.srcIMG).pipe(imagemin()).pipe(gulp.dest(paths.distIMG));
});


gulp.task('copy:dist', ['html:dist', 'css:dist', 'ttf:dist', 'woff:dist', 'woff2:dist', 'img:dist', 'js:dist']);

gulp.task('inject:dist', ['copy:dist'], function() {
    var css = gulp.src(paths.distCSS);
    var js = gulp.src(paths.distJS);
    return gulp.src(paths.distIndex)
        .pipe(inject( css, {relative:true}))
        .pipe(inject( js, {relative:true}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);

gulp.task('clean', function() {
    del(paths.tmp);
});

gulp.task('default', ['watch']);