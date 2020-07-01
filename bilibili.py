import sys

from PyQt5 import QtWidgets, QtCore
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QApplication, QWidget, QFileDialog, QMessageBox

import requests
from PyQt5.QtCore import pyqtSignal, QThread
from fake_useragent import UserAgent
import jsonpath as jsonpath
import json
import os


class Ui_BiliBili(object):
    def setupUi(self, BiliBili):
        BiliBili.setObjectName("BiliBili")
        BiliBili.resize(400, 300)
        self.line = QtWidgets.QFrame(BiliBili)
        self.line.setGeometry(QtCore.QRect(0, 170, 401, 20))
        self.line.setFrameShape(QtWidgets.QFrame.HLine)
        self.line.setFrameShadow(QtWidgets.QFrame.Sunken)
        self.line.setObjectName("line")
        self.progressBar = QtWidgets.QProgressBar(BiliBili)
        self.progressBar.setGeometry(QtCore.QRect(100, 200, 301, 21))
        self.progressBar.setProperty("value", 0)
        self.progressBar.setObjectName("progressBar")
        self.label = QtWidgets.QLabel(BiliBili)
        self.label.setGeometry(QtCore.QRect(20, 180, 61, 51))
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(BiliBili)
        self.label_2.setGeometry(QtCore.QRect(40, 20, 51, 31))
        self.label_2.setObjectName("label_2")
        self.label_4 = QtWidgets.QLabel(BiliBili)
        self.label_4.setGeometry(QtCore.QRect(30, 70, 71, 31))
        self.label_4.setObjectName("label_4")
        self.toolButton = QtWidgets.QToolButton(BiliBili)
        self.toolButton.setGeometry(QtCore.QRect(6, 120, 101, 31))
        self.toolButton.setObjectName("toolButton")
        self.pushButton = QtWidgets.QPushButton(BiliBili)
        self.pushButton.setGeometry(QtCore.QRect(150, 250, 93, 28))
        self.pushButton.setObjectName("pushButton")
        self.textEdit = QtWidgets.QTextEdit(BiliBili)
        self.textEdit.setGeometry(QtCore.QRect(140, 20, 221, 31))
        self.textEdit.setObjectName("textEdit")
        self.textEdit_2 = QtWidgets.QTextEdit(BiliBili)
        self.textEdit_2.setGeometry(QtCore.QRect(140, 70, 221, 31))
        self.textEdit_2.setObjectName("textEdit_2")
        self.textEdit_3 = QtWidgets.QTextEdit(BiliBili)
        self.textEdit_3.setGeometry(QtCore.QRect(140, 120, 221, 31))
        self.textEdit_3.setObjectName("textEdit_3")

        self.retranslateUi(BiliBili)
        QtCore.QMetaObject.connectSlotsByName(BiliBili)

    def retranslateUi(self, BiliBili):
        _translate = QtCore.QCoreApplication.translate
        BiliBili.setWindowTitle(_translate("BiliBili", "BiliBili画册"))
        self.label.setText(_translate("BiliBili", "下载进度"))
        self.label_2.setText(_translate("BiliBili", "画册ID"))
        self.label_4.setText(_translate("BiliBili", "图片名称"))
        self.toolButton.setText(_translate("BiliBili", "选择文件路径"))
        self.pushButton.setText(_translate("BiliBili", "开始!"))



class mwindow(QWidget, Ui_BiliBili):
    def __init__(self):
        super(mwindow, self).__init__()
        self.setupUi(self)
        self.setWindowIcon(QIcon('./icon.ico'))
    def action_scrapy(self):
        # 获取画册id
        pic_id = self.textEdit.toPlainText()
        # # 获取图片名称
        pic_name = self.textEdit_2.toPlainText()
        # # 获取图片名称
        pic_path = self.textEdit_3.toPlainText()
        print(pic_id,pic_name ,pic_path)
        if pic_id and pic_name and pic_path:
            #### 创建下载线程
            self.downloadThread = downloadThread(pic_id, pic_name, pic_path)
            self.downloadThread.download_proess_signal.connect(self.set_progressbar_value)
            self.downloadThread.start()
        else:
            QtWidgets.QMessageBox.warning(self, '提示', '请输入正确的信息')

    def choice_file(self):
        file_path = QFileDialog.getExistingDirectory(self, "选择文件夹", "/")
        self.textEdit_3.setText(file_path)

    def set_progressbar_value(self, value):
        self.progressBar.setValue(value)
        print(value)
        if value == 100:
            QMessageBox.information(self, "提示", "下载成功！")
            return



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



if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = mwindow()


    # 开始
    w.pushButton.clicked.connect(w.action_scrapy)
    # 选择文件路径
    w.toolButton.clicked.connect(w.choice_file)

    w.show()
    sys.exit(app.exec_())
