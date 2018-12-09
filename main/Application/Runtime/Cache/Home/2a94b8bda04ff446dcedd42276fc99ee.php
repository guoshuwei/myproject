<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
<title>农联网</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="shop project">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/lib/bootstrap4/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/css/main_styles.css">
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/css/responsive.css">

</head>
<body>
    <div class="super_container">
    
    <!-- Header -->
    
    <header class="header">
    
    <!-- Top Bar -->


    <div class="top_bar">
      <div class="container">
        <div class="row">
          <div class="col d-flex flex-row">
            <div class="top_bar_contact_item"><div class="top_bar_icon"><img src="/images/phone.png" alt=""></div>农联网LOGO</div>
            <div class="top_bar_contact_item"><div class="top_bar_icon"><img src="/images/mail.png" alt=""></div><a href="mailto:fastsales@gmail.com"></a></div>
            <div class="top_bar_content ml-auto">
              <div class="top_bar_menu">
                <ul class="standard_dropdown top_bar_dropdown">
                </ul>
              </div>
              <div class="top_bar_user">
                <div class="user_icon"><img src="/images/user.svg" alt=""></div>
                <?php if($logining_user_name != ''): ?><div><?php echo ($logining_user_name); ?></div>
                <?php else: ?>
                  <div><a href="/myproject/user/login.php">登录</a></div>
                  <div><a href="/myproject/user/register.php">注册</a></div><?php endif; ?>
                <div><a href="/myproject/cart/public/home.php">交易平台</a></div>
                <div><a href="/myproject/business/application.php">商户入口</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
    
     <!-- Top Bar -->




  


	    <!-- Main Navigation -->
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/plugins/vanilla-js-carousel.css">
    <nav class="main_nav">
      <div class="container">
        <div class="row">
          <div class="col">
            
            <div class="main_nav_content d-flex flex-row">
              <!-- Main Nav Menu -->
              <div class="main_nav_menu">
                <ul class="standard_dropdown main_nav_dropdown">
                  <li><a href="#">首页<i class="fas fa-chevron-down"></i></a></li>
                  <?php if(is_array($navlist)): foreach($navlist as $k=>$navlist): ?><li class="hassubs">
	                    <a href="<?php echo U($navlist['jump_url']);?>"><?php echo ($navlist['name']); ?><i class="fas fa-chevron-down"></i></a>
	                  </li><?php endforeach; endif; ?>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

