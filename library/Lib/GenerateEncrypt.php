<?php
/**
 * 字符串加密解密(对称式)
 * @author NengZhi
 * 2014-10-23
 * UTF-8
 */
class Lib_GenerateEncrypt{
    
    /**
	 * 获取单例对象
	 * @param string $hl
	 * @param number $timeout
	 * @return TyLib_GenerateEncrypt
	 */
	public static function getInstance(){
		if(is_null(self::$obj)){
			self::$obj = new Lib_GenerateEncrypt();
		}
		
		return self::$obj;
	}
    
    /**
     * 密文预处理
     * @param   string $txt 要加解密的字符串
     * @param   string $key 对称密匙
     * @return  string 
     */     
	protected static function keyED($txt,$encrypt_key){ 
		$encrypt_key = md5($encrypt_key); 
		$ctr = 0; 
		$tmp = ""; 
		for ($i=0;$i<strlen($txt);$i++){ 
			if ($ctr==strlen($encrypt_key)) $ctr=0; 
            $tmp.= substr($txt,$i,1) ^ substr($encrypt_key,$ctr,1);
            $ctr++;
        }
		return $tmp; 
	}

    /**
     * 加密字符串
     * @param   string $txt 要加密的字符串
     * @param   string $key 对称密匙
     * @return  string 
     */
	public static function encrypt($txt,$key){ 
		$encrypt_key = md5(((float) date("YmdisH") + rand(100000,999999)).rand(10000,99999)); 
		$ctr=0; 
		$tmp = ""; 
		for ($i=0;$i<strlen($txt);$i++){ 
			if ($ctr==strlen($encrypt_key)) $ctr=0; 
			$tmp.= substr($encrypt_key,$ctr,1) . (substr($txt,$i,1) ^ substr($encrypt_key,$ctr,1)); 
			$ctr++; 
		} 
		return self::base64encode(self::keyED($tmp,$key)); 
	}

    /**
     * 解密字符串
     * @param   string $txt 要解密的字符串
     * @param   string $key 对称密匙
     * @return  string 
     */
	public static function decrypt($txt,$key){ 
		
		$txt = self::keyED( self::base64decode($txt),$key); 
		$tmp = ""; 
		for ($i=0;$i<strlen($txt);$i++){ 
			$md5 = substr($txt,$i,1); 
			$i++; 
			$tmp.= (substr($txt,$i,1) ^ $md5); 
		} 

		return $tmp; 
	}
    
    /**
     * 解密核心
     * @param   string  $str 要解密的字符串
     * @return  string
     */
	public static function base64decode($str) {
		return base64_decode(str_pad(strtr($str, '-_', '+/'), strlen($str) % 4, '=', STR_PAD_RIGHT));
	}
    
    /**
     * 加密核心
     * @param   string  $str 要加密的字符串
     * @return  string
     */
	public static function base64encode($str){
		return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
	}
    
}