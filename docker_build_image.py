import time

import os

print "stop and destroy docker container if exists"
os.system("docker rm -f exchangeui_ui_1")
time.sleep(5)

print "destroy docker image"
os.system("docker rmi dapp-ui-test-build")
time.sleep(5)

print "build docker image"
os.system("docker build -t dapp-ui-test-build .")
time.sleep(5)

print "run docker container"
os.system("docker-compose up -d")
time.sleep(1)


