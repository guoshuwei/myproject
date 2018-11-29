# # -*- coding: utf-8 -*-

# # 导入这个包为了移动文件
# import shutil
# # 这个包不解释
# import scrapy

# # 导入项目设置
# from scrapy.utils.project import get_project_settings

# # 导入scrapy框架的图片下载类
# from scrapy.contrib.pipeline.images import ImagesPipeline

# # 这个包不解释
# import os

# class ImagesPipeline(ImagesPipeline):

#     # 从项目设置文件中导入图片下载路径
#     img_store = get_project_settings().get('IMAGES_STORE')

#     # 重写ImagesPipeline类的此方法
#     # 发送图片下载请求
#     def get_media_requests(self, item, info):
#         img_url = item['img_url']
#         yield  scrapy.Request(img_url)

#     # 重写item_completed方法
#     # 将下载的文件保存到不同的目录中
#     def item_completed(self, results, item, info):
#         image_path = [x["path"] for ok, x in results if ok]

#         # 定义分类保存的路径
#         img_path = "%s%s"%(self.img_store, item['img_path'])
#         # 目录不存在则创建目录
#         if os.path.exists(img_path) == False:
#             os.mkdir(img_path)

#         # 将文件从默认下路路径移动到指定路径下
#         shutil.move(self.img_store + image_path[0], img_path + "\\" + item["img_name"] + '.jpg')

#         item["img_path"] = img_path + "\\" + item["img_name"] + '.jpg'
#         return item
# #