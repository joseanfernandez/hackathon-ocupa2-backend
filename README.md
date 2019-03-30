# Documentación

### Twitter
* GET /twitter/follow?id={user_id}&action={follow/unfollow}
* GET /twitter/getTweets?name={hashtag}  (Usa nuestra bbdd elasticsearch)
* GET /twitter/getTweetsFromApi?name={hashtag}  (Usa directamente la API proporcionada, devolviendo tweet con detalles)
* GET /twitter/like?id={tweetId}&action={like/dislike}
* GET /twitter/retweet?id={tweetId}&action={retweet/unretweet}
* GET /twitter/saveTweetsFromApi?name={hashtag}  (Guarda en elasticsearch todos los tweets con detalles)


### Instagram
