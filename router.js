module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const path = request.path.slice(1, request.path.length)
      try {
        return await fun.sayHello()
      } catch (ex) {
        Log.error('Error while try to get ' + path)
        return {}
      }
    }
  }
]
