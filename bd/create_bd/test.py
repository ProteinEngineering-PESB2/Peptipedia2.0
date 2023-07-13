"""Database module"""
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import select
import pandas as pd
from table_models import Base
from database import Connection
import config
from table_models import Activity

con = Connection(config = config)
a = con.get_table(Activity)
print(a)