module.exports = [
  {
    method: 'GET',
    path: '/follow',
    handler: async (request, h) => {
      const id = request.query.id ? request.query.id : null
      const action = request.query.action ? request.query.action : null

      let res

      try {
        res = await igFun.follow(id, action)
      } catch (ex) {
        Log.error('Error while try to ' + action)
      }

      return res
    }
  },

  {
    method: 'GET',
    path: '/hashtag/{name?}',
    handler: async (request, h) => {
      const name = request.params.name ? request.params.name : null
      let res

      try {
        const hashtagId = await igFun.searchHashtagId(name)
        res = hashtagId
      } catch (ex) {
        Log.error('Error while try to get #' + name)
        res = await igFun.getHashtag(name, '')
      }

      return res
    }
  },

  {
    method: 'GET',
    path: '/like',
    handler: async (request, h) => {
      const id = request.query.id ? request.query.id : null
      const action = request.query.action ? request.query.action : null

      let res = {}

      try {
        res = await igFun.like(id, action)
      } catch (ex) {
        Log.error('Error while try to ' + action)
      }

      return res
    }
  },

  {
    method: 'GET',
    path: '/populateInstagramHashtagIndex',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)

      try {
        return await igFun.populateInstagramHashtagIndex()
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/postsFromHashtag/{social?}',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const social = request.params.social ? request.params.social : null
      Log.info(social)
      const name = request.query.name ? request.query.name : null
      const type = request.query.type ? request.query.type : null
      try {
        return await igFun.savePostsFromHashtag(social, name, type)
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
      const name = request.params.name ? request.params.name : null

      try {
        await igFun.saveHashtag(1, name)
      } catch (ex) {
        Log.error('Error while try to get #' + name)
        return {}
      }
    }
  },

  {
    method: 'GET',
    path: '/test/{id?}',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const id = request.params.id ? request.params.id : null

      let res = {}

      try {
        res = await igFun.getUser(id)
      } catch (ex) {
        Log.error('Error in' + path)
      }

      return res
    }
  }

]
