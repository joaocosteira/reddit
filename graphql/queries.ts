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

export const GET_ALL_POSTS_BY_TOPIC = gql`
    query GETALLPOSTSBYTOPIC($topic: String!) {
        getPostListByTopic(topic: $topic){
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


export const GET_POST_BY_POST_ID = gql`
    query GETPOSTBYPOSTID($post_id: ID!) {
        getPostListByPostId(post_id: $post_id){
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