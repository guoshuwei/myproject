# import scrapy
from html.parser import HTMLParser
from urllib import parse
import re 
from bs4 import BeautifulSoup
from tree import *
class DataFinder():
    def __init__(self, base_url, page_url):
        super().__init__()
        self.base_url = base_url
        self.page_url = page_url
        self.data = set()

    def parse(self,response):
        soup = BeautifulSoup(response,'html.parser')
        # 便历文档树,
        # print(soup.body.children)
        # soup.find("li", { "class" : "test" }) 
        container = soup.find('div',class_='container')
        for child in container.children:
            print(child.find_all('a'))
            # if child.tag
            # if child.attr('class'):
                
        # print(container.children)
        # for child in container.children:
        #     print(child.)
        #     print('---------------------------------------------------------------------------')
        # tags = soup.find_all('div',href=re.compile(r"sina.*\d{4}-\d{2}-\d{2}.*shtml$"))
    # def tree(self,container):
    #     # print(container)
    #     for child in container.children:

    #         # if child.tag
    #         # if child.attr('class'):
    #             print(child.find_all('a'))
    #         # print(type(child))
    #             print('---------------------------------------------------------------------------')
        # domtree = create_dom_tree(container)
        
        

    def page_data(self):
        return self.data

