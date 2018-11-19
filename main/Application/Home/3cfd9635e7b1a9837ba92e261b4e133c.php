<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
    <title>北京市大兴区妇幼保健院</title>
    <!-- <link href="/httpdocs/Public/Home/css/H-ui.admin.css" rel="stylesheet" type="text/css" /> -->
    <!-- 引入字体 font -->
    <!-- 引入网站图标 -->
    <link rel="shortcut icon" href="/httpdocs/Public/Home/images/favicon.ico" type="image/x-icon" />
    <link href="/httpdocs/Public/Home/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
    <link href="/httpdocs/Public/Home/css/style.css" rel="stylesheet" type="text/css" />
    <link href="/httpdocs/Public/Home/css/index.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="/httpdocs/Public/Home/js/jquery-1.9.2.js"></script>
    <style>
    .page_cont .page_nav .nav_ul li.active {
        height: 37px;
        line-height: 37px;
        font-size:14px;
        color: #2bbeed;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #ececec;
        cursor: pointer;
    }
    .page_introduce{
        margin-top:70px;
        float:left; 
        margin-left: 30px; 
        width:740px;
    }
    .page_cont{
        padding-top:78px;
    }
    .item li a{
        display:inline-block;width:100%;height:100%;line-height:100%;
    }
    .item li a span{
        display:inline-block;height:100%;line-height:100%;
    }
    .item li a span.title{float:left;display:inline-block;height:100%;line-height:100%;}
    .item li a span.uptime{float:right;display:inline-block;height:100%;line-height:100%;}
    .hd .active{display:block;   
     color:#2bbeed !important;
    font-weight: bold;}
    .smt{margin-top:0px !important;}
    </style>
</head>
<body>
<?php
 $en_navlist = json_encode($navlist); ?>
<div class="index_body">
    	<div class="index_top">
            <div style="float: right;width: 150px;height: 100px;line-height: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo U('User/login');?>">登录</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo U('User/register');?>">注册</a></div>
        	<img class="top_phone" src="/httpdocs/Public/Home/images/top_phone.png" />
        	<img class="top_logo" src="/httpdocs/Public/Home/images/top_logo.png" />
            <img class="top_img" src="/httpdocs/Public/Home/images/top_erweima.png" />
        </div>
        <div class="index_nav">
        	<ul>
            	<a href="./"><li>首页</li></a>
                <?php if(is_array($navlist)): foreach($navlist as $key=>$navlist): ?><a href="<?php echo U('Index/'.$navlist['jump_url'],'id='.$navlist['id'] );?>">
                    <?php if(($key) == "9"): ?><li style="background:url();"><?php echo ($navlist["name"]); ?></li>
                    <?php else: ?>
                        <li><?php echo ($navlist["name"]); ?></li><?php endif; ?>
                    </a><?php endforeach; endif; ?>
            </ul>
        </div>

<?php
$bydt_news_p = $activeitem[0]['tpid']; $ywgk_p = $affairpublic[0]['pid']; $bydt_news_c = $activeitem[0]['pid']; $ywgk_c = $affairpublic[0]['pid']; $dwgk_c = $poypublic[0]['pid']; $lzjs_c = $lzestablish[0]['pid']; $special_pid = $specialistintro['tpid']; $re_activeitem = $activeitem; $re1_activeitem = $activeitem; $imgcount = count($specialists); ?>
<style>
.expert_physician2 .phys_cont .phys_inform .inf_p2 {
    font-size: 14px;
    color: #304959;
    margin: 0px 0 0 19px;
}
#rolltotop .flex-direction-nav{    
    height: 31px;
    position: absolute;
    width: 103px;
    top: 15px;
    z-index: 8888;
    right: 0px;}
