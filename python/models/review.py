# review.py
from pydantic import BaseModel

class Review(BaseModel):
    store_id: int
    stock: int
    post_time: str
    review: str
