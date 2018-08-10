import os, logging

from tools.dockertools import DockerManager
from tools.config import CONTAINERS_FILEPATH
from tools.logger import init_build_logger


dir_path = os.path.dirname(os.path.realpath(__file__))
scripts_dir = os.path.abspath(os.path.join(dir_path, os.pardir))
project_dir = os.path.join(os.path.join(scripts_dir, os.pardir))
admin_dockerfile_path = project_dir

init_build_logger()
logger = logging.getLogger(__name__)

docker_manager = DockerManager(CONTAINERS_FILEPATH)

def build_admin(version='patch'):
    docker_manager.build_image('dapp-ui', admin_dockerfile_path, version=version)

def push_admin():
    docker_manager.push_image('dapp-ui')

if __name__ == "__main__":
    build_admin()
    push_admin()