## Starting Functionality for a Django Backend and React Front-end

### Setting up the Django Backend

1. Create a virtual environment by running the following command:

`python3 -m venv env`


2. Activate the virtual environment:

`source env/bin/activate`


3. Install the requirements using pip:

`pip install -r requirements.txt`


4. Configure the PostgreSQL database by creating a database and adding the necessary information to the `settings.py` file in the `addressbook` directory. 

5. Run migrations:

`python manage.py migrate`


6. Start the Django server using gunicorn:

`gunicorn addressbook.wsgi:application  --bind 0.0.0.0:8000 --workers 3 --forwarded-allow-ips="*"`


### Starting the React Front-end

1. Open a new terminal window and navigate to the `frontend` directory.

2. Install the necessary dependencies by running the following command:

`npm install`


3. Start the React server:

`npm start`


Now the Django backend and React front-end are both running and communicating with each other.

The Django backend will run on localhost:8000, while the front-end will run on localhost:3000.



