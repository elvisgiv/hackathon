import os

HERE = os.path.dirname(os.path.realpath(__file__))
SCRIPTS_DIR = os.path.join(HERE, os.pardir)

CONTAINERS_FILENAME = 'containers.json'
BUILD_LOG_FILENAME = 'build.log'
LOG_FOLDER_NAME = 'log'


CONTAINERS_FILEPATH = os.path.join(SCRIPTS_DIR, CONTAINERS_FILENAME)

LOG_FOLDER = os.path.join(SCRIPTS_DIR, LOG_FOLDER_NAME)
BUILD_LOG_PATH = os.path.join(LOG_FOLDER, BUILD_LOG_FILENAME)



# docker
SKALE_PREFIX = 'skalelabshub'
CONTAINER_NAME_PREFIX = 'skale_'
DOCKER_USERNAME = os.environ['DOCKER_USERNAME']
DOCKER_PASSWORD = os.environ['DOCKER_PASSWORD']