import os
import datetime

def log_message(message, level='INFO', log_file='custom_log.log'):
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f'{current_time} - {level} - {message}\n'

    with open(log_file, 'a') as log:
        log.write(log_line)
