<?php
/**
 * SmartyAdapter class
 * 提供方便地调用smarty,以及可简单配置表态，数据缓存页面的smarty接口类
 * 为了更好的使用缓存带来的性能优化，建议在获取数据前判断页面是否在缓存阶段，以减小后续的数据请求等
 * @package iqt
 * @author  mt
 */

require_once('Third/Smarty/Smarty.class.php');

class SmartyAdapter {

    public static $smartyConfig = null;
    public  static $templateCacheConfig = null;
    private static $instance = null;
    public static  $templateName = null;
    private static $smartyInstance = null;

    //不使用smartyAdapter，默认开启
    public static $disable = false;

    public static function setConfig($config){
        self::$smartyConfig = $config;	
    }

    public static function setCacheConfig($config){
        self::$templateCacheConfig = $config;
    }

    public static function disable(){
        self::$disable = true;
    }

    public static function enable(){
        self::$disable = false;
    }

    public static function setLeftDelimiter($str){
        $smarty = self::getSmarty();
        $smarty->left_delimiter = str;
    }
    public static function setRightDelimiter($str){
        $smarty = self::getSmarty();
        $smarty->right_delimiter = $str;
    }

    /**
     * class static function getSmarty
     * 获取一个Smary单例
     * @return smarty instance;
     *
     */
    public static function getSmarty() {

        if(!self::$smartyInstance || empty(self::$smartyInstance)) {
            
            self::$smartyInstance = new Smarty();

            if(self::$smartyConfig) {
                foreach(self::$smartyConfig as $config => $value) {

                    if($config != 'suffix' && $config != 'plugins_dir' && $config != 'template_path') {
                        self::$smartyInstance -> $config = $value;
                    }
                    if($config == 'plugins_dir' && is_array(self::$smartyInstance->plugins_dir)) {
                        
                        $plugins_dir = array_merge(self::$smartyInstance->plugins_dir,array($value));
                      
                        self::$smartyInstance->plugins_dir = $plugins_dir;
                    }
                }
            }
        }

        return self::$smartyInstance;
    }

    /**
     * class static function getCacheConfig
     * 获取模板缓存配置
     * @param $tplName 模板名称
     * @param $cacheParams 缓存参数数据组
     * @param $suitedKeys 模板对应的适配参数keys数组
     * @return config array or null
     *
     */
    public static function getCacheConfig() {
        
        if( $config = self::$templateCacheConfig) {

            //存在有效的key时
            if(isset($config['key']) && is_array($config['key']) && count($config['key'])>0){
                $cache_key = self::getMD5($config['key']).self::getMD5(self::$templateName);
            }else{
                $cache_key = self::getMD5(self::$templateName);
            }

            return array(
                'NEED_CACHE' => $config['cache'], 
                'LIFE_TIME' => $config['lifeTime'], 
                'CACHE_KEY' => $cache_key 
            );  
        }

        return null;
    }

    /**
     * class static function fetch
     * 提供Smarty 的fetch方法(附加缓存判断)
     * @param $template 需要渲染的模板路径
     * @param $cacheParams 缓存参数
     * @return buildedhtml content
     *
     */
    public static function fetch($data=null) {
        
        $smarty = self::getSmarty();
        
        $cacheParams = self::getCacheConfig();

        $tplFile = self::getTplFile();
        
         //赋值
        if(!empty($data) && is_array($data))
            $smarty ->assign($data);

        if(is_null($cacheParams) || (isset($cacheParams['NEED_CACHE']) && !$cacheParams['NEED_CACHE'])) {
            $smarty -> setCaching(Smarty::CACHING_OFF);
            return $smarty -> fetch($tplFile,$data);
        } else {
            $smarty -> setCaching($cacheParams['NEED_CACHE']);
            $smarty -> setCacheLifetime($cacheParams['LIFE_TIME']);
            return $smarty -> fetch($tplFile,$cacheParams['CACHE_KEY']);
        }
    }

    /**
     * class static function display
     * 输出模板
     * @param $template 模板路径
     * @param $cacheParams 缓存参数
     * @return void
     *
     */
    public static function display($data = array(),$cacheParams = null) {
    
        $smarty = self::getSmarty();
       
        if(empty($cacheParams))
            $cacheParams = self::getCacheConfig();

        $tplFile = self::getTplFile();
        
        //赋值
        if(!empty($data) && is_array($data))
            $smarty ->assign($data);
        
        if(is_null($cacheParams) || (isset($cacheParams['NEED_CACHE']) && !$cacheParams['NEED_CACHE'])) {
            $smarty -> setCaching(Smarty::CACHING_OFF);
            $smarty -> display($tplFile);
        } else {
            $smarty -> setCaching($cacheParams['NEED_CACHE']);
            $smarty -> setCacheLifetime($cacheParams['LIFE_TIME']);
            $smarty -> display($tplFile,$cacheParams['CACHE_KEY']);
        }
    }
    /* 
    * 获取模板文件名，包括后缀
    */
    private static function getTplFile(){
        if(!preg_match('/\.'.self::$smartyConfig['suffix'].'/', self::$templateName))
            $tplFile = self::$templateName.'.'.self::$smartyConfig['suffix'];
        else
            $tplFile = self::$templateName;
        return $tplFile;
    }

    /**
     * class static function getMD5
     * 判断逻辑参数的MD5
     * @param $cacheParams 缓存参数
     * @return md5
     *
     */
    protected static function getMD5($cacheParams) {
        return    md5(print_r($cacheParams, true));
    }

    /**
     * class static function assign
     * 模板变量赋值
     * @param $spec 变量key/变量key,value数组
     * @param $value 变量value
     * @return void
     *
     */
    public static function assign($spec, $value =null) {
        
        $smarty = self::getSmarty();

        if(is_array($spec) && count($spec)>0) {
            $smarty -> assign($spec);
        }

        $smarty -> assign($spec, $value);
    }

    /**
     * class static function clearVars
     * 清除模板所有变量
     *
     * @return void
     *
     */
    public static function clearVars() {
        $smarty = self::getSmarty();
        $smarty -> clear_all_assign();
    }

    /**
     * class static function distroy
     * 销毁类存储的参数以及实例
     *
     * @return void
     *
     */
    public static function distroy() {

        self::$instance = null;
        self::$smartyInstance = null;
        self::$smartyConfig = null;
        self::$templateCacheConfig = null;
        self::$templateName = null;
    }

    /*
     * class static function clearCache
     * 清除模板缓存
     */
    public static function clearCache() {

        $config = self::getCacheConfig();
        $smarty = self::getSmarty();

        $tplFile = self::getTplFile();

        if(is_null($config) || (isset($config['NEED_CACHE']) && !$config['NEED_CACHE'])) {
            $smarty -> clearCache($tplFile, $config['CACHE_KEY']);
        } else {
            $smarty -> clearCache($tplFile);
        }
    }
    /*
    * 清除所有缓存
    * 上线前记得调用此方法，不然很多东西很难预期哦，要当心，特别是上线的时候上几次的缓存还没过期的时候
    */
    public static function clearAllCache(){
        $smarty = self::getSmarty();
        $smarty -> clearAllCache();
    }

    /*
     * class static function isCached
     * 判断模板是否缓存
     * @param String 模板名
     * @param Bool 是否被缓存 
     */
    public static function isCached() {
        $smarty = self::getSmarty();

        $config = self::getCacheConfig();
        $tplFile = self::getTplFile();

        if(!is_null($config) || (isset($config['NEED_CACHE']) && !$config['NEED_CACHE'])) {
            $smarty -> setCaching($config['NEED_CACHE']);
            $smarty -> setCacheLifetime($config['LIFE_TIME']);
            return $smarty -> isCached($tplFile, $config['CACHE_KEY']);
        }

        return false;
    }

    /*
    * class static fncton getVar
    * 获取模板变量
    * @param String|null 要获取的变量
    * @return VarValue 
    */
    public static function getTplVars($key=null){
        $smarty = self::getSmarty();
        return $smarty->getTemplateVars($key);
    }


    /*生成html*/
    public static function buildHtml($tplFile,$data=array()){
        $smarty = self::getSmarty();
        return $smarty -> fetch($tplFile,$data);
    }

    public static function disableCache(){
        $smarty = self::getSmarty();
        $smarty->caching = 0;
    }

}

// END
