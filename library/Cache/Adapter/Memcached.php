<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-23
 * UTF-8
 */
class Cache_Adapter_Memcached extends Cache_Abstract implements Cache_Interface{
    private $mem = null;
    
    function __construct($cache_config) {
        $this->mem = new Memcached ();
        foreach ( $cache_config as $config ) {
            $this->mem->addserver ( $config ['host'], $config ['port'], $config ['weight'] );
        }
    
    }
    /**
     * {@inheritDoc}
     * @see TyCache_Interface::set()
     */
    public function set($key, $value, $expire=600)
    {
        $obj = serialize($value);
        $result = $this->mem->replace($key,$obj,$expire);
        
        if(!$result){
        	$result = $this->mem->set($key,$obj,$expire);
        }
        return $result;
    }

    /**
     * {@inheritDoc}
     * @see TyCache_Interface::get()
     */
    public function get($key)
    {
        $result = $this->mem->get($key);
		if(!empty($result)){
			$result = unserialize($result);
		}
		return $result;
        
    }

    /**
     * {@inheritDoc}
     * @see TyCache_Interface::delete()
     */
    public function delete($key)
    {
    	return $this->mem->delete($key);
        // TODO Auto-generated method stub
    }
    
}