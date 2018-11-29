import scrapy
from html.parser import HTMLParser
from urllib import parse
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re 
class LinkFinder(scrapy.Spider):
     name="nongtoutiao"
     start_urls = [
        'http://www.nongtoutiao.cn/'
     ]
    # def __init__(self):
    #     super().__init__()
    #     self.base_url = "http://www.nongtoutiao.cn/"
        # self.page_url = page_url
        # self.links = set()
    def parse(self, response):
        soup = BeautifulSoup(response.body,'html.parser')
        tags = soup.find_all('li',class=re.compile(r"channel-item.*"))
          print(tags)
        # tags = soup.find_all('a',href=re.compile(r"sina.*\d{4}-\d{2}-\d{2}.*shtml$"))
        #   print(tags)   
    # When we call HTMLParser feed() this function is called when it encounters an opening tag <a>
    # def handle_starttag(self, tag, attrs):
        # pass
        # print(tag)
        # if tag == 'a':
        #     for (attribute, value) in attrs:
        #         if attribute == 'href':
        #             url = parse.urljoin(self.base_url, value)
        # if tag == 'li':
        #    for (attribute, value) in attrs:
        #         if value == 'channel-item':
                    
        #     pass
                    # self.links.add(url)

    def page_links(self):
        return self.links

    def error(self, message):
        pass

# response = urlopen('http://www.nongtoutiao.cn/')
# if 'text/html' in response.getheader('Content-Type'):
#     html_bytes = response.read()
#     html_string = html_bytes.decode("utf-8")
#     # print(html_string)
#     finder = LinkFinder()
#     finder.feed(html_string)
