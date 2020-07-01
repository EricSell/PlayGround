import requests
from PyQt5.QtCore import pyqtSignal, QThread
from fake_useragent import UserAgent
import jsonpath as jsonpath
import json
import os


class downloadThread(QThread):
    download_proess_signal = pyqtSignal(int)                        #创建信号

    def __init__(self, net_id, pic_name, file_path):
        super(downloadThread, self).__init__()
        self.net_id = net_id
        self.pic_name = pic_name
        self.file_path = file_path

    def run(self):
        try:
            # 请求头, api接口
            ua = UserAgent()
            url = f'https://api.vc.bilibili.com/link_draw/v1/doc/detail?doc_id={self.net_id}'
            header = {
                'User-Agent': ua.random,
                'Accept-Encoding': '',
            }

            # jsonpath 解析api
            res = requests.get(url, header).text
            res = json.loads(res)
            pic = jsonpath.jsonpath(res, '$..img_src')


            for i, p in enumerate(pic):
                with open(os.path.join(self.file_path, self.pic_name) + f'_{i + 1}.jpg', 'wb') as f:
                    print(f'正在进行下载.... 当前下载的是第{i + 1}张,总共{len(pic)}张')
                    self.download_proess_signal.emit(int(((i + 1) / len(pic)) * 100))  # 发送信号

                    res = requests.get(p).content
                    f.write(res)
            print('下载完成')
        except Exception as e:
            print(e)

requests.get('')