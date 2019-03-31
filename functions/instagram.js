async function follow (id, action) {
  const url = urlOcupa2 + 'instagram/' + id + '/follow?user_id=' + config.igUserid + '&action=' + action
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return payson
  } else {
    Log.error('empty')
    return {}
  }
}

async function getMetadataPost (id) {
  const url = urlOcupa2 + 'instagram/media/' + id + '?fields=username'
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    Log.info(payson)
    return payson[0].userId
  } else {
    Log.error('empty')
    return {}
  }
}

async function getPostsByCategory (category) {
  const res = await client.search({
    index: 'instagram_posts',
    q: 'category:' + category,
    size: 10000
  })

  return res.hits.hits
}

async function getPostsByHashtag (hashtag) {
  const res = await client.search({
    index: 'instagram_posts',
    q: 'hashtag:' + hashtag,
    size: 10000,
  })

  return res.hits.hits
}

async function getPostById (id) {
  const res = await client.search({
    index: 'instagram_posts',
    q: 'id:' + id
  })

  return res.hits.hits.length > 0
}

async function getUser (id) {
  const url = urlOcupa2 + 'instagram/' + id + '?fields=id,follower_count,media_count,username'
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    Log.info(payson[0])
    return payson[0]
  } else {
    Log.error('empty')
    return {}
  }
}

async function like (id, action) {
  const url = urlOcupa2 + 'instagram/media/' + id + '/like?user_id=' + config.igUserid + '&action=' + action
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return payson
  } else {
    Log.error('empty')
    return {}
  }
}

async function savePostsFromApi (name, type) {
  let id
  try {
    id = await fun.searchHashtagId(name)
  } catch (ex) {
    id = await fun.getHashtag(name, '')
  }

  const url = urlOcupa2 + 'instagram/' + id + '/' + type + '?user_id=' + config.igUserid

  Log.info(url)

  const { payload } = await Wreck.get(url)
  Log.info(payload)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    Log.info(payson.data)
    const posts = payson.data
    for (let i in posts) {
      const exists = await getPostById(posts[i].id)

      if (exists) {
        await client.update({
          index: 'instagram_posts',
          type: '_doc',
          id: posts[i].id,
          body: {
            doc: {
              commentsCount: posts[i].commentsCount,
              likeCount: posts[i].likeCount
            }
          }
        }).then(res => {
          res.result === 'created' ? Log.info('Updated') : Log.error('Error')
        })
      } else {
        const userId = await getMetadataPost(posts[i].id)
        posts[i].userId = userId
        const user = await getUser(userId)
        Log.error(user)
        posts[i].userName = user.username
        posts[i].userFollowerCount = user.followerCount
        posts[i].userMediaCount = user.mediaCount
        posts[i].hashtag = name
        posts[i].category = await fun.searchCategory(name)
        await client.index({
          index: 'instagram_posts',
          type: '_doc',
          id: posts[i].id,
          body: posts[i]
        }).then(res => {
          res.result === 'created' ? Log.info('Created') : Log.error('Error')
        })
      }
    }
  } else {
    Log.error('empty')
    return {}
  }
}

module.exports = {
  follow,
  getPostsByCategory,
  getPostsByHashtag,
  getUser,
  like,
  savePostsFromApi
}
