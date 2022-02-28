from decimal import Decimal
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.users import UserModel
from custom_response import BuildResponse

class Balance(Resource):
    @jwt_required()
    def get(self):
        card = get_jwt_identity()
        item = UserModel.find_by_card_number(int(card))
        if item:
            return BuildResponse.buildResponse({'message': float(item['balance'])}, 200)
        return BuildResponse.buildResponse({'message': 'Error encountered, Balance not fetched.'}, 200)

class Withdrawal(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('balance',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )

    @jwt_required()
    def patch(self):
        data = self.parser.parse_args()
        card = get_jwt_identity()
        item = UserModel.find_by_card_number(int(card))
        if item:
            if data['balance'] > float(item['balance']):
                return BuildResponse.buildResponse(
                    {
                        'message': 'Insufficient Fund.',
                        'balance': float(item['balance'])
                    }, 
                    200
                )
            else:
                bal = item['balance'] - data['balance']
                res = UserModel.update_balance(int(card), bal)
                if res:
                    return BuildResponse.buildResponse(
                        {
                            'message': 'Success...',
                            'balance': float(res['balance'])
                        },
                        201
                    )
        return BuildResponse.buildResponse({'message': 'Invalid card details', 'balance': ''}, 200)

class Transaction(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('account_number',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )
    parser.add_argument('ifsc_code',
        type = str,
        required = True,
        help = "This field cannot be blank"
    )
    parser.add_argument('name',
        type = str,
        required = True,
        help = "This field cannot be blank"
    )
    parser.add_argument('amount_to_transfer',
        type = Decimal,
        required = True,
        help = "This field cannot be blank"
    )

    @jwt_required()
    def patch(self):
        data = self.parser.parse_args()
        card = get_jwt_identity()
        item = UserModel.find_by_card_number(int(card))

        users = UserModel.get_user_by_account(data)
        if users:
            for user in users:
                if data['amount_to_transfer'] > float(item['balance']):
                    return BuildResponse.buildResponse(
                        {
                            'message': 'Insufficient Fund. Could not transfer Fund',
                            'balance': float(item['balance'])
                        }, 
                        200
                    )
                else:
                    debitBal = Decimal(item['balance']) - data['amount_to_transfer']
                    debitUser = UserModel.update_balance(int(card), debitBal)
                    creditBal = Decimal(user['balance']) + data['amount_to_transfer']
                    creditUser = UserModel.update_balance(user['card_number'], creditBal)
                    if debitUser and creditUser:
                        return BuildResponse.buildResponse(
                            {
                                'message': 'Transferred Successfully',
                                'balance': float(debitUser['balance'])
                            },
                            201
                        )
                    else:
                        return BuildResponse.buildResponse({'message': 'Error encountered, Fund not sent.', 'balance': ''}, 200)
                break
        return BuildResponse.buildResponse({'message': 'Account not found', 'balance': ''}, 200)

class Deposit(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('balance',
        type = int,
        required = True,
        help = "This field cannot be blank"
    )

    @jwt_required()
    def patch(self):
        data = self.parser.parse_args()
        card = get_jwt_identity()
        item = UserModel.find_by_card_number(int(card))
        if item:
            bal = item['balance'] + data['balance']
            res = UserModel.update_balance(int(card), bal)
            if res:
                return BuildResponse.buildResponse(
                    {
                        'message': 'Success...',
                        'balance': float(res['balance'])
                    },
                    201
                )
        return BuildResponse.buildResponse({'message': 'Invalid card details', 'balance': ''}, 200)
