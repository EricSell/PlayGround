import requests
from lxml import etree
from pymongo import MongoClient
from hashlib import md5
import logging 
import time
import pymongo

username='大佬橙'

client = MongoClient('mongodb://120.78.234.62:27017/')
csdn_db = client.CSDN
user_info = csdn_db['user_info']

logging.basicConfig(filename='./logging.log',
                    format='%(asctime)s %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S',
                    level=logging.DEBUG)
                    
# logging.info('重试超过最大次数')

headers = {
    'authority': 'blog.csdn.net',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'sec-fetch-site': 'none',
    'referer': 'https://me.csdn.net/blog/weixin_43676025',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    '$cookie': 'uuid_tt_dd=10_18754979660-1596011651821-946587; dc_session_id=10_1596011651821.860347; TY_SESSION_ID=3e07b72c-4f13-40b3-97a7-3dd2ca93f2bf; c_segment=11; dc_sid=dfa0ed8e188c6116210b61283a157d5f; Hm_up_6bcd52f51e9b3dce32bec4a3997715ac=%7B%22islogin%22%3A%7B%22value%22%3A%220%22%2C%22scope%22%3A1%7D%2C%22isonline%22%3A%7B%22value%22%3A%220%22%2C%22scope%22%3A1%7D%2C%22isvip%22%3A%7B%22value%22%3A%220%22%2C%22scope%22%3A1%7D%2C%22uid_%22%3A%7B%22value%22%3A%22weixin_43676025%22%2C%22scope%22%3A1%7D%7D; Hm_ct_6bcd52f51e9b3dce32bec4a3997715ac=6525*1*10_18754979660-1596011651821-946587\\u00215744*1*weixin_43676025; announcement=%257B%2522isLogin%2522%253Afalse%252C%2522announcementUrl%2522%253A%2522https%253A%252F%252Flive.csdn.net%252Froom%252Fyzkskaka%252FwgOUuuyi%253Futm_source%253D1546214907%2522%252C%2522announcementCount%2522%253A1%252C%2522announcementExpire%2522%253A258133181%257D; c_adb=1; c_first_ref=www.baidu.com; c-login-auto-interval=1596012221766; SESSION=56aae6fd-dde8-4bb6-9837-a7c2527f2ebf; log_Id_pv=1; log_Id_view=3; c_first_page=https%3A//blog.csdn.net/weixin_42147780/article/details/100862409; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1596011902,1596012073,1596012382,1596012629; c_ref=https%3A//blog.csdn.net/weixin_43676025; c_page_id=default; dc_tos=qe83ub; c-login-auto=3; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1596013428',
}

res = requests.get('https://blog.csdn.net/weixin_43676025', headers=headers)
e_html = etree.HTML(res.text)

original_article = e_html.xpath("//div[@class='data-info d-flex item-tiling'][1]/dl[@class='text-center'][1]/@title")[0]
LIKE = e_html.xpath("//div[@class='data-info d-flex item-tiling'][1]/dl[@class='text-center'][3]/@title")[0]
FUNS = e_html.xpath("//div[@class='data-info d-flex item-tiling'][1]/dl[@class='text-center'][2]/@title")[0]
reads = e_html.xpath("//div[@class='data-info d-flex item-tiling'][1]/dl[@class='text-center'][5]/@title")[0]
comments = e_html.xpath("//div[@class='data-info d-flex item-tiling'][1]/dl[@class='text-center'][4]/@title")[0]
collections = e_html.xpath("//div[@class='data-info d-flex item-tiling'][2]/dl[@class='text-center'][2]/@title")[0]
week_ranking = e_html.xpath("//div[@class='data-info d-flex item-tiling'][2]/dl[@class='text-center'][3]/@title")[0]
all_ranking = e_html.xpath("//div[@class='data-info d-flex item-tiling'][2]/dl[@class='text-center'][4]/@title")[0]
user_level = e_html.xpath("//div[@class='data-info d-flex item-tiling'][2]/dl[@class='text-center'][5]/dt/a/img[@class='level']/@src")[0]


user_data_template = {
    'username':username,
    'user_data':{
        'original_article':original_article,
        'like':LIKE,
        'funs':FUNS,
        'reads':reads,
        'comments':comments,
        'collections':collections,
        'week_ranking':week_ranking,
        'all_ranking':all_ranking,
        'user_level':user_level,
    },
    'insert_time':time.strftime('%Y-%m-%d %H:%M:%S',time.localtime()),
    'insert_time_stamp':int(time.time()),
}
insert_template = user_data_template


def to_md5(data):
    data = str(data).encode('utf-8')
    return md5(data).hexdigest()

user = user_info.find({'username':username}).clone()
try:
    lasted_data = user.sort('insert_time_stamp',pymongo.DESCENDING)[0].get("user_data")
    print(user.sort('insert_time_stamp',pymongo.DESCENDING)[0])
    lasted = to_md5(lasted_data)
    current = to_md5(insert_template.get('user_data'))
    print(lasted,current)
    if lasted == current:
        pass
    else:
        logging.info('信息改变,新增一条数据')
        user_info.insert_one(insert_template)
except:
    logging.info('表中无数据,新增一条数据')
    user_info.insert_one(insert_template)