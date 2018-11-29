# -*- coding: utf-8 -*-
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
# from renti.items import RentiItem

class SpiderSpider(scrapy.Spider):
    name = 'spider'
    allowed_domains = ['www.ef360.com']
    start_urls = ['http://www.ef360.com/']
    rules = (
    # #     # Rule(LinkExtractor(allow=r'list\d+.html')),
    # #     # Rule(LinkExtractor(allow=r'ArtZG/\d+/$')),
        Rule(LinkExtractor(allow=r'http://www.ef360.com/.*$'), callback='parse_item', follow=True),
    )
    def parse(self,response):
    	print(222)
  
    def parse_item(self, response):
    	print(111)
        # item = RentiItem()
        # item['img_path'] = response.xpath("//title/text()").extract()[0].split('-')[0]
        # item['img_name'] = response.xpath("//div[@class='imgbox']/a/img/@alt").extract()[0]
        # item['img_url'] = 'http://www.666rt.co%s'%response.xpath("//div[@class='imgbox']/a/img/@src").extract()[0]
        # yield item
