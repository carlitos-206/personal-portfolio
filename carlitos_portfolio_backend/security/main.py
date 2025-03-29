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
    allowed_routes = [ # ONLY these routes are allowed to be called
        '/', 
        '/cover-letter', 
        '/custom-gpt', 
        '/voice-demo-init', 
        '/trained-chat', 
        '/robots.txt', 
        '/sitemap.xml',
        '/favicon.ico' 
    ]
    data = None
    if origin in allowed_routes:
        try:
            if request.method == "GET":
                if origin == "/robots.txt" or origin == "/sitemap.xml":
                    print("BOT SCRAPE")
                return {'status': 200}
            if origin == "/voice-demo-init":
                print('HERE')
                return {'status': 200}
            data = request.get_json()
            return {'status': 200}
        except Exception as e:
            print('Origin:', origin, type(origin))
            return {'status': 415, 'message': str(e)}
    else:
        print('non allowed route')
