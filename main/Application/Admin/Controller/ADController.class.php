<?php
// 本类由系统自动生成，仅供测试用途
namespace Admin\Controller;
use Think\Controller;
class ADController extends CommonController{
	public function __construct()
	{
		parent::__construct();
	}
	public function admin_role()
	{
		$mrole = M('t_roles_dd');

		$rolelist = $mrole->select();//角色列表

		//角色下的人员列表
		// SELECT tr.name as rname,tr.id,amd.name as user_name FROM _ts_m_cms_manager.think_role tr right join _ts_m_cms_manager.t_admin_manage_dd amd on tr.id = amd.roleid;
		$this->assign('rolelist',$rolelist);
		
		$this->display('admin_role');
	}

	public function admin_menu(){
		$this->display('admin_menu');
	}
	//添加角色
	public function admin_role_add()
	{
		if(!$_POST)
		{
			$this->display('admin_role_add');
		}else{
			// $mrole = M('t_roles_dd');
			$data['role_name'] = I('post.rname');
			$data['description'] = I('post.description');
			$data['created_at'] = time();

        	Vendor('Yar.Client');
        	$yar_client = new \Client('http://192.168.186.143/acl/api/acl.php');
        	$acl = $yar_client->execute('addRole',$data);
        	var_dump($acl);die;
        // var_dump($acl);die;
			//在这里边建立一个rpc远程过程调用
			// var_dump(phpinfo());die;
			
			//$res = TyLib_P2peyeApiSpacecp::getInstance()->getCreditSetting($apidata);
			// $res = $mrole->add($data);
			// if($res){
			// 	$this->success('添加成功!');
			// }else{
			// 	$this->error('添加失败');
			// }
		}
    	
	}
	//添加菜单
	public function admin_menu_add(){
		$mmenu = M('t_menus_dd');
		if(!$_POST)
		{
	        $menulist = $mmenu->select();
	        $this->assign('menulist',$this->seperate_PC_fun());
			$this->display('admin_menu_add');
		}else{
			$data['pid'] = I('post.pname') !== 0 ? I('post.pname') : 0;
			$data['menu_name'] = I('post.menu_name');
			$data['controller'] = I('post.controller');
			$data['action'] = I('post.action');
			$data['dt'] = time();
			$res = $mmenu->add($data);
			if($res){
				$this->success('添加成功!');
			}else{
				$this->error('添加失败');
			}
		}
	}

	public function seperate_PC_fun()
    {
        $tanon = array();
        $mmenu = M('t_menus_dd');
        //查询
        $relalist = $mmenu->order('pid asc')->select();
        $ids_arr = array();
        foreach($relalist as $val)
        {
            $tanon[$val['id']]['id']= $val['id'];
            $tanon[$val['id']]['menu_name']= $val['menu_name'];
            $tanon[$val['id']]['pid']= $val['pid'];
            array_push($ids_arr,$val['id']);
        }
        foreach($relalist as $k => $val)
        {
            if(in_array($val['pid'],$ids_arr))//父级包含
            {
                $tanon[$val['pid']]['subname'][$val['id']] = $val['menu_name'];
                 unset($tanon[$val['id']]);
            }
            
        }
        return $tanon;

    }

	public function admin_permission_add(){
		//查询
		$mrole = M('t_roles_dd');
		$rolelist = $mrole->select();//角色列表
		$this->assign('rolelist',$rolelist);
		$this->display('admin_permission_add');
	}
	public function admin_permission()
	{
		$this->display('admin_permission');
	}
	public function admin_list()
	{
		$this->display('admin_list');
	}
	public function admin_add()
	{
		if(!$_POST)
		{
			$this->display('admin_add');
		}else{
			$adm = M('t_admin_manage_dd');
			$data['name'] = I('post.name');
			$data['roleid'] = I('post.roleid');
			$res = $adm->add($data);
			if($res){
				$this->success('添加成功!');
			}else{
				$this->error('添加失败');
			}
		}
	}
}