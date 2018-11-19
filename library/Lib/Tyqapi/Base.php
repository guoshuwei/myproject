<?php
/**
 * 投友圈接口
 * @author znz
 * 2016-08-31
 * UTF-8
 */
class TyLib_Tyqapi_Base{
    private static $obj= null;
    private $token		= '61KTk4sC';
    private $appid		= 'p2peye';
    private $sendtime	= null;
    private $signkey	= null;
    private $urlPre		= 'http://soa.p2peye.com';
    private $retData	= array();
    private $codeArr	= array(500,503,4004,4005,4006);//非逻辑code统一处理
    private $timeout    = 3;
    private $type_arr   = array('coupon');
    private static $env = null;

    /**
     * 设置timeout
     */
    public function settimeout($seconds) {
        $this->timeout = $seconds;
        return $this;
    }
    /**
     * 获取请求数据
     * @param unknown $url
     * @param unknown $parameter
     * @return boolean|Ambigous <void, string, unknown>
     */
    protected function getTyqData($url, $parameter){
        if(!is_string($url)){
            return false;
        }
        $data = array(
            'token' 	=> $this->token,
            'appid'		=> $this->appid,
            'userip'    => TyLib_Function::getInstance()->getip(),
            'sendtime'	=> time() ,
    
        );
    
        $data = array_merge($data,$parameter);
        $this->getSignkey($data);
        $data['signkey'] = $this->signkey;
        unset($data['token']);
        $url = $this->urlPre.$url;
        /* echo $url;
        print_r($data);exit; */
        $res = TyLib_Function::getInstance()->dfopen($url,0,http_build_query($data), '', FALSE, '', $this->timeout);
        $data = json_decode($res,true);
        if(in_array($data['code'], $this->codeArr, true) or empty($res) or !isset($data['code'])){
            //记录日志
            TyFunc_Log::write('TyqApi', $url . '?' . http_build_query($data), $res);
            //去错误页面
            throw new Exception('Request interface error !', 505);exit;
        }
        return $data;
    
    }

    /**
     * 获取请求数据
     * @param unknown $type
     * @param unknown $parameter
     * @return boolean|Ambigous <void, string, unknown>
     */
    protected function getNewTyqData($type, $parameter){
        if(!in_array($type, $this->type_arr)){
            return false;
        }
        $data = array(
            'token' 	=> $this->token,
            'appid'		=> $this->appid,
            'userip'    => TyLib_Function::getInstance()->getip(),
            'sendtime'	=> time() ,

        );
        $data = array_merge($data,$parameter);
        $this->getSignkey($data);
        $data['signkey'] = $this->signkey;
        unset($data['token']);
        self::$env = getenv('RUNTIME_ENVIROMENT') ? getenv('RUNTIME_ENVIROMENT') : (defined('SHELL_VARIABLE') ? SHELL_VARIABLE : '');
        self::$env = empty(self::$env)?'local':self::$env;
        $config = require (LIBRARY_DIR.'/Conf/swoole.php');
        if(!isset($config[self::$env]['coupon'])){
            TyFunc_Log::write('TyqApi',"error","config not found");
            return false;
        }
        $client = new swoole_client(SWOOLE_SOCK_TCP);
        if (!$client->connect($config[self::$env]['coupon']['host'],$config[self::$env]['coupon']['port'],'5')) {
            //记录日志
            TyFunc_Log::write('TyqApi', 'send_coupon_error', 'swoole server connect error');
            //去错误页面
            throw new Exception('Request interface error !', 505);exit;
        }
        $client->send(serialize($data));
        $res = $client->recv();

        $data = json_decode($res,true);
        if(in_array($data['code'], $this->codeArr, true) or empty($res) or !isset($data['code'])){
            //记录日志
            TyFunc_Log::write('TyqApi', 'getNewTyqData', $res);
            //去错误页面
            throw new Exception('Request interface error !', 505);exit;
        }
        return $data;
    }

    /**
     * 获取signkey
     * @param unknown $data
     */
    private function getSignkey($data){
        ksort($data);
        $this->signkey = md5(http_build_query($data));
    }
}