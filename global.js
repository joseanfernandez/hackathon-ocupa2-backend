/* eslint-disable no-global-assign */
client = null
config = require('./config')
elasticsearch = require('elasticsearch')
fun = require('./functions/general')
igFun = require('./functions/instagram')
igRouter = require('./router/instagram')
Hapi = require('hapi')
hashtags = require('./hashtags')
Log = require('./log')
logSymbols = require('log-symbols')
mappings = require('./mappings')
router = require('./router/general')
twFun = require('./functions/twitter')
twRouter = require('./router/twitter')
urlOcupa2 = 'http://Hackathon.ocupa2.com/'
Wreck = require('wreck')
/* eslint-enable no-global-assign */
