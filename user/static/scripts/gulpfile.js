var
	fs 	 		= require('fs'),
	path 		= require('path'),
	gulp 		= require('gulp'),
	deploy      = require('./gulp_deploy');
/*
* 任务集
*/

gulp.task('help',function(){
	console.log('使用方法:');
	console.log("\tgulp 参数");
	console.log('参数说明:');
	console.log("\tpc		批量合并压缩编译pc文件夹");
	console.log("\tmobile		批量合并压缩编译mobile文件夹");
	console.log("\t无参数		监听文件变化，合并且压缩，上线模式");
	console.log("\tdebug		监听文件变化，合并不压缩，开发模式");
})

//任务
gulp.task('default',function(){
	gulp.watch(['pc/*.js','!pc/*.min.js','mobile/*.js','!mobile/*.min.js','!pc/app.js','!mobile/app.js'],function(event){
		console.log("\t watching task default");
		deploy(process.execPath,__filename,'-m',path.relative(__dirname,event.path));
	})

	gulp.watch(['pc/app.js','mobile/app.js'],function(event){
		deploy(process.execPath,__filename,'-mp',path.relative(__dirname,event.path));
	})
})
gulp.task('debug',function(){
	gulp.watch(['pc/*.js','!pc/*.min.js','mobile/*.js','!mobile/*.min.js','!pc/app.js','!mobile/app.js'],function(event){
		console.log("watching task debug 1");
		deploy(process.execPath,__filename,'-md',path.relative(__dirname,event.path));
	})

	gulp.watch(['pc/app.js','mobile/app.js'],function(event){
		console.log(event.path);
		if(event.path.indexOf('pc/app.js')>=0){
			gulp.run('pc');
		}else{
			gulp.run('mobile');
		}
	})

	gulp.watch(['modules/*.js'],function(event){
		console.log("watching task debug 3");
		var
		pcpath = './pc/',
		mobilepath = './mobile/',
		pkgIdJs = path.relative(__dirname,event.path);
		pkgId = './'+pkgIdJs.replace('.js','');

		fs.readdir(pcpath,function(err,files){
			for(var i = 0 ; i < files.length ; i++){
				if(files[i].indexOf('.min') < 0 ){
					var content = fs.readFileSync(pcpath+files[i],'utf-8');
					if(content.indexOf(pkgId) >= 0){
						deploy(process.execPath,__filename,'-md',pcpath+files[i]);
					}
				}
			}
		})

		fs.readdir(mobilepath,function(err,files){
			for(var i = 0 ; i < files.length ; i++){
				if(files[i].indexOf('.min') < 0 ){
					var content = fs.readFileSync(mobilepath+files[i],'utf-8');
					if(content.indexOf(pkgId) >= 0){
						deploy(process.execPath,__filename,'-md',mobilepath+files[i]);
					}
				}
			}
		})

	})
})


gulp.task('pc',function(){
	console.log("watching task pc");
	deploy(process.execPath,__filename,'-mp','pc/');
})

gulp.task('mobile',function(){
	console.log("watching task mobile");
	deploy(process.execPath,__filename,'-mp','mobile/');
})




