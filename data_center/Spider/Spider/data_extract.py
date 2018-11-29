# -*- coding: utf-8 -*-
import scrapy
import os
from html.parser import HTMLParser
from urllib import parse
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re 
class DataExtractSpider(scrapy.Spider):
    name = 'data_extract'
    allowed_domains = ['nongtoutiao']
    template = ['file:///var/www/myproject/data_center/Spider/Spider/index.html']
    start_urls = ['http://www.nongtoutiao.cn/']

    def parse(self, response):
    	# 引入模板
    	# print(self.template[0])
    	local_temp = urlopen(self.template[0])
    	html_bytes = local_temp.read()
    	html_string = html_bytes.decode("utf-8")
    	template_soup = BeautifulSoup(html_string,'html.parser')
    	data = list()
    	left_second = template_soup.find_all('li',class_=re.compile(r"channel-item.*"))
    	for item in left_second:
    		nav_link = item.find('a')['href']
    		data.append(nav_link)
    		new_url = response.urljoin(nav_link)
            # self.recursion(new_url)
    		# self.parse_recursion(new_url)
    		if 'http://' in new_url: 
    		  return self.recursion(new_url)
            # print(res)
    	# print(data) 

    def recursion(self,new_url):
        # pass
        handler = urlopen(new_url)
        html_bytes = handler.read()
        html_string = html_bytes.decode("utf-8")
        soup = BeautifulSoup(html_string,'html.parser')
        rbox = soup.find_all('li',class_='rbox')
        print(rbox)
        # self.log("Visited %s" % response.url)

        
