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

const Post = ({ post } : { post : Post}) => {

    return(
        <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600'>
            {/** Votes */}
            <div  className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
                <ArrowUpIcon className='voteButtons hover:text-red-400'/>
                <p className='text-black font-bold text-xs'>0</p>
                <ArrowDownIcon className='voteButtons hover:text-blue-400'/>
            </div>

            <div className='p-3 pb-1'>
                {/**Header */}
                <div className='flex items-center space-x-2'>
                    <Avatar seed={post?.subreddit[0]?.topic} />
                    <p className='text-xs text-gray-400'>
                        <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                            r/{post?.subreddit[0]?.topic}
                        </span>
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
                        <p className='hidden sm:inline'>{post?.comments?.length} Award</p>
                    </div>

                    <div className='postButton'>
                        <ShareIcon className='h-6 w-6'/>
                        <p className='hidden sm:inline'>{post?.comments?.length} Share</p>
                    </div>

                    <div className='postButton'>
                        <BookmarkIcon className='h-6 w-6'/>
                        <p className='hidden sm:inline'>{post?.comments?.length} Save</p>
                    </div>

                    <div className='postButton'>
                        <DotsHorizontalIcon className='h-6 w-6'/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Post;