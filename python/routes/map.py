# map.py
from flask import Blueprint, jsonify
from controllers import map as map_controller

router = Blueprint('map', __name__)

@router.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = map_controller.get_all_reviews()

    response = jsonify(reviews)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'

    return response
