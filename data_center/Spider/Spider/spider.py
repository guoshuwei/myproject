from urllib.request import urlopen
from link_finder import LinkFinder
from data_finder import DataFinder
from html_escape import *
from domain import *
from general import *

class Spider:

    project_name = ''
    base_url = ''
    domain_name = ''
    queue_file = ''
    crawled_file = ''
    queue = set()
    crawled = set()
    datalist = list()
    def __init__(self, project_name, base_url, domain_name):
        Spider.project_name = project_name
        Spider.base_url = base_url
        Spider.domain_name = domain_name
        Spider.queue_file = Spider.project_name + '/queue.txt'
        Spider.crawled_file = Spider.project_name + '/crawled.txt'
        Spider.data_file = Spider.project_name + '/data.json'
        Spider.gather_links(Spider.base_url)
        self.boot()
        self.crawl_page('First spider', Spider.base_url)

    # Creates directory and files for project on first run and starts the spider
    @staticmethod
    def boot():
        create_project_dir(Spider.project_name)
        create_data_files(Spider.project_name, Spider.base_url)
        Spider.queue = file_to_set(Spider.queue_file)
        Spider.crawled = file_to_set(Spider.crawled_file)
        # Spider.datalist = set_to_list(Spider.data_file)
        # print(Spider.queue)

    # Updates user display, fills queue and updates files
    @staticmethod
    def crawl_page(thread_name, page_url):
        if page_url not in Spider.crawled:
            print(thread_name + ' now crawling ' + page_url)
            print('Queue ' + str(len(Spider.queue)) + ' | Crawled  ' + str(len(Spider.crawled)))
            # Spider.add_links_to_queue(Spider.gather_links(page_url))
            #处理数据逻辑
            Spider.extract_data_to_json(Spider.gather_data(page_url))
            # Spider.queue.remove(page_url)
            # Spider.crawled.add(page_url)
            # Spider.update_files()

    # Converts raw response data into readable information and checks for proper html formatting
    @staticmethod
    def gather_links(page_url):
        html_string = ''
        try:
            response = urlopen(page_url)
            if 'text/html' in response.getheader('Content-Type'):
                html_bytes = response.read()
                html_string = html_bytes.decode("utf-8")
            finder = LinkFinder(Spider.base_url, page_url)
            finder.feed(sanitize_html(html_string))
        except Exception as e:
            print(str(e))
            return set()
        return finder.page_links()

     # Converts raw response data into readable information and checks for proper html formatting
    @staticmethod
    def gather_data(page_url):
        html_string = ''
        try:
            response = urlopen(page_url)
            if 'text/html' in response.getheader('Content-Type'):
                html_bytes = response.read()
                html_string = html_bytes.decode("utf-8")
            finder = DataFinder(Spider.base_url, page_url)
            finder.parse(sanitize_html(html_string))
        except Exception as e:
            print(str(e))
            return set()
        return finder.page_data()
            
    # Saves queue data to project files
    @staticmethod
    def add_links_to_queue(links):
        for url in links:
            if (url in Spider.queue) or (url in Spider.crawled):
                continue
            if Spider.domain_name != get_domain_name(url):
                continue   
            Spider.queue.add(url)

    # extract queue data to project files
    @staticmethod
    def extract_data_to_json(data):
        print(data)
        # list_to_file(Spider.queue, Spider.queue_file)
        # for url in links:
        #     if (url in Spider.queue) or (url in Spider.crawled):
        #         continue
        #     if Spider.domain_name != get_domain_name(url):
        #         continue   
        #     Spider.queue.add(url)        

    @staticmethod
    def update_files():
        set_to_file(Spider.queue, Spider.queue_file)
        set_to_file(Spider.crawled, Spider.crawled_file)
