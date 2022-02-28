import boto3
import logging
from boto3.dynamodb.conditions import Attr

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodbTableName = 'virtual-atm-table'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(dynamodbTableName)

class UserModel():
    def find_by_card_number(card_number):
        try:
            response = table.get_item(
                Key={'card_number': card_number}
            )
            if 'Item' in response:
                return response['Item']
            else:
                return {'message': 'Not found'}, 404
        except:
            logger.exception("Exception......")

    def update_pin(card_number, pin_code):
        try:
            response = table.update_item(
                Key={'card_number': card_number},
                ExpressionAttributeNames={
                    '#pc': 'pin_code'
                },
                UpdateExpression="set #pc = :p",
                ExpressionAttributeValues={
                    ':p': pin_code
                },
                ReturnValues="UPDATED_NEW"
            )
            return response
        except:
            logger.exception("Exception......")

    def update_balance(card_number, balance):
        try:
            response = table.update_item(
                Key={'card_number': card_number},
                ExpressionAttributeNames={
                    '#bal': 'balance'
                },
                UpdateExpression="set #bal = :b",
                ExpressionAttributeValues={
                    ':b': balance
                },
                ReturnValues="UPDATED_NEW"
            )
            return response['Attributes']
        except:
            logger.exception("Exception.....")

    def get_user_by_account(data):
        try:
            response = table.scan(
                FilterExpression=Attr('account_number').eq(data['account_number']) & 
                                 Attr('ifsc_code').eq(data['ifsc_code']) &
                                 Attr('name').eq(data['name'])
            )
            return response['Items']
        except:
            logger.exception("Exception.....")

    def get_all_account(card_number):
        try:
            response = table.scan(
                FilterExpression=Attr('card_number').gte(0)
            )
            return response['Items']
        except:
            logger.exception("Exception.....")