<!-- Banner -->

  <div class="banner">
  	
    <div class="banner_background" style="background-color:#f3f3f3">
    	<div class="js-Carousel" id="carousel" style="height:350px;">
    		<ul>
    		<?php if(is_array($bannerlist)): foreach($bannerlist as $k=>$item): ?><li><?php echo ($item['src']); ?></li><?php endforeach; endif; ?>
    		</ul>
    	</div>
    </div> 
  </div>
	<div class="deals_featured">
		<div class="container">
			<div class="row">
				<div class="col d-flex flex-lg-row flex-column align-items-center justify-content-start">
					<!-- Deals -->
					<div class="deals" style="height:403px;">
						<div class="deals_title">一周内排行</div>
						<div class="deals_slider_container" id="slider_container_1">
							<div class="js-Carousel" id="carousel_2" style="width:300px;background:#fff;opacity:0.9;">
					    		<ul style="z-index:50">
					    		<?php if(is_array($index_weeklist_item)): foreach($index_weeklist_item as $k=>$item): ?><li style="width:300px;"><img src="/myproject/imgs/index/201805141320292249.jpg" alt="">
					    			<span style="display:inline-block;height:40px;overflow:hidden;">	
					    				<a href="<?php echo U('content/week','id='.$k);?>"><?php echo ($item['title']); ?></a>
					    			</span>
					    			</li><?php endforeach; endif; ?>
					    		</ul>
					    	</div>
						</div>
					</div>
					<!-- Deals -->
					<div class="deals" style="height:403px;">
						<div class="deals_title">头条</div>
						<div class="deals_slider_container" id="slider_container_1">
							<div style="width:300px;background:#fff;opacity:0.9;">
					    		<ul style="z-index:50" >
									<?php if(is_array($toutiaolist)): foreach($toutiaolist as $k=>$list): ?><li><a href="<?php echo U('content/toutiao','id='.$k);?>"><?php echo ($list['title']); ?></a></li><?php endforeach; endif; ?>  
						        </ul>
					    	</div>
						</div>
					</div>
					<!-- Deals -->
					<!-- Deals -->
					<div class="deals" style="height:403px;">
						<div class="deals_title">行业观察</div>
						<div class="deals_slider_container" id="slider_container_1">
							<div style="width:300px;background:#fff;opacity:0.9;">
					    		<ul style="z-index:50" >
									<?php if(is_array($hygclist)): foreach($hygclist as $k=>$list): ?><li><a href="<?php echo U('content/hygc','id='.$k);?>"><?php echo ($list['text']); ?></a></li><?php endforeach; endif; ?>
						        </ul>
					    	</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<style>
		.col-lg-3{
			/*max-width:24% !important*/
		}
		.mid ul.mid-1 li, .focus-ad-box .mid ul.mid-2 li {
		    width: 31.333333%;
		    margin-left: 2%;
		    float: left;
		}
		.mid ul.mid-1 li, .focus-ad-box .mid ul.mid-2 li {
		    width: 31.333333%;
		    margin-left: 2%;
		    float: left;
		}
		.focus-ad-pic li {
		    height: 80px;
		    position: relative;
		    overflow: hidden;
		}
		.focus-ad-box {
		    border: 2px solid #7aaf1c;
		    margin-left: 10px;
    		margin-right: 10px;
		}
	</style>
	<div class="container">
			<!-- <div class="viewed_title_container">
				<h3 class="viewed_title">招商</h3>
			</div> -->
		<div class="row" style="margin-left:10px;margin-right:10px;">
			<img src="/myproject/imgs/index/guanggao1.jpg" alt="" style="width:1120px;">
		</div>
	</div>
	<!-- 招商 -->
	<div class="container">
		<div class="row">
			<!-- Char. Item -->
			<div class="col-lg-3 col-md-6 char_col">
				
				<div class="char_item d-flex flex-row align-items-center justify-content-start">
					<div class="char_icon">
						<a href="/myproject/business/application.php" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_4"><img src="/myproject/imgs/jinnong/bb.jpg" width="240" height="80"></a>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 char_col">
				
				<div class="char_item d-flex flex-row align-items-center justify-content-start">
					<div class="char_icon">
						<a href="<?php echo U('/zhaoshang/list','id=1');?>" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_4"><img src="/myproject/imgs/jinnong/1.gif" width="240" height="80"></a>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 char_col">
				
				<div class="char_item d-flex flex-row align-items-center justify-content-start">
					<div class="char_icon">
						<a href="<?php echo U('/zhaoshang/list','id=2');?>" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_4"><img src="/myproject/imgs/jinnong/mq.gif" width="240" height="80"></a>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 char_col">
				
				<div class="char_item d-flex flex-row align-items-center justify-content-start">
					<div class="char_icon">
						<a href="<?php echo U('/zhaoshang/list','id=3');?>" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_4"><img src="/myproject/imgs/jinnong/c.gif" width="240" height="80"></a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
			<!-- <div class="viewed_title_container">
				<h3 class="viewed_title">品牌</h3>
			</div> -->
			<div class="row focus-ad-box">
				<div class="col-md-3 mb">
	                <div class="weather pn">
	                  	<div class="lft" style="float:left;line-height:32px;margin-left:27px;">
				          <ul>
				            
				            <li><a href="<?php echo U('branch/list');?>">欧玥女装2018春季新品</a></li>
				            
				            <li><a href="http://zs.ef360.com/items/xiaolingdang/" target="_blank">智能童装领导者小铃铛</a></li>
				            
				            <li><a href="http://zs.ef360.com/Items/mengdukids/" target="_blank">萌度小童邀您加盟！</a></li>
				            
				            <li><a href="http://brand.ef360.com/11797/" target="_blank">桃花季内衣加盟万元起步</a></li>
				            
				            <li><a href="http://zs.ef360.com/Items/guimi/" target="_blank">消费者青睐的闺秘内衣</a></li>
				            
				          </ul>
				        </div>
	                </div>
              	</div>

				<!-- Char. Item -->
				<div class="col-md-6 mb">
	                <div class="message-p pn">
	                  <div class="message-header">
	                    <h5>DIRECT MESSAGE</h5>
	                  </div>
	                  <div class="row">
	                    <div class="mid">
				          <ul class="mid-1 clearfix">
				            
				            <li><a href="http://zs.ef360.com/Items/hokabr/" target="_blank">源自巴黎轻奢女装红凯贝尔</a></li>
				            
				            <li><a href="http://brand.ef360.com/102682/" target="_blank">依路佑妮女装开1店送2店</a></li>
				            
				            <li><a href="http://zs.ef360.com/Items/Loucymiel/" target="_blank">路西·米儿童装品牌招商</a></li>
				            
				          </ul>
				          <div class="focus-ad mid-3 clearfix">
				            <ul class="focus-ad-pic cont">
				              
				              <li><i class="icon-ad-tip2"></i><a href="http://fashion.ef360.com/Articles/2018-10-19/176709.html" target="_blank" class="ef360_ad" data-adcode="index_FocusPic_580_80_1"><img src="http://img.ef360.com/EditManager/FileCustomer/news/201810/201810210137094564_580x80.jpg" width="580" height="80" alt="YING CHOI 2019S上海时装周GALALAND大秀"></a></li>
				            
				            </ul>
				          </div>
				          <ul class="mid-2 clearfix">
				            
				            <li><a href="http://zs.ef360.com/Items/Yosum/" target="_blank">YOSUM衣诗漫女装诚邀加盟</a></li>
				            
				            <li><a href="http://zs.ef360.com/items/dins/" target="_blank"><b>棉麻文艺女装--底色</b></a></li>
				            
				            <li><a href="http://zs.ef360.com/Items/jiemilandi/" target="_blank">快时尚童装品牌杰米兰帝</a></li>
				            
				          </ul>
				        </div>
	                  </div>
	                </div>
	                <!-- /Message Panel-->
	             </div>


				<!-- Char. Item -->
				<div class="col-md-3 mb">
	                <div class="weather pn">
	                  	<div class="rft" style="float:left;line-height:32px;margin-left:27px">
				          <ul>
				            
				            <li><a href="http://product.ef360.com/album-103371/" target="_blank">欧玥女装2018春季新品</a></li>
				            
				            <li><a href="http://zs.ef360.com/items/xiaolingdang/" target="_blank">智能童装领导者小铃铛</a></li>
				            
				            <li><a href="http://zs.ef360.com/Items/mengdukids/" target="_blank">萌度小童邀您加盟！</a></li>
				            
				            <li><a href="http://brand.ef360.com/11797/" target="_blank">桃花季内衣加盟万元起步</a></li>
				            
				            <li><a href="http://zs.ef360.com/Items/guimi/" target="_blank">消费者青睐的闺秘内衣</a></li>
				            
				          </ul>
				        </div>
	                </div>
              	</div>
			</div>
	</div>
	<style>	
		.custom-box{
			padding-top:20px;
		}

		.table td, .table th {
    		padding: .75rem;
    		vertical-align: top;
    		border-top: 0px solid #e9ecef
		}; 
	</style>
	<div class="container">
		
		<div class="row">
          <div class="col-lg-12">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="float:left">
            	<div class="custom-box">
	                <div class="content-panel">
	              		<h4><i class="fa fa-angle-right"></i>玉米价格</h4>
	              		<hr>
			              <table class="table">
			                <tbody>
			                	<?php if(is_array($yumi_index_item)): foreach($yumi_index_item as $k=>$item): ?><tr>
										<td><a href="<?php echo ($item['link']); ?>"><?php echo ($item['title']); ?></a></td>
			                  		</tr><?php endforeach; endif; ?>
			                </tbody>
			              </table>
	            	</div>
	              </div>
              <!-- end custombox -->
            </div>
            <!-- end col-4 -->
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="float:left">
                <div class="custom-box">
	                <div class="content-panel">
	              		<h4><i class="fa fa-angle-right"></i>大米价格</h4>
	              		<hr>
			             <table class="table">
			                <tbody>
			                	<?php if(is_array($dami_index_item)): foreach($dami_index_item as $k=>$item): ?><tr>
										<td><a href="<?php echo ($item['link']); ?>"><?php echo ($item['title']); ?></a></td>
			                  		</tr><?php endforeach; endif; ?>
			                </tbody>
			            </table>
	            	</div>
	              </div>
              <!-- end custombox -->
            </div>
            <!-- end col-4 -->
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="float:left">
            	<div class="custom-box">
	                <div class="content-panel">
	              		<h4><i class="fa fa-angle-right"></i>猪肉价格</h4>
	              		<hr>
			              <table class="table">
			                	<?php if(is_array($zhu_index_item)): foreach($zhu_index_item as $k=>$item): ?><tr>
										<td><a href="<?php echo ($item['link']); ?>"><?php echo ($item['title']); ?></a></td>
			                  		</tr><?php endforeach; endif; ?>
			              </table>
	            	</div>
	              </div>  
              <!-- end custombox -->
            </div>
            <!-- end col-4 -->
          </div>
          <!--  /col-lg-12 -->
        </div>
	</div>
	    <style type="text/css">
        #_ideConac{
            position: relative;
            display:block;
            width:100%;
            text-align:right;
            margin-top:-150px;
            bottom:0px !important;
            right:0px !important;
        }
         #_ideConac img{padding-right:60px;margin-top:-36px;}
    </style>
    <div>  
        <div class="index_bottom1" style="height:160px;">
        	<div style="text-align:center">
            	<p class="bottom_p1">联系我们</p>
                <p class="bottom_p2">地址：北京市大兴区黄村镇兴丰大街（三段）56号  电话：010-69247278</p>
                <p class="bottom_p2">公交路线：937路、842路、848路、兴14路、兴36路到富强路站</p>
                <p class="bottom_p2">地铁线路：地铁4号线到清源路口站</p>
            </div>
            <?php $visited_count = $visited_count+601079;?>
            <p class="bottom_p4">您是本站第<span> <?php echo $visited_count;?></span>位客人</p>
        </div>
        <div class="index_bottom2">
        	<p>版权所有：北京市大兴区妇幼保健院 不得转载 京ICP备10010251号 京卫网审字【2014】等0439号</p>
        </div>
    </div> 
    <span id='_ideConac'></span>
</body>
</div>
</body>
<script type="text/javascript" src="/myproject/main/Public/Home/js/jquery-1.9.2.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Home/js/slider.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Home/js/jquery.tab.min.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Home/js/jquery.dataTables.js"></script>
<script type="text/javascript"></script>
<script>
    $(function(){
        $('.hd li').on('click',function(){
            // alert($('.hd li').length);
       
            var index = $(this).index();
            // alert(index);
            $('.hd .sublist').removeClass('active').eq(index).addClass('active');
            $('.bd .item').removeClass('active').eq(index).addClass('active');
        })
    });
   
</script>
</body>
</html>

	<script type="text/javascript" src="/myproject/main/Public/Home/scripts/pc/index_com.js" init="pc/index"></script>
<!--     <style type="text/css">
        #_ideConac{
            position: relative;
            display:block;
            width:100%;
            text-align:right;
            margin-top:-150px;
            bottom:0px !important;
            right:0px !important;
        }
         #_ideConac img{padding-right:60px;margin-top:-36px;}
    </style>
    <div>  
        <div class="index_bottom1" style="height:160px;">
        	<div style="text-align:center">
            	<p class="bottom_p1">联系我们</p>
                <p class="bottom_p2">地址：北京市大兴区黄村镇兴丰大街（三段）56号  电话：010-69247278</p>
                <p class="bottom_p2">公交路线：937路、842路、848路、兴14路、兴36路到富强路站</p>
                <p class="bottom_p2">地铁线路：地铁4号线到清源路口站</p>
            </div>
            <?php $visited_count = $visited_count+601079;?>
            <p class="bottom_p4">您是本站第<span> <?php echo $visited_count;?></span>位客人</p>
        </div>
        <div class="index_bottom2">
        	<p>版权所有：北京市大兴区妇幼保健院 不得转载 京ICP备10010251号 京卫网审字【2014】等0439号</p>
        </div>
    </div> 
    <span id='_ideConac'></span>
</body>
</div>
</body>
<script type="text/javascript" src="/myproject/main/Public/Home/js/jquery-1.9.2.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Home/js/slider.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Home/js/jquery.tab.min.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Home/js/jquery.dataTables.js"></script>
<script type="text/javascript"></script>
<script>
    $(function(){
        $('.hd li').on('click',function(){
            // alert($('.hd li').length);
       
            var index = $(this).index();
            // alert(index);
            $('.hd .sublist').removeClass('active').eq(index).addClass('active');
            $('.bd .item').removeClass('active').eq(index).addClass('active');
        })
    });
   
</script>
</body>
</html>
 -->
<script type="text/javascript">
        $(window).load(function() {
            setTimeout(function(){
               $('#demo01').flexslider({
                animation: "slide",
                startAt:1,
                direction:"horizontal",
                slideshowSpeed: 5000, // 自动播放速度毫秒
                easing:"swing"
                });
                // 轮播插件
                $('#rolltotop').flexslider({
                    animation: "slide",
                    startAt:1,
                    direction:"vertical",
                    slideshowSpeed: 5000, // 自动播放速度毫秒
                    easing:"swing"
                });
            },5000);
            
        });
</script>