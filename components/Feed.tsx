import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries";
import Post from "./Post";

const Feed = ({ topic } : { topic?: string }) => {

    const { data,error }  = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, { variables : { topic : topic } });

    const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

    return(
        <div className="mt-5 space-y-4">
            { posts?.map( p  => <Post key={p.id} post={p} />)}
        </div>
    )
}

export default Feed;