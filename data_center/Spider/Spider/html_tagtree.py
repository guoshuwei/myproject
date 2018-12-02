# import scrapy
from html.parser import HTMLParser
from urllib import parse
from bs4 import BeautifulSoup
import re
from urllib.request import urlopen
from html_escape import *
from treelib import Tree, Node

  
def recusive(container,depth,tree):
    # print(container)
    # print(container.attrs['class'])
    # new_container = list(filter(lambda x: x!='\n', container.contents))
    # 建立父节点
    if depth == 0:
        tree.create_node("-".join(container.attrs['class']), "-".join(container.attrs['class'])) 
    # # if new_container[0].children:
    depth = depth + 1
    # # print(container.stripped_strings)
    # for child in container.stripped_strings:
    # print(depth)
    for child in container.children:
        if(child != '\n' and child.name):
            try:
                if child.has_attr('class'):
                    # print(child.attrs['class'])
                # print("-".join(child.attrs['class']),"-".join(child.parent.attrs['class']))
                    # data = ''
                    # href = ''
                    # if(child.name == 'a'):
                    #     href = child.attrs['href']
                    # data = {'href':href}
                    tree.create_node("-".join(child.attrs['class']), "-".join(child.attrs['class']), parent="-".join(child.parent.attrs['class']))
                    
                        # print(node.Add(data))    
                    # tree.show(key=lambda x: x.tag, reverse=True, line_type='ascii-em') 
                    recusive(child,depth,tree)
            except Exception as e:
                print(e)
    return tree;        
# page_url = 'http://zs.ef360.com/items/ouyue/'
page_url = 'http://www.yumi.com.cn/yumijiage/index.html'
response = urlopen(page_url)
soup = BeautifulSoup(response,'html.parser')
# if 'text/html' in response.getheader('Content-Type'):
#     html_bytes = response.read()
#     html_string = html_bytes.decode("utf-8")   

# html = sanitize_html(soup_html_string)
# print(html)
# soup = BeautifulSoup(sanitize_html(html_string),'lxml')
# print(soup.body)
soup.body['class'] = 'body'

container = soup.find('body',class_='body')
if __name__ == '__main__':
    tree = Tree()
    create_tree = recusive(container,0,tree)
# # #     # print(create_tree.to_json(with_data=True))
    create_tree.show(key=lambda x: x.tag, reverse=True, line_type='ascii-em')



