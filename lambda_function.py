import boto3
import json
import logging
from custom_encoder import CustomEncoder

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodbTableName = 'virtual-atm-table'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(dynamodbTableName)

getMethod = 'GET'
postMethod = 'POST'
putMethod = 'PUT'
loginPath = '/login'
balancePath = '/balance'
withdrawalPath = '/withdrawal'
changepinPath = '/changepin'
transferPath = '/transfer'

def lambda_handler(event, context):
    logger.info(event)
    httpMethod = event['httpMethod']
    path = event['path']

    if httpMethod == postMethod and path == loginPath:
        response = login(json.loads(event['body']))
    elif httpMethod == getMethod and path == balancePath:
        response = getBalance()
    elif httpMethod == putMethod and path == withdrawalPath:
        response  = withdrawBalance(json.loads(event['body']))
    elif httpMethod == putMethod and path == changepinPath:
        response = changePin(json.loads(event['body']))
    elif httpMethod == putMethod and path == transferPath:
        response = transferBalance(json.loads(event['body']))
    else:
        response = buildResponse(404, {'message': 'Not Found'})
    return response


def login(requestBody):
    try:
        user = find_by_card_number(int(requestBody['card_number']))
        userBody = json.loads(user['body'])

        if user and int(userBody['pin_code']) == int(requestBody['pin_code']):
            return buildResponse(200, user)
    except:
        logger.exception('Error in fetching card......')
        
def getBalance():
    try:
        pass
    except:
        logger.exception('Error in fetching balance......')

def withdrawBalance(requestBody):
    try:
        pass
    except:
        logger.exception('Error withdrawal balance......')

def changePin(requestBody):
    try:
        pass
    except:
        logger.exception('Error in changing pin......')

def transferBalance(requestBody):
    try:
        pass
    except:
        logger.exception('Error in tranfering money......')
    
def find_by_card_number(card_number):
    try:
        response = table.get_item(
            Key={
                'user_id': 'sandy1066',
                'card_number': card_number
            }
        )
        if 'Item' in response:
            return buildResponse(200, response['Item'])
        else:
            return buildResponse(404, {'message': 'Not found'})
    except:
        logger.exception("Exception......")

def buildResponse(statusCode, body=None):
    response = {
        'statusCode': statusCode,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    if body is not None:
        response['body'] = json.dumps(body, cls=CustomEncoder)
    return response
