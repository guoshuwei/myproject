# -*- coding: utf-8 -*-
import scrapy


class HtmlSpider(scrapy.Spider):
    name = 'html'
    allowed_domains = ['nongtoutiao.cn']
    start_urls = ['http://www.nongtoutiao.cn/']

    def parse(self, response):
        filename = 'index.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)
