import os
import sys
import logging
from logging import FileHandler, Formatter, StreamHandler
from tools.config import BUILD_LOG_PATH

def init_logger(log_file_path):
    formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    f_handler = FileHandler(log_file_path)
    f_handler.setFormatter(formatter)
    f_handler.setLevel(logging.DEBUG)

    stream_handler = StreamHandler(sys.stderr)
    stream_handler.setFormatter(formatter)
    stream_handler.setLevel(logging.INFO)

    logging.basicConfig(level=logging.DEBUG, handlers=[f_handler, stream_handler])

def init_build_logger():
    init_logger(BUILD_LOG_PATH)
