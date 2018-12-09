<?php
function smarty_modifier_sale_status($begin_time,$end_time=0,$nohtml=0)
{
    $now = strtotime(date('Y-m-d',time()));

    if(intval($begin_time)<10){
        switch ($begin_time) {
            case 1:
                $status = $nohtml?'在售':'<div class="status">在售</div>';
                break;
            case 2:
                $status = $nohtml?'预售':'<div class="status">预售</div>';
                break;
            case 3:
                $status = $nohtml?'停售':'<div class="status over">停售</div>';
                break;
            
            default:
                $status = '--';
                break;
        }

        return $status;
    }
    // print_r($end_time.":".time());
    
    if($begin_time > $now){
    	$days = ceil(($begin_time -$now)/86400);
    	if($days ==1 )
    		return $nohtml?"明天发售":'<div class="status">明天发售</div>';
    	else
    		return $nohtml?$days.'天后发售':'<div class="status">'.$days.'天后发售</div>';
    }
    else if($end_time>$now){
    	return $nohtml?'在售':'<div class="status">在售</div>';
    }else{
    	return $nohtml?'停售':'<div class="status over">停售</div>';
    }

    return '--';
} 
?>