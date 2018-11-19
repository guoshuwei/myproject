<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class ULController extends CommonController {
    public function __construct()
    {
        parent::__construct();
    } 
    //图片列表
    public function picture_list()
    {
        $mpic = M('t_pic_manager_dd'); 
        $piclist = $mpic->select();
        $this->assign('piclist',$piclist);
        $this->display('UL/picture_list');
    }
    //图片编辑
    public function picture_edit()
    {
        $mpic = M('t_pic_manager_dd');
        $mod_m = M('t_module_dd');
        if($_POST)//跟新
        {
            $id = I('post.id');
            $data['title'] = I('post.title');
            $data['mid'] = I('post.column');
            $data['vsort'] = I('post.vsort');
            $data['jump_url'] = I('post.jump_url');
            $data['src'] = html_entity_decode(I('post.contents')); 
            $data['dt'] = time();
            $res = $mpic->where('id='.$id)->save($data);
            if($res)
            {
                $this->success('修改成功!');
            }else{
                $this->error('修改失败!');
            }
        }else{
            $id = I('get.id');
            $picinfo = $mpic->where('id='.$id)->find();
            $mitemlist = $mod_m->select();
            $this->assign('picinfo',$picinfo);
            $this->assign('mitemlist',$mitemlist);
            $this->display('UL/picture_edit');
        }
    }
    public function picture_add()
    {
        $mpic = M('t_pic_manager_dd');
        $mod_m = M('t_module_dd');
        if($_POST){
            $data['title'] = I('post.title');
            $data['mid'] = I('post.column');
            $data['vsort'] = I('post.vsort');
            $data['jump_url'] = I('post.jump_url');
            $data['src'] = html_entity_decode(I('post.contents')); 
            $data['dt'] = time();
            $res = $mpic->add($data); 
            if($res){
                $this->success('图片添加成功!');
            }else{
                $this->error('添加失败！');
            }
        }else{
            $pitemlist = $mod_m->select();
            $this->assign('pitemlist',$pitemlist);
            $this->display('UL/picture_add');
        }
    }
    // public function picture_priview()
    // {
    //     $upload = new \Think\Upload();
    //     $uploadInfo = $upload->upload();
    //     $mpic = M('t_pic_manager_dd');
    //     $data['imgname'] = $uploadInfo['file']['savename'];
    //     $data['uptime'] = rtrim($uploadInfo['file']['savepath'],'\/');
    //     $mpic->data($data)->add();
    // }

}