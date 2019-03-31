module.exports = [
  {
    method: 'GET',
    path: '/twitter/follow',
    handler: async (request, h) => {
      const id = request.query.id ? request.query.id : null
      const action = request.query.action ? request.query.action : null

      let res

      try {
        res = await twFun.follow(id, action)
      } catch (ex) {
        Log.error('Error while try to ' + action)
      }

      return res
    }
  },

  {
    method: 'GET',
    path: '/twitter/getTweets/category',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const name = request.query.name ? request.query.name : null
      try {
        return await twFun.getTweetsByCategory(name)
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/twitter/getTweets/hashtag',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const name = request.query.name ? request.query.name : null
      try {
        return await twFun.getTweetsByHashtag(name)
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  },

  {
    method: 'GET',
    path: '/twitter/getTweetsFromApi',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const name = request.query.name ? request.query.name : null
      try {
        return await twFun.getTweetsFromApi(name)
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
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
        res = await twFun.like(id, action)
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
        res = await twFun.retweet(id, action)
      } catch (ex) {
        Log.error('Error while try to ' + action)
      }

      return res
    }
  },

  {
    method: 'GET',
    path: '/twitter/saveTweetsFromApi',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      const name = request.query.name ? request.query.name : null
      try {
        return await twFun.saveTweetsFromApi(name)
      } catch (ex) {
        Log.error('Error in ' + path)
        return 'Something was wrong...'
      }
    }
  }
]
