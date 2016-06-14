"use strict";
const gulp = require('gulp');
const gutil = require('gulp-util');
const myth = require('gulp-myth');
const runSequence = require('run-sequence');
const webpack = require('webpack');

const WEBPACK_CONFIG = require('./webpack.config.js');

const WEBPACK_STATS_ARGS = {
    colors: true,
    hash: false,
    version: false,
    timings: true,
    assets: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: true,
    errorDetails: false,
    chunkOrigins: false,
    modulesSort: false,
    chunksSort: false,
    assetsSort: false,
};

const PATHS = {
    css: {
        watch: ['assets/css/**/*.css'],
        src: 'assets/css/main.css',
        dest: 'static/css',
    },

    images: {
        watch: ['assets/images/**/*.*'],
        src: 'assets/images/*',
        dest: 'static/images/',
    },

    js: {
        src: {
            watch: ['src/**/*.js', 'src/**/*.jsx'],
        },
    },
};

const srcCompiler = webpack(WEBPACK_CONFIG);

gulp.task('cp:images', function copyFonts(){
    return gulp.src(PATHS.images.src)
        .pipe(gulp.dest(PATHS.images.dest));
});

gulp.task('build:css', function buildCss(){
    return gulp.src(PATHS.css.src)
        .pipe(myth({
            browsers: ['last 1 iOS version', 'last 1 Chrome version'],
        }))
        .pipe(gulp.dest(PATHS.css.dest));
});

gulp.task('build:src', function buildJs(callback){
    srcCompiler.run(function(err, stats){
        if(err) throw new gutil.PluginError("webpack:build:src", err);
        gutil.log("[webpack:build]", stats.toString(WEBPACK_STATS_ARGS));
        callback();
    });
});

gulp.task('watch', function beginWatch(){
    runSequence(['cp:images', 'build:css', 'build:src'],
            function completeWatch(){
        gulp.watch(PATHS.images.watch, ['cp:images']);
        gulp.watch(PATHS.css.watch, ['build:css']);
        gulp.watch(PATHS.js.src.watch, ['build:src']);
        gutil.log('waiting for changes...');
    });
});

gulp.task('build', function beginBuild(){
    runSequence(['cp:images', 'build:css', 'build:src'],
            function completeWatch(){
        gutil.log('finished building!');
    ));
});
