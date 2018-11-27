# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
import re

class ToutiaoSpider(scrapy.Spider):
    name = 'toutiao'
    allowed_domains = ['toutiao.com']
    data = []
    start_urls = [
    	# 'http://news.wugu.com.cn/toutiao',
    	'http://www.nongtoutiao.cn/'
    ]

      
    def parse(self, response):
        soup = BeautifulSoup(response.body,'html.parser')
        data = []
        for item in soup.find_all("div",{"class":"rbox"},limit=3):
        	title = item.find("title-box")
        	# href = item.div.div.a['href']
        	# source = item.div.div.a['href']
        	# print(title) 
        # yield _list
        #
    #设置筛选器
    def set_selector:
    	pass 
# 怎么做爬虫：
# 1.首先你的深度爬取。有子链接你的爬下去。不能只爬当页
# 2.你的分析一个网站的页面结构，分模块。
# 3.递归存json数据。
# 
