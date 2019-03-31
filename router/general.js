module.exports = [
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
]