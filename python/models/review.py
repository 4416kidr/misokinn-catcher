# review.py
from pydantic import BaseModel

class Review(BaseModel):
    reviews_id: int
    store_id: int
    stock: int
    post_time: str
    review: str
