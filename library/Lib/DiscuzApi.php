<?php
class Lib_DiscuzApi{

    private static $obj= null;
    private $token      = 'D09cxJHG';
    private $appid      = 'nonglian';
    private $sendtime   = null;
    private $signkey    = null;
    private $urlPre     = '/discuz/api/nonglian/index.php?';
    private $retData    = array();

    /**
     * 单例
     * @param string $hl
     * @param number $timeout
     * @return
     */
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new Lib_DiscuzApi();
        }
        return self::$obj;
    }

    /**
     * »ñÈ¡ÇëÇóÊý¾Ý
     * @param unknown $url
     * @param unknown $parameter
     * @return boolean|Ambigous <void, string, unknown>
     */
    private function getData($mod, $parameter){

        if(!is_string($mod) or empty($parameter)){
            return false;
        }

        $data = array(
            'token'     => $this->token,
            'appid'     => $this->appid,
            'sendtime'  => time()
        );

        $data = array_merge($data,$parameter);

        $this->getSignkey($data);
        $data['signkey'] = $this->signkey;
        unset($data['token']);
        $url = $this->urlPre."mod=".$mod;
        $res = Lib_Function::getInstance()->dfopen($url,0,http_build_query($data));
        // var_dump($res);die;
        if($res == false){
            return array();
        }
        $data = json_decode($res, true);
        if($data['code']!=200){
            // //¼ÇÂ¼ÈÕÖ¾
            // TyFunc_Log::write('P2peyeApi', $url, $res);
        }
        return $data;

    }

    /**
     * »ñÈ¡signkey
     * @param unknown $data
     */
    private function getSignkey($data){
        ksort($data);
        $this->signkey = md5(http_build_query($data));
    }

    /**
     * ÂþÓÎÍÆËÍÌ³ÓÑ»¥¶¯
     */
    public function pushNotice($notification){
        return $this->getData('notification',array(
            "notification"=>$notification
        ));
    }
    /**
     * ÂþÓÎÍÆËÍÏûÏ¢
     */
    public function pushPm($toid, $subject, $message, $fromid, $replypmid = 0, $isusername = 0, $type = 0){
        $data = array(
            'toid'		=> $toid,
            'subject'	=> $subject,
            'message'	=> $message,
            'fromid'	=> $fromid,
            'replypmid'	=> $replypmid,
            'isusername'=> $isusername,
            'type'		=> $type
        );
        return $this->getData('pm',array('pm'=>$data));
    }
    /**
     * ÑéÖ¤ÓÃ»§Ãû
     * @param unknown $username
     * @return Ambigous <boolean, Ambigous, multitype:, unknown>
     */
    public function checkusername($username){
        $data = array(
            'inajax'	=> 'yes',
            'infloat'	=> 'register',
            'handlekey'	=> 'register',
            'jaxmenu'	=> 1,
            'action'	=> 'checkusername',
            'username'	=> trim($username)
        );
        return $this->getData('checkusername',array('checkusername'=>$data));
    }
    /**
     * ÑéÖ¤ÓÊÏä
     * @param unknown $username
     * @return Ambigous <boolean, Ambigous, multitype:, unknown>
     */
    public function checkemail($email){
        $data = array(
            'inajax'	=> 'yes',
            'infloat'	=> 'register',
            'handlekey'	=> 'register',
            'jaxmenu'	=> 1,
            'action'	=> 'checkemail',
            'email'		=> trim($email)
        );
        return $this->getData('checkemail',array('checkemail'=>$data));
    }
    /**
     * ×¢²á
     * @param unknown $formhash
     * @param unknown $referer
     * @param unknown $ty2_username
     * @param unknown $ty2_password
     * @param unknown $ty2_password2
     * @param unknown $ty1_email
     * @param unknown $seccodeverify
     * @return Ambigous <boolean, Ambigous, multitype:, unknown>
     */
    public function register($formhash, $referer, $username, $password, $password2, $email){
        $clientip = TyLib_Function::getInstance()->getip();
        $data = array(
            'inajax'		=> '1',
            'regsubmit'		=> 'yes',
            'formhash'		=> trim($formhash),
            'referer'		=> trim($referer),
            'activationauth'=> '',
            'username'		=> trim($username),
            'password'		=> trim($password),
            'password2'		=> trim($password2),
            'email'			=> trim($email),
            'clientip' 		=> $clientip,
        );
        return $this->getData('register',array('register'=>$data));
    }

    /**
     * µÇÂ¼
     */
    public function login($username, $password){
        $clientip = TyLib_Function::getInstance()->getip();
        $data = array(
            'username'		=> trim($username),
            'password'		=> trim($password)
        );
        return $this->getData('login',array('login'=>$data));
    }

    /**
     * µÇÂ¼£¨¸ù¾Ý tianyan_token£©
     */
    public function loginByTyToken($tianyan_token){
        $clientip = TyLib_Function::getInstance()->getip();
        $data = array(
            'tianyan_token'		=> trim($tianyan_token)
        );
        return $this->getData('loginByTyToken',array('loginByTyToken'=>$data));
    }

    /**
     * »ñÈ¡formhashÖµ
     * @return Ambigous <boolean, Ambigous, multitype:, unknown>
     */
    public function getFormhash(){
        $data = array();
        return $this->getData('formhash',array('formhash'=>$data));
    }

    /**
     * ¼ì²éÊÇ·ñÓÐ²»Á¼¹Ø¼ü´Ê
     */
    public function filterContent($content){
        $data = array(
            'content'	=> $content
        );
        return $this->getData('filterContent',array('filterContent'=>$data));
    }
    /**Àí²Æ¸öÈËÖÐÐÄÉèÖÃ*/
    /**
     * @param $userInfo
     * @return Ambigous|bool
     * »ñÈ¡ÌìÑÛ¸öÈËÐÅÏ¢ÏêÇé
     */
    public function getProfileInfo($userInfo){
        $data = array(
            'ac' => 'profile',
            'data'=> $userInfo,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     * @param $userInfo
     * @return Ambigous|bool
     * ÉèÖÃÌìÑÛ¸öÈËÐÅÏ¢
     */
    public function setProfileInfo($userInfo){
        $data = array(
            'ac' => 'profile',
            'data'=> $userInfo,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     * @param $data
     * Òì²½»ñÈ¡ÌìÑÛµØÇøÐÅÏ¢
     */
    public function getDistrict($data){
        $data = array(
            'ac' => 'district',
            'data'=> $data,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     * @param $data
     * »ñÈ¡ÓÃ»§»ý·Ö
     */
    public function getCreditInfo($data){
        $data = array(
            'ac' => 'credit',
            'data'=> $data,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     * @param $data
     * ÐÞ¸ÄÓÃ»§ÃÜÂë
     */
    public function getpwdstatus($data){
        $data = array(
            'ac' => 'password',
            'data'=> $data,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     * @param $data
     * ÐÞ¸ÄÓÃ»§ÃÜÂë
     */
    public function updatepw($data){
        $data = array(
            'ac' => 'password',
            'data'=> $data,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     * @param $data
     * ÐÞ¸ÄÓÃ»§Í·Ïñ
     */
    public function setAvatar($data){
        $data = array(
            'ac' => 'avatar',
            'data'=> $data,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     * @param $data
     * @return Ambigous|bool
     * ÓÃ»§×é
     */
    public function getUserGroup($data){
        $data = array(
            'ac' => 'usergroup',
            'data'=> $data,
        );
        return $this->getData('spacecp',array('data'=>$data));
    }

    /**
     *
     */
    public function getCreditSetting($data){
        $data = array(
            'ac' => 'setting',
            'data'=> $data,
        );
        return $this->getData('club',array('data'=>$data));
    }

}