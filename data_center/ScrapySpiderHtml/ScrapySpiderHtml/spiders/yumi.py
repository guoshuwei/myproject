# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
import re

class YumiSpider(scrapy.Spider):
    name = 'yumi'
    allowed_domains = ['www.yumi.com.cn']
    start_urls = ['http://www.yumi.com.cn/yumijiage/index.html']

    def parse(self, response):
    	soup = BeautifulSoup(response.body,'html.parser')
    	# 原粮价格-每日玉米价格汇总
    	price_item = soup.find_all('ul',class_="priceSubChe")
    	for item in price_item:
    		link = item.select("li:nth-of-type(1) p a")[0].attrs['href']
    		yield scrapy.Request(response.urljoin(link),callback=self.parse_details)
    		# print(info)
    		
    def parse_details(self, response):
    	soup2 = BeautifulSoup(response.body,'html.parser')
    	if soup2.select('.conPage .conText'):
    		content = response.css('div.conPage .conText').extract()
    	else:
    		content = response.css('.conPage .con1Text').extract()	 
    	item = {
    		'link':response.url,
    		'title':soup2.select('.conPage .conTit')[0].get_text(),
    		'pub_time':soup2.select('.conPage .conSubshow ul li')[0].get_text(),
    		'source':soup2.select('.conPage .conSubshow ul li')[1].get_text(),
    		'content':content
    	}
    	return item
    	
        
