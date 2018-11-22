git test 提交前注意pull代码。

项目描述:
名称：【农联网】-【农联交易】 一期。
模块划分：
资讯模块,网站后台：main
用户：user
购物系统：cart
数据中心：data_center
访问控制: acl
公共类库: library

开发环境：
Linux debian 4.9.0-7-amd64 #1 SMP Debian 4.9.110-3+deb9u2 (2018-08-13) x86_64 GNU/Linux

mysql  Ver 14.14 Distrib 5.6.42, for Linux (x86_64) using  EditLine wrapper

PHP 7.0.30-0+deb9u1 (cli)(尽量用7.2以上)

nginx/1.14.0


任务列表:资讯模块的网站爬虫开发。（爬取行业相关新闻和文章）

【短信模块-联合力量】
流程：1.调用第三方接口发短信（不同接口时间段允许发送的次数不一样，具体看开发文档）
      2.接口请求成功，接口有返回码和响应提示(看开发文档)

实现: 1.公共接口异步请求方法（ajax.php）getMobilecode 	 
        检验用户输入请求，POST，token，防止刷短信，所有验证都在服务端进行。
        验证流程：
        1.手机号是否正确（前端），手机号是否注册（后端）
        2.session记录短信过期时间（自定义）
        3.验证通过，调用接口发送短信 
        4.获取发送短信适配器(短信发送类)。
        5.




//必要条件 : role-api="spacpceMobileChange"  


