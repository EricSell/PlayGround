import sys

from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication, QWidget, QFileDialog, QMessageBox
from PyQt5 import QtCore, QtWidgets
from biliblili_pic.blbl_scrapy import downloadThread
from biliblili_pic.blblpic import Ui_BiliBili



class mwindow(QWidget, Ui_BiliBili):
    def __init__(self):
        super(mwindow, self).__init__()
        self.setupUi(self)

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


if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = mwindow()
    # 开始
    w.pushButton.clicked.connect(w.action_scrapy)
    # 选择文件路径
    w.toolButton.clicked.connect(w.choice_file)

    w.show()
    sys.exit(app.exec_())
