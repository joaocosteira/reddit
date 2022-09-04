import { 
    ArrowDownIcon,
    ArrowUpIcon,
    BookmarkIcon,
    GiftIcon,
    ShareIcon
} from '@heroicons/react/24/outline';
import Avatar from './Avatar';
import { MessageIcon, DotsHorizontalIcon } from './Icons';
import TimeAgo from 'react-timeago';
import Link from 'next/link';
import { Jelly } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ALL_VOTES_BY_POST_ID } from '../graphql/queries';
import { ADD_VOTE } from '../graphql/mutations';

const Post = ({ post } : { post : Post}) => {

    const [vote,setVote] = useState<boolean>();
    const { data: session } = useSession();

    const { data,loading } = useQuery(ADD_ALL_VOTES_BY_POST_ID,{ variables : { post_id : post?.id } });

    const [addVote] = useMutation(ADD_VOTE,{ 
/*         variables : { 
            post_id : post?.id,
            username: post?.username,
            upvote: vote
        }, */
        refetchQueries: [ADD_ALL_VOTES_BY_POST_ID,'getVotesByPostId']

    })

    const upVote = async (isUpvote : boolean) => {

        if(!session){
            toast("You need to signin to vote")
        }

        //if user already voted
        if( vote && isUpvote) return;
        //if user already downvoted
        if( vote === false && !isUpvote) return;


        await addVote({
            variables : {
                post_id : post?.id,
                username: session?.user?.name,
                upvote: isUpvote
                    }
                })

    }


    useEffect(() => {
        const votes: Vote[] = data?.getVotesByPostId;
        const vote = votes?.find( vote => vote.username === session?.user?.name)?.upvote;
        setVote(vote);

    },[data]);  


    const displayVotes = (data: any) => {
        const votes: Vote[] = data?.getVotesByPostId;
        const displayNumber = votes?.reduce( (total,vote) => vote.upvote ? total + 1 : total - 1,0);

        switch(true){
            case votes?.length === 0: return 0
            case displayNumber == 0: return votes[0]?.upvote ?  1 : -1;
            default: return displayNumber
        }

    }

    if(!post){
        return(
            <div className='flex w-full items-center justify-center p-10 text-xl'>
                <Jelly size={50} color="#FF4501" />
            </div>
        )
    }
    return(
        <Link href={`/post/${post.id}`}>
            <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600'>
                {/** Votes */}
                <div  className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
                    <ArrowUpIcon onClick={ () => { upVote(true) }} className={`voteButtons hover:text-blue-400 ${ vote && "text-blue-400"}`}/>
                    <p className='text-black font-bold text-xs'>{displayVotes(data)}</p>
                    <ArrowDownIcon onClick={ () => { upVote(false) }} className={`voteButtons hover:text-red-400 ${ vote === false && "text-red-400"}`}/>
                </div>

                <div className='p-3 pb-1'>
                    {/**Header */}
                    <div className='flex items-center space-x-2'>
                        <Avatar seed={post?.subreddit[0]?.topic} />
                        <p className='text-xs text-gray-400'>
                            <Link href={`/subreddit/${post?.subreddit[0]?.topic}`}>
                                <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                                    r/{post?.subreddit[0]?.topic}
                                </span>
                            </Link>
                            {" "}• Posted by u/{post?.username}
                            {" "}<TimeAgo date={post?.created_at}/>
                        </p>
                    </div>
                    {/** Body */}
                    <div className='py-4'>
                        <h2 className='text-xl font-semibold'>{post?.title}</h2>
                        <p className='mt-2 text-sm font-light'>{post?.body}</p>
                    </div>
                    {/** Image */}
                    <img className='w-full mb-2' src={post?.image} alt=""/>


                    {/** Footer  With All the buttons **/}
                    <div className='flex space-x-4 text-gray-400'>

                        <div className='postButton'>
                            <MessageIcon className='h-6 w-6'/>
                            <p className='hidden sm:inline'>{post?.comments?.length} Comments</p>
                        </div>

                        <div className='postButton'>
                            <GiftIcon className='h-6 w-6'/>
                            <p className='hidden sm:inline'>{0} Award</p>
                        </div>

                        <div className='postButton'>
                            <ShareIcon className='h-6 w-6'/>
                            <p className='hidden sm:inline'>{0} Share</p>
                        </div>

                        <div className='postButton'>
                            <BookmarkIcon className='h-6 w-6'/>
                            <p className='hidden sm:inline'>{0} Save</p>
                        </div>

                        <div className='postButton'>
                            <DotsHorizontalIcon className='h-6 w-6'/>
                        </div>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Post;