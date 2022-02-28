import json
from custom_encoder import CustomEncoder

class BuildResponse:
    def buildResponse(body, statusCode):
        response = (
            body,
            statusCode,
            {'Content-Type': 'application/json'}
        )
        return response

    def encodedResponse(body):
        newbody = json.dumps(body, cls=CustomEncoder)
        return newbody
