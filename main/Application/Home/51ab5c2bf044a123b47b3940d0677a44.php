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

<link href="/httpdocs/Public/Home/css/page.css" rel="stylesheet" type="text/css" />
<div class="index_body">
	<div class="index_page">
		<div class="page_cont content_m78">
		<?php echo stripslashes($contentinfo[0]['content']); ?>
		</div>
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