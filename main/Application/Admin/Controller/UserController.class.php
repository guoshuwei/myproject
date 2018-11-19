<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class UserController extends CommonController{
    
    public function index(){

    }

    public function permission(){
        //a user has a set of permissions
        return $this->hasOne('CodeCourse\User\UserPermission','user_id');
    }

    public function hasPermission($permission){
    	return (bool) $this->permissions->{$permission};
    }

    public function isAdmin(){
    	return $this->hasPermission('is_admin');
    }

    public function register(){
    	$user->permission()->create(UserPermission::$defaults);
    }

}

class filter{
	$admin = function() use ($app){
		return function() use (){
			if(!$app->auth || !$app->auth->isAdmin()){
				$app->redirect($app->urlFor('home'));
			}
		}
	}
}

$app->get('/admin/example',$admin(),function() use ($app){
	$app->render('admin/example.php');
})->name('admin.example');


//得到controllers下面的function list
//