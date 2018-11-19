<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class AuthController extends CommonController{
    
    protected $table = 't_permissions_dd';
    
    public static $defaults = [
        'is_admin' => fause,
    ]; 
    public function index(){

    }

    public function permission(){
        //a user has a set of permissions
        
    }

    public function aa(){
        //用户权限
        //有继承关系:
        //管理员有所有权限
        $user->type('超级管理员')->hasAll('roles');
        $user->type('管理员')-> hasSeveal('roles');
        $user->type('CEO')->hasAll('customer');

        $user->type('CEO')->decrease('chief')->hasChiefLevel();
        $user->jicheng('CEO')->
        //组织架构：三层组织架构：
        //ceo - 部门经理 - 程序员
        $user->isCEOo()->

        //左边的菜单是一个资源对象：
        //超级管理员今来可以操作所有菜单
        //商户今来只可以操作商户添加和商品添加;
        $resource = array(
            '1' => '菜单',
            ''
        );
        //操作菜单最终操作的是url ， url变成资源，
        //显示左边菜单: 父级[图片管理]  子级[图片添加,删除,编辑,查看,审核]
        //父子级继承关系：没有操作父级的权限，自己链接也没有权限访问。
        //问题1：以controller 聚合的菜单有没有疏漏;(一个controller对应一个父级菜单项);
        //问题2：我想要某个父级菜单模块下一个子级菜单的权限(显然设计到action);
        






    }

}