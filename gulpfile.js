var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/jade/*.jade", ['jade']);
    gulp.watch("dist/js/**/*.js", ['js']);
    gulp.watch("dist/.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass({
            pretty: true
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('jade', function() {
    return gulp.src("app/jade/*.jade")
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("dist/js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);