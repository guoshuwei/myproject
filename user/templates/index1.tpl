{extends 'base/profile_site.tpl'}
{block name="page_styles"}
<link rel="stylesheet" type="text/css" href="/styles/pc/profile.css?v={$smarty.const.CSS_VERSION}">
{/block}
{block name="page_scripts"}
<script src="/build/dist/echarts-3.5.3.min.js"></script>
<script src="/scripts/plugins/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="/scripts/pc/profile_index.min.js?v={$smarty.const.JS_VERSION}" init="pc/profile_index"></script>
{/block}
{block name="page_section"}
<div class="qt-w">
    {* 是否隐藏资产的标识 1 为隐藏 ， 0 为不隐藏 *}
    <input type="hidden" id="moneyHidden" value="{$userExtend.moneyhidden}">
    <div class="ui-crumb">
        <a href="//www.p2peye.com" title="网贷天眼">网贷天眼</a> &gt; <a href="//licai.p2peye.com/" title="P2P理财">P2P理财</a> &gt; <span>{$userInfo.username}</span>
    </div>
    <section class="qt-white clearfix mod-info-top">
        <div class="col-main">
            <div class="col-wrap">
                <div class="clearfix">
                    <div class="qt-gl">
                    	{if !empty($userCount.tags)}
	                        {foreach from=$userCount.tags item=item key=key}
		                        {if $item@index<5}
		                        	<a class="tag" href="//licai.p2peye.com{$tagUrlMap[$key]}" target="_blank">{$tagsMap[$key]}</a>
		                        {/if}
	                        {/foreach}
                        {/if}
                    </div>
                    <div class="qt-gr">
                        {$userCount.follower|default:0} 人关注 <em class="tip"></em>
                    </div>
                </div>
                <div class="clearfix middle">
                    <dl class="qt-gl first">
                        <dt>投资总额</dt>
                        <dd>{if $userExtend.moneyhidden == 0}{$userCount.invest_money|default:0}{else}--{/if}</dd>
                    </dl>
                    <dl class="qt-gl">
                        <dt>平台数</dt>
                        <dd>{$userCount.invest_num|default:0}</dd>
                    </dl>
                    <dl class="qt-gl">
                        <dt>分散度</dt>
                        <dd>{$userCount.invest_divergence|default:0}</dd>
                    </dl>
                </div>
                <div class="bottom">
                    <span>{$userCount.invest_rate|default:0|replace:"%":""}</span>
                    <i>%</i>
                    收益率
                </div>
            </div>
        </div>
        <div class="col-sub">
            <div class="clearfix top">
                <div class="txt">
                    <div class="txt-wrap" style="position:relative;">
                        <span style="font-size: 16px; color: #383838; line-height: 40px;">{$userInfo.username}</span>
                        <div>
                            {if $is_flag}<span class="mail"><em></em><a href="//www.p2peye.com/home.php?mod=spacecp&ac=pm&touid={$userInfo.uid}" target="_blank">发信息</a></span>{/if}
                        </div>
                        {if $is_flag}<a class="qt-gr ui-follow{if $is_follow} ed{/if}" href="javascript:;" url="//licai.p2peye.com/profile/follow/?fuid={$userInfo.uid}"><em></em>{if $is_follow}已{/if}关注</a>{/if}
                    </div>
                </div>
                <div class="img">
                    <img class="actor" uid="" width="60" height="60" src="//www.p2peye.com/uc_server/avatar.php?uid={$userInfo.uid}&size=middle" alt="{$userInfo.username}"/>
                </div>
            </div>
            <div class="middle" title="{$userCount.sightml|escape:"html"}">
                {$userCount.sightml|escape:"html"|truncate:48|default:"他太懒了，什么也没留下"}
            </div>
            <div class="bottom">
                <div class="hd clearfix">
                    <span class="qt-gl" style="font-size: 16px;font-family: Micorsoft YaHei;color: #383838;">基本信息</span>
                    <a class="more qt-gr" href="/u{$userInfo.uid}/detail.html" target="_blank">查看更多>></a>
                </div>
                <ul class="clearfix">
                    <li class="qt-gl clearfix pt">
                        <em class="qt-gl"></em>
                        <span class="qt-gl label">来访：</span>
                        <span class="qt-gl">{$userCount.views|default:0} 人</span>
                    </li>
                    <li class="qt-gr clearfix wz">
                        <em class="qt-gl"></em>
                        <span class="qt-gl label">关注平台：</span>
                        <span class="qt-gl">{count($arrFocusPlatform)|default:0} 个</span>
                    </li>
                    <li class="qt-gl clearfix tz">
                        <em class="qt-gl"></em>
                        <span class="qt-gl label">关注：</span>
                        <span class="qt-gl">{$userCount.following|default:0} 人</span>
                    </li>
                    <li class="qt-gr clearfix fs">
                        <em class="qt-gl"></em>
                        <span class="qt-gl label">粉丝：</span>
                        <span class="qt-gl">{$userCount.follower|default:0} 人</span>
                    </li>
                    <li class="qt-gl clearfix zt">
                        <em class="qt-gl"></em>
                        <span class="qt-gl label">主题数：</span>
                        <span class="qt-gl">{$userCount.threads|default:0}</span>
                    </li>
                    <li class="qt-gr clearfix tzs">
                        <em class="qt-gl"></em>
                        <span class="qt-gl label">帖子数：</span>
                        <span class="qt-gl">{$userCount.posts|default:0}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    {if $user['uid']}{*用户登录*}
    {if !empty($userInvestPlatform)}
	<section class="mod-info qt-mt35">
        <span class="title" style="display: block">资产报表</span>
        <div class="clearfix">
    		<div class="col-main">
    			<div class="col-wrap">
    				<div class="bd">
                        <div class="ui-link-slide-parent">
                            {if $user.userkey}
                            <a class="ui-link-slide" href="javascript:;" role="openshare"><div class="slide-text">我要分享</div><div class="slide-wrap"></div></a>
                            {else}
                            <a class="ui-link-slide" href="javascript:;" role="dialog" role-api="bind"><div class="slide-text">我要分享</div><div class="slide-wrap"></div></a>
                            {/if}
                        </div>
    					<div class="clearfix echart-hd">
    						<a class="current item" data-for="echart-distribution" href="javascript:;">平台分布</a>
    						<a class="item" data-for="echart-mobility" href="javascript:;">流动性</a>
    					</div>
    					<div class="echart-bd active" id="echart-distribution">
                            {if empty($userInvestPlatform)}
                                <div class="emptycanvas"><img  src="/styles/images/common/emptydataleftbig.jpg"/><span>您还没添加记账数据，快添加吧~</span></div>
                            {/if}
                        </div>
    					<div class="echart-bd" id="echart-mobility">
                            {if empty($fluidity)}
                                <div class="emptycanvas"><img src="/styles/images/common/emptydataleftbig.jpg"/><span>您还没添加记账数据，快添加吧~</span></div>
                            {/if}
                        </div>
    				</div>
    			</div>
    		</div>
    		<div class="col-sub">
    			<span class="hd" style="display: block;">详细配置</span>
                    {if !empty($userInvestPlatform)}
                    <ul class="profile-bxslider">
                    {foreach from=$userInvestPlatform key=key item=item}
	                  {if $key eq 0}
		              <li class="active">
                        <ul class="bd">
	                  {elseif $key%7 eq 0}
		                </ul>
		              </li>
		              <li>
		              <ul class="bd">
	                  {/if}
                         <li class="clearfix">
                           	<div class="rates">
                            <div class="mod-rate">
                                 <div class="rate-wrap" style="width:{$item.ProportionValue};"></div>
                                 <div class="rate-tag">{$item.ProportionValue}</div>
                            </div>
                            </div>
                            <div class="labels">
                                {if $item.Name == "投友圈"}
                                <a href="//www.touyouquan.com" target="_blank" title="{$item.Name}">{$item.Name}</a>
                                {else}
                                    {if $item.domain}
                                        <a href="//{$item.domain}.p2peye.com" target="_blank" title="{$item.Name}">{$item.Name}</a>
                                    {else}
                                        <a href="/licai/platjump" target="_blank" title="{$item.Name}">{$item.Name}</a>
                                    {/if}
                                {/if}
                            </div>
                            <div class="values">{if $userExtend.moneyhidden == 0}￥{$item.AmountValue|replace:',':''}{else}--{/if}</div>
                          </li>
	                   {if $key eq (count($userInvestPlatform)-1)}
	                   </ul>
	                  </li>
	                   {/if}
                    {/foreach}
                    </ul>
                    {/if}
                <div class="ft clearfix prvefile-bxslider-tool">

                </div>
    		</div>
        </div>
        <div class="clearfix pk-parent">
            <div class="mod-pk" style="width:464px;margin:0 auto;">
                <div class="pk-line">
                    <div class="pk-line-inner">
                        <div class="pk-line-rate" style="width:{if $userCount.invest_up==$userCount.invest_down}50%{else}{($userCount.invest_up/($userCount.invest_up+$userCount.invest_down))*100}%{/if};"></div>
                    </div>
                    <div class="pk-number clearfix">
                        <span class="qt-gl l-num">{$userCount.invest_up|default:0}</span>
                        <span class="qt-gr r-num">{$userCount.invest_down|default:0}</span>
                    </div>
                </div>
                <a class="l-side" href="javascript:;" data="/user/clickInvest|{$userInfo.uid}|||1">
                    有用
                </a>
                <a class="r-side" href="javascript:;" data="/user/clickInvest|{$userInfo.uid}|||2">
                    没用
                </a>
            </div>
        </div>
	</section>
    {/if}

    {else}
    <section class="mod-info qt-mt35">
        <span class="title" style="display: block">资产报表</span>
        <div class="mod-nologin clearfix">
            <div class="nologin-top">
                <a class="btn_login" href="//www.p2peye.com/member.php?mod=login_ty">立即登录</a>
                <a class="btn_register" href="//www.p2peye.com/member.php?mod=register">立即注册</a>
            </div>
            <div class="nologin-bottom">亲，您只有登录后才可以查看对方投资平台分布及具体投资配置情况哦～</div>
        </div>
    </section>
    {/if}
    <div class="clearfix qt-pt35">
        <div class="main">
            <div class="wrap content">
                <div class="mod-platfixed">
                    <a class="item a current" role="scrollto" data-for="ziliao" href="javascript:;" title="评论">评论（{$userComments.total|default:0}）</a>
                    <a class="item a" role="scrollto" data-for="fenxiang" href="javascript:;" title="投资分享">投资分享（<span>{$userCount.invest_share|default:0}</span>）</a>
                    <a class="item a" role="scrollto" data-for="shequ" href="javascript:;" title="社区">社区（{$userCount.posts|default:0}）</a>
                </div>
                <section class="qt-white taber active" id="ziliao">
                    <div class="bd mod-comment">
                        <div class="mc-bd">
                            <input id="comment-username" type="hidden" value="{$userInfo.username}" />
                            <div class="reply-box-parent">
                                <div class="reply-box" max="500">
                                    <form style="position:relative" action="/pushProfileComment" method="post" role="ajaxfrom" valid-after="true">
                                        <div>
                                            <input type="hidden" name="to_uid" value="{$userInfo.uid}" />
                                            <input type="hidden" name="to_uname" value="{$userInfo.username}" />
                                            <input type="hidden" name="root_id" value="0" />
                                            <input type="hidden" name="current_name" value="{$userInfo.username}" />
                                            <input type="hidden" name="current_uid" value="{$userInfo.uid}" />
                                            <textarea name="content" class="reply-textarea" data-valid="notempty|len:10:500"></textarea>
                                        </div>
                                        <div class="reply-tool">
                                            <span>还可输入<span class="shownum">500</span>字</span>
                                            {if !empty($userinfo.uid)}
                                                {if !empty($userinfo.mobile)}
                                                    <input class="reply-submit" type="submit" value="提交评论" />
                                                 {else}
                                                    <a role-api="loanssure" class="reply-submit" role="dialog" href="javascript:;">提交评论</a>
                                                {/if}
                                            {else}
                                                <input class="reply-submit" type="submit" value="提交评论" />
                                            {/if}
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <ul class="comment-inner" id="pinglun">
                                {include file="inc/invest_comment_item.tpl" items=$userComments.comments}
                            </ul>
                            {if $userComments.total>10}<a class="ui-more" role="readmore" role-url="/getProfileCommentsByPn" role-data="page:2|uid:{$userInfo.uid}" role-parent="pinglun" role-staticurl="/u{$userInfo.uid}/comment-{}.html" href="/u{$userInfo.uid}/comment-2.html">查看更多</a>{/if}
                        </div>
                    </div>
                </section>
                <section class="qt-white taber" id="fenxiang">
                    <div class="bd mod-comment">
                        <div class="mc-bd">
                            <input id="comment-username" type="hidden" value="{$userInfo.username}" />
                            <ul class="comment-inner" id="touzifenxianginner">
                            {include file="inc/invest_share_item.tpl" invest=$investShare}
                            </ul>
                            {if !empty($userCount.invest_share)}
                            <a class="ui-more" role="readmore" role-url="/Member/getUserInvestLimit" role-data="page:2" role-parent="touzifenxianginner">查看更多</a>
                            {/if}
                        </div>
                    </div>
                </section>
                <section class="qt-white mod-articlelist taber" id="shequ">
                        <div class="hd clearfix">
                            <div class="qt-gl" style="border-left: 2px solid #0080cc; color: #333; padding-left: 10px;line-height: 21px;font-weight: bold;"><span>Ta的主题</span></div>
                            {if $userThreadDisplayorder}<span class="qt-gl tag">有部分帖子因隐私问题而隐藏</span>{/if}
                            {if !empty($arrThreadList)}
                            <a class="qt-gr more" href="/u{$userInfo.uid}/threads/" target="_blank">查看更多&gt;&gt;</a>
                        	{/if}
                        </div>
                        <ul class="bd">
                            {if empty($arrThreadList) and empty($userCount.threads)}
                            <li class="mod-left-empty"><img src="/styles/images/common/emptydataleft.jpg"/><span>Ta很懒，没有发布任何社区信息~</span></li>
                            {else}
                            {foreach from=$arrThreadList item=thread}
                            <li class="clearfix">
                                <p><a href="//www.p2peye.com/thread-{$thread.tid}-1-1.html" target="_blank" title="{$thread.subject}">{$thread.subject}</a></p>
                                <div class="clearfix tools">
                                    <div class="qt-gl info">分类：<a href="//www.p2peye.com/forum-{$thread.fid}-1.html" target="_blank">{$thread.name}</a>　回复：{$thread.replies}　</div>
                                    <div class="qt-gr time">{$thread.dateline|date_format:"Y-m-d H:i:s"}</div>
                                </div>
                            </li>
                            {/foreach}
                            {/if}
                        </ul>
                        <div class="hd clearfix">
                            <div class="qt-gl" style="border-left: 2px solid #0080cc; color: #333; padding-left: 10px;line-height: 21px;font-weight: bold;"><span>Ta的回帖</span></div>
                            {if !empty($arrPostList)}
                            <a class="qt-gr more" href="/u{$userInfo.uid}/posts/" target="_blank">查看更多&gt;&gt;</a>
                        	{/if}
                        </div>
                        <ul class="bd">
                            {if empty($arrPostList)}
                            <li class="mod-left-empty"><img src="/styles/images/common/emptydataleft.jpg"/><span>Ta很懒，没有发布任何社区信息~</span></li>
                            {/if}
                            {include file="inc/profile_post.tpl"}
                        </ul>

                </section>
            </div>
        </div>
        <div class="sub">
            <aside class="mod-sbox">
                <div class="hd">
                    <span style="font-family: Microsoft YaHei; float: left;">Ta关注的平台</span>
                    <a class="" href="//licai.p2peye.com/u{$userInfo.uid}/pingtai/" target="_blank">更多>></a>
                </div>
                <ul class="bd mod-asidelist">
                	{if empty($arrFocusPlatform)}
                		<li class="mod-right-empty"><img src="/styles/images/common/emptydataleft.jpg"/><span>Ta很懒，没有关注任何平台~</span></li>
                	{else}
	                    {foreach from=$arrFocusPlatform item=item}
	                    <li class="clearfix">
	                        <div class="txt">
	                            <div class="inner">
	                                <div><a href="//{$item.domain_body}.p2peye.com" target="_blank" title="{$item.name}" style="color: #383838; font-size: 16px; font-family: Microsoft YaHei; line-height: 1.7em;">{$item.name}</a></div>
	                                <div class="info">
	                                    <span>利率：<i>{$item.rate_view}</i></span>
	                                    <span>口碑：{$item.comment_evaluate.score}</span>
	                                    <span>关注：{$item.follow_num}</span>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="img">
	                            <a href="//{$item.domain_body}.p2peye.com" target="_blank" title="{$item.name}"><img src="//www.p2peye.com/{$item.icon}" alt="{$item.name}"/></a>
	                        </div>
	                    </li>
	                    {/foreach}
                    {/if}
                </ul>
            </aside>
            <aside class="mod-sbox qt-mt35">
                <div class="hd">
                    <span style="font-family: Microsoft YaHei; float: left;">Ta关注的用户</span>
                    <a class="" href="//licai.p2peye.com/u{$userInfo.uid}/focus/" target="_blank">更多>></a>
                </div>
                <ul class="bd mod-asidelist">
                	{if empty($arrFollowers)}
                		<li class="mod-right-empty"><img src="/styles/images/common/emptydataleft.jpg"/><span>Ta很懒，没有关注任何用户~</span></li>
                	{else}
	                    {foreach from=$arrFollowers item=item}
	                    <li class="clearfix">
	                        <div class="txt">
	                            <div class="inner">
	                                <h4><a href="//licai.p2peye.com/u{$item.followuid}/" target="_blank" title="{$item.fusername}">{$item.fusername}</a></h4>
	                                <div class="info">
	                                    <span>收益率：<i>{$item.invest_rate|default:"0.00"}%</i></span>
	                                    <span>投资平台：{$item.invest_num|default:0}个</span>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="img">
	                            <a href="//licai.p2peye.com/u{$item.followuid}/" target="_blank" title="{$item.fusername}"><img class="actor" uid="" src="//www.p2peye.com/uc_server/avatar.php?uid={$item.followuid}&size=middle" alt="{$item.fusername}"/></a>
	                        </div>
	                    </li>
	                    {/foreach}
                    {/if}
                </ul>
            </aside>
            <aside class="mod-sbox qt-mt35">
                <div class="hd">
                    <span style="font-family: Microsoft YaHei; float: left;">Ta的粉丝</span>
                    <a class="" href="//licai.p2peye.com/u{$userInfo.uid}/fans/" target="_blank">更多>></a>
                </div>
                <div class="clearfix bd mod-asideulist">
                    <div class="ulist-inner">
	                    {if empty($arrBeFollowers)}
	                		<li class="mod-right-empty"><img src="/styles/images/common/emptydataleft.jpg"/><span>没有任何用户关注Ta~</span></li>
	                	{else}
	                        {foreach from=$arrBeFollowers item=item}
	                        <a href="//licai.p2peye.com/u{$item.uid}/" target="_blank" title="{$item.username}"><img alt="{$item.username}" class="actor" uid="{$uid}" src="//www.p2peye.com/uc_server/avatar.php?uid={$item.uid}&size=middle"/></a>
	                        {/foreach}
	                    {/if}
                    </div>
                </div>
            </aside>
            <aside class="mod-sbox qt-mt35">
                <div class="hd">
                    <span style="font-family: Microsoft YaHei; float: left;">最近来访</span>
                </div>
                <ul class="bd mod-asidelist">
                {if empty($arrVistorList)}
                    <li class="mod-right-empty"><img src="/styles/images/common/emptydataleft.jpg"/><span>没有任何用户关注Ta~</span></li>
                {else}
                    {foreach from=$arrVistorList item=item}
                    <li class="clearfix">
                        <div class="txt">
                            <div class="inner">
                                <h4 class="clearfix"><a class="qt-gl" href="//licai.p2peye.com/u{$item.vuid}/" target="_blank" title="{$item.vusername}">{$item.vusername}</a><span class="qt-gr time">{$item.dateline|date_format:'%Y-%m-%d %H:%M:%S'}</span></h4>
                                <div class="info">
                                    <span>收益率：<i>{$item.invest_rate|default:0.00}%</i></span>
                                    <span>投资平台：{$item.invest_num|default:0}个</span>
                                </div>
                            </div>
                        </div>
                        <div class="img">
                            <a href="//licai.p2peye.com/u{$item.vuid}/" target="_blank" title="{$item.vusername}"><img class="actor" uid="" src="//www.p2peye.com/uc_server/avatar.php?uid={$item.vuid}&size=middle" alt="{$item.vusername}"/></a>
                        </div>
                    </li>
                    {/foreach}
                {/if}
                </ul>
            </aside>
        </div>
    </div>
</div>
<script type="text/javascript">
var EchartData_distribution = [];
var EchartData_mobility = [];
{if !empty($userInvestPlatform)}
	{foreach from=$userInvestPlatform item=item}
		{if $item.ProportionValue neq '0.00%'}
			EchartData_distribution.push({ value:{$item.AmountValue|replace:",":""},name:"{$item.Name},{$item.ProportionValue}" });
		{/if}
	{/foreach}
{/if}
{if !empty($fluidity)}
	{foreach from=$fluidity item=item}
		{if $item.proportion neq '0.00%'}
			EchartData_mobility.push({ value:{$item.amount|replace:",":""},name:"{$assets[$item.level]},{$item.proportion}" });
		{/if}
	{/foreach}
{/if}
</script>
{/block}

{block name="ext_content"}
<section id="openshare" uid="{$uid}" class="qt-white mod-shareinvest" max="500">
    <div class="openshare-wrap">
        <a class="close" href="javascript:;"></a>
        <div class="hd">转发{$userInfo.username}的投资组合</div>
        <div class="bd clearfix">
            <textarea placeholder="人人为我，我为人人！" data-valid="notempty|len:10:500"></textarea>
        </div>
        <div class="ft">
            <span>还可输入<i class="shownum">500</i>字</span>
            {if $user.userkey}
            <a href="javascript:;" role="shareInvest" role-data="/member/share" class="submit disabled">分享</a>
            {else}
            <a href="javascript:;" role="dialog" role-api="bind" class="submit disabled">分享</a>
            {/if}
        </div>
    </div>
</section>
    <script type="text/template" id="loanssureTpl">
        <ul class="mod-certification">
            <li class="hd">
                <div class="mod-certification-text">根据国家法规相关要求</div>
                <div class="mod-certification-text">请前往个人中心绑定手机号码</div>
            </li>
            <li class="fd clearfix">
                <div class="certification-btn">
                    <a class="submit" title="提交" href="/spacecp/index/" target="_blank">去绑定手机</a>
                </div>
            </li>
        </ul>
        <div class="certification-close"></div>
    </script>
{/block}