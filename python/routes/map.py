# map.py
from flask import Blueprint, jsonify, request
from controllers import map as map_controller
from models.review import Review
from pydantic import ValidationError


router = Blueprint('map', __name__)

# @router.route('/reviews', methods=['GET'])
# def get_reviews():
#     reviews = map_controller.get_all_reviews()
#     response = jsonify(reviews)
#     response.headers['Content-Type'] = 'application/json; charset=utf-8'
#     return response

@router.route('/stores', methods=['GET'])
def get_one_review():
    stores = map_controller.get_locations()
    return jsonify(stores)

@router.route('/reviews/<int:store_id>', methods=['GET'])
def get_reviews(store_id: int):
    review = map_controller.get_review(store_id)
    return jsonify(review)

@router.route('/reviews', methods=['GET'])
def get_stock_info():
    stock_info = map_controller.get_stock_info()
    return jsonify(stock_info)

@router.route('/reviews', methods=['POST'])
def post_review():
    try:
        review_data = Review(**request.json)

        store_id = review_data.store_id
        stock = review_data.stock
        post_time = review_data.post_time
        review = review_data.review

        map_controller.add_review(store_id, stock, post_time, review)
        return jsonify({"message": "Review added successfully!"}), 201

    except ValidationError as e:
        return jsonify({"error": "Invalid data", "details": e.errors()}), 400

