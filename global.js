/* eslint-disable no-global-assign */
client = null
config = require('./config.js')
elasticsearch = require('elasticsearch')
igFun = require('./functions/instagram')
Hapi = require('hapi')
hashtags = require('./hashtags')
Log = require('./log')
logSymbols = require('log-symbols')
igRouter = require('./router/instagram')
urlOcupa2 = 'http://Hackathon.ocupa2.com/'
Wreck = require('wreck')
/* eslint-enable no-global-assign */
