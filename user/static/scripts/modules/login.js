
    var floatlayer = require('../modules/floatlayer'),

        template = require('../modules/template'),

        formMod = require('../modules/form');

    //登录
    $('body').on('click', '[api-event=login]', function(){
        var logintyOff = document.getElementById("signload");
        if(logintyOff) {
            $("#signload").show();
            $('[name="username"]').focus();
        }else {
            var login = template.render("logintyTpl");
            $("body").append(login);
            var inputFocus = $('[api-event=focus]');
            var submitBtn=$('.form-btn[type="submit"]');
            function setHolder(el, type) {
                var placeholderTXT = $(el).attr('placeholder');
                if (!type && $(el).val() == '') {

                    $(el).parents('.signload-box').append('<span class="placeholder">' + placeholderTXT + '</span>');
                }

                if (type == 1 && $(el).val() == '') {
                    $(el).parents('.signload-box').find('.placeholder').show();
                } else if (type == 2) {
                    $(el).parents('.signload-box').find('.placeholder').hide();
                }

            }
            inputAction(inputFocus);
            function inputAction(inputFocus) {
                if ($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0' || $.browser.version == '8.0' || $.browser.version == '9.0')) {
                    $('[placeholder]').each(function () {
                        setHolder(this);
                    });
                    $('body')
                        .on('blur', '[placeholder]', function () {
                            setHolder(this, 1);
                        })
                        .on('focus', '[placeholder]', function () {
                            setHolder(this, 2);
                        })
                        .on('click', '[placeholder]', function () {
                            $(this).focus();
                            $(this).parents('.signload-box').find('.placeholder').hide();
                        })
                        .on('click', '.placeholder', function () {
                            $(this).hide();
                            $(this).parents('.signload-box').find('[placeholder]').focus();
                        })

                }
                inputFocus
                    .on('focus', function () {
                        $(this).parents(".signload-box").addClass("focus");
                    })
                    .on('blur', function () {
                        $(this).parents(".signload-box").removeClass("focus");
                    });
            }
            $('[name="username"]').focus();
            formMod.listen('//licai.p2peye.com/ajax/tyLogin',{
                validSuccess :function(validResutl){
                },
                ajaxBefore :function(item){
                    submitBtn.val("登录中...");
                    submitBtn.attr({"disabled":'true'});
                },
                validError:function(validResutl){
                    var item  = validResutl.element,
                        parent = item.parents('.box-parent'),
                        prompt = parent.find('.signload-box-notice'),
                        tiper = prompt.find('.signload-notice-text');
                    if(item.attr('name')=='username'){
                        if(validResutl.valid == 'notempty'){
                            tiper.html('用户名或手机号不能为空');
                        }else if(validResutl.valid != 'len:4:15'){
                            tiper.html('请输入3-15个字符或11位手机号！');
                        }
                    }else if(item.attr('name')=='password'){
                        if(validResutl.valid == 'notempty'){
                            tiper.html('密码不能为空');
                        }else if(validResutl.valid != 'len:5:20'){
                            tiper.html('密码长度不能超过20位不能少于6位');
                        }

                    }
                    prompt.show();
                },
                cleanup:function(item){
                    var parent = item.parents('.box-parent'),
                        prompt = parent.find('.signload-box-notice'),
                        tiper = prompt.find('.signload-notice-text');
                    tiper.html('');
                    prompt.hide();
                    $(".signload-btn-notice").hide();
                    $(".signload-btn-notice .signload-notice-text").html('');
                    $("#piccode .signload-box-notice").hide();
                    $("#piccode .signload-notice-text").html('');
                },
                success:function(result) {
                    var data = result.data;
                    if(result.data.code == 200){
                        submitAjax('登录完成');
                        location.reload();
                    }else {
                        submitAjax('登 录');
                        if(data.data.show_verification_code == 1 && $('#piccode').css("display")=="none"){
                            $('#piccode').show();
                            $('#piccode .input')
                                .on('focus', function () {
                                    $(this).parents(".signload-box").addClass("focus");
                                })
                                .on('blur', function () {
                                    $(this).parents(".signload-box").removeClass("focus");
                                });
                        }
                        if(result.data.code == 4105){//验证吗输入错误
                            $("#piccode .signload-box-notice").show();
                            $("#piccode .signload-notice-text").html(data.message);
                        }else{
                            $(".signload-btn-notice .signload-notice-text").html(data.message);
                            $(".signload-btn-notice").show();
                        }
                    }
                },
                error:function(){
                    submitAjax('登 录');
                    $(".signload-btn-notice .signload-notice-text").html("网络不给力，请点击重试");
                    $(".signload-btn-notice").show();
                }
            });
            $(".signload-close-btn").click(function(){
                $("#signload").hide();
                inputFocus.val('');
                $('.signload-box-notice').hide();
            });
            $('body').on('click','#changecode',function(){
                $(this).attr('src','/Ajax/getVcode?type=login&v'+new Date().getTime());
            })
            function submitAjax(text){//登录数据返回
                submitBtn.val(text);
                submitBtn.removeAttr("disabled");
            }
        }

    })
