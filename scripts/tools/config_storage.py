import os, json


class ConfigStorage:
    def __init__(self, path, init={}):
        self.path = path
        self.init = init
        self.config = self.__safe_read_config()

    def __getitem__(self, item):
        return self.config[item]

    def __setitem__(self, key, value):
        self.config[key] = value
        self.update(self.config)

    def update_item_field(self, key, field, value):
        item = self.config[key]
        item[field] = value
        self.config[key] = item
        self.update(self.config)

    def update(self, new_config):
        config = self._read_config()
        config.update(new_config)
        self.config = config
        self._write_config(config)
        return config

    def get(self):
        return self.config

    def __safe_read_config(self):
        if not self.__check_config_file():
            self.__init_config_file()
        return self._read_config()

    def _read_config(self):
        with open(self.path, encoding='utf-8') as data_file:
            config = json.loads(data_file.read())
        return config

    def _write_config(self, config):
        with open(self.path, 'w') as data_file:
            json.dump(config, data_file)

    def __check_config_file(self):
        return os.path.exists(self.path)

    def __init_config_file(self):
        self._write_config(self.init)
