<?php
class Client extends Yar_Client{
    public function execute($method,$params){
        try {
            // Vendor('Log.Log');
            // $log = new \Log();
            $res = call_user_func_array(array($this,$method),array($params));
            //$log::write('residecity','111',json_encode($res));
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