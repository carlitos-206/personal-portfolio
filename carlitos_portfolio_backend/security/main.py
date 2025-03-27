#   This file contains security measure to stop scrapers from accessing hidden files

#   def SecurityFunc(Request, origin)
#      Set allowed routes
#           [ '/', '/cover-letter', '/custom-gpt', '/voice-demo-init', '/trained-chat', '/robots.txt' ]

#      Parse request
#           Ignore = Data
#           Extract = API KEY
#           Validate API KEY in Firebase
#           Exclude rule for /robots.txt
#           if ROUTE = TRUE and API KEY = TRUE 
#               return 200
#           if ROUTE = TRUE and API Key = FALSE
#               return 500
#           if ROUTE = '/robots.txt'
#               return 200
#           if ROUTE = FALSE and API KEY = FALSE
#               return pain(Request, origin)

from flask import Flask, request, jsonify

def request_auth(request, origin):
    allowed_routes = [ '/', '/cover-letter', '/custom-gpt', '/voice-demo-init', '/trained-chat', '/robots.txt', '/favicon.ico' ]
    data = None
    if origin in allowed_routes:
        try:
            if request.method == "GET":
                return {'status': 200} 
            data = request.get_json()
            return {'status': 200}
        except Exception as e:
            return {'status': 415, 'message': str(e)}
