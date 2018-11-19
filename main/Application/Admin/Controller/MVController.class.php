<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class MVController extends CommonController {
    public function __construct()
    {
        parent::__construct();
    }
    public function product_brand()
    {
        $fjm =  M( 't_fj_dd');
        $re = $fjm->select();
        $this->assign('datalist',$re);
        $this->display('MV/product_brand');
    }
    //产品列表
    public function product_list()
    {
        $M = M();
        $sql = "select trd.name as tname,tzd.id,tzd.title,tzd.dt,tzd.updatetime,tzd.pubstatus from ".C('DB_NAME').".t_zj_dd tzd left join ".C('DB_NAME').".t_relation_dd trd on tzd.pid = trd.id where showstatus=1 order by tzd.id desc";
        $zjlist = $M->query($sql);
        $this->assign('zjlist',$zjlist);
        $this->display('MV/product_list');
    }
    //产品下架
    public function product_stop()
    {
        $id = I('post.id');
        $ps = I('post.status');
        $zjm =  M('t_zj_dd');
        $data['pubstatus'] = $ps;
        $res = $zjm->where('id='.$id)->save($data);
        echo $res;
    }
    //产品删除
    public function product_del()
    {
        $id = I('post.id');
        $zjm =  M('t_zj_dd');
        $data['showstatus'] = 0;
        $res = $zjm->where('id='.$id)->save($data);
        echo $res;
    }
    //产品跟新
    public function product_edit()
    {
        $zjm =  M('t_zj_dd');
        if($_POST)//跟新
        {
            $id = I('post.id');
            $data['pid'] =  $_POST['pid'];//父级id
            $data['title'] =  $_POST['article_title'];
            $data['vsort'] =  $_POST['vsort'];
            $data['jump_url'] =  $_POST['jump_url'];
            $data['keywords'] =  $_POST['keywords'];
            $data['content'] = $_POST['contents'];
            $data['updatetime'] = $_POST['updatetime'];
            // $data['dt'] = time();//去掉更新时间
            $res = $zjm->where('id='.$id)->save($data);
            if($res)
            {
                $this->success('修改成功!');
            }else{
               $this->success('你没有修改任何内容!'); 
            }    
        }else{
            $id = I('get.id');
           
            $reinfo = $zjm->where('id='.$id)->find();
            $this->assign('editlist',$reinfo);
            $this->assign('selectlist',$this->seperate_PC_fun());
            $this->display('MV/product_edit');
        }
        
    }
    //产品剪裁
    public function product_crop()
    {
        // var_dump(111);
    }
    //添加子集栏目
    public function product_add()
    {
        $fjm =  M( 't_fj_dd');
        $zjm =  M( 't_zj_dd');
        $fz_relationmod =  M( 't_relation_dd');
        //添加三级分类
        if(!empty($_POST))
        { 
            if($_POST['article_title'] == ""){
                 $this->error('请添加文章标题！','product_add');
            }
            $data['pid'] = $_POST['pname'];//父级id
            $data['title'] = $_POST['article_title'];
            $data['content'] = $_POST['contents'];
            $data['vsort'] = $_POST['vsort'];
            $data['jump_url'] = $_POST['jump_url'];//跳转地址 
            $data['keywords'] = $_POST['keywords'];    
            $data['dt'] = time();//排序时间
            $data['updatetime'] = $_POST['addtime'];
            // var_dump($data);die;
            $res = $zjm->add($data);
            $insertId = $zjm->getLastInsID();
            if($res){
                $this->success('添加成功','product_list');
            }else{
                $this->error('服务器异常,请稍候再试!');
            }
        }else{
            $re = $fjm->select();
            $this->assign('selectlist',$this->seperate_PC_fun());
            $this->display('MV/product_add');
        }
        
    }
    //记录插入数据库
    /******************** 启动事务 作批量操作   begin   **************************/
    //单独处理图片上传
   // public function fileupload()
   //  {
   //      $upload = new \Think\Upload();
   //      $uploadInfo = $upload->upload();
   //      var_dump($uploadInfo);die;
   //      $zjm =  M( 't_zj_dd');
   //      $data['imgname'] = $uploadInfo['file']['savename'];
   //      $data['uptime'] = rtrim($uploadInfo['file']['savepath'],'\/');
   //      return $this->ajaxReturn($data,'JSON');
   //  }
    //图片预览,存储名字
    // public function preview()
    // {
    //     $upload = new \Think\Upload();
    //     $uploadInfo = $upload->upload();
    //     $mpic = M('t_pic_manager_dd');
    //     $data['imgname'] = $uploadInfo['file']['savename'];
    //     $data['uptime'] = rtrim($uploadInfo['file']['savepath'],'\/');
    //     $mpic->data($data)->add();
    // }
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