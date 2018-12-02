# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
from scrapy.http import TextResponse
from urllib.request import urlopen
from html.parser import HTMLParser
from urllib import parse
class HtmlSpider(scrapy.Spider):
    name = 'html'
    # allowed_domains = ['zs.ef360.com']
    # start_urls = ['http://zs.ef360.com/items/ouyue/']
    
    allowed_domains = ['www.yumi.com.cn']
    start_urls = ['http://www.yumi.com.cn/html/2018/11/20181130100453220547.html']

    def parse(self, response):
        content = response.css('div.conPage .conText').extract()
        yield {'content':content}
        # print(content)
        # print(response)
        # soup = BeautifulSoup(response.body,'html.parser')
        # response = urlopen(response.url)
        # if 'text/html' in response.getheader('Content-Type'):
        #     html_bytes = response.read()
        #     content = response.css('div.conPage.conText')
        #     print(content)
                # html_string = html_bytes.decode("utf-8")
        # content = soup.select('.conPage .conText')
        # print(content)
        # if soup.select('.conPage .conText'):
            # yield soup.select('.conPage .conText')[0]
    	# _response = urlopen('http://zs.ef360.com/items/ouyue/','rb')        
    	# if 'text/html' in _response.getheader('Content-Type'):
     #    	html_bytes = _response.read()
     #    	html_string = html_bytes.decode("utf-8")
     #    	print(html_string)
    	# test_response = TextResponse(response.url, encoding = 'utf-8',body = response.body)
    	# # print(test_response.body.encode('utf-8'))
    	# filename = 'nygc_index.html'
    	# soup = BeautifulSoup(test_response.body,from_encoding="utf-8",features='html.parser')
    	# with open(filename, 'wb') as f:
    	# 	f.write(soup)
        # with open(filename, 'wb') as f:
        	# f.write(soup)
        # self.log('Saved file %s' % filename)
