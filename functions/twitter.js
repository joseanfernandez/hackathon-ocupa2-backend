async function follow (id, action) {
  let act
  action === 'follow' ? act = 'create.json' : act = 'destroy.json'
  const url = urlOcupa2 + 'twitter/1.1/friendships/' + act + '?user_id=' + id + '&bearer=' + config.twKey  
  Log.info(url)
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return payson
  } else {
    Log.error('empty')
    return {}
  }
}

async function like (id, action) {
  let act
  action === 'like' ? act = 'create.json' : act = 'destroy.json'
  const url = urlOcupa2 + 'twitter/1.1/favorites/' + act + '?id=' + id + '&bearer=' + config.twKey
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return payson
  } else {
    Log.error('empty')
    return {}
  }
}

async function retweet (id, action) {
  action === 'retweet' ? act = 'retweet' : act = 'unretweet'
  const url = urlOcupa2 + 'twitter/1.1/statuses/' + act + '/' + id + '.json?bearer=' + config.twKey
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return payson
  } else {
    Log.error('empty')
    return {}
  }
}


module.exports = {
  follow,
  like,
  retweet
}
