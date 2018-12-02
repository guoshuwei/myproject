# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
import re
import configparser#The ConfigParser module has been renamed to configparser in Python 3

class ToutiaoSpider(scrapy.Spider):
    name = 'toutiao'
    # allowed_domains = ['toutiao.com']
    data = []
    config = configparser.RawConfigParser()
    config.read('main.cfg')
    news = config.get('toutiao','name')
    start_urls = ["http://www.nongtoutiao.cn/","http://www.d1cy.com"]

      
    def parse(self, response):
        print(self.start_urls,self.news)
        # name = config.get('toutiao','urls')
        # print(self.start_urls)
        #检验字符类型
        #s=bytes('hello')
        #type(s) 
        # config.add_section('Section1')
        # config.set('Section1', 'an_int', '15')
        # config.set('Section1', 'a_bool', 'true')
        # config.set('Section1', 'a_float', '3.1415')
        # config.set('Section1', 'baz', 'fun')
        # config.set('Section1', 'bar', 'Python')
        # # config.set('Section1', 'foo', '%(bar)s is %(baz)s!')

        # # Writing our configuration file to 'example.cfg'
        # with open('example.cfg', 'w') as configfile:#todo bug:wb 以二进制打开文件写，写入的确是字符串
        #     config.write(configfile)
           
        # soup = BeautifulSoup(response.body,'html.parser')
        # data = []
        # for item in soup.find_all("div",{"class":"rbox"},limit=3):
        # 	title = item.find("title-box")
        	# href = item.div.div.a['href']
        	# source = item.div.div.a['href']
        	# print(title) 
        # yield _list
        #
    #设置筛选器
    # def set_selector:
    	# pass 
# 怎么做爬虫：
# 1.首先你的深度爬取。有子链接你的爬下去。不能只爬当页
# 2.你的分析一个网站的页面结构，分模块。
# 3.递归存json数据。
# 
