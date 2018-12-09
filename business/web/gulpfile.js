'use strict';

var gulp = require('gulp'),

    ejs = require('gulp-ejs'), // ejs编译
    minifycss = require('gulp-minify-css'), // css压缩
    csso = require('gulp-csso'), // css去重

    jshint = require('gulp-jshint'), // js检测
    uglify = require('gulp-uglify'), // js压缩

    imagemin = require('gulp-imagemin'), // 图片压缩
    pngquant = require('imagemin-pngquant'),
    merge = require('merge-stream'), // 图片合并
    spritesmith = require('gulp.spritesmith'), // 雪碧图

    rename = require('gulp-rename'), // 改名
    replace = require('gulp-replace'), // 文件内容替换
    concat = require('gulp-concat'), // 文件合并
    del = require('del'), // 删除文件
    notify = require('gulp-notify'); // 提示
var paths = {
    srcTpls: 'src/tpls/',
    srcViews: 'src/views/',
    srcCSS: 'src/css/',
    srcJS: 'src/js/',
    srcIMG: 'src/img/',
    srcLibs: 'src/libs/',

    buildViews: 'build/views/',
    buildCSS: 'build/css/',
    buildJS: 'build/js/',
    buildIMG: 'build/img/',
    buildLibs: 'build/libs/'
};

// ejs 编译
gulp.task('ejs', function() {
    return gulp.src(paths.srcTpls + '*.html')
        .pipe(ejs())
        .pipe(gulp.dest(paths.srcViews));
});

// 替换html里资源地址
gulp.task('rhtml', ['ejs'], function() {
    gulp.src(paths.srcViews + '*.html')
        .pipe(replace(/(css|js)(.*)\/([A-Za-z_\-\.]+).(css|js)/g, '$1$2/$3.min.$4'))
        .pipe(gulp.dest(paths.buildViews));
});

// css压缩、重命名
gulp.task('css', function() {
    return gulp.src(paths.srcCSS + '*.css')
        .pipe(minifycss({
            compatibility: 'ie6'
        }))
        .pipe(rename({
            suffix: '.min'
        }))

    .pipe(gulp.dest(paths.buildCSS));
});

// js检测、压缩
gulp.task('js', function() {
    return gulp.src(paths.srcJS + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))

    .pipe(gulp.dest(paths.buildJS));
});

// 压缩图片
gulp.task('img', function() {
    return gulp.src(paths.srcIMG + '**')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant({
                quality: 80
            })]
        }))
        .pipe(gulp.dest(paths.buildIMG));
});

// 图片合并
gulp.task('sprite', function() {
    var spriteData = gulp.src(paths.srcIMG + 'icon/*.png').pipe(spritesmith({
        'imgName': 'icon.png',
        // 'retinaSrcFilter': [paths.srcIMG + 'icon/*@2x.png'],
        // 'retinaImgName': 'icon@2x.png',
        'cssName': 'icon.css',
        'imgPath': "../img/icon.png",
        'cssOpts': {
            'cssSelector': function(item) {
                return '.ico-' + item.name;
            }
        }
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest(paths.srcIMG));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest(paths.srcCSS+'concat/'));

    return merge(imgStream, cssStream);
});

// 合并icon.css和common.css
gulp.task('icon', ['sprite'], function() {
    return gulp.src([paths.srcCSS + 'concat/icon.css',
                paths.srcCSS + 'concat/common.css'])
        .pipe(concat('common.css'))
        .pipe(gulp.dest(paths.srcCSS));
});

// 复制库资源文件
gulp.task('copy', function() {
    return gulp.src(paths.srcLibs + '**')
        .pipe(gulp.dest(paths.buildLibs));
});

// 复制图片，要求不压缩
gulp.task('copy:img', function() {
    return gulp.src(paths.srcIMG + '**')
        .pipe(gulp.dest(paths.buildIMG));
});

// 清空发布目录
gulp.task('clean', function() {
    del.sync([paths.buildViews, paths.buildCSS, paths.buildJS, paths.buildIMG, paths.buildLibs]);
});

// build
gulp.task('build', ['clean'], function(){
    gulp.start('on:build');
});

// on:build
gulp.task('on:build', ['css', 'js', 'copy:img', 'copy', 'rhtml']);

// watch
gulp.task('watch', function() {
    gulp.watch(paths.srcCSS + 'concat/*.css', ['icon']);
    gulp.watch(paths.srcIMG + '*.{png,gif,jpg}', ['sprite']);
    gulp.watch(paths.srcTpls + '*.html', ['ejs']);
});
