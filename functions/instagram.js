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

async function getHashtag (name, category) {
  const url = urlOcupa2 + 'instagram/ig_hashtag_search?q=' + name + '&user_id=' + config.igUserid
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return saveHashtag(payson.id, name, category)
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
    /*
    if (payson.userId) {
      const exists = await searchUserById(payson.userId)
      if (exists) {
        return payson.userId
      } else {
        getUser(payson.userId)
      }
    }
    */
  } else {
    Log.error('empty')
    return {}
  }
}

async function getUser (id) {
  const url = urlOcupa2 + 'instagram/' + id + '?fields=id,follower_count,media_count,username'
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    Log.info(payson[0])
    return payson[0]
    /*
    await client.index({
      index: 'instagram_users',
      type: '_doc',
      id: id,
      body: payson[0]
    }).then(res => {
      res.result === 'created' ?  Log.info('#' + name + ' saved') : Log.error('Error')
    })
    */
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

async function populateInstagramHashtagIndex () {
  Log.info(hashtags.fashion)
  for (let i in hashtags.fashion) {
    await getHashtag(hashtags.fashion[i], 'fashion')
  }

  for (let i in hashtags.fitness) {
    await getHashtag(hashtags.fitness[i], 'fitness')
  }

  for (let i in hashtags.food) {
    await getHashtag(hashtags.food[i], 'food')
  }

  for (let i in hashtags.tech) {
    await getHashtag(hashtags.tech[i], 'tech')
  }

  for (let i in hashtags.travel) {
    await getHashtag(hashtags.travel[i], 'travel')
  }

  return 'Completed!'
}

async function savePostsFromHashtag (social, name, type) {
  let id
  Log.info(social, name, type)
  try {
    id = await fun.searchHashtagId(name)
  } catch (ex) {
    id = await fun.getHashtag(name, '')
  }

  const url = urlOcupa2 + social + '/' + id + '/' + type + '?user_id=' + config.igUserid

  Log.info(url)

  const { payload } = await Wreck.get(url)
  Log.info(payload)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    Log.info(payson.data)
    const posts = payson.data
    for (let i in posts) {
      const exists = await searchPostById(posts[i].id)

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
          res.result === 'created' ? Log.info('#' + name + ' saved') : Log.error('Error')
        })
      } else {
        await client.index({
          index: 'instagram_posts',
          type: '_doc',
          id: posts[i].id,
          body: posts[i]
        }).then(res => {
          res.result === 'created' ? Log.info('#' + name + ' saved') : Log.error('Error')
        })
      }
      await client.index({
        index: 'instagram_posts',
        type: '_doc',
        id: posts[i].id,
        body: posts[i]

      }).then(res => {
        res.result === 'created' ? Log.info('#' + name + ' saved') : Log.error('Error')
      })
    }
  } else {
    Log.error('empty')
    return {}
  }
}

async function saveHashtag (id, name, category) {
  await client.index({
    index: 'instagram_hashtags',
    type: '_doc',
    id: id,
    body: {
      name: name,
      category: category
    }
  }).then(res => {
    res.result === 'created' ? Log.info('#' + name + ' saved') : Log.error('Error')
  })

  return id
}

async function searchHashtagId (name) {
  const res = await client.search({
    index: 'instagram_hashtags',
    q: 'name:' + name
  })

  return res.hits.hits[0]._id
}

async function searchPostById (id) {
  const res = await client.search({
    index: 'instagram_posts',
    q: 'id:' + id
  })

  return res.hits.hits.length > 0
}

async function searchUserById (id) {
  const res = await client.search({
    index: 'instagram_users',
    q: 'id:' + id
  })

  return res.hits.hits.length > 0
}

module.exports = {
  getHashtag,
  getMetadataPost,
  getUser,
  follow,
  like,
  populateInstagramHashtagIndex,
  savePostsFromHashtag,
  saveHashtag,
  searchHashtagId,
  searchPostById,
  searchUserById
}
