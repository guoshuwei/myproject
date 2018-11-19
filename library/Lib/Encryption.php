<?php

/**
 * 
 * @author wangtao@p2peye.com
 * @copyright 
 * @version 1.0
 */
class Lib_Encryption{
    private $algorithm;
    private $mode;
    private $iv;

    public function __construct($algorithm = 'tripledes',$mode = 'ecb',$iv = MCRYPT_RAND){
        if(!extension_loaded('mcrypt')){
            throw new Exception("extension not loaded");
        }
        $this->algorithm = $algorithm;
        $this->mode = $mode;
        $this->iv = $iv;
    }

    /*
     * ¼ÓÃÜ 3des + base64_encode + urlencode
     * @param input string
     * @param key string
     * */
    public function encrypt($input, $key){
        //¼ÓÃÜÇ°±£Ö¤inputºÍkeyµÄÓÐÐ§ÐÔ
        $input = trim($input);
        //´ò°ü
        $input = $this->pkcs7_pad($input);
        //³õÊ¼»¯¼ÓÃÜÄ£¿é
        $td = mcrypt_module_open($this->algorithm, '', $this->mode, '');
        //³õÊ¼»¯ÏòÁ¿
        $iv = '';
        if($this->iv){
            $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), $this->iv);
        }
        //³õÊ¼»¯¼ÓÃÜ¿Õ¼ä ecbÄ£Ê½²»ÐèÒªÏòÁ¿£¬»á×Ô¶¯ºöÂÔ
        mcrypt_generic_init($td, $key, $iv);
        $encrypted_data = mcrypt_generic($td, $input);
        //ÊÍ·Å¿Õ¼ä
        mcrypt_generic_deinit($td);
        //¹Ø±ÕÄ£¿é
        mcrypt_module_close($td);
        $encrypted_data = base64_encode($encrypted_data);
        $encrypted_data = urlencode($encrypted_data);
        return $encrypted_data;
    }

    /*
     * ¶ÔÊý¾Ý·Ö¿é
     * @param data string
     * */
    private function pkcs7_pad($data){
        $blockSize = mcrypt_get_block_size($this->algorithm, $this->mode);
        $len = strlen($data);
        $pad = $blockSize - ($len % $blockSize);
        $data .= str_repeat(chr($pad), $pad);
        return $data;
    }

    /*
     * ½âÃÜ [urldecode] + base64_decode + 3des
     * @param input string
     * @param key string
     * */
    private function pkcs7_unpad($data){
        $len = strlen($data);
        $pad = ord($data[$len-1]);
        return substr($data, 0, strlen($data) - $pad);
    }

    /*
     * ¶ÔÊý¾Ý·Ö¿é
     * @param data string
     * */
    public function decrypt($input, $key,$url_decoded = false){
        if(!$url_decoded){
            $input = urldecode($input);
        }
        $input = base64_decode($input);
        $td = mcrypt_module_open($this->algorithm, '', $this->mode, '');
        $iv = '';
        if($this->iv){
            $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), $this->iv);
        }
        mcrypt_generic_init($td, $key, $iv);
        $decrypted_data = mdecrypt_generic($td, $input);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        $decrypted_data = $this->pkcs7_unpad($decrypted_data);
        return $decrypted_data;
    }

    /*
     * Êý×éÅÅÐò
     * @param array data
     * */
    public static function sort_assoc($data) {
        $new = array();
        foreach($data as $key=>$val){
            $key = strtolower($key);
            $new[$key] = $val;
        }
        ksort($new);
        return $new;
    }

    /*
     * Æ´½ÓÊý¾Ý
     * @param array data
     * */
    public static function build_data($data){
        $data = self::sort_assoc($data);
        $data_str = '';
        foreach($data as $key=>$val){
            $data_str .= $key.'='.$val.'&';
        }
        $data_str = rtrim($data_str,'&');
        return $data_str;
    }

    /*
     * ½âÎöÆ´½ÓÊý¾Ý
     * @param string str
     * */
    public static function parse_data($str){
        $arr = array();
        $pairs = explode('&', $str);
        foreach ($pairs as $i) {
            list($name,$value) = explode('=', $i, 2);
            if( isset($arr[$name]) ) {
                if( is_array($arr[$name]) ) {
                    $arr[$name][] = $value;
                }
                else {
                    $arr[$name] = array($arr[$name], $value);
                }
            }
            else {
                $arr[$name] = $value;
            }
        }
        return $arr;
    }

    //for test
    public function test($str,$key = '12345678'){
        header("Content-type: text/html; charset=utf-8");
        echo 'Ô­ÎÄ:'.$str.'<br>';
        $en = $this->encrypt($str,$key);
        echo 'ÃÜÎÄ:'.$en.'<br>';
        $de = $this->decrypt($en,$key);
        echo '½âÃÜ:'.$de.'<br>';
    }
}
