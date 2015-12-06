var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    concatCss   = require('gulp-concat-css'),
    notify      = require('gulp-notify'),
    concat      = require('gulp-concat'),
    rename      = require("gulp-rename"),
    minifyCSS   = require('gulp-minify-css'),
    spritesmith = require('gulp.spritesmith');

gulp.task('concat', function () {
    gulp.src('app/scss/css/**/*.css')
        .pipe(concatCss("common.css"))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream())
        .pipe(notify("Watch Complete!"));
});


gulp.task('sprite', function () {
    var spriteData = gulp.src('app/scss/css/images/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('dist/images/sprites/'));
});


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch('app/scss/css/**/*.css', ['concat']);
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/jade/**/*.jade", ['jade']);
    gulp.watch("dist/js/**/*.js", ['js']);
    gulp.watch("dist/.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass({
            pretty: true
        }))
        .pipe(gulp.dest("app/scss/css"))
        .pipe(browserSync.stream())
        .pipe(notify("Sass Complete!"));
});

gulp.task('jade', function() {
    return gulp.src("app/jade/*.jade")
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream())
        .pipe(notify("Jade Complete!"));
});

gulp.task('js', function() {
    return gulp.src("dist/js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream())
        .pipe(notify("JS Complete!"));
});


gulp.task('default', ['serve']);