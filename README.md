# Documentación

## Twitter
* **Follow** 
```console
  GET /twitter/follow?id={user_id}&action={follow/unfollow}
```
* **Like**
```console
  GET /twitter/like?id={tweetId}&action={like/dislike}
```
* **Retweet**
```console
  GET /twitter/retweet?id={tweetId}&action={retweet/unretweet}
```
* **Tweets por categoría**
```console
  GET /twitter/getTweets/category?name={category}  
```

  (Usa nuestra bbdd elasticsearch)
* **Tweets por hashtag**
```console
  GET /twitter/getTweets/hashtag?name={hashtag}  
```

  (Usa nuestra bbdd elasticsearch)
* **Tweets desde la API**
```console
  GET /twitter/getTweetsFromApi?name={hashtag}  
```

  (Usa directamente la API proporcionada, devolviendo tweet con detalles)
* **Guardar tweets desde la API**
```console
  GET /twitter/saveTweetsFromApi?name={hashtag}  
```

  (Guarda en elasticsearch todos los tweets con detalles)
## Instagram
* **Follow** 
```console
  GET /instagram/follow?id={user_id}&action={follow/unfollow}
```
* **Like**
```console
  GET /instagram/like?id={postId}&action={like/dislike}
```
* **Posts por categoría**
```console
  GET /instagram/getPosts/category?name={category}  
```

  (Usa nuestra bbdd elasticsearch)
* **Posts por hashtag**
```console
  GET /instagram/getPosts/hashtag?name={hashtag}  
```

  (Usa nuestra bbdd elasticsearch)
* **Guardar posts desde la API**
```console
  GET /instagram/savePostsFromApi?name={hashtag}&type={recent_media/top_media}
```

  (Guarda en elasticsearch todos los posts con detalles)
