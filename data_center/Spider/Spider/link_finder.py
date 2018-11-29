# import scrapy
from html.parser import HTMLParser
from urllib import parse
import re 
from bs4 import BeautifulSoup

class LinkFinder(HTMLParser):

    def __init__(self, base_url, page_url):
        super().__init__()
        self.base_url = base_url
        self.page_url = page_url
        self.links = set()
        self.html = None
        self.tag = ''

    def loads(self, html):
        self.html = html
        print(self.html)
        # self.feed(html)
        # self.close()
    # When we call HTMLParser feed() this function is called when it encounters an opening tag <a>
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for (attribute, value) in attrs:
                if attribute == 'href':
                    url = parse.urljoin(self.base_url, value)
                    self.links.add(url)
                    # print(scrapy.Request)
                    # yield scrapy.Request(url,callback=self.extract_data)
                    # self.extract_data(url)
    # and re.match(r".*/html/2018/11/.*",value):
    def extract_data(self,response):
        pass
        # print(response.url)
        
    def handle_data(self, data):
        pass

    def page_links(self):
        return self.links

    def error(self, message):
        pass


