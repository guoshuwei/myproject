<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class YWController extends CommonController{
	public function __construct()
	{
		parent::__construct();
	}
	public function send_loans(){
		$this->display('send_loans');
		//获取提交参数
		$loan_data = $_POST['data'];
		//做一个rpc
		$mian_url = "open.api.com";
		//清楚业务id
	}
	//系统设置
	public function system_base()
	{
		//获取刷新的表
		$refresh_tables = C('REFRESH-TABLES-NUM');
		$this->assign('refresh_tables',$refresh_tables);
		$this->display('system_base');
	}
	//招商
	public function zhaoshang(){
		//引入一套商户的模板
		$this->display('zhaoshang');
	}

	public function zhaoshang_add(){
		
	}
	//刷新表,清除无效数据
	public function table_refresh()
	{
		$refresh_table_name = C('REFRESH-TABLES-NAME');
		//判断刷新那张表
		if(in_array(I('post.table_code'),array_keys($refresh_table_name)))
		{
			//刷新指定表
			$table_name = $refresh_table_name[I('post.table_code')];
			$mod =  M($table_name);
			if($table_name == "t_zj_dd"){
				$beifen_data = json_encode($mod->where('showstatus=0')->select());//保存备份数据
				$bt = file_put_contents('backup/'.time(),$beifen_data);
                if($bt){
                	$result = $mod->where('showstatus=0')->delete(); // 删除所有状态为0的用户数据
                }
				
			}
			else{
				$beifen_data = json_encode($mod->where('show_status=0')->select());//保存备份数据
				$bt = file_put_contents('backup_01/'.time(),$beifen_data);
				if($bt){
                	$result = $mod->where('show_status=0')->delete(); // 删除所有状态为0的用户数据
                }
			}
			if($result) echo 1;
			else echo 0;
		}

	}
	public function system_log()
	{
		$this->display('system_log');
	}
}