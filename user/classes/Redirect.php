<?php
class Redirect{
	public static function to($location){
		if($location){
			if(is_numeric($location)){
				switch($location){
					case 404:
						include '/includes/error/404.php';
					break;
					

				}
			}
			header("Location:{$location}");
			exit();
		}
	}
}