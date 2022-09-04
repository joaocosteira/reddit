import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query GETALLPOSTS {
        getPostList{
            body
            created_at
            id
            image
            title
            subreddit_id
            username
            comments {
                created_at
                id
                post_id
                text
                username
            }  
            subreddit {
                topic
                id
                created_at
            }   
            votes {
                upvote
                created_at
                id
                username
                post_id
            }       
        }
    }
`

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query GETSUBREDDITBYTOPIC($topic: String!){
        getSubredditListByTopic(topic: $topic) {
            id
            created_at
            topic            
        }
    }
`