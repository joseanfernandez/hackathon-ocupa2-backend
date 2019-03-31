module.exports = [

  {
    method: 'GET',
    path: '/elasticSetup',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)

      try {
        return await fun.elasticSetup()
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/populateHashtagIndex',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)

      try {
        return await fun.populateHashtagIndex()
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/hashtags',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)

      try {
        return await fun.getHashtags()
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  }
]
