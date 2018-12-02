# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
import re


class ZhuSpider(scrapy.Spider):
    name = 'zhu'
    allowed_domains = ['www.zhujiage.com']
    # start_urls = ['http://www.zhujiage.com/']
    start_urls = ['file:///var/www/myproject/data_center/html_template/zhu_index.html']

    def parse(self, response):
        soup = BeautifulSoup(response.body,'html.parser')
        # 原粮价格-每日玉米价格汇总
        price_item = soup.select('.lmlist ul:nth-of-type(1) li')
        # print(price_item)
        for item in price_item:
        	# print(item.select("span")[0].get_text())
        	items = {
        		'link' : item.select("a:nth-of-type(2)")[0].attrs['href'],
        	 	'title' : item.select("a:nth-of-type(2)")[0].get_text(),
        	 	'source': item.select("span")[0].get_text(),
        	}
        	yield items
