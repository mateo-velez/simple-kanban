# Test package initialization
# set env variables
import os
# os.environ["DB_URL"] = "sqlite+aiosqlite:///:memory:"
# drop all set
os.environ["DROP_ALL"] = "true"