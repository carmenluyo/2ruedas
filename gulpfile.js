// npm install -g gulp
// npm install --save-dev

var gulp        = require('gulp'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps'),
    sass        = require('gulp-sass'),
    changed     = require('gulp-changed'),
    imagemin    = require('gulp-imagemin'),
    critical    = require('critical'),
    babel       = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;
    
/*
critical.generate({
    inline: true,
    base: './',
    src: 'index.html',
    dest: 'index.html',
    extract: false,
    minify: true,
    width: 1300,
    height: 600
});
*/

// Sass
gulp.task('sass', function(){
    var scssFiles = ['./scss/*.scss'];
    gulp.src(scssFiles)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix("last 5 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('.', {includeContent: false, debug: true}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});


gulp.task('javascript', function() {
  var scriptsFiles = ['./scripts/plugins/jquery-1.9.1.js',
      './scripts/plugins/jquery.lazy.js',
      './scripts/plugins/select2.js',
      './scripts/pages/page-home.js'];
    gulp.src(scriptsFiles)
        .pipe(concat('main.min.js'))
        .pipe(uglify({compress: true}))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

// Image optmization
gulp.task('images', function() {
    gulp.src(['./images/**/*.+(png|jpg|gif|jpeg)','./images/*.+(png|jpg|gif|jpeg)'])
        .pipe(changed('images'))
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('images'));
});


gulp.task('browser-sync', function() {
    var files = [ './scss/*.scss','./scripts/main.js', './scripts/*.js', './scripts/**/**.js',  './scripts/**/*.js','*.html'];
    browserSync.init(files,{
        notify: false,
        server: {
            baseDir: "./"
        },
        port: 9000
    });
});

gulp.task('watch', ['javascript', 'sass', 'images', 'browser-sync'], function () {
    gulp.watch(['./scripts/**/*.js','./scripts/*.js','./scripts/**/*.js'], ['javascript']);
    gulp.watch(['./scss/*.scss', './scss/**/*.scss'], ['sass']);
    gulp.watch(['./images/**/*.+(png|jpg|gif|jpeg)','./images/*.+(png|jpg|gif|jpeg)'], ['images']);
});

gulp.task('default', ['watch']);
