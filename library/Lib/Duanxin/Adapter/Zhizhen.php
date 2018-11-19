<?php
/**
 * 
 * @author WangYan
 * email:phperwangyan@foxmail.com
 * 2015-11-30
 * UTF-8
 */
class TyLib_Duanxin_Adapter_Zhizhen extends TyLib_Duanxin_Base_Abstract {
    
    /**
     * 发送验证码
     */
    public function sendCode($mobile, $type,$message_type=1)
    {
        TyFunc_Log::write('Duanxin_log', $mobile, json_encode($_SERVER));
        TyFunc_Log::write('Duanxin', "Zhizhen_send_code",'-----------mobile:'.$mobile.'|type:'.$type.'|'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'?'.$_SERVER['QUERY_STRING'].'|发送验证码开始--------------');
        $code = self::getCode(6,true);
//         $content = sprintf('【网贷天眼】您的验证码是：%s。请不要把验证码泄露给其他人。', $code);
        $content = sprintf(TyLib_Duanxin_Config::$_sms_message[$message_type], $code);
        $subid = 8;
        //接口发送
        $get_data = 'UserName='.$this->config['UserName'].'&UserPass='.$this->config['UserPass'].'&Subid='.$subid.'&Mobile='.$mobile.'&Content='.urlencode($content);
        TyFunc_Log::write('Duanxin', "Zhizhen_Request", $get_data);
        
        $resData = $this->curlGet($this->config['url'], $get_data);
        $resDataArr = explode(',', $resData);
        TyFunc_Log::write('Duanxin', "Zhizhen_Response", $mobile.'|'.$type.'|'.$resData);
        //info日志
        $info = array(
            'send_time'=>date('Y-m-d H:i:s',time()),
            'mobile' => $mobile,
            'type' => $type,
        );
        // info信息
       TyFunc_Log::write('Duanxin', "Zhizhen_Info", 'type:sendcode|'.json_encode($info));
        //验证码成功发送
        if($resDataArr[0] == '03'){

           TyFunc_Log::write('Duanxin', "Zhizhen_send_code",'-----------发送验证码结束--------------');
            $memKey = '__MobileVerify_KEY_' . $mobile. $type;
            $data['code'] = $code;
            $data['type'] = $type;
            $data['mobile'] = $mobile;
           TyFunc_Cachefunc::getInstance()->set($memKey, $code,$this->config['code_expire']);
            return TRUE;
        }else{
             TyFunc_Log::write('Duanxin', "Zhizhen_send_code",'-----------发送验证码失败|'.$resData.'--------------');
            return  array('code'=>400,'error'=>'发送失败');
        }
    }

    /**
     * 发送短信
     */
    public function sendMsg($mobile, $uid, $content, $subid=8)
    {
        TyFunc_Log::write('Duanxin', "ZhizhenRequest",'-----------mobile:'.$mobile.'|uid:'.$uid.'|发送短信开始--------------');
        $get_data = 'UserName='.$this->config['UserName'].'&UserPass='.$this->config['UserPass'].'&Subid='.$subid.'&Mobile='.$mobile.'&Content='.urlencode($content);
        TyFunc_Log::write('Duanxin', "ZhizhenRequest", $get_data);

        $resData = $this->curlGet($this->config['url'], $get_data);
        $resDataArr = explode(',', $resData);
        TyFunc_Log::write('Duanxin', "ZhizhenRes", $uid.'|'.$mobile.'|'.$content.'|'.$resData);

        //验证码成功发送
        if($resDataArr[0] == '03'){
            TyFunc_Log::write('Duanxin', "Zhizhen_send_code",'-----------发送短信结束--------------');
            return TRUE;
        }else{
             TyFunc_Log::write('Duanxin', "ZhizhenRes",'-----------发送短信失败|'.$resData.'--------------');
            return  array('code'=>400,'error'=>'发送失败');
        }
    }

    /**
     * 发送验证码
     * $mobile 手机号
     * $openid 微信openid
     * $orderid 订单号
     * $id 二维码id
     * $message_type 短息内容
     */
    public function sendCodeWeixin($mobile, $openid,$orderid,$id,$message_type=1)
    {
        TyFunc_Log::write('Duanxinwx', "Zhizhen_send_code",'-----------mobile:'.$mobile.'|type:'.$openid.'|'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'?'.$_SERVER['QUERY_STRING'].'|发送验证码开始--------------');
        $code = self::getCode(6,true);
        //         $content = sprintf('【网贷天眼】您的验证码是：%s。请不要把验证码泄露给其他人。', $code);
        $content = sprintf(TyLib_Duanxin_Config::$_sms_message[$message_type], $code);
        $subid = 8;
        //接口发送
        $get_data = 'UserName='.$this->config['UserName'].'&UserPass='.$this->config['UserPass'].'&Subid='.$subid.'&Mobile='.$mobile.'&Content='.urlencode($content);
        TyFunc_Log::write('Duanxinwx', "Zhizhen_Request", $get_data);
        
        $resData = $this->curlGet($this->config['url'], $get_data);
        $resDataArr = explode(',', $resData);
        TyFunc_Log::write('Duanxinwx', "Zhizhen_Response", $mobile.'|'.$openid.'|'.$resData);
        //info日志
        $info = array(
            'send_time'=>date('Y-m-d H:i:s',time()),
            'mobile' => $mobile,
            'openid' => $openid,
            'orderid'=>$orderid,
            'id'=>$id
        );
        // info信息
        TyFunc_Log::write('Duanxinwx', "Zhizhen_Info", 'type:sendcode|'.json_encode($info));
        //验证码成功发送
        if($resDataArr[0] == '03'){
            TyFunc_Log::write('Duanxinwx', "Zhizhen_send_code",'-----------发送验证码结束--------------');
            $memKey = '__MobileVerify_KEY_WeiXin_' .$openid;
            $data=array();
            $data['code'] = $code;
            $data['openid'] = $openid;
            $data['orderid'] = $orderid;
            $data['id'] = $id;
            $data['mobile'] = $mobile;
            TyLib_Redis_String::Set($memKey, json_encode($data));
           // TyFunc_Cachefunc::getInstance()->set($memKey, json_encode($data));
            return TRUE;
        }else{
            TyFunc_Log::write('Duanxinwx', "Zhizhen_send_code",'-----------发送验证码失败|'.$resData.'--------------');
            return  array('code'=>400,'error'=>'发送失败');
        }
    }
}
