async function elasticSetup () {
  await client.indices.create({ index: 'hashtags', body: mappings.hashtags })
  await client.indices.create({ index: 'instagram_posts', body: mappings.instagram_posts })
  await client.indices.create({ index: 'twitter_tweets', body: mappings.twitter_tweets })

  return 'Setup completed!'
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

async function getHashtags () {
  const res = await client.search({
    index: 'hashtags',
    size: 10000
  })

  return res.hits.hits
}

async function populateHashtagIndex () {
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

async function saveHashtag (id, name, category) {
  await client.index({
    index: 'hashtags',
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

async function searchCategory (hashtag) {
  if (hashtags.fashion.includes(hashtag)) {
    return 'fashion'
  }

  if (hashtags.fitness.includes(hashtag)) {
    return 'fitness'
  }

  if (hashtags.food.includes(hashtag)) {
    return 'food'
  }

  if (hashtags.travel.includes(hashtag)) {
    return 'tech'
  }

  if (hashtags.travel.includes(hashtag)) {
    return 'fashion'
  }
}

async function searchHashtagId (name) {
  const res = await client.search({
    index: 'hashtags',
    q: 'name:' + name
  })

  return res.hits.hits[0]._id
}

module.exports = {
  elasticSetup,
  getHashtag,
  getHashtags,
  populateHashtagIndex,
  saveHashtag,
  searchCategory,
  searchHashtagId
}
