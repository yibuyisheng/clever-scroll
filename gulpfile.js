var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('dist', function() {
    return gulp.src([
            './bower_components/web-ui/static/js/utils/base.js',
            './bower_components/web-ui/static/js/utils/arrayHelper.js',
            './bower_components/web-ui/static/js/event/eventDealer.js',
            './index.js'
        ])
        .pipe(concat('cleverScroll.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});