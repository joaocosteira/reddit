import { useQuery } from "@apollo/client";
import { GET_SUBREDDIT_WITH_LIMIT } from "../graphql/queries";
import SubRedditRow from "./SubRedditRow";

const TopComunities =  () => {

    const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT,{ variables : { limit : 7 }});
    const subreddits: Subreddit[] = data?.getSubredditListLimit;

    return(
        <div className='sticky hidden lg:inline top-36 mx-5 mt-5 h-fit min-w-[300px] rounded-md border border-gray-300 bg-white '>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Comunities</p>
          <div>
            { subreddits?.map( (subreddit,i) => (
                <SubRedditRow 
                    key={subreddit.id}  
                    subreddit={subreddit}
                    index={i+1}
                />)
            )}
          </div>
        </div>
    )
    }

export default TopComunities;