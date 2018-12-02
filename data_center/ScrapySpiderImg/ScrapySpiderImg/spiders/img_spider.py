# -*- coding: utf-8 -*-
import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from ScrapySpiderImg.items import ScrapyspiderimgItem
from bs4 import BeautifulSoup
import os
import re
class ImgSpiderSpider(CrawlSpider):
    name = 'img_spider'
    allowed_domains = ['zs.ef360.com']
    start_urls = ["http://brand.ef360.com/103146/"]
    def parse(self, response):
    	soup = BeautifulSoup(response.body,'html.parser')
    	image = ScrapyspiderimgItem()
    	image_list = []
    	images = soup.find_all('img')
    	background_urls = soup.find_all('div' ,style=re.compile(r'^background:url.*;$'))
    	# pattern = re.compile(r'background') 
    	for bgimg in background_urls:
    		match = re.search(r'.*\((.*)\).*$',bgimg.attrs['style'])
    		image = {'image_urls' : [response.urljoin(match.group(1))],'title' : os.path.basename(match.group(1))}
    		image_list.append(image)
    	for img in images:
    		image = {'image_urls' : [response.urljoin(img.attrs['src'])],'title' : os.path.basename(img.attrs['src'])}
    		image_list.append(image)
    	return image_list
		# print(item)
    	# image_list.append(image)
    	# print(image_list)
    		
    		# image_list.append(item)
    	# print(image_list)
    	# return image_list


