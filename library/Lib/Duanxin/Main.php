<?php
/**
 * 
 * @author WangYan
 * email:phperwangyan@foxmail.com
 * 2015-1-28
 * UTF-8
 */
class Lib_Duanxin_Main{

    public function __construct(){
    }

    /**
     * 获得适配器
     * @param $config_tag 1.互亿无线 2.蝶信互联
     * @return Duanxin_Adapter_iHuYi|Duanxin_Adapter_DieXin
     */
    public static function getAdapter($config_tag=''){
        $config = Lib_Duanxin_Config::getConfig($config_tag);
        if(empty($config)){
            throw new Exception('短信通道不合法');
        }
        $tmpAdapter = new $config['class_name']();
        $tmpAdapter->setProp($config['config']);
        return $tmpAdapter;
    }

    /**
     * 发送短信验证码
     * $type:10申请表单
     */
    public static function sendCode($mobile, $type,$message_type =1,$is_weixin=0,$orderid=0,$id=0,$openid=0)
    {
        //SPAM验证
        $spam = self::spam($mobile, $type);
        if($spam !== true)
        {
            return $spam;
        }
		$black = array(
			"18757872829",
			"13392943833",
			"15873300912",
			"13599003536",
			"15131926297",
			"15612489682",
			"18311297367",
			"13807677073",
			"18898273227",
			"15013551924",
			"18757872829"
		);
		if(in_array($mobile, $black, true)){
			return array('code'=>400,'error'=>'发送失败');
		}
		$black = array(
			"18757872829",
			"13392943833",
			"15873300912",
			"13599003536",
			"15131926297",
			"15612489682",
			"18311297367",
			"13807677073",
			"18898273227",
			"15013551924",
			"18757872829",
		    "13637637650",//--
		    "15003408434",
		    "18551257574",
		    "18842021322",
		    "18909802761",
		    "13874283205",
		    "15049820000"
		);
		if(in_array($mobile, $black, true)){
			return array('code'=>400,'error'=>'发送失败');
		}

        // 顺序选择短信适配器（一个失败则调用下一个）
        $adapterTags = [3];
        foreach ($adapterTags as $key => $val) {
            $adapter = self::getAdapter($val);
            if($is_weixin){
                $res = $adapter->sendCodeWeixin($mobile, $openid,$orderid,$id,$message_type);
            }else{
                $res = $adapter->sendCode($mobile, $type,$message_type);
            }
            if($res === true) { // 如果发送成功则跳出循环，否则使用下一个短信接口发送
                break;
            }
        }
        return $res;
    }

    /**
     * 发送短信
     */
    public static function sendMsg($mobile, $uid, $content, $adapter_type='',$scene='')
    {
        !empty($adapter_type) OR $adapter_type = rand(1,3);
        $adapter = self::getAdapter($adapter_type);
        return $adapter->sendMsg($mobile, $uid, $content, $scene);
    }

    /**
     * 校验短信验证码
     */
    public static function verifyCode($mobile,$type,$code)
    {
        $memKey = '__MobileVerify_KEY_' . $mobile. $type;
        $exist_code = TyFunc_Cachefunc::getInstance()->get($memKey);
        if(empty($exist_code)){
            return false;
        }
        if(!$exist_code || $exist_code != $code)
        {
            return false;
        }
        //验证通过后失效
        TyFunc_Cachefunc::getInstance()->delete($memKey);
        return true;
    }
    
    private static function spam($mobile, $type)
    {
        /*
        //按手机号验证
        $number_times = self::numberMessage($mobile,$type);
        $numLimit = 10;
        if($number_times >= $numLimit)
        {
            return array('code'=>400,'error'=>'获取验证码次数超过上限,请明天再试');
        }else
        {
            //通过次数加1
            self::numberMessage($mobile,$type,'set');
        }
        */
        //封闭接口
        $close_api = array(
            '/Thirdpartylogin/tyqcode'
        );
        if(in_array($_SERVER['REQUEST_URI'], $close_api)){
            return array('code'=>400,'error'=>'请尝试使用普通登陆！');
        }
        //发送次数限制
        $is_send = TyFunc_Redisfunc::getInstance()->checkceiling('tianyan_duanxin', $mobile, 5);
        if($is_send === false){
            return array('code'=>400,'error'=>'获取验证码次数超过上限,请明天再试');
        }

        //判断两次请求间隔60秒
        $last_send = self::lastMessage($mobile,$type);
        $last_send = $last_send ? $last_send : 0;
    
        $singleLimit = 60;
        if((time() - $last_send) < $singleLimit){
            //reset业务不受该限制
            if($type != 'reset' || $type != 'reveirfy')
            {
                return array('code'=>400,'error'=>'您获取验证码过于频繁，请稍后再试');
            }
        }
        //发送成功更新上次发送时间
        self::lastMessage($mobile,$type,'set');
        return true;
    }
    
    //基于手机号的验证码发送限制
    public static function numberMessage($number,$type,$act = 'get')
    {
        $mem = TyFunc_Cachefunc::getInstance();
        $key = '__SPAM_MESSAGE_NUMBER__SENDCODE_'.$number.$type;
        if($act == 'get')
        {
            $res = json_decode($mem->get($key), TRUE);
            if (!isset($res['Ymd']) || $res['Ymd']!=date('Ymd')) {
                $res = array(
                    'Ymd'=>date('Ymd'),
                    'num'=>0,
                );
                $mem->set($key,json_encode($res),0,86400);
            }
            return $res['num'];
        }else
        {
            $res = json_decode($mem->get($key), TRUE);
            if (!isset($res['Ymd']) || $res['Ymd']!=date('Ymd')) {
                $res = array(
                    'Ymd' => date('Ymd'),
                    'num' => 0,
                );
            }
            $res['num']++;
            $mem->set($key,json_encode($res),0,86400);
        }
    }
    
    //两次获取验证码时间间隔
    public static function lastMessage($mobile,$type,$act = 'get')
    {
        $mem = TyFunc_Cachefunc::getInstance();
        $key = '__SPAM_MESSAGE_LEAP_TIME'.$mobile.$type;
        if($act == 'get')
        {
            $last = intval($mem->get($key));
            if(!$last)
            {
                $mem->set($key,time(),0,86400);
                $last = 0;
            }
            return $last;
        }else
        {
            $mem->set($key,time(),0,86400);
        }
    }
    

}