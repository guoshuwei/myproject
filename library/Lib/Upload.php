<?php   
/**
 * PHP文件上传类
 * @author nengzhi
 * 2015-07-17
 * UTF-8
 * Method of use:
 * TyLib_Upload::getInstance()->init(string,result)->setsavepath();
 */ 
class Lib_Upload{
	
	private static $obj= null;
	private $allowtype	= array('jpg','gif','png');
	private $maxsize   = 5242880;
	private $savepath  = '/var/www/myproject/imgs/nonglian/';
	private $savefilename = 'static';
	private $isdir = true; 
	private $result;
	private $retpath;
     
   /**
    * 获取单例对象
    * @param string $hl
    * @param number $timeout
    * @return TyLib_SolrSearch
    */
   public static function getInstance(){
   		if(is_null(self::$obj)){
    		self::$obj = new Lib_Upload();
    	}
    	return self::$obj;
    }
    
    /**
     * 初始化必要参数设置
     * @param unknown $savepath
     * @param unknown $result
     * @param string $isfilename
     */
    public function init($savefilename, $result){
    	 
    	if(is_string($savefilename) and !empty($result['name'])){
    		$this->savefilename = $savefilename;
    		$this->result   = $result;
    	}
    	return $this;
    }
    
    /**
     * 设置可传图片类型
     * @param unknown $allowtype
     * @return TyLib_Upload
     */
    public function setallowtype($allowtype){
    	if(in_array($allowtype)){
    		$this->allowtype = $allowtype;
    	}
    	return $this;
    }
    
    /**
     * 设置是否启用目录级存储
     * @param unknown $isdir
     * @return TyLib_Upload
     */
    public function setisdir($isdir){
    	if(isset($is_dir)){
    		$this->isdir = $isdir;
    	}
    	return $this;
    }
    
    /**
     * 设置上传文件存储路径(绝对路径)
     * @param unknown $savepath
     * @return TyLib_Upload
     */
    public function setsavepath($savepath){
    	if(is_string($savepath)){
    		$this->savepath = $savepath;
    	}
    	return $this;
    }
    /**
     * 设置最大图片字节数
     * @param unknown $maxsize
     * @return TyLib_Upload
     */
    public function setmaxsize($maxsize){
    	if(is_numeric($maxsize)){
    		$this->maxsize = $maxsize;
    	}
    	return $this;
    }
    
    /**
     * 上传文件
     * @return string
     */
    public function uplodfile(){
    	
    	if(empty($this->result['name'])){
    		return $this->geterror(1);
    	}
    	if($this->result['size'] > $this->maxsize){
    		return $this->geterror(2);
    	}
    	if(!in_array(preg_replace('/.*\.(.*[^\.].*)*/iU','\\1',$this->result['name']),$this->allowtype)){
    		return $this->geterror(3);
    	}
    	if(!is_string($this->savefilename)){
    		return $this->geterror(6);
    	}
    	$path = $this->getfilepath();
    	$is_uploaded = move_uploaded_file($this->result['tmp_name'], $path);
    	if(!$is_uploaded){
    		return $this->geterror(4);
    	}
    	return $this->retpath . '?v=' . time();
    }
    
    /**
     * 获取完整的存放地址
     * @param unknown $filename
     * @return string
     */
    private  function getfilepath(){

    	$path = $this->savepath . $this->savefilename . '/';
    	$datedir = null;
    	if($this->isdir){
    		$datedir = date('Y-m-d', time()) . '/';
    		$path .= $datedir;
    		$ismkdir = $this->mk_dir($path);
    		if(!$ismkdir){
    			return $this->geterror(5);
    		}
    	}
    	$imagename = md5($this->result['name'] . time()) . '.' . preg_replace('/.*\.(.*[^\.].*)*/iU','\\1',$this->result['name']);
    	$path .= $imagename;
    	$this->retpath = '/' . $this->savefilename .'/' . $datedir  . $imagename;
    	return $path;
    }
    
    /**
     * 图片上传创建目录
     * @param type $dir
     * @param type $mode
     * @return boolean
     */
    private function mk_dir($dir, $mode = 0755){
    	if (is_dir($dir) || @mkdir($dir,$mode)){
    		return true;
    	}
    	if (!$this->mk_dir(dirname($dir),$mode)){
    		return false;
    	}
    	return @mkdir($dir,$mode);
    }
    /**
     * 设置上传出错信息
     * @return string
     */
    private function geterror($code = 0) {
    	switch ($code) {
    		case 1: $str = array('没有文件被上传'); break;
    		case 2: $str = array('上传的文件超过最大选项限制的值'); break;
    		case 3: $str = array('未允许类型'); break;
    		case 4: $str = array('上传失败'); break;
    		case 5: $str = array('建立存放上传文件目录失败，请重新指定上传目录'); break;
    		case 6: $str = array('必须指定上传文件的路径'); break;
    		default: $str = array('未知错误');
    	}
    	return $str;
    }
    
	/**
	 * 图片等比缩放处理
	 * @param type $src_file
	 * @param type $max_w
	 * @param type $max_h
	 * @param type $hw  h 按高度缩略 w 按宽度缩略
	 */
	public function ProcessingImages($src_file, $max_w ,$max_h, $hw, $file_extend = 'png'){
		//得到原始的宽高
		$src_info = getimagesize($src_file);
		$src_w = $src_info[0];
		$src_h = $src_info[1];
		//$max_w = intval($max_w/$src_w*$src_h);
		//计算 宽之比 和 高之比
		$scale_w = $src_w/$max_w;
		$scale_h = $src_h/$max_h;
		if($hw == 'h'){
			//比较 宽之比 和 高之比
			if($scale_w > $scale_h) {
				$dst_h = $max_h;
				$dst_w = $dst_h * ($src_w/$src_h);
			} else {
				$dst_w = $max_w;
				$dst_h = $dst_w * ($src_h/$src_w);
			}
		}else{
			//比较 宽之比 和 高之比
			if($scale_w > $scale_h) {
				$dst_w = $max_w;
				$dst_h = $dst_w * ($src_h/$src_w);
			} else {
				$dst_h = $max_h;
				$dst_w = $dst_h * ($src_w/$src_h);
			}
		}
		//创建原始和目标（缩略图）
		//有新类型请自行添加
		if($file_extend == 'png'){
			$src_img = imagecreatefrompng($src_file);
		}else if($file_extend == 'jpg'){
			$src_img = imagecreatefromjpeg($src_file);
		}else if($file_extend == 'gif'){
			$src_img = imagecreatefromgif($src_file);
		}
		$dst_img = imagecreatetruecolor($dst_w, $dst_h);
	
		//采样-拷贝-修改大小
		imagecopyresampled($dst_img, $src_img, 0, 0, 0, 0, $dst_w, $dst_h, $src_w, $src_h);
		return $dst_img;
	}
	
	/**
	 * 解析base64字符串为图片并保存到指定目录
	 * @param unknown $base64_str
	 * @param unknown $save_path(绝对路径)
	 * @return NULL
	 */
	public function getBase64Images($base64_str, $save_path){
		
		if(!$base64_str){
			return null;
		}
		$this->mk_dir($save_path);
		$images = base64_decode($base64_str);
		$save_path = $save_path . md5($base64_str) . '.png';
		$result = file_put_contents($save_path, $images);
		return $save_path;
	}
	/**
	 * 裁剪图片
	 * @param unknown $src_file
	 * @param unknown $src_x
	 * @param unknown $src_y
	 * @param string $file_extend
	 * @return unknown
	 */
	public function tailoringImg($src_file, $src_x, $src_y, $file_extend = 'png'){
		
		//创建原始和目标（缩略图）
		//有新类型请自行添加
		if($file_extend == 'png'){
			$src_img = imagecreatefrompng($src_file);
		}else if($file_extend == 'jpg'){
			$src_img = imagecreatefromjpeg($src_file);
		}else if($file_extend == 'gif'){
			$src_img = imagecreatefromgif($src_file);
		}
		$dst_img = imagecreatetruecolor($src_x, $src_y);
		//裁剪
		imagecopy( $dst_img, $src_img, 0, 0, 0, 0, $src_x, $src_y);
		return $dst_img;
	}
	
	//上传并压缩图片
	public function upload_thumb($max_w=200, $max_h=200, $hw='h'){
	    if(empty($this->result['name'])){
	        return array('code'=>40001, 'data'=>$this->geterror(1)[0]);
	    }
	    if($this->result['size'] > $this->maxsize){
	        return array('code'=>40002, 'data'=>$this->geterror(2)[0]);
	    }
	    if(!is_string($this->savefilename)){
	        return array('code'=>40006, 'data'=>$this->geterror(6)[0]);
	    }
	    //得到原始图片的类型、宽高
	    $src_info = getimagesize($this->result['tmp_name']);
	    $img_type = $src_info['mime'];
	    if (!in_array($img_type, array('image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'))) {
	        return array('code'=>40003, 'data'=>$this->geterror(3)[0]);
	    }
	    //获取大图、小图的绝对路径、网络路径
	    $path = $this->savepath . $this->savefilename . '/';
	    $datedir = null;
	    $timest = time();
	    if($this->isdir){
	        $datedir = date('Y-m-d', $timest) . '/';
	        $path .= $datedir;
	        $ismkdir = $this->mk_dir($path);
	        if(!$ismkdir){
	            return array('code'=>40005, 'data'=>$this->geterror(5)[0]);
	        }
	    }
	    $img_extend = $this->getImgExtend($img_type);
	    $name_md5 = md5($this->result['name'] . $timest);
	    $imagename_b = $name_md5 . '.' . $img_extend;
	    $img_path_b_ab = $path.$imagename_b;//大图绝对路径
	    $img_path_b_net = '/' . $this->savefilename .'/' . $datedir  . $imagename_b;//大图网络路径
	    $img_path_s_net = $img_path_b_net;//小图网络路径
	    $is_uploaded = move_uploaded_file($this->result['tmp_name'], $img_path_b_ab);
	    if(!$is_uploaded){
	        return array('code'=>40004, 'data'=>$this->geterror(4)[0]);
	    }
	    if($src_info[0] >= $max_w or $src_info[1] >= $max_h){//需要压缩
	        $imagename_s = $name_md5 . '_s.' . $img_extend;
	        $img_path_s_ab = $path.$imagename_s;
	        $img_path_s_net = '/' . $this->savefilename .'/' . $datedir  . $imagename_s;
	        $resultImage = TyLib_Upload::getInstance()->ProcessingImages($img_path_b_ab, $max_w, $max_h, $hw, $img_extend);
	        if($img_extend == 'png'){
	            imagepng($resultImage, $img_path_s_ab);
	        }else if($img_extend == 'jpg'){
	            imagejpeg($resultImage, $img_path_s_ab);
	        }else if($img_extend == 'gif'){
	            imagegif($resultImage, $img_path_s_ab);
	        }
	    }
	    return array(
	        'code' => 200,
	        'data' => '',
	        'imgurl_b' => $img_path_b_net,
	        'imgurl_s' => $img_path_s_net,
	        'message' => 'ok'
	    );
	}
	
	private function getImgExtend($img_type){
	    $img_extend = 'jpg';
	    switch($img_type) {
	        case 'image/jpg' :
	        case 'image/jpeg' :
	        case 'image/pjpeg' :
	            $img_extend = 'jpg';
	            break;
	        case 'image/png' :
	            $img_extend = 'png';
	            break;
	        case 'image/gif' :
	            $img_extend = 'gif';
	            break;
	    }
	    return $img_extend;
	}
	
}