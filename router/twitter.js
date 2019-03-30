module.exports = [
  {
    method: 'GET',
    path: '/twitter/follow',
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
    path: '/twitter/like',
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
    path: '/twitter/retweet',
    handler: async (request, h) => {
      const id = request.query.id ? request.query.id : null
      const action = request.query.action ? request.query.action : null

      let res = {}

      try {
        res = await igFun.retweet(id, action)
      } catch (ex) {
        Log.error('Error while try to ' + action)
      }

      return res
    }
  },
  {
    method: 'GET',
    path: '/twitter/tweetsFromHashtag/{social?}',
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
  }
]