#rolltotop .flex-direction-nav li{height:31px;}
#rolltotop .flex-direction-nav a {
    width: 31px;
    height: 32px;
    line-height: 99em;
    overflow: hidden;
    margin: -14px 16px 0;
    display: block;
    position: absolute;
    /*background:transparent !important;*/background:#ff0000;
    top: 50%;
    z-index: 10;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
    -webkit-transition: all .3s ease;
}
#rolltotop .flex-direction-nav .flex-prev {
    right: 37px !important;
}
#rolltotop .flex-direction-nav .flex-next {
    right: 0px !important;
}
.flex-control-nav.flex-control-paging{display:none;}
</style>
<div id="demo01" class="flexslider">
            <ul class="slides">
            <?php if(is_array($bannerlist)): foreach($bannerlist as $key=>$bannerlist): ?><li><div class="img"><a href=""><?php echo stripslashes(trim($bannerlist['src'],"\"")) ;?></a></div></li><?php endforeach; endif; ?>
            </ul>
        </div>
        <div class="index_guide">
        	<div class="guide_cont">
            	<ul class="gu_ul">
                <?php if(is_array($second_navitem)): foreach($second_navitem as $k=>$second_navitem): ?><li><a href="<?php echo U($second_navitem['jump_url']);?>">
                    	<img  src="/httpdocs/Public/Home/images/jiuyi_icon<?php echo ($k+1); ?>.png" />
                        <p><?php echo ($second_navitem["name"]); ?></p></a>
                    </li><?php endforeach; endif; ?>
                </ul>
                <div class="gu_inform" style="overflow:hidden;height:50px;line-height: 50px;">
                    <img style="position: absolute;top: 18px;left: 20px;" src="/httpdocs/Public/Home/images/tongzhi_icon.png">
                    <div id="rolltotop" style="overflow:hidden;height:35px;line-height:35px;margin-top:10px;">
                    	<ul class="slides">
                            <?php if(is_array($aditem)): foreach($aditem as $k=>$aditem): ?><li  style="height:50px;line-height:43px;text-align:left;margin-left:80px;"><a style="display:inline-block;" href="<?php echo U('Sublist/show_content/','id='.$aditem['id']);?>">
                                    <p class="inform_p"><?php echo ($aditem["title"]); ?>
                                        <span><?php echo ($aditem["updatetime"]); ?></span>
                                    </p></a>
                                </li><?php endforeach; endif; ?>
                        </ul>  
                    </div>
                    <div class="btnBox clearfix">
                        <img class="s-up" src="/httpdocs/Public/Home/images/s-up.png" alt="">
                        <img class="s-down" src="/httpdocs/Public/Home/images/s-down.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <script>

        </script>
        <div class="index_dynamic">
        	<div class="dynamic_cont">
            	<div class="dy_mod">
                	<div class="mod_title">
                    	<p>本院动态</p>
                    </div>
                    <ul class="mod_ul">
                    <?php if(is_array($activeitem)): foreach($activeitem as $key=>$activeitem): ?><a href="<?php echo U('Sublist/show_content/','id='.$activeitem['id']);?>"><li>
                        	<p class="mod_p1"><?php echo ($activeitem["title"]); ?></p>
                            <p class="mod_p2"><?php echo ($activeitem["updatetime"]); ?></p>
                        </li></a><?php endforeach; endif; ?>
                    </ul>
                    <div class="mod_more"><a href="<?php echo U('Index/active','id='.$bydt_news_p.'&sid='.$bydt_news_c);?>"></a></div>
                </div>
                <div class="dy_mod" style="margin-left:65px;">
                	<div class="mod_title">
                    	<p>特色服务</p>
                    </div>
                    <ul class="mod_ul">
                    <?php if(is_array($serviceitem)): foreach($serviceitem as $key=>$serviceitem): ?><a href="<?php echo U('Index/pub','id='.$serviceitem['pid'].'&sid='.$serviceitem['id']);?>">
                            <li>
                                <p class="mod_p1"><?php echo ($serviceitem["name"]); ?></p>
                                <p class="mod_p2"><?php echo date('Y-m-d',$serviceitem['dt']);?></p>
                            </li>
                        </a><?php endforeach; endif; ?>
                    </ul>
                    <div class="mod_more"><a href="<?php echo U('Index/pub','id='.$serviceitem['pid']);?>"></a></div>
                </div>
            </div>
        </div>
        
        <div class="index_health">
        	<div class="health_cont">
            	<div class="mod_title">
                    <p>妇幼保健</p>
                </div>
                <ul class="health_ul">
                <?php if(is_array($fybjinfo)): foreach($fybjinfo as $k=>$fybj): if(($k%2 == 0)): if($k == 0): ?><li class="li1" style="margin-left:0px;"> <a href="<?php echo U('Index/mc_care','id='.$fybj['pid'].'&sid='.$fybj['id'] );?>">
                        <?php else: ?>
                         <li class="li1" > <a href="<?php echo U('Index/mc_care','id='.$fybj['pid'].'&sid='.$fybj['id'] );?>"><?php endif; ?> 
                                <img src="/httpdocs/Public/Home/images/baojian_img<?php echo ($k+1); ?>.png" />
                                <div class="heal_content">
                                    <p class="heal_title"><?php echo ($fybj['name']); ?>：</p>
                                    <p class="heal_p"><?php echo ($fybj['comments']); ?></p>
                                </div>
                            </a></li>
                    <?php else: ?>
                        <li class="li2"><a href="<?php echo U('Index/mc_care','id='.$fybj['pid'].'&sid='.$fybj['id'] );?>">
                            <div class="heal_content">
                                <p class="heal_title"><?php echo ($fybj['name']); ?>：</p>
                                <p class="heal_p"><?php echo ($fybj['comments']); ?></p>
                            </div>
                            <img class="heal_img2" src="/httpdocs/Public/Home/images/baojian_img<?php echo ($k+1); ?>.png" />
                        </a></li><?php endif; endforeach; endif; ?>
                </ul>
            </div>
        </div>
        <div class="index_open">
        	<div class="open_cont">
            	<div class="mod_title">
                    <p>院务公开</p>
                </div>
                <ul class="open_ul">
                	<li class="open_li" style="margin-left:0px;">
                    	<div class="open_img" style="height:100%;margin-top:0px;"><a href="<?php echo U('Index/ywpub', 'id='.$ywgk_p);?>">
                        	<img src="/httpdocs/Public/Home/images/yuanwu_icon1.png" style="    margin-top:40px;"/>
                            <p>院务公开</p></a>
                        </div>
                        <ul class="open_ul2">
                        	<?php if(is_array($affairpublic)): foreach($affairpublic as $key=>$affairpublic): ?><li><a href="<?php echo U('Index/ywpub', 'id='.$ywgk_p.'&sid='.$affairpublic['id']);?>">
                                        <p class="mod_p1"><?php echo ($affairpublic["name"]); ?></p>
                                </a></li><?php endforeach; endif; ?>
                        </ul>
                    </li>
                    <li class="open_li">
                    	<div class="open_img" style="height:100%;margin-top:0px;"><a href="<?php echo U('Index/dwpub', 'id='.$ywgk_p.'&sid='.$dwgk_c);?>">
                        	<img src="/httpdocs/Public/Home/images/yuanwu_icon2.png" style="    margin-top:40px;"/>
                            <p>党务公开</p></a>
                        </div>
                        <ul class="open_ul2">
                        	<?php if(is_array($poypublic)): foreach($poypublic as $key=>$poypublic): ?><li> <a href="<?php echo U('Sublist/show_content/','id='.$poypublic['id']);?>">
                                        <p class="mod_p1"><?php echo ($poypublic["title"]); ?></p>
                                </a></li><?php endforeach; endif; ?>
                        </ul>
                    </li>
                    <li class="open_li">
                        <div class="open_img" style="height:100%;margin-top:0px;"><a href="<?php echo U('Index/lzjs', 'id='.$ywgk_p.'&sid='.$lzjs_c);?>">
                            <img src="/httpdocs/Public/Home/images/yuanwu_icon3.png" style="margin-top:40px;"/>
                            <p>廉政建设</p></a>
                        </div>
                        <ul class="open_ul2">
                            <?php if(is_array($lzestablish)): foreach($lzestablish as $key=>$lzestablish): ?><li> <a href="<?php echo U('Sublist/show_content/','id='.$lzestablish['id']);?>">
                                        <p style="max-width:200px;overflow:hidden;white-space:nowrap; text-overflow:ellipsis"class="mod_p1"><?php echo ($lzestablish["title"]); ?></p>
                                </a></li><?php endforeach; endif; ?>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <style type="text/css">
        .specialImg img{width:130px;padding-left:10px;padding-right:10px;}
        .ml10{margin-left:10px !important;}
        .warp img{}
        #first img{padding-left:0px !important;}
        #last img{padding-right:0px !important;}
        </style>
        <div class="index_expert" style="height:300px;">
        	<div class="expert_cont">
            	<div class="mod_title">
                    <p>专家介绍</p>
                </div>
                <div id="demo" style="overflow: hidden; width: 960px; align:center;">
                    <table cellspacing="0" cellpadding="0" align="center" border="0" style="margin-top:-2px;">
                        <tbody>
                            <tr>
                                <td id="marquePic1" valign="top">
                                    <table width="960" height="240" border="0" cellpadding="0" cellspacing="20">
                                        <tr>
                                            <?php if(is_array($specialists)): foreach($specialists as $k=>$specialists): if(($k == 0)): ?><td style="width:170px;" align="center" id="first"> 
                                                       
                                                        <a href="<?php echo U('Index/prointro','sid='.$specialists['id']);?>" class="specialImg" style="" class="warp"><?php echo $specialists['img']; ?>
                                                        </a>
                                                        <p ><?php echo ($specialists["keywords"]); ?></p>
                                                    </td>
                                                <?php elseif(($k == ($imgcount-1))): ?> 
                                                    <td style="width:170px;" align="center" id="last"> 
                                                        <a href="<?php echo U('Index/prointro','sid='.$specialists['id']);?>" class="specialImg"style=""><?php echo $specialists['img']; ?>
                                                        </a>
                                                        <p ><?php echo ($specialists["keywords"]); ?></p>
                                                    </td>
                                                <?php else: ?>
                                                    <td style="width:170px;" align="center" > 
                                                        <a href="<?php echo U('Index/prointro','sid='.$specialists['id']);?>" class="specialImg"style=""><?php echo $specialists['img']; ?>
                                                        </a>
                                                        <p ><?php echo ($specialists["keywords"]); ?></p>
                                                    </td><?php endif; endforeach; endif; ?>
                                        </tr>
                                    </table>        
                                </td>
                                <td id="marquePic2" valign="top" align="left" style="padding-left:-20px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <script type="text/javascript">
        $(function(){

            var speed=20
            $('#marquePic2').html($('#marquePic1').html());
            function Marquee(){ 
            if(demo.scrollLeft>=marquePic1.scrollWidth){ 
            demo.scrollLeft=0 
            }else{ 
            demo.scrollLeft++ 
            }}
            var MyMar=setInterval(Marquee,speed) 
            demo.onmouseover=function() {clearInterval(MyMar)} 
            demo.onmouseout=function() {MyMar=setInterval(Marquee,speed)} 
        })
         
        // $(function(){
        //     var speed1=50
        //     $('#marquePic4').html($('#marquePic3').html());
        //     function Marquee1(){ 
        //        if(marquePic4.offsetTop-rolltotop.scrollTop<=0)
        //             rolltotop.scrollTop-=marquePic3.offsetHeight
        //        else{
        //             rolltotop.scrollTop++
        //        }
        //     }
           
        //     var MyMar1=setInterval(Marquee1,speed1)
        //     rolltotop.onmouseover=function() {clearInterval(MyMar1)}
        //     rolltotop.onmouseout=function() {MyMar1=setInterval(Marquee1,speed1)}
        //     $('.s-up').mouseover(function(){if(MyMar1)clearInterval(MyMar1)}).click(function(){
        //         rolltotop.scrollTop +=50;
        //     }).mouseout(function(){
        //         MyMar1=setInterval(Marquee1,speed1)
        //     })
        //     $('.s-down').mouseover(function(){if(MyMar1) clearInterval(MyMar1)}).click(function(){
        //         rolltotop.scrollTop -=50;
        //     }).mouseout(function(){
        //         MyMar1=setInterval(Marquee1,speed1)
        //     })
        //  }) 
         
        </script>


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
<script type="text/javascript" src="/httpdocs/Public/Home/js/slider.js"></script>
<script type="text/javascript" src="/httpdocs/Public/Home/js/jquery.tab.min.js"></script>
<script type="text/javascript" src="/httpdocs/Public/Home/js/jquery.dataTables.js"></script>
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