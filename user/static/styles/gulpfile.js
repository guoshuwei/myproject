var
	fs 	 		= require('fs'),
	path 		= require('path'),
	gulp 		= require('gulp'),
	minimist	= require('minimist'),
	sass  		= require('gulp-sass'),
	cssmin		= require('gulp-minify-css');

var
arg = {
	string:'env',
	default:{env:process.env.NODE_ENV || ''}
},

options = minimist(process.argv.slice(2), arg),

mkdirsSync = function(dirpath, mode){
    if(fs.existsSync(dirpath)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirpath), mode)){
            fs.mkdirSync(dirpath, mode);
            return true;
        }
    }
},

mkfiles = function(dirpath,fileName,fileText){
	mkdirsSync(dirpath);

	fs.writeFile(dirpath+ '/' + fileName, fileText, {flag: 'a'}, function (err) {
		if(err) {
			console.error(err);
		} else {
			console.log('\n[log::task::cssinit]\n : 生成文件 =>' + dirpath+ '/' + fileName);
		}
	});
},

aliceReadmeText = function(modeName){
	var readmine = [];
	readmine.push('\n\n');
	readmine.push('# '+modeName);
	readmine.push('\n\n');
    readmine.push('------------------------------------------------------------------');
    readmine.push('\n\n');
    readmine.push('功能描述：由开发进行编辑');
    readmine.push('\n\n');
    readmine.push('------------------------------------------------------------------');
    readmine.push('\n\n\n\n');
    readmine.push('## 演示文档');
    readmine.push('\n\n');
    readmine.push('<link type="text/css" rel="stylesheet" media="screen" href="'+modeName+'.css">');
    readmine.push('\n\n\n\n');
    readmine.push('### 默认用法');
    readmine.push('\n\n');
    readmine.push('html');
    readmine.push('\n\n\n\n');
    readmine.push('html');
	return readmine.join('');
},

alicePackjsonText = function(modeName){
	var json = {
		"Package name" : 'alice-'+modeName,
		"Version": "0.0.0",
		"Description" : modeName+" style",
		"Author" : " < >"
	}
	return JSON.stringify(json)
},

alicePackDemoText = function(modeName){
	var html = [];
	html.push('<!DOCTYPE html>\n');
	html.push('<html>\n');
	html.push('<head>\n');
	html.push('<title>'+modeName+' Demo</title>\n');
    html.push('<link rel="stylesheet" href="'+modeName+'.css" />\n');
    html.push('<script type="text/javascript" src="/scripts/lib/jquery.1.8.3.js"></script>\n');
	html.push('</head>\n');
	html.push('<body>\n\n');
	html.push('</body>\n');
	html.push('</html>');
	return html.join('');
};
/*
* 任务集
*/

gulp.task('help',function(){
	console.log('使用方法:');
	console.log("\tgulp");
	console.log("\tgulp cssinit --env modName");
	console.log('参数说明:');
	console.log("\t无参数				自动编译Sass");
	console.log("\tcssinit --env modeName		初始化一个模块");
})
//编译Sass
gulp.task('css',function(){
	gulp.src('./src/**/*.scss')
		.pipe(sass())
		.pipe(cssmin({compatibility: 'ie7'}))
		.pipe(gulp.dest('./dest'));
})

//任务 监听 : Sass | Javascript , Mock | 编译
gulp.task('default',function(){
	gulp.watch('src/**/*.scss',function(){
		gulp.run('css');
	})
	gulp.watch('alice_modules/**/*.scss',function(){
		gulp.run('css');
	})
})
//任务 css mod初始化结构
gulp.task('cssinit',function(){
	var modeName = options.env;
	var alicePath = './alice_modules/';
	var dirpath = alicePath + modeName;
	if(fs.existsSync(dirpath)){
		console.log('\n[Error log::task::cssinit]\n : Alice modules \''+ modeName + '\' is had!');
		return;
	}
	console.log('\n[log::task::cssinit]\n : 初始化Alice modules =>' + modeName);
	mkfiles(alicePath + modeName,'README.md',aliceReadmeText(modeName));
	mkfiles(alicePath + modeName,'HISTORY.md','');
	mkfiles(alicePath + modeName,'package.json',alicePackjsonText(modeName));
	mkfiles(alicePath + modeName,modeName+'.css','/*\n* '+modeName+'\n*/');
	mkfiles(alicePath + modeName,'demo.html',alicePackDemoText(modeName));

})

