module.exports = [
  {
    method: 'GET',
    path: '/hashtag/{name?}',
    handler: async (request, h) => {
      const name = request.params.name ? request.params.name : null
      let res

      try {
        const hashtagId = await fun.findHashtagId(name)
        res = hashtagId
      } catch (ex) {
        Log.error('Error while try to get #' + name)
        res = await fun.getHashtag(name, '')
      }

      return res
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
    path: '/saveHashtag/{name?}',
    handler: async (request, h) => {
      // const path = request.path.slice(1, request.path.length)
      const name = request.params.name ? request.params.name : null

      try {
        await fun.saveHashtag(1, name)
      } catch (ex) {
        Log.error('Error while try to get #' + name)
        return {}
      }
    }
  }
]
