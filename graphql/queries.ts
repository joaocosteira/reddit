import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query GETSUBREDDITBYTOPIC($topic: String!){
        getSubredditListByTopic(topic: $topic) {
            id
            created_at
            topic            
        }
    }
`