var
    app = require('./app'),
    wxReady = require('../modules/jssdk'),
    template = require('../modules/template'),
    cookie = require('../plugins/$.cookie'),
    content = null,
    result = null,
    last = false,
    next = 0,
    curId = 1,
    timer = null,
    section= $('.fn-section'),
    nowTime = $('body').attr('data-nowtime'),
    tagTime = 1497801600,//2017-06-19 00:00:00;
    startTime = 1497542400,//2017-06-16 00:00:00;
    lock = true,
    itemLock = true,
    question = [{
        question: '. 总担心你吃不好穿不暖的老爸，他爱吃什么你知道吗？',//第1题
        anwser: [{
            list: '必须知道',
            nextQuestion: 2
        },
        {
            list: '我无言以对',
            nextQuestion: 3
        }]
    },
    {
        question: '. 总在你生日第一时间送上祝福的老爸，他的生日你记得吗？',//第2题
        anwser: [{
            list: '记得',
            nextQuestion: 4
        },
        {
            list: '不记得',
            nextQuestion: 5
        }]
    },
    {
        question: '. 陪你过了大大小小无数个节日的老爸，你陪他过过父亲节吗？',//第3题
        anwser: [{
            list: '当然啦',
            nextQuestion: 5
        },
        {
            list: '好像从来没有',
            nextQuestion: 6
        }]
    },
    {
        question: '. 总把你的照片当屏保当封面的老爸，你们上次合照是什么时候？',//第4题
        anwser: [{
            list: '就是最近',
            nextQuestion: 7
        },
        {
            list: '不记得了，感觉很久没和老爸合影了',
            nextQuestion: 8
        }]
    },
    {
        question: '. 小时候为了你忙忙碌碌的老爸，现在还在拼工作吗?',//第5题
        anwser: [{
            list: '是的，依然忙得停不下来，我总劝他但没用',
            nextQuestion: 8
        },
        {
            list: '退休了，每天优哉游哉，挺好的',
            nextQuestion: 9
        }]
    },
    {
        question: '. 总在朋友圈晒你给你点赞的老爸，你的朋友圈晒过他吗？',//第6题
        anwser: [{
            list: '偶尔也出现过',
            nextQuestion: 9
        },
        {
            list: '从来没有',
            nextQuestion: 10
        }]
    },
    {
        question: '. 家里小到灯泡、水管，大到风扇、电视机，只要出了问题，老爸会',//第7题
        anwser: [{
            list: '变身万能修理工，在他手里没有修不好的东西',
            nextQuestion: 0,
            result: 1
        },
        {
            list: '迅速换新，他总能买到最实惠、性价比最高的东西',
            nextQuestion: 0,
            result: 2
        }]
    },
    {
        question: '. 找到心仪的TA，把谈恋爱的事情告诉老爸后，他会',//第8题
        anwser: [{
            list: '问这问那，从学历工作家庭聊到兴趣爱好特长',
            nextQuestion: 0,
            result: 2
        },
        {
            list: '告诉你开心就好，家人永远是你坚强的后盾',
            nextQuestion: 0,
            result: 3
        }]
    },
    {
        question: '. 工作几十年从不回家抱怨工作的老爸，在得知你被老板训斥后第一时间',//第9题
        anwser: [{
            list: '陪着你一起骂老板',
            nextQuestion: 0,
            result: 3
        },
        {
            list: '开导你，严肃认真的告诉你职场需要注意的事项',
            nextQuestion: 0,
            result: 4
        }]
    },
    {
        question: '. 辛苦一辈子舍不得为自己多花钱的老爸，在得知你想在大城市买房凑不够首付的时候',//第10题
        anwser: [{
            list: '二话不说拿出全部积蓄支持你',
            nextQuestion: 0,
            result: 4
        },
        {
            list: '“孩子，大城市生活压力大，还是回家吧，爸给你支持！“',
            nextQuestion: 0,
            result: 5
        }]
    }],
    rolePlay = [{
        //A
        img: '/styles/images/topic/brand618/mobile/result_a.png',
        vcodeImg: '/styles/images/topic/brand618/mobile/result_browser_a.png',
        name: '学霸型老爸',
        introduce: '你老爸在很多人眼里就像神一般的存在，可谓是无所不能！就像“档案”在投资人眼中的无所不知，金融白皮书不是白叫的！然而学霸老爸在你眼里，也只是一个普通的老爸，他会老，会驼背，会有一天走不动。趁父亲节来临，请大声对老爸说一声，我爱您！'
    },
    {
        //B
        img: '/styles/images/topic/brand618/mobile/result_b.png',
        vcodeImg: '/styles/images/topic/brand618/mobile/result_browser_b.png',
        name: '万事通老爸',
        introduce: '你老爸一定是你家方圆五公里最受欢迎的人，有困难就给帮助，充满正能量！就像“社区”在投资人眼中永远是最给力的后盾！然而现在你只想跟他说，爸，以后让我来做您的坚强后盾！'
    },
    {
        //C
        img: '/styles/images/topic/brand618/mobile/result_c.png',
        vcodeImg: '/styles/images/topic/brand618/mobile/result_browser_c.png',
        name: '欢乐派老爸',
        introduce: '能当你老爸的宝贝真是太幸福啦，他简直就是你的百宝箱，要什么有什么，时刻给你欢乐！就像“找活动”在投资人眼中永远是无敌幸运星，永远都有惊喜！长大后，你就知道这份传承有多么可贵！'
    },
    {
        //D
        img: '/styles/images/topic/brand618/mobile/result_d.png',
        vcodeImg: '/styles/images/topic/brand618/mobile/result_browser_d.png',
        name: '事业型老爸',
        introduce: '小的时候，你一定埋怨过他，为什么很多个周末他都不能陪你，他总说要给你最好的，那点辛苦不算什么。然后长大后的你只想跟他说，爸，别那么拼了，我也能赚钱，除了工资，还有P2P理财里稳健的小收入，虽然不多，但足够带着爸妈旅游一趟，好吃好喝一番啦~'
    },
    {
        //E
        img: '/styles/images/topic/brand618/mobile/result_e.png',
        vcodeImg: '/styles/images/topic/brand618/mobile/result_browser_e.png',
        name: '经济适用型老爸',
        introduce: '你老爸一定是大家公认的好老爸，热爱家庭，脾气好又勤快，把小日子经营得有模有样。但你也一定误会过他，比较过他，为什么不如别人的爸爸。长大后你才明白，他为了这个家，精打细算每一笔收入，只为给你稳稳的幸福，如同记账给投资人带来的真切安全感。'
    }];

if($.cookie('complate')){
    last = true;
    result = $.cookie('complate');
    complatePage(result);
}

$('body')
    .on('tap','.fn-answer-start',function(){
        content = template.render('answerTpl',{data: question[next],id: curId});
        timer = setTimeout(function(){
            section.html(content);
        },100);
        $("body").scrollTop(0);
    })
    .on('tap','.fn-answer-item',function(){
        if(!itemLock) return;
        itemLock = false;
        _Fn.loading().show($(this));
        clearTimeout(timer);
        curId ++;
        next = $(this).data('next') - 1;
        if(next > 0 && !last){            
            content = template.render('answerTpl',{data: question[next],id: curId});
            timer = setTimeout(function(){
                section.html(content);
                itemLock = true;
                _Fn.loading().hide();
            },500)
        }else{
            result = $(this).data('result') - 1;
            $.cookie('complate',result,{path:'/',expires:365});
            complatePage(result);
        }
        $("body").scrollTop(0);
    })
    .on('tap','.fn-fresult-gift',function(){
        if(nowTime > tagTime){
            _Fn.alert('活动已结束！');
            return;
        }
        if(nowTime < startTime){
            _Fn.alert('活动未开始！');
            return;
        }

        if(!_Fn.isLogin()) return;
        if(!_Fn.isBind()) return;
        if(!lock) return;
        
        lock = false;
        _Fn.loading().show($(this));
        $.ajax({
            url: _Fn.mockServer + '/topic/obtaincard',
            type: 'post',
            dataType: 'json',
            success: function(res){
                lock = true;
                _Fn.loading().hide();
                if(res.code == 200){
                    content = template.render('giftTpl');
                    _Fn.lightboxWrap()._fadeIn();
                    section.append(content);
                }else{
                    _Fn.alert(res.message);
                }
            },
            error: function(){
                lock = true;
                _Fn.alert('请稍后刷新重试！');
                _Fn.loading().hide();
            }
        })
    })
    .on('tap','.fn-fresult-share',function(){
        if(_Fn.isWeiXin()){
            content = template.render('shareWeixinTpl',rolePlay[result]);
        }else{
            content = template.render('shareTpl',rolePlay[result]);
        }
        
        timer = setTimeout(function(){
            _Fn.lightboxWrap()._fadeIn();
            section.append(content);
        },100)
    })
    .on('tap','.fn-again',function(){
        $.cookie('complate','',{path:'/',expires:365});
        window.location.href = window.location.href + '?' + Date.parse(new Date());
    })
    .on('tap','#lightbox_wrap,.fn-fhide',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-fshow').hide();
    })

    function complatePage(result){
        
        content = template.render('resultTpl',rolePlay[result]);

        wxReady.init(function(status){
            if(status == 'error'){return;}
            wxReady.share({
                title: '父亲节，我心目中的老爸是' + rolePlay[result].name + '!测一测你心目中的老爸吧!', // 分享标题
                imgUrl: '//licai.p2peye.com' + rolePlay[result].img, // 分享图标
                desc: '测一测你心目中的老爸。', // 分享描述
                success: function(){
                    _Fn.track.fire('280000006');
                }
            });
        })

        timer = setTimeout(function(){
            _Fn.loading().hide();
            itemLock = true;
            section.html(content);
        },100)
    }

    function notice() {

        var status = 1;

        var handle = function(){
            var back = $('.fn-fstart-item-next');
            return {
                _show : function(){
                    back.fadeIn();
                },
                _hide : function(){
                    back.hide();
                }
            }
        }();
        $(window).scroll(function(){

            var scrollTop = $(window).scrollTop();
            
            if(status == 1 && scrollTop > 20){
                status = 2;
                handle._hide();
            }

            if(status == 2 && scrollTop <= 20){
                status = 1;
                handle._show();
            }
        })
    }
    notice();
    $(function(){
        if(_Fn.isWeiXin()){
            _Fn.track.fire('280000004');
        }else{
            _Fn.track.fire('280000005');
        }
    })