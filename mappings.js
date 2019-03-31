module.exports = {
  hashtags: {
    'mappings': {
      '_doc': {
        'properties': {
          'category': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword'
              }
            },
            'fielddata': true
          },
          'name': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            }
          }
        }
      }
    }
  },

  instagram_posts: {
    'mappings': {
      '_doc': {
        'properties': {
          'category': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            },
            'fielddata': true
          },
          'commentsCount': {
            'type': 'long'
          },
          'hashtag': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            },
            'fielddata': true
          },
          'id': {
            'type': 'long'
          },
          'likeCount': {
            'type': 'long'
          },
          'mediaType': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            }
          },
          'userFollowerCount': {
            'type': 'long'
          },
          'userId': {
            'type': 'text',
            'fielddata': true
          },
          'userMediaCount': {
            'type': 'long'
          },
          'userName': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            },
            'fielddata': true
          }
        }
      }
    }
  },

  twitter_tweets: {
    'mappings': {
      '_doc': {
        'properties': {
          'category': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            },
            'fielddata': true
          },
          'hashtag': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            },
            'fielddata': true
          },
          'likeCount': {
            'type': 'long'
          },
          'name': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            }
          },
          'replyCount': {
            'type': 'long'
          },
          'retweetCount': {
            'type': 'long'
          },
          'screenName': {
            'type': 'text',
            'fields': {
              'keyword': {
                'type': 'keyword',
                'ignore_above': 256
              }
            }
          },
          'tweetId': {
            'type': 'long'
          },
          'userName': {
            'type': 'text',
            'fielddata': true
          },
          'userid': {
            'type': 'long'
          }
        }
      }
    }
  }
}
