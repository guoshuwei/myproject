<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-17 07:06:39
  from '/var/www/user/templates/inc/invest_script_template.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5befbdffd5f767_59957806',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ec0bfa95596cabd87795097c495253a60385264f' => 
    array (
      0 => '/var/www/user/templates/inc/invest_script_template.tpl',
      1 => 1542438391,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5befbdffd5f767_59957806 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
 type="text/template" id="test"> 
<select class="selectBox">
    <option>1</option>
    <option>2</option>
</select>
<?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/template" id="certifyTpl">
    <input type="hidden" id="jumpWay" value="<?php echo '<%';?>=jumpway<?php echo '%>';?>">
    <form action="/spacecp/certify" method="post" role="ajaxfrom">
        <ul class="spacpce-form-list">
            <li class="spacpce-form-item clearfix">
                <div class="spacpce-form-left">输入真实姓名</div>
                <div class="spacpce-form-center">
                    <div class="spacpce-form-input-box clearfix">
                        <input type="text" data-valid="notempty" name="name" class="spacpce-form-input" placeholder="输入本人真实姓名">
                    </div>
                    <div class="spacpce-form-error">
                        <span><i></i>错误提示</span>
                    </div>
                </div>
            </li>
            <li class="spacpce-form-item clearfix">
                <div class="spacpce-form-left">输入身份证号</div>
                <div class="spacpce-form-center spacpce-form-center-m">
                    <div class="spacpce-form-input-box clearfix">
                        <input type="text" data-valid="notempty|len:18:18" name="idnumber" class="spacpce-form-input" placeholder="输入本人真实身份证号" maxlength="18">
                    </div>
                    <div class="spacpce-form-error">
                        <span><i></i>错误提示</span>
                    </div>
                </div>
            </li>
            <li class="spacpce-form-item clearfix">
                <input type="submit" class="spacpce-form-submit" value="确定" id="certifySubmit">
            </li>
        </ul>
    </form>
<?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/template" id="spacpceMobileChangeTpl">
    <form action="/spacecp/modifytymobile?step=1" method="post" role="ajaxfrom" id="spacpceMobileChangeStep1">
        <input type="hidden" name="mobile" value="15201131389" id="spacpceMobileChangeStep1Moblie"/>
        <input type="hidden" name="optype" value="2"/>
        <ul class="spacpce-form-list">
            <li class="spacpce-form-item clearfix">
                <div class="spacpce-form-left">手机号</div>
                <div class="spacpce-form-center">
                    <div class="spacpce-form-input-box clearfix">
                        <span class="spacpce-form-input-value">15201131389</span>
                    </div>
                    <div class="spacpce-form-error"></div>
                </div>
            </li>
            <li class="spacpce-form-item clearfix">
                <div class="spacpce-form-left">短信验证码</div>
                <div class="spacpce-form-center spacpce-form-center-m">
                    <div class="spacpce-form-input-box clearfix">
                        <input type="text" name="mobile_code" data-valid="notempty" class="spacpce-form-input spacpce-form-input-m" placeholder="请输入验证码" maxlength="6">
                        <div class="spacpce-form-input-btn" id="spacpceMobileCode1">获取验证码</div>
                    </div>
                    <div class="spacpce-form-error">
                        <span><i></i>错误提示</span>
                    </div>
                </div>
            </li>
            <li class="spacpce-form-item clearfix">
                <input type="submit" class="spacpce-form-submit" value="下一步" id="spacpceMobileChangeStep1Submit">
            </li>
        </ul>
    </form>

    <form action="/spacecp/modifytymobile?step=2" method="post" role="ajaxfrom" id="spacpceMobileChangeStep2" style="display: none;">
        <input type="hidden" name="oldmobile" value="<?php echo $_smarty_tpl->tpl_vars['userprofile']->value['mobile'];?>
"/>
        <ul class="spacpce-form-list">
            <li class="spacpce-form-item clearfix">
                <div class="spacpce-form-left">新手机号</div>
                <div class="spacpce-form-center">
                    <div class="spacpce-form-input-box clearfix">
                        <input type="text" data-valid="notempty|mobile" name="mobile" class="spacpce-form-input" placeholder="请输入11位手机号" maxlength="11" id="spacpceMobileChangeStep2Moblie">
                    </div>
                    <div class="spacpce-form-error">
                        <span><i></i>错误提示</span>
                    </div>
                </div>
            </li>
            <li class="spacpce-form-item clearfix">
                <div class="spacpce-form-left">短信验证码</div>
                <div class="spacpce-form-center spacpce-form-center-m">
                    <div class="spacpce-form-input-box clearfix">
                        <input type="text" data-valid="notempty" name="mobile_code" class="spacpce-form-input spacpce-form-input-m" placeholder="请输入验证码">
                        <div class="spacpce-form-input-btn" id="spacpceMobileCode2">获取验证码</div>
                    </div>
                    <div class="spacpce-form-error">
                        <span><i></i>错误提示</span>
                    </div>
                </div>
            </li>
            <li class="spacpce-form-item clearfix">
                <input type="submit" class="spacpce-form-submit" value="确定" id="spacpceMobileChangeStep2Submit">
            </li>
        </ul>
    </form>
<?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/template" id="alertTpl">
    <span class="ui-alert shack"><span></span><?php echo '<%';?>=text<?php echo '%>';?></span>
<?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/template" id="messageTpl">
    <span style="padding-left:25px;" class="ui-alert shack"> <?php echo '<%';?>=text<?php echo '%>';?></span>
<?php echo '</script'; ?>
>







<?php }
}
