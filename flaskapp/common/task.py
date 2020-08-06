

from ..common import (ConsoleLogger, relative_path, des3)
import datetime

logger = ConsoleLogger(relative_path(__file__))

def my_job():
    print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))