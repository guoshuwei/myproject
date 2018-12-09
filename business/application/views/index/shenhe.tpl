<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- IE / Chrome -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- 360极速模式 -->
    <meta name="renderer" content="webkit" />
    <title> 我的信息 </title>
    <link rel="stylesheet" href="/myproject/business/static/libs/selectbox/selectbox-min.css">

    <link rel="stylesheet" href="/myproject/business/static/css/common.css">
    <link rel="stylesheet" href="/myproject/business/static/css/info.css">
    <link rel="stylesheet" href="/myproject/business/static/css/business.min.css">
    <link rel="stylesheet" href="/myproject/business/static/css/shenhe.css">
    <link rel="stylesheet" href="/myproject/business/static/css/fest.css">
</head>
<body>

<div class="g-site-wrap">
    <div class="g-site-top">

        <!-- g-head -->
        <div class="g-head clearfix">
    <div class="fl m-logo">
        <a href="/">
            <img width="86" class="fl logo" src="" alt="">
            <span class="fl msg">农联网商户系统</span>
        </a>
    </div>

    <ul class="fr m-login">
        <li class="fl avatar J_Avatar">
            <!-- <div class="info clearfix">
                <div class="fl pic m-coverimg" style="background-image: url(/myproject/business/static/img/tmp/avatar1-ORCH.jpg)"></div>
                <span class="fl name">Admin</span>
            </div>
            <div class="handle">
                <div class="inner">
                    <a href="#">注销</a>
                </div>
            </div> -->
        </li>
        <!-- <li class="fl help line">
            <i class="fl pic ico ico-help"></i>
            <a href="#" class="fl name">帮助</a>
        </li> -->
    </ul>

    <!-- <div class="m-search">
        <input class="search" type="text" placeholder="搜索HR政策流程">
        <span class="query ico ico-search"><input class="btn" type="submit"></span>
        <ul class="datalist">
            
    </div> -->
</div>
    </div>
    <div class="J_SiteBody g-site-body">
        
        <div class="J_SiteSide g-site-side">

    <div class="J_ScrollMenu">
        <!-- m-leftbar -->
        <ul class="m-leftbar">
            <!-- 选中状态的li添加class名active -->
            <li class="active">
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-home"></i>
                    <i class="now ico ico-nav-home2"></i>
                </span>
                    <span class="name">首页</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-info"></i>
                    <i class="now ico ico-nav-info2"></i>
                </span>
                    <span class="name">我的信息</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-salary"></i>
                    <i class="now ico ico-nav-salary2"></i>
                </span>
                    <span class="name">我的薪酬</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-team"></i>
                    <i class="now ico ico-nav-team2"></i>
                </span>
                    <span class="name">我的团队</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-structure"></i>
                    <i class="now ico ico-nav-structure2"></i>
                </span>
                    <span class="name">组织结构</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-prove"></i>
                    <i class="now ico ico-nav-prove2"></i>
                </span>
                    <span class="name">证明办理</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-welfare"></i>
                    <i class="now ico ico-nav-welfare2"></i>
                </span>
                    <span class="name">福利政策</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-service"></i>
                    <i class="now ico ico-nav-service2"></i>
                </span>
                    <span class="name">自助服务</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                    <span class="pic">
                        <i class="def ico ico-nav-backlog"></i>
                        <i class="now ico ico-nav-backlog2"></i>
                    </span>
                    <span class="name">待办流程</span>
                    <span class="num">10</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-staff"></i>
                    <i class="now ico ico-nav-staff2"></i>
                </span>
                    <span class="name">查看员工信息</span>
                </a>
            </li>
        </ul>
    </div>

</div>
        
        <div class="J_SiteMain g-site-main">
            
            <!-- 我的信息 -->
            <div class="p-info m-layout">
                <div class="m-title2">商户审核 <a class="fr u-back" href="#">返回</a></div>

                <div class="p-basic clearfix" style="height:800px;">
                    <div class="box">
                        <div class="pd-20">
   							<form action="shenhelist" method="post" class="form form-horizontal" id="form-article-add" role="validform">
						        <div class="row cl">
						            <label class="form-label col-2"><span class="c-red">*</span>名称：</label>
						            <div class="formControls col-5">
						                <input type="text" class="input-text" name="name" data-valid="notempty">
						            </div>
                                    <div class="warning c-red" style="display: none;">企业名称不能为空</div>
						        </div>
						        <div class="row cl">
						            <label class="form-label col-2">经营范围：</label>
						            <div class="formControls col-2"> 
						                <span class="select-box">
						                    <select name="business_type" class="select">
						                        <option value="0">请选择</option>
						                        <option value="1">养殖</option>
						                        <option value="2">农产品</option>
						                        <option value="3">租赁</option>
						                        <option value="4">杂项</option>  
						                    </select>
						                </span> 
						            </div>
						        </div>
						        <div class="row cl">
						            <label class="form-label col-2"><span class="c-red">*</span>地址：</label>
						            <div class="formControls col-10">
                                        <div class="div-residecity"> 
    						                <span class="select-box col-2">
    						                    {$residecity_component}
    						                </span>
                                        </div> 
						            </div>
						        <div class="row cl">
						            <label class="form-label col-2">上传照片：</label>
						            <div class="formControls col-5">
						                <div class="upload-photo-box">
						                    <div class="upload-photo-addimg" title="点击添加图片" role="dialog" role-api="addOrEditor|add,data[ptimg123][],0,0,0,editorfn,deletefn,,data[pdesc][]" num="2" max="infinite">
						                    </div>
						                </div>
                                        <!-- <input type="hidden" name="business_license" data-valid="notempty">   --> 
						               <span class="c-red" style="display:block;margin-top:20px;">
						                上传营业执照、税务登记证、组织机构代码证或三证合一扫描 件，并在上加盖公章且手写申请日期。</span>
						            </div>
						        </div>
						        <div class="row cl">
						            <label class="form-label col-2">授权公函：</label>
						            <div class="formControls col-10">
                                        <div class="upload-photo-box">
                                            <div class="upload-photo-addimg" title="上传盖章授权公函" role="dialog" role-api="addOrEditor|add,data[authorizationletter],0,0,0,editorfn,deletefn" num="0" max="1">
                                            </div>
                                        </div>
                                        <div class="upload-text-box"><a href="/myproject/business/static/authorizationletter.docx" class="upload-text-download" title="授权公函模板下载">授权公函模板下载</a>
                                        </div>
                                        <!-- <input type="hidden" name="authorization_letter" data-valid="notempty"> -->
						            </div>
                                    <div class="upload-photo-explain" style="margin-left:125px;">请先下载授权公函，填好后盖章,再上传授权公函。 </div>
						        </div>
						       <!--  <div class="row cl">
						            <label class="form-label col-2">实名信息：</label>
						            <div class="formControls col-5">
						                <span style="display:inline-block;font-size: 14px;height: 31px;line-height: 1.42857;padding: 4px;">郭书伟&nbsp;&nbsp;140****2910</span><a href="">去实名认证</a>
						            </div>
						        </div> -->
						        <div class="row cl">
						            <label class="form-label col-2">企业描述：</label>
						            <div class="formControls col-10">
						                <textarea name="description" cols="" rows="" class="textarea"  placeholder="说点什么...最少输入10个字符" datatype="*10-100" dragonfly="true" nullmsg="备注不能为空！"></textarea>
						                <p class="textarea-numberbar"><em class="textarea-length">0</em>/200</p>
						            </div>
						        </div>
						        <div class="row cl">
						            <div class="col-10 col-offset-2">
						                <button class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
						            </div>
						        </div>
						    </form>
						</div>
                       
                    </div>
                </div>

                
            </div>

        </div>
    </div>
</div>

<script src="/myproject/business/static/libs/jquery/jquery.min.js"></script>
<!-- <script src="/myproject/business/static/js/common.js"></script> -->
<script type="text/javascript" src="/myproject/business/static/libs/webuploader/webuploader.js"></script>
<!-- <script type="text/javascript" src="http://yun.p2peye.com/js/scripts/page/companycertification.min.js?v=20180320"></script> -->
<script type="text/javascript" src="/myproject/business/static/scripts/pc/merchant_certification_com.js" init="pc/merchant_certification"></script>
{include file='../inc/scripts_template.tpl'}

</body>
</html>