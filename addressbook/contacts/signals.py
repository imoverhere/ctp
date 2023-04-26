# import os
# from django.db import connection
# from django.db.backends.signals import connection_created
# from django.dispatch import receiver

# @receiver(connection_created)
# def log_sql(sender, connection, **kwargs):
#     # Get the base directory of the Django project
#     base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     # Get the path to the log file relative to the base directory
#     log_file = os.path.join(base_dir, 'contacts', 'sql_queries.log')

#     # Set the session variables to enable SQL query logging
#     connection.execute('SET SESSION log_output = FILE')
#     connection.execute(f'SET SESSION general_log_file = "{log_file}"')
#     connection.execute('SET SESSION general_log = 1')
