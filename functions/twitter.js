async function follow (id, action) {
  let act
  action === 'follow' ? act = 'create.json' : act = 'destroy.json'
  const url = urlOcupa2 + 'twitter/1.1/friendships/' + act + '?user_id=' + id + '&bearer=' + config.twKey
  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return payson
  } else {
    Log.error('empty')
    return {}
  }
}

async function getMetadataTweet (id) {
  const url = urlOcupa2 + 'twitter/1.1/statuses/retweets/' + id + '.json'

  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    return payson[0]
  } else {
    Log.error('empty')
    return {}
  }
}

async function getTweetsByCategory (category) {
  const res = await client.search({
    index: 'twitter_tweets',
    body: {
      "query": {
        "match": {
          "category": category
        }
      },
      "aggs" : {
        "categories": {
          "terms": {
            "field": "category"
          }
        },
        "hashtags": {
          "terms": {
            "field": "hashtag"
          }
        }
      },
      "sort": {
        "_script": {
          "type": "number",
          "script": "return doc['likeCount'].value + (doc['replyCount'].value * 2) + (doc['retweetCount'].value * 3)",
          "order": "desc"
        }
      },
      "size": 20
    }
  })

  return res.hits.hits
}

async function getTweetsByHashtag (hashtag) {
  const res = await client.search({
    index: 'twitter_tweets',
    body: {
      "query": {
        "match": {
          "hashtag": hashtag
        }
      },
      "aggs" : {
        "categories": {
          "terms": {
            "field": "category"
          }
        },
        "hashtags": {
          "terms": {
            "field": "hashtag"
          }
        }
      },
      "sort": {
        "_script": {
          "type": "number",
          "script": "return doc['likeCount'].value + (doc['replyCount'].value * 2) + (doc['retweetCount'].value * 3)",
          "order": "desc"
        }
      },
      "size": 20
    }
  })

  return res.hits.hits
}

async function getTweetsFromApi (name) {
  const url = urlOcupa2 + 'twitter/1.1/search/tweets.json?q=' + name

  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    let tweets = []

    const uniqueArray = await removeDuplicates(payson, 'tweetId')

    for (let i in uniqueArray) {
      const res = await getMetadataTweet(payson[i].tweetId)
      const tweet = payson[i]
      tweet.likeCount = res.likeCount ? res.likeCount : 0
      tweet.retweetCount = res.retweetCount ? res.retweetCount : 0
      tweet.commentCount = res.replyCount ? res.replyCount : 0
      tweet.userName = payson[i].screenName
      tweet.hashtag = name
      tweet.category = await fun.searchCategory(name)
      tweets.push(tweet)
    }

    return tweets
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

async function removeDuplicates (originalArray, prop) {
  var newArray = []
  var lookupObject = {}

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i])
  }
  return newArray
}

async function retweet (id, action) {
  let act
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

async function saveTweetsFromApi (name) {
  const url = urlOcupa2 + 'twitter/1.1/search/tweets.json?q=' + name

  const { payload } = await Wreck.get(url)
  if (payload.length > 0) {
    let payson = JSON.parse(payload)
    let tweets = []

    const uniqueArray = await removeDuplicates(payson, 'tweetId')

    for (let i in uniqueArray) {
      const res = await getMetadataTweet(payson[i].tweetId)
      const tweet = payson[i]
      tweet.likeCount = res.likeCount ? res.likeCount : 0
      tweet.retweetCount = res.retweetCount ? res.retweetCount : 0
      tweet.replyCount = res.replyCount ? res.replyCount : 0
      tweet.hashtag = name
      tweet.category = await fun.searchCategory(name)
      tweets.push(tweet)
      await client.index({
        index: 'twitter_tweets',
        type: '_doc',
        id: tweet.tweetId,
        body: tweet
      }).then(res => {
        res.result === 'created' ? Log.info('Created') : Log.error('Error')
      })
    }

    return tweets
  } else {
    Log.error('empty')
    return {}
  }
}

module.exports = {
  follow,
  getTweetsByCategory,
  getTweetsByHashtag,
  getTweetsFromApi,
  like,
  retweet,
  saveTweetsFromApi
}
