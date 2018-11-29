from bs4 import BeautifulSoup
import sys
import traceback

VALID_TAGS = [
    'div',
    'span',
    'a',
    'p',
    'br',
    'img',
    'center',
    'b',
    'strong',
    'em',
    'i',
    'ol',
    'ul',
    'li',
    'dl',
    'dt',
    'dd',
    'table',
    'thead',
    'td',
    'tr',
    'th',
    'tbody',
    'tfooter',
    'body'
]

CLEAR_TAGS = [
    'style',
    'script',
    'head'
]
VALID_ATTRS = dict(
    a=['href', 'target', 'title'],
    img=['src', 'title']
)

VALID_ATTR_VALUE = dict(
    a=dict(target='_blank')
)


def sanitize_html(value):

    soup = BeautifulSoup(value,'lxml')
    for tag in soup.findAll(True):
        # filt \n\r
        # tag = tag.strip('\n')
        if tag.name in CLEAR_TAGS:
            tag.clear()
            tag.hidden = True
            continue
        # filt tag name
        if tag.name not in VALID_TAGS:
            tag.hidden = True
            continue

        # filt if no contents between tag
        if not tag.contents:
            tag.hidden = True
            continue
    
        # filt tag attrs
        # if tag.attrs:
        #     _vattr = VALID_ATTR_VALUE.get(tag.name, [])
        #     _attrs = []

        #     # for loop tag.attrs
        #     for att in tag.attrs:

        #         att_name, att_value = tag.name,att
        #         # if attr is valid
        #         if att_name in VALID_ATTRS.get(tag.name, []):
        #             # if we need to set default value
        #             # then ignore the attr
        #             if _vattr and _vattr.get(att_name):
        #                 continue
        #             _attrs.append((att_name, att_value))
        #     tag.attrs = _attrs

        # add default attr value to tag
        # if tag not have sucn a attr
        # if tag.name in VALID_ATTR_VALUE.keys():
        #     _attrs = VALID_ATTR_VALUE.get(tag.name, [])
        #     for k, v in _attrs.items():
        #         tag.attrs.append((k, v))       
    return soup.renderContents()

# if __name__ == '__main__':
#     # text = 'hello world'
#     try:
#         text = '<a href="someurl">This is a link with no target.</a>'
#         assert sanitize_html(text) == ('<a href="someurl" target="_blank">'
#                                    'This is a link with no target.</a>')
#     except AssertionError:
#         _, _, tb = sys.exc_info()
#         traceback.print_tb(tb) # Fixed format
#         tb_info = traceback.extract_tb(tb)
#         filename, line, func, text = tb_info[-1]

#         print('An error occurred on line {} in statement {}'.format(line, text))
#         exit(1)
