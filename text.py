import os
import sys

files = os.listdir('./')

# 安装
def install(app):
    for file in files:
        if app in file:
            tmp = file
            if tmp.split('.')[-1] == 'xz':       
                # 先执行下行命令将 .xz 转换为 .tar
                os.system('xz -d '+ tmp) 
                # 再执行下行命令解压
                os.system('tar -xvf '+ tmp.rsplit('.',1)[0])
                
            elif tmp.split('.')[-1] == 'gz':
                os.system('tar -xzvf '+tmp)
            app_name = tmp.rsplit('.',2)[0]
            os.system('mv '+ app_name + ' /opt/'+app_name)
            os.system('ln -s /opt/'+app_name+'/bin/node /usr/local/bin/node')
            os.system('ln -s /opt/'+app_name+'/bin/node /usr/local/bin/npm')
            print(color_green(app_name+'安装成功')) 
        else:
            print(color_red('未找到安装包'))
            
# 颜色文本    
def color_red(context):
    return '\033[1;31;40m{}\033[0m'.format(context)
 
def color_green(context):
    return '\033[1;32;40m{}\033[0m'.format(context)


if __name__ == '__main__':
	print('开始安装')
	app = 'node'
	install(app)