<?php
namespace Admin\Controller;

use Think\Controller;
class PPController extends CommonController{
	
	public function __construct()
	{
		parent::__construct();
	}
	
	// 品牌管理首页
	public function brand()
	{
		$m_brand = M('t_brand_dd');

		$res_sel = $m_brand->select();// 角色列表

		// 品牌信息列表
		$this->assign('brand_list', $res_sel);
		
		$this->display('brand');
	}

	//添加品牌
	public function brand_add()
	{
		if (!$_POST) {
			if (!$_GET) {
				$this->display('brand_add');
			} else {
				// 判断是否为修改页
				if (null !== I('get.id')) {
					$m_brand = M('t_brand_dd');
					// $res_sel = $m_brand->select($option['where'=>array('id'=>I('post.id'))]);
					$where = array('id'=>I('get.id'));
					$option= array('where'=>$where);
					// $res_sel = $m_brand->select(array('id'=>I('get.id')));
					$res_sel = $m_brand->select($option);
					if (!empty($res_sel)) {
						$this->assign('brand', $res_sel[0]);
					}
					$this->display('brand_add');
				} else {
					$this->display('brand_add');
				}
			}
		}else{
			$m_brand = M('t_brand_dd');
			$data = array();
			// 
			if (null !== I('post.name') && 
				(!empty(I('post.name')))) {
				$data['name'] = I('post.name');
			}
			// 
			if (null !== I('post.egname') && 
				(!empty(I('post.egname')))) {
				$data['egname'] = I('post.egname');
			}
			// 
			if (null !== I('post.logo') && 
				(!empty(I('post.logo')))) {
				$data['logo'] = I('post.logo');
			}
			// 
			if (null !== I('post.subtitle') && 
				(!empty(I('post.subtitle')))) {
				$data['subtitle'] = I('post.subtitle');
			}
			// 
			if (null !== I('post.star') && 
				(!empty(I('post.star')))) {
				$data['star'] = I('post.star');
			}
			// 
			if (null !== I('post.hits') && 
				(!empty(I('post.hits')))) {
				$data['hits'] = I('post.hits');
			}
			// 
			if (null !== I('post.brandimage') && 
				(!empty(I('post.brandimage')))) {
				$data['brandimage'] = I('post.brandimage');
			}
			// 
			if (null !== I('post.brand_type') && 
				(!empty(I('post.brand_type')))) {
				$data['brand_type'] = I('post.brand_type');
			}
			// 
			if (null !== I('post.character') && 
				(!empty(I('post.character')))) {
				$data['character'] = I('post.character');
			}
			// 
			if (null !== I('post.brand_create_time') && 
				(!empty(I('post.brand_create_time')))) {
				$data['brand_create_time'] = I('post.brand_create_time');
			}
			// 
			if (null !== I('post.annual_sale') && 
				(!empty(I('post.annual_sale')))) {
				$data['annual_sale'] = I('post.annual_sale');
			}
			// 
			if (null !== I('post.company_address') && 
				(!empty(I('post.company_address')))) {
				$data['company_address'] = I('post.company_address');
			}
			// 
			if (null !== I('post.company_name') && 
				(!empty(I('post.company_name')))) {
				$data['company_name'] = I('post.company_name');
			}
			// 
			if (null !== I('post.store_num') && 
				(!empty(I('post.store_num')))) {
				$data['store_num'] = I('post.store_num');
			}
			// 
			if (null !== I('post.company_phone') && 
				(!empty(I('post.company_phone')))) {
				$data['company_phone'] = I('post.company_phone');
			}
			// 
			if (null !== I('post.company_link') && 
				(!empty(I('post.company_link')))) {
				$data['company_link'] = I('post.company_link');
			}
			
			if (null !== I('post.id') && (!empty(I('post.id')))) {// update
				// 
				$data['updated_by'] = I('post.updated_by');
				// 
				$data['updated_at'] = time();

				$where = array('id' => I('post.id'));
				$option= array('where' => $where);
				// $res_upd = $m_brand->save($data, $option['where'=>$where]);
				$res_upd = $m_brand->save($data, $option);
				// $res_upd = $m_brand->save($data, $where);
				if ($res_upd) {
					$this->success('保存成功！');
				} else {
					$this->error('保存失败！');
				}
				
			} else {// insert
				// 
				$data['created_by'] = 'somebody';
				// 
				$data['created_at'] = time();

				$res_ins = $m_brand->add($data);
				if ($res_ins) {
					$this->success('创建成功！');
				} else {
					$this->error('创建失败！');
				}
			}
		}
    	
	}

}