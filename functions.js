async function findHashtagId(name) {
  const res = await client.search({
    index: 'hashtags',
    q: 'name:' + name
  })

  return res.hits.hits[0]._id
}

async function getHashtag(name, category) {
  const url = urlOcupa2 + 'instagram/ig_hashtag_search?q=' + name + '&user_id=' + config.userid
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return await saveHashtag(payson.id, name, category)
  } else {
    Log.error('empty')
    return {}
  }

}

async function populateHashtagIndex() {
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

async function saveHashtag(id, name, category) {
  await client.index({
    index: 'hashtags',
    type: '_doc',
    id: id,
    body: {
      name: name,
      category: category
    }
  }).then(res => {
    res.result = 'created' ?  Log.info('#' + name + ' saved') : Log.error(message = 'Error')
  })

  return id

}



module.exports = {
  findHashtagId,
  getHashtag,
  populateHashtagIndex,
  saveHashtag
}
