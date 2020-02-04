// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const minifyInline = require("gulp-minify-inline");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass');

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// clean assets
function clean() {
    return del(["./css/", "./js/", "./img/", "./fonts/", "./*.html"])
}

// html
function html() {
    return gulp
        .src("./src/**/*.html")
        .pipe(plumber())
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(minifyInline())
        .pipe(gulp.dest("./"))
        .pipe(browsersync.stream());
}

// optimize images
function images() {
    return gulp
        .src("./src/img/**/*")
        .pipe(newer("./img"))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true}),
                imagemin.mozjpeg({ progressive: true}),
                imagemin.optipng({ optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })

            ])
        )
        .pipe(gulp.dest("./img"));
}

// css task
function css() {
    return gulp
        .src("./src/css/**/*.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded"}))
        .pipe(gulp.dest("./css"))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./css"))
        .pipe(browsersync.stream());
}

// transpile, concatenate & minify scripts
function scripts() {
    return gulp
        .src("./src/js/**/*.js")
        .pipe(plumber())
        .pipe(gulp.dest("./js"))
        .pipe(uglify())
        .pipe(gulp.dest("./js"))
        .pipe(browsersync.stream());
}

// copy fonts
function fonts() {
    return gulp
        .src("./src/fonts/**/*.woff2", "./src/fonts/**/*.woff", "./src/fonts/**/*.tff")
        .pipe(gulp.dest("./fonts"))
        .pipe(browsersync.stream());
}

// watch files
function watchFiles() {
    gulp.watch("./src/*.html", html);
    gulp.watch("./src/css/**/*", css);
    gulp.watch("./src/js/**/*", scripts);
    gulp.watch("./src/img/**/*", images);
    gulp.watch("./src/fonts/**/*", fonts);
}

// complex tasks
const js = scripts;
const build = gulp.series(clean, gulp.parallel(html, css, images, js, fonts));
const watch = gulp.parallel(watchFiles, browserSync);

// exports
exports.html = html;
exports.images = images;
exports.css = css;
exports.js = js;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.dev = watch;
exports.default = watch; 
