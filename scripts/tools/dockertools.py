import semver
import docker
import logging
from docker import APIClient

from tools.config_storage import ConfigStorage
from tools.config import DOCKER_USERNAME, DOCKER_PASSWORD, SKALE_PREFIX, CONTAINER_NAME_PREFIX

docker_client = docker.from_env()
docker_client.login(username=DOCKER_USERNAME, password=DOCKER_PASSWORD)
cli = APIClient()

from tools.logger import init_build_logger

init_build_logger()
logger = logging.getLogger(__name__)


class DockerManager():
    def __init__(self, config_path):
        self.config = ConfigStorage(config_path)

    def construct_fullname(self, name, version):
        return f"{name}:{version}"

    def pull(self, name):
        logger.info(f'Pulling {name}')
        docker_client.images.pull(name)

    def pull_all(self):
        logger.info('Pulling all images')
        for name in self.config.config:
            container_config = self.config[name]
            full_name = self.construct_fullname(container_config['name'], container_config['version'])
            logger.info(f'Pulling image: {name}')
            self.pull(full_name)

    def build_image(self, name, dockerfile_path, version='patch'):
        container_config = self.config[name]
        logger.info(f'Building container: {name}')
        new_version = getattr(semver, f'bump_{version}')(container_config['version'])

        logger.info(f'Bumping {name} container version: {container_config["version"]} => {new_version}')
        self.config.update_item_field(name, 'version', new_version)

        tag = f'{container_config["name"]}:{container_config["version"]}'
        logger.info(f'Building image: {tag}')
        for line in cli.build(path=dockerfile_path, tag=tag):
            logger.debug(line)

        logger.info(f'Build done: {tag}')

    def push_image(self, name):
        container_config = self.config[name]

        fullname = self.construct_fullname(container_config['name'], container_config['version'])
        logger.info(f'Pushing {fullname}')

        for line in cli.push(container_config['name'], tag=container_config['version'], stream=True):
            logger.debug(line)
        logger.info(f'Push done: {fullname}')

    def run(self, name, custom_args={}):
        container_config = self.config[name]
        logger.info(f'Running container: {name}')

        run_args = container_config['args']
        run_args.update(custom_args)
        container_name = CONTAINER_NAME_PREFIX + name
        full_name = self.construct_fullname(container_config['name'], container_config['version'])
        container_info = docker_client.containers.run(full_name, detach=True, name=container_name, **run_args)
        logger.info(f'{name} container id: {container_info.id}')
        return container_info

    def stop(self, name):
        logger.info(f'Stopping container: {name}')
        container_name = CONTAINER_NAME_PREFIX + name
        container = docker_client.containers.get(container_name)
        return container.stop()

    def stop_all(self):
        for name in self.config.config:
            try:
                self.stop(name)
                logger.info(f'Container stopped: {name}')
            except docker.errors.APIError:
                logger.error(f'No such container: {name}')

    def rm(self, name):
        logger.info(f'Removing container: {name}')
        container_name = CONTAINER_NAME_PREFIX + name
        container = docker_client.containers.get(container_name)
        return container.remove()

    def rm_all(self):
        for name in self.config.config:
            try:
                self.rm(name)
                logger.info(f'Container removed: {name}')
            except docker.errors.APIError:
                logger.error(f'No such container: {name}')
