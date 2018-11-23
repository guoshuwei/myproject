<script type="text/template" id="test"> 
<select class="selectBox">
    <option>1</option>
    <option>2</option>
</select>
</script>
{* 实名认证 start *}
<script type="text/template" id="certifyTpl">
    <input type="hidden" id="jumpWay" value="<%=jumpway%>">
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
</script>
{* 修改手机号 start *}
<script type="text/template" id="spacpceMobileChangeTpl">
    <form action="/myproject/user/ajax.php?type=modify_mobile_code&step=1" method="post" role="ajaxfrom" id="spacpceMobileChangeStep1">
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

    <form action="/myproject/user/ajax.php?type=modify_mobile_code&step=2" method="post" role="ajaxfrom" id="spacpceMobileChangeStep2" style="display: none;">
        <input type="hidden" name="oldmobile" value="{$userprofile['mobile']}"/>
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
</script>
{* 修改手机号 end *}
<script type="text/template" id="alertTpl">
    <span class="ui-alert shack"><span></span><%=text%></span>
</script>
<script type="text/template" id="messageTpl">
    <span style="padding-left:25px;" class="ui-alert shack"> <%=text%></span>
</script>







