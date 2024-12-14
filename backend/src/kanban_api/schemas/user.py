from datetime import datetime

from pydantic import EmailStr, SecretStr, computed_field

from kanban_api.schemas.base import BaseSchema
from kanban_api.utils import get_password_hash

# input models
class UserInCreate(BaseSchema):
    email: EmailStr
    password: SecretStr

    @computed_field
    def hashed_password(self) -> str:
        return get_password_hash(self.password.get_secret_value())


# output models
class UserOut(BaseSchema):
    id: int
    email: EmailStr
    created_at: datetime
    updated_at: datetime
