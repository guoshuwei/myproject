<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
<title>农联网</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="shop project">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/lib/bootstrap4/bootstrap.min.css">
<!-- <link href="plugins/fontawesome-free-5.0.1/css/fontawesome-all.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="plugins/OwlCarousel2-2.2.1/owl.carousel.css">
<link rel="stylesheet" type="text/css" href="plugins/OwlCarousel2-2.2.1/owl.theme.default.css">
<link rel="stylesheet" type="text/css" href="plugins/OwlCarousel2-2.2.1/animate.css">
<link rel="stylesheet" type="text/css" href="plugins/slick-1.8.0/slick.css"> -->
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
                <div><a href="/myproject/user/login.php">登录</a></div>
                <div><a href="/myproject/user/register.php">注册</a></div>
                <div><a href="/myproject/cart/public/home.php">交易平台</a></div>
                <div><a href="/myproject/main/index.php/Admin/Login/login.html">商户入口</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
    
     <!-- Top Bar -->


    <!-- Main Navigation -->

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
    <div class="banner_background" style="background-image:url(/ueditor/php/upload/image/20181118/1542528077927258.jpg)"></div>
  </div>

  


	<div class="deals_featured">
		<div class="container">
			<div class="row">
				<div class="col d-flex flex-lg-row flex-column align-items-center justify-content-start">
					<!-- Deals -->
					<div class="deals">
						<div class="deals_title">一周内排行</div>
						<div class="deals_slider_container">
							
							<!-- Deals Slider -->
							<div class="owl-carousel owl-theme deals_slider">
								
								<!-- Deals Item -->
								<div class="owl-item deals_item">
									<div class="deals_image"><img src="http://img.ef360.com/EditManager/File/news/201811/201811161100399274_400x300.jpg" alt=""></div>
									<div class="deals_content">
										<div class="deals_info_line d-flex flex-row justify-content-start">
											<em>Liber Fashion，锻造内涵与个性兼具的时尚服务平台</em>
										</div>
									</div>
								</div>
								
							</div>

						</div>

						<div class="deals_slider_nav_container">
							<div class="deals_slider_prev deals_slider_nav"><i class="fas fa-chevron-left ml-auto"></i></div>
							<div class="deals_slider_next deals_slider_nav"><i class="fas fa-chevron-right ml-auto"></i></div>
						</div>
					</div>
					

					<!-- Deals -->
					<div class="deals toutiao">
						<div class="deals_title">头条
							<a href="http://fashionszshow.ef360.com/" target="_blank" style="height:37px;overflow: hidden; display:block;color:#f00;font-size:14px;">2019中国（深圳）国际品牌服装服饰交易会</a>
						</div>
						<div class="deals_slider_container">
							
							<!-- Deals Slider -->
							<div class="owl-carousel owl-theme deals_slider">
								
								<!-- Deals Item -->
								<div class="owl-item deals_item">
									<div class="deals_content">
										<div class="deals_info_line d-flex flex-row justify-content-start">
											<ul class="ul-round clearfix">
          
									          <li><a href="http://news.ef360.com/Articles/2018-11-15/376917.html" target="_blank">真·名媛养成记从一身瑞比克童装开始</a></li>
									          
									          <li><a href="http://news.ef360.com/Articles/2018-11-15/376916.html" target="_blank">碲铂（DIBO）【梵心•律动】2019春夏新品时尚发布会亮相中国广州</a></li>
									          
									          <li><a href="http://news.ef360.com/Articles/2018-11-14/376847.html" target="_blank">底色原创设计师女装 轻松打造高级感穿搭</a></li>
									          
									          <li><a href="http://news.ef360.com/Articles/2018-11-14/376846.html" target="_blank">依路佑妮亮片装 火到没朋友的单品必须不能少!</a></li>
									           <li><a href="http://news.ef360.com/Articles/2018-11-14/376846.html" target="_blank">依路佑妮亮片装 火到没朋友的单品必须不能少!</a></li>
									          
									        </ul>
										</div>
										<!-- <div class="deals_info_line d-flex flex-row justify-content-start">
											
										</div>
										<div class="deals_info_line d-flex flex-row justify-content-start">
											<div class="deals_item_name">Beoplay H7</div>
											<div class="deals_item_price ml-auto">$225</div>
										</div>
										<div class="deals_info_line d-flex flex-row justify-content-start">
											<div class="deals_item_name">Beoplay H7</div>
											<div class="deals_item_price ml-auto">$225</div>
										</div> -->
									</div>
								</div>

							</div>

						</div>
					</div>

					<!-- Deals -->
					<div class="deals">
						<div class="deals_title">行业观察</div>
						<div class="deals_slider_container">
							
							<!-- Deals Slider -->
							<div class="owl-carousel owl-theme deals_slider">
								
								<!-- Deals Item -->
								<div class="owl-item deals_item">
									<div class="deals_info_line d-flex flex-row justify-content-start">
										<div class="bd">
								        <ul class="ul-round clearfix" style="padding: 12px 15px;">
								          
								          <li><a href="http://news.ef360.com/a/20181115/10003287.html" target="_blank">百圆裤业母公司未来三年向网易“考拉”平台供货30亿！</a></li>
								          
								          <li><a href="http://news.ef360.com/a/20181115/10003286.html" target="_blank">电商周报：双11电商最终数据出炉 苏宁开出1万家店</a></li>
								          
								          <li><a href="http://news.ef360.com/a/20181115/10003285.html" target="_blank">eBay2018最大时尚赢家：潮牌、限量版球鞋、新晋英国王妃</a></li>
								          
								          <li><a href="http://news.ef360.com/a/20181115/10003284.html" target="_blank">唯品会11.11大促交易额102亿 同比增27%</a></li>
								          <li><a href="http://news.ef360.com/a/20181115/10003284.html" target="_blank">唯品会11.11大促交易额102亿 同比增27%</a></li>
								          
								        </ul>
								      </div>
									</div>
								</div>

							</div>

						</div>

						<div class="deals_slider_nav_container">
							<div class="deals_slider_prev deals_slider_nav"><i class="fas fa-chevron-left ml-auto"></i></div>
							<div class="deals_slider_next deals_slider_nav"><i class="fas fa-chevron-right ml-auto"></i></div>
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
		}
	</style>
	<div class="container">
			<div class="viewed_title_container">
				<h3 class="viewed_title">招商</h3>
				<!-- <div class="viewed_nav_container">
					<div class="viewed_nav viewed_prev"><i class="fas fa-chevron-left"></i></div>
					<div class="viewed_nav viewed_next"><i class="fas fa-chevron-right"></i></div>
				</div> -->
			</div>
			<div class="row">

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<div class="char_icon">
							<a href="http://zs.ef360.com/Items/dins/" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_4"><img src="http://www.ef360.com/_Public/_UpFile/dins_240_60.gif" width="240" height="60"></a>
						</div>
						<!-- <div class="char_content">
							<div class="char_title">Free Delivery</div>
							<div class="char_subtitle">from $50</div>
						</div> -->
					</div>
				</div>

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<div class="char_icon">
							<a href="http://zs.ef360.com/Items/hokabr/" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_2"><img src="http://www.ef360.com/_Public/_UpFile/hokabr_240_60.gif" width="240" height="60"></a>
						</div>
						<!-- <div class="char_content">
							<div class="char_title">Free Delivery</div>
							<div class="char_subtitle">from $50</div>
						</div> -->
					</div>
				</div>

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<div class="char_icon">
							<a href="http://zs.ef360.com/items/ouyue/" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_3"><img src="http://www.ef360.com/_Public/_UpFile/ouyue_240_60.gif" width="240" height="60"></a>
						</div>
						<!-- <div class="char_content">
							<div class="char_title">Free Delivery</div>
							<div class="char_subtitle">from $50</div>
						</div> -->
					</div>
				</div>

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<div class="char_icon">
							<a href="http://www.ef360.com/app/#4" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_1" rel="nofollow"><img src="http://www.ef360.com/_Public/_UpFile/ef360wx_240_60.gif" width="240" height="60"></a>
						</div>
						<!-- <div class="char_content">
							<div class="char_title">Free Delivery</div>
							<div class="char_subtitle">from $50</div>
						</div> -->
					</div>
				</div>
			</div>
	</div>

	<div class="container">
			<div class="viewed_title_container">
				<h3 class="viewed_title">品牌</h3>
			</div>
			<div class="row focus-ad-box">
				<div class="col-md-3 mb">
	                <div class="weather pn">
	                  	<div class="lft" style="float:left;line-height:32px;">
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
				<div class="col-md-2 mb">
	                <div class="weather pn">
	                  	<div class="lft" style="float:left;line-height:32px;">
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

	<div class="container">
			<div class="viewed_title_container">
				<h3 class="viewed_title">价格</h3>
			</div>
			<div class="row">

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<table class="table">
		                  <thead>
		                    <tr>
		                      <th style="width:60px" class="text-center">地点</th>
		                      <th style="width:140px" class="text-right">价格</th>
		                      <th style="width:90px" class="text-right">类型</th>
		                    </tr>
		                  </thead>
		                  <tbody>
		                    <tr>
		                      <td class="text-center">太原市</td>
		                      <td class="text-right">429.00</td>
		                      <td class="text-right">购买</td>
		                    </tr>
		                    <tr>
		                      <td class="text-center">太原市</td>
		                      <td class="text-right">429.00</td>
		                      <td class="text-right">购买</td>
		                    </tr>
		                    <tr>
		                      <td class="text-center">太原市</td>
		                      <td class="text-right">429.00</td>
		                      <td class="text-right">购买</td>
		                    </tr>
		                  </tbody>
		                </table>
					</div>
				</div>

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<div class="char_icon">
							<a href="http://zs.ef360.com/Items/hokabr/" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_2"><img src="http://www.ef360.com/_Public/_UpFile/hokabr_240_60.gif" width="240" height="60"></a>
						</div>
						<!-- <div class="char_content">
							<div class="char_title">Free Delivery</div>
							<div class="char_subtitle">from $50</div>
						</div> -->
					</div>
				</div>

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<div class="char_icon">
							<a href="http://zs.ef360.com/items/ouyue/" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_3"><img src="http://www.ef360.com/_Public/_UpFile/ouyue_240_60.gif" width="240" height="60"></a>
						</div>
						<!-- <div class="char_content">
							<div class="char_title">Free Delivery</div>
							<div class="char_subtitle">from $50</div>
						</div> -->
					</div>
				</div>

				<!-- Char. Item -->
				<div class="col-lg-3 col-md-6 char_col">
					
					<div class="char_item d-flex flex-row align-items-center justify-content-start">
						<div class="char_icon">
							<a href="http://www.ef360.com/app/#4" target="_blank" class="ef360_ad" data-adcode="banner-240-60-1000_1" rel="nofollow"><img src="http://www.ef360.com/_Public/_UpFile/ef360wx_240_60.gif" width="240" height="60"></a>
						</div>
						<!-- <div class="char_content">
							<div class="char_title">Free Delivery</div>
							<div class="char_subtitle">from $50</div>
						</div> -->
					</div>
				</div>
			</div>
	</div>
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
<script type="text/javascript" src="http://dcs.conac.cn/js/01/014/0000/60438189/CA010140000604381890000.js"></script>
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