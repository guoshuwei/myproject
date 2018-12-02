# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import scrapy
from scrapy.pipelines.images import ImagesPipeline

class ScrapyspiderimgPipeline(ImagesPipeline):
    # def process_item(self, item, spider):
    #     return item
    def set_filename(self, response):
    	return 'full/{0}'.format(response.meta['title'])
    def get_media_requests(self, item, info):
    	for image_url in item['image_urls']:
    		yield scrapy.Request(image_url,meta={'title':item['title']})

    def get_images(self, response, request,info):
    	for key, image, buf in super(ScrapyspiderimgPipeline, self).get_images(response,request,info):
    		key = self.set_filename(response)
    	yield key, image, buf

