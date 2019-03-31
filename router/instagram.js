module.exports = [
  {
    method: 'GET',
    path: '/instagram/follow',
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
    path: '/instagram/getPosts/category',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const name = request.query.name ? request.query.name : null
      try {
        return await igFun.getPostsByCategory(name)
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/instagram/getPosts/hashtag',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const name = request.query.name ? request.query.name : null
      try {
        return await igFun.getPostsByHashtag(name)
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/instagram/like',
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
    path: '/instagram/savePostsFromApi',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const name = request.query.name ? request.query.name : null
      const type = request.query.type ? request.query.type : null
      try {
        return await igFun.savePostsFromApi(name, type)
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/instagram/test',
    handler: async (request, h) => {

      try {
        await igFun.getMetadataPost(108)
      } catch (ex) {
        Log.error('Error while try to get #' + name)
        return {}
      }
    }
  }
]
