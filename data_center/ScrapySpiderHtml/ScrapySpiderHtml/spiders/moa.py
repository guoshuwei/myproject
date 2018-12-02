# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
import re

class MoaSpider(scrapy.Spider):
    name = 'moa'
    allowed_domains = ['www.moa.gov.cn']
    start_urls = ['http://www.moa.gov.cn/']

    def parse(self, response):
        soup = BeautifulSoup(response.body,'html.parser')
        # 原粮价格-每日玉米价格汇总
        price_item = soup.select('.index_hot .index_hot_con .index_hot_list li')
        # print(price_item)
        for item in price_item:
        	print(item.select("a")[0].attrs['href'])
        	# items = {
        	# 	'link' : item.select("a")[0].attrs['href'],
        	#  	'title' : item.select("a")[0].get_text(),
        	#  	# 'source': item.select("span")[0].get_text(),
        	# }
        	# # print(item)
        	# yield items
