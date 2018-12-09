<?php
/**
 * @name ErrorController
 * @desc 错误控制器, 在发生未捕获的异常时刻被调用
 * @see http://www.php.net/manual/en/yaf-dispatcher.catchexception.php
 * @author root
 */
class ErrorController extends Yaf_Controller_Abstract {
    

    //无权限action
    public function authAction(){
        header('HTTP/1.1 404 Not Found');
	    SmartyAdapter::$templateName = 'licai/error404';
	    SmartyAdapter::display();
    }
	
    //从2.1开始, errorAction支持直接通过参数获取异常
    public function errorAction($exception) {
        var_dump($this->getRequest());die;

        // print();die;
        $error_code = $exception->getCode();
        //$error_message = $exception->getMessage();
        switch($error_code) {
            case 516:
                header('HTTP/1.1 404 Not Found');
                SmartyAdapter::assign ('redirect_host', $_SERVER['HTTP_HOST']);
                SmartyAdapter::$templateName = 'licai/error404';
                break;
            case 404:
                header('HTTP/1.1 404 Not Found');
                SmartyAdapter::$templateName = 'licai/error404';
                break;
            case 403:
                header('HTTP/1.1 404 Not Found');
                if(ISMOBILE){
                    SmartyAdapter::$templateName = 'licai/error404';
                }else{
                    SmartyAdapter::$templateName = 'licai/prohibit';
                }
                break;
            case 517:
	            header('HTTP/1.1 404 Not Found');
	            SmartyAdapter::$templateName = 'licai/error404';
            	break;
            case 505:
            	header('HTTP/1.1 505 Not Found');
            	SmartyAdapter::$templateName = 'licai/datafail';
            	$referer = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            	SmartyAdapter::assign ( 'referer', $referer );
            	break;
        default:
            header('HTTP/1.1 500 Internal Server Error');
            break;
        }
        SmartyAdapter::display();
        // IQTLog::pushNotice('error','[code:'.$error_code.' msg:'.$exception->getMessage().']');
        // IQTLog::end();
    }
    
}
