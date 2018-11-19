<?php 
return array(
	//'配置项'=>'配置值'
	//后台上传路径
	'UPLOAD_DIR'  =>  './Public/Admin/upload',
	'FILE_UPLOAD_TYPE' => 'LOCAL',//本地文件上传
	'SESSION_AUTO_START' => true, //是否开启session
    //数据库配置信息
    // 'DB_TYPE'   => 'mysql', // 数据库类型
    // 'DB_HOST'   => 'localhost', // 服务器地址
    // 'DB_NAME'   => 's226889', // 数据库名
    // 'DB_USER'   => 's226889', // 用户名
    // 'DB_PWD'    => 'LanXuan199112', // 密码
    // 'DB_PORT'   => 3306, // 端口
    //其他项目配置参数
    //权限
    // 'APP_AUTOLOAD_PATH'=>'@.TagLib',
    'SESSION_AUTO_START'=>true,
    'USER_AUTH_ON'              =>true,     //开启用户认证
    'USER_AUTH_TYPE'            =>1,        // 默认认证类型 1 登录认证 2 实时认证
    'USER_AUTH_KEY'             =>'authId',    // 用户认证SESSION标记
    'ADMIN_AUTH_KEY'            =>'administrator',
    'USER_AUTH_MODEL'           =>'User',    // 默认验证数据表模型
    'AUTH_PWD_ENCODER'          =>'md5',    // 用户认证密码加密方式
    'USER_AUTH_GATEWAY'         =>'/Public/login',// 默认认证网关
    'NOT_AUTH_MODULE'           =>'Public',    // 默认无需认证模块
    'REQUIRE_AUTH_MODULE'       =>'',        // 默认需要认证模块
    'NOT_AUTH_ACTION'           =>'',        // 默认无需认证操作
    'REQUIRE_AUTH_ACTION'       =>'',        // 默认需要认证操作
    'GUEST_AUTH_ON'             =>false,    // 是否开启游客授权访问
    'GUEST_AUTH_ID'             =>0,        // 游客的用户ID
    'DB_LIKE_FIELDS'            =>'title|remark',
    'RBAC_ROLE_TABLE'           =>'think_role',
    'RBAC_USER_TABLE'           =>'think_role_user',
    'RBAC_ACCESS_TABLE'         =>'think_access',
    'RBAC_NODE_TABLE'           =>'think_node',
    'SHOW_PAGE_TRACE'=>0,//显示调试信息
    //后台登录ip网段
    'IPARR' =>array('192.168.1'),
    //后台连续登录次数
    'LOGINMAX' => 5,
    //刷新数据表配置
    'REFRESH-TABLES-NAME' =>array(
        1 => 't_zj_dd',//子集分类表
        2 => 't_relation_dd'//分类表
        ),
    //刷新数据表编号
    'REFRESH-TABLES-NUM' =>array(
        '文章详情表' => 1,
        '分类表' => 2
        ),
    );
?>
