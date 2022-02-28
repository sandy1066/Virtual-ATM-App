import logging
import json
from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, 
    jwt_required, 
    get_jwt_identity
)

from models.users import UserModel
from custom_response import BuildResponse

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class UserLogin(Resource): 
    parser = reqparse.RequestParser()
    parser.add_argument('card_number',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )
    parser.add_argument('pin_code',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )
    
    def post(self):
        data = self.parser.parse_args()
        user = UserModel.find_by_card_number(data['card_number'])

        if user and data['pin_code'] == int(user['pin_code']):
            access_token = create_access_token(identity = user['card_number'])
            return BuildResponse.buildResponse({'message': access_token, 'isadmin': user['isadmin']}, 200)

        return BuildResponse.buildResponse({'message': 'Invalid credentils'},200)

class ChangePin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('pin_code',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )
    parser.add_argument('new_pin',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )
    parser.add_argument('re_enter_new_pin',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )

    @jwt_required()
    def patch(self):
        data = self.parser.parse_args()
        card = get_jwt_identity()
        item = UserModel.find_by_card_number(int(card))

        if data and data['pin_code'] == int(item['pin_code']):
            if data['new_pin'] == data['re_enter_new_pin']:
                res = UserModel.update_pin(int(card), data['new_pin'])
                if res:
                    return BuildResponse.buildResponse({'message': 'Pin updated seccessfully.....'}, 201)
            else:
                return BuildResponse.buildResponse({'message': 'Pin did not match !!!!!!! Re-enter correctly......'}, 200)
        return BuildResponse.buildResponse({'message': 'Wrong Pin..... Please enter the old pin correctly.'}, 200)

class Accounts(Resource):
    @jwt_required()
    def get(self):
        card = get_jwt_identity()
        users = UserModel.get_all_account(int(card))

        newUsers = []

        for user in users:
            newUsers.append(json.loads(BuildResponse.encodedResponse(user)))

        if newUsers:
            return BuildResponse.buildResponse({"message": newUsers}, 200)
        return BuildResponse.buildResponse({'message': 'No Accounts Found.'}, 200)
    