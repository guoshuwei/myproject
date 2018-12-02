# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
import re
class ParseHtmlSpider(scrapy.Spider):
    name = 'parse_html'
    # allowed_domains = ['zs.ef360.com']
    start_urls = ['http://192.168.186.166/myproject/main/index.php?s=/branch/list.html']

    def parse(self, response):
        soup = BeautifulSoup(response.body,'html.parser')        
        # print(soup)
        # datalist = list()
        ###############################
        # d_top_l_c = soup.find('div',class_='d-top-l').children

        # for item in d_top_l_c:
        #     if item.name:
        #         if item.attrs['class'][0] == 'd-top-logo' :
        #             logo_image = item.select('a img')[0].attrs['src']
        #         if item.attrs['class'][0] == 'd-top-title' :
        #             name = item.select('h1')[0].get_text()
        #             egname = item.select('span')[0].get_text()
        #         if item.attrs['class'][0] == 'd-top-subtitle' :
        #             subtitle = item.get_text()
        #         if item.attrs['class'][0] == 'd-top-star' :
        #             stat = 5
        #         if item.attrs['class'][0] == 'd-top-hits' :
        #             hits = re.compile(r'^\d+').match(item.get_text())[0]

        # d_detail_inner_c = soup.find('div',class_='d-detail-inner').children

        # for item in d_detail_inner_c:
        #     if(item.name):
        #         if item.attrs['class'][0] == 'clearfix' :
        #             brandimage = item.select('.d-detail-brandimage a img')[0].attrs['src']
        #             brand_type = item.select('.d-detail-brandinfo ul li')[2].get_text()
        #             character = item.select('.d-detail-brandinfo ul li')[3].get_text()
        #             brand_create_time = item.select('.d-detail-brandinfo ul li')[4].get_text()
        #             annual_sale = item.select('.d-detail-brandinfo ul li')[5].get_text()
        #             company_address = item.select('.d-detail-brandinfo ul li')[6].get_text()
        #             company_name = item.select('.d-detail-brandinfo ul li')[7].get_text()
        #             store_num = item.select('.d-detail-brandinfo ul li')[8].get_text()
        #             comapny_phone = item.select('.d-detail-brandinfo ul li')[9].get_text()
        #             comapny_link = item.select('.d-detail-brandinfo ul li')[10].get_text()

        # d_detail_box_2_c = soup.find_all('div',class_='d-detail-box')[1]                 
        # company_brief = d_detail_box_2_c.select('.d-detail-inner')[0]

        # archieve_itemlist = {
        #     'name':name,
        #     'egname': egname,
        #     'logo':logo_image,
        #     'subtitle':subtitle,
        #     'stat':stat,
        #     'hits':hits,
        #     'brandimage':brandimage,
        #     'brand_type':brand_type,
        #     'character':character,
        #     'brand_create_time':brand_create_time,
        #     'annual_sale':annual_sale,
        #     'company_address':company_address,
        #     'company_name':company_name,
        #     'store_num':store_num,
        #     'comapny_phone':comapny_phone,
        #     'comapny_link':comapny_link,
        #     'yinwen':'',
        # }
        # print(archieve_itemlist)
        # yield archieve_itemlist
    	# deal brand archives
        #############################
        d_detail_box_3_c = soup.find_all('div',class_='d-detail-box')[3]
        news_list = d_detail_box_3_c.select('.d-detail-inner .d-detail-news li')
        for news_item in news_list:
            _link = news_item.select('.l-pic')[0].attrs['href']
            yield scrapy.Request(_link,callback=self.parse_details)
            # _image = news_item.select('.l-pic img')[0].attrs['src']
            # _title = news_item.select('.l-tit')[0].get_text()
            # _desc = news_item.select('.l-desc')[0].get_text()
            # print(_link,_image,_title,_desc)



        # for item in itemlist:
    		# yield {
    			# "href":item.attrs['href'],
    			# "text":item.get_text()
    		# }
    		# datalist.append(items)
    def parse_details(self,response):
        # print(response.url);
        soup2 = BeautifulSoup(response.body,'html.parser')
        return soup2.select('.news-body')[0]
                    
        
