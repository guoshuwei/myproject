<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class SPGLController extends CommonController{
    public function index(){
        
		$this->display('Index/index');
    }
    public function sp_category()
    {
    	$this->display('SPGL/sp_category');
    }
    public function sp_list()
    {
        $mpic = M('t_pic_manager_dd'); 
        $piclist = $mpic->select();
        $this->assign('piclist',$piclist);
        //$this->display('UL/picture_list');
    	$this->display('SPGL/sp_list');
    }

    public function query(){
        $resultData = array();
        $ajax = 1;
        $sp_branch_mod = M('t_products_branch_relation_dd');
        $relalist = $sp_branch_mod->where('show_status<>0')->order('vsort asc')->select();
        //查询
        // var_dump($relalist);die;
        // $relalist = $fz_relationmod->where('show_status<>0')->order('vsort asc')->select();
        foreach($relalist as $k => $val)
        {
            $tanon = new \stdClass();
            $tanon->pId = !isset($val['pid']) ? 0 : $val['pid'];
            $tanon->name = $val['name'];
            //不是父级分类
            if(intval($val['pid']) !== 0)
            {
                $tanon->id = $val['pid'].$val['id'];
            }else{
                $tanon->id = $val['id'];
                $tanon->open = true;
            }
            array_push($resultData , $tanon);
        }
        if($ajax == 0)
        {
            return $resultData;

        }else{
            echo json_encode($resultData);
            exit();
        }  
    }

    public function item_edit(){

    }

    public function item_add(){
        $sp_branch_mod = M('t_products_branch_dd');
        $sp_branch_relation_mod = M('t_products_branch_relation_dd');
        $id = I('post.id');
        $sp_branch_data = array(
            'branch_name' => I('post.name'),
            'jump_url' => I('post.jump_url'),
            'vsort' => I('post.vsort'),
            'description' => I('post.comments'),
            'dt' => time(),
        );
        $sp_branch_relation_data = array(
            'name' => I('post.name'),
            'pid' => I('post.pid'),
            'jump_url' => I('post.jump_url'),
            'vsort' => I('post.vsort'),
            'show_status' => 1,
            'description' => I('post.comments'),
            'dt' => time(),
        );

        if($id == 0){
            try{
                $bres = $sp_branch_mod->add($sp_branch_data);//父级表添加数据
            }catch(Exception $e){

            }
        }
        //添加关联表
        try{
           $brres = $sp_branch_relation_mod->add($sp_branch_relation_data);
           if($brres){
                return 1;
           }else{
                return 0;
           }
        }catch(Exception $e){

        }
    }

    public function subedit(){
        if($_POST)
        {
            var_dump($_POST);
        }else{
           if(intval($_GET['p']) == 0)
            {
                $zjid = $_GET['s'];
            }else{
                $zjid = substr($_GET['s'],strlen($_GET['p']));
            }
            $sp_branch_mod = M('t_products_branch_dd');
            if($zjid){
                $zjinfo = $sp_branch_mod->where('id='.$zjid)->select();
            }
            $this->assign('zjinfo',$zjinfo);
            //$this->assign('selectlist',$this->seperate_PC_fun());
            //$this->display('FL/subedit');
       }
        $this->display('SPGL/subedit');
    }

    public function parent_add()
    {
        $sp_branch_mod = M('t_products_branch_dd');
        $pname = I('post.pname');
        $data['branch_name'] = $_POST['name'];
        $data['pid'] = $_POST['pid'];
        $data['vsort'] = I('post.vsort');
        $data['jump_url'] = I('post.jump_url');
        $data['description'] = I('post.comments');
        $data['dt'] = time();
        $res = $sp_branch_mod->add($data);
        if($res){
            $data['pname'] = $pname;
            $data['save_status'] = 1;
            $this->assign('data',$data);
            echo '<script>添加成功！</script>';
            $this->display('pitemedit');
        }else{
            $this->error('服务器异常！');
        }
    }

    //添加孩子节点
    public function sub_add()
    {
        $sp_branch_rel_mod = M('t_products_branch_relation_dd');
        $data['name'] = I('post.name');
        if(I('post.pid') == 0){//父级节点
            $data['pid'] = I('post.id');
        }else{
            $data['pid'] = I('post.pid');
        }
        $data['jump_url'] = I('post.jump_url');
        $data['vsort'] = I('post.vsort');
        $data['description'] = I('post.comments');
        $data['dt'] = time();
        $data['show_status'] = 1;
        $res = $sp_branch_rel_mod->add($data);
        if($res){
            echo '<script>添加成功！</script>';
            $this->success('添加成功！');
        }else{
            $this->success('服务器异常！');
        }
    }

    public function del(){
        $fz_relationmod =  M( 't_products_branch_relation_dd');
        $id = I('post.id');
        $pid = I('post.pId');
        $data['update_time'] = time();
        $data['show_status'] = 0;
        $res = $fz_relationmod->where('id='.$id)->save($data);
        if($res){
            echo 1;
        }else{
            echo 0;
        }
    }
    /****************************商品部分*****************************************/
    /**
     * [spAdd description]
     * @return [type] [添加商品]
     */
    public function spAdd(){
        
    }
}