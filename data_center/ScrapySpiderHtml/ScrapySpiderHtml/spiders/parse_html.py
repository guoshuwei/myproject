# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup

class ParseHtmlSpider(scrapy.Spider):
    name = 'parse_html'
    allowed_domains = ['zs.ef360.com']
    start_urls = ['http://zs.ef360.com/Items/hokabr/']

    def parse(self, response):
    	soup = BeautifulSoup(response.body,'html.parser')
    	datalist = list()
    	itemlist = soup.select('#post_list .post .post_right .post_title a')
    	for item in itemlist:
    		yield {
    			"href":item.attrs['href'],
    			"text":item.get_text()
    		}
    		# datalist.append(items)

        
