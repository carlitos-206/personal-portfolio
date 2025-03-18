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
