# import scrapy
from html.parser import HTMLParser
from urllib import parse
import re 
from bs4 import BeautifulSoup
from tree import *
from general import *
class DataFinder():
    def __init__(self, base_url, page_url):
        super().__init__()
        self.base_url = base_url
        self.page_url = page_url
        self.data = list()

    def parse(self,response):
        soup = BeautifulSoup(response,'html.parser')
        soup.body['class'] = 'body'
        container = soup.find('body',class_='body')
        # print(container);
        index_hot_list = container.select('#post_list .post .post_right')
        print(index_hot_list)
        # for item in index_hot_list:
        #     items = {
        #         'href' : parse.urljoin(self.base_url,item.attrs['href']),
        #         'text' : item.get_text(),
        #     }
        #     self.data.append(items)

    def page_data(self):
        return self.data

