<?php
class TyLib_Yar extends Yar_Client{
    public function execute($method,$params){
        try {
            $res = call_user_func_array(array($this,$method),$params);
        } catch (Yar_Client_Exception $e) {
                echo $e->getType(); echo '<br>';
                echo $e->getMessage();echo '<br>';
                echo $e->getPrevious();echo '<br>';
                echo $e->getFile();echo '<br>';
                echo $e->getLine();echo '<br>';
                echo $e->getTraceAsString();echo '<br>';
                return false;
        }
        return $res;
    }
}