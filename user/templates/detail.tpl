{extends 'base/profile_site.tpl'}
{block name="page_styles"}
<link rel="stylesheet" type="text/css" href="/styles/pc/center.css?v={$smarty.const.CSS_VERSION}">
{/block}
{block name="page_scripts"}
<script language="javascript" type="text/javascript"> 
document.domain = 'p2peye.com';
function iframeLoad(h){
    $('#iframe1').height(h*1+50);
}
</script> 
<script type="text/javascript" src="/scripts/pc/profile_detail.min.js?v={$smarty.const.JS_VERSION}" init="pc/profile_detail"></script>
{/block}
{block name="page_section"}
<div class="qt-w">
    <div class="ui-crumb">
        <a href="//www.p2peye.com" title="网贷天眼">网贷天眼</a> &gt; <a href="//licai.p2peye.com/" title="P2P理财">P2P理财</a> &gt; <a href="//licai.p2peye.com/u{$userInfo.uid}/" title="{$userInfo.username}">{$userInfo.username}</a> &gt; <span>{$userInfo.username}的个人资料</span>
    </div>
    <div class="clearfix" style="padding-bottom:50px;">
        <iframe src ="//www.p2peye.com/home.php?mod=space&uid={$uid}&do=profile&licai=1" frameborder="0" marginheight="0" marginwidth="0" frameborder="0" scrolling="no" id="iframe1" name="iframe1" width="100%"> 
        </iframe> 
    </div>
</div>
{/block}