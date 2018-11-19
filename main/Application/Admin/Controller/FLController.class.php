<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class FLController extends CommonController {
    public function __construct()
    {
        parent::__construct();
    }
    public function product_category()
    {
        $this->display('FL/product_category');
    }
   public function parent_add()
    {
        $fz_relationmod = M('t_relation_dd');
        $pname = I('post.pname');
        $data['name'] = $_POST['name'];
        $data['pid'] = $_POST['pid'];
        $data['vsort'] = I('post.vsort');
        $data['jump_url'] = I('post.jump_url');
        $data['comments'] = I('post.comments');
        $data['dt'] = time();
        $res = $fz_relationmod->add($data);
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
        $fz_relationmod = M('t_relation_dd');
        $data['name'] = I('post.name');
        if(I('post.pid') == 0){//父级节点
            $data['pid'] = I('post.id');
        }else{
            $data['pid'] = I('post.pid');
        }
        $data['jump_url'] = I('post.jump_url');
        $data['vsort'] = I('post.vsort');
        $data['comments'] = I('post.comments');
        $res = $fz_relationmod->add($data);
        if($res){
            echo '<script>添加成功！</script>';
            $this->success('添加成功！');
        }else{
            $this->success('服务器异常！');
        }

    }
    //修改
    public function item_edit()
    {   
        $fz_relationmod =  M( 't_relation_dd');
        $id = I('post.id');
        $data['name'] = I('post.name');
        $data['pid'] = I('post.pid');
        $data['jump_url'] = I('post.jump_url');
        $data['vsort'] = I('post.vsort');
        $data['comments'] = I('post.comments');
        $data['dt'] = time();
       
        if($id){
            $res = $fz_relationmod->where('id='.$id)->save($data);
        }else{
            $res = $fz_relationmod->data($data)->add($data);
        }
        echo $res;
    }
    //刪除
    public function del()
    {
        $fz_relationmod =  M( 't_relation_dd');
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
    public function query($ajax = 1)
    {
        $resultData = array();
        $fz_relationmod = M('t_relation_dd');
        //查询
        $relalist = $fz_relationmod->where('show_status<>0')->order('vsort asc')->select();
        foreach($relalist as $k => $val)
        {
            $tanon = new \stdClass();
            $tanon->pId = $val['pid'];
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
        }  
        
    }
    public function subedit()
    {
       if($_POST)
       {
            var_dump($_POST);
       }else{
            // var_dump($_GET['p'],$_GET['s']);die;
           if(intval($_GET['p']) == 0)
            {
                $zjid = $_GET['s'];
            }else{
                $zjid = substr($_GET['s'],strlen($_GET['p']));
            }
            $fz_relationmod = M('t_relation_dd');
            if($zjid){
                $zjinfo = $fz_relationmod->where('id='.$zjid)->select();
            }
            $this->assign('zjinfo',$zjinfo);
            $this->assign('selectlist',$this->seperate_PC_fun());
            $this->display('FL/subedit');
       }
       
    }
    public function pitemedit()
    {
       $zjid = $_GET['s'];
       $zjinfo = array();
       $fz_relationmod = M('t_relation_dd');
       if($zjid){
         $zjinfo = $fz_relationmod->where('id='.$zjid)->select();
       }
       $this->assign('zjinfo',$zjinfo);
       $this->assign('selectlist',$this->seperate_PC_fun());
       $this->display('FL/pitemedit');
    }
    public function seperate_PC_fun()
    {
        $tanon = array();
        $fz_relationmod = M('t_relation_dd');
        //查询
        $relalist = $fz_relationmod->order('pid asc')->select();
        $ids_arr = array();
        foreach($relalist as $val)
        {
            $tanon[$val['id']]['id']= $val['id'];
            $tanon[$val['id']]['name']= $val['name'];
            $tanon[$val['id']]['pid']= $val['pid'];
            array_push($ids_arr,$val['id']);
        }
        foreach($relalist as $k => $val)
        {
            if(in_array($val['pid'],$ids_arr))//父级包含
            {
                $tanon[$val['pid']]['subname'][$val['id']] = $val['name'];
                unset($tanon[$val['id']]);
            }
            
        }
        return $tanon;

    }
}