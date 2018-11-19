<?php
/**
 * 
 * @author WangYan
 * email:phperwangyan@foxmail.com
 * 2015-1-28
 * UTF-8
 */
class Lib_Duanxin_Adapter_iHuYi extends Lib_Duanxin_Base_Abstract {

	/**
     * 发送验证码
     */
    public function sendCode($mobile, $type,$message_type=1)
    {
       Function_Log::write('Duanxin', "iHuYi_send_code",'-----------mobile:'.$mobile.'|type:'.$type.'|发送验证码开始--------------');
        $code = self::getCode(6,true);
        $content = sprintf(Lib_Duanxin_Config::$_sms_message[$message_type], $code);
        //接口发送
        $post_data = "account=".$this->config['account']."&password=".$this->config['password']."&mobile=".$mobile."&content=".rawurlencode($content);
        Function_Log::write('Duanxin', "iHuYi_Request", $post_data);
        $resData = $this->curlPost($this->config['url'], $post_data);
        $resData = self::xml_to_array($resData);
        Function_Log::write('Duanxin', "iHuYi_Response", $mobile.'|'.$type.'|'.json_encode($resData));
        //info日志
        $info = array(
            'send_time'=>date('Y-m-d H:i:s',time()),
            'mobile' => $mobile,
            'type' => $type,
        );
        //
        Function_Log::write('Duanxin', "iHuYi_Info", 'type:sendcode|'.json_encode($info));
        //验证码成功发送
        if($resData['SubmitResult']['code'] == '2'){
          Function_Log::write('Duanxin', "iHuYi_send_code",'-----------发送验证码结束--------------');
           
            $memKey = '__MobileVerify_KEY_' . $mobile. $type;
            $data['code'] = $code;
            $data['type'] = $type;
            $data['mobile'] = $mobile;
            TyFunc_Cachefunc::getInstance()->set($memKey, $code,$this->config['code_expire']);
            return TRUE;
        }else{
           TyFunc_Log::write('Duanxin', "iHuYi_send_code",'-----------发送验证码失败|'.$code.'|'.$resData['SubmitResult']['code'].'--------------');
            return  array('code'=>400,'error'=>'发送失败');
        }
    }

    /**
     * 发送短信
     */
    public function sendMsg($mobile, $uid, $content)
    {
        TyFunc_Log::write('Duanxin', "iHuYiRes",'-----------mobile:'.$mobile.'|uid:'.$uid.'|发送短信开始--------------');
        //接口发送
        $post_data = "account=".$this->config['account']."&password=".$this->config['password']."&mobile=".$mobile."&content=".rawurlencode($content);
         TyFunc_Log::write('Duanxin', "iHuYiRes", $post_data);
        $resData = $this->curlPost($this->config['url'], $post_data);
        $resData = self::xml_to_array($resData);
        TyFunc_Log::write('Duanxin', "iHuYiRes", $uid.'|'.$mobile.'|'.$content.'|'.json_encode($resData));

        //验证码成功发送
        if($resData['SubmitResult']['code'] == '2'){
            TyFunc_Log::write('Duanxin', "iHuYiRes",'-----------发送短信结束--------------');
            return TRUE;
        }else{
            TyFunc_Log::write('Duanxin', "iHuYiRes",'-----------发送短信失败|'.$resData.'--------------');
           return  array('code'=>400,'error'=>'发送失败');
        }
    }

}