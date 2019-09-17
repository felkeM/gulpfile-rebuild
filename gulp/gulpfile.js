// --------------------------------------------------
// Load Plugins
// --------------------------------------------------

const gulp           = require('gulp'),
      sass           = require('gulp-sass'),
      autoprefixer   = require('gulp-autoprefixer'),
      minifycss      = require('gulp-clean-css'),
      uglify         = require('gulp-uglify'),
      pipeline       = require('readable-stream').pipeline,
      imagemin       = require('gulp-imagemin'),
      notify         = require('gulp-notify'),
      concat         = require('gulp-concat'),
      sourcemaps     = require('gulp-sourcemaps');

// --------------------------------------------------
// General Config
// --------------------------------------------------

const config = {
    // main scss files that import partials
    scssSrc: '../assets/scss/*.scss',
    // all scss files in the scss directory
    allScss: '../assets/scss/**/*.scss',
    // the destination directory for our css
    cssDest: '../assets/css/',
    // all js files the js directory
    allJs: '../assets/js/**/*.js',
    // the destination directory for the js directory
    jsDist: '../assets/dist/js/',
    // all img files in the img directory
    allImgs: '../assets/img/**/*',
    // the destination directory for all img files
    imgsDist: '../assets/dist/img/',
    // the destination directory for our maps
    cssMap: '../maps'
};

function imageBuild () {
    return gulp.src(config.allImgs)
        .pipe(imagemin())
        .pipe(gulp.dest(config.imgsDist))
        .pipe(notify({
            message: 'Image task has been completed.', onLast: true
        }));
}

function jsBuild () {
    return pipeline(
        gulp.src('../assets/dist/js/*.js'),
        uglify(),
        gulp.dest('../assets/dist/js/')  
    )
    .pipe(notify({
        message: 'JS task has been completed.', onLast: true
    }));
}

function jsConcat () {
    return gulp.src(['../assets/js/adroll.js', '../assets/js/app.js', '../assets/js/gmu.js', '../assets/js/panel-mobile-nav.js', '../assets/js/videopopup.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.jsDist))
    .pipe(notify({
        message: 'JS task has been completed.', onLast: true
    }));  
}

function sassBuild () {
    return gulp.src(config.scssSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifycss())
    .pipe(sourcemaps.write(config.cssMap))
    .pipe(gulp.dest(config.cssDest))
    .pipe(notify({
      message: 'SCSS to CSS task has been completed.', onLast: true
     }));
}

function watchBuild () {
    gulp.watch(config.scssSrc, sassBuild);
    gulp.watch(config.allJs, jsBuild);
    gulp.watch(config.allImgs, imageBuild);
}

exports.sassBuild    = sassBuild;
exports.jsBuild      = gulp.series(jsConcat, jsBuild);
exports.imageBuild   = imageBuild;
exports.default      = gulp.series(sassBuild, imageBuild, watchBuild);
