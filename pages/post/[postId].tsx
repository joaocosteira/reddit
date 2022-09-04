import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Comment from "../../components/Comment";
import Post from "../../components/Post";
import { ADD_COMMENT } from "../../graphql/mutations";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

type FormData = {
    comment : string
}

const PostPage = () => {

    const router =  useRouter();
    const { data : session } = useSession();
    const { data} = useQuery(GET_POST_BY_POST_ID, { variables : { post_id : router.query.postId } });
    const [ addComment ] = useMutation(ADD_COMMENT,{
        refetchQueries : [GET_POST_BY_POST_ID, 'getPostByPostId']
    });

    const post: Post = data?.getPostListByPostId;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState : { errors },
    } = useForm<FormData>();

    const onSubmit : SubmitHandler<FormData> = async (data) => {
        
        const notification = toast.loading('Posting your comment...');

        await addComment({
            variables : { 
                post_id: router.query.postId,
                username: session?.user?.name,
                text: data.comment
            }
        })

        setValue('comment','');

        toast.success('Comment successfully posted',{ id : notification });

    }

    
    return(
        <>
            <Head>
                <title>{`r/${post?.subreddit[0]?.topic}: ${post?.title}`}</title>
            </Head>

            <div className="mx-auto my-7 max-w-5xl">
                <Post post={post} />

                <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
                    <p>
                        Comment as <span className="text-red-500">{session?.user?.name}</span>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex space-y-2 flex-col">
                        <textarea 
                            {...register('comment')}
                            disabled={!session}
                            className="h-24 rounded-md border border-gray-200 p-2  pl-4 outline-none disabled:bg-gray-50"
                            placeholder= { session ? "What are your thought?" : "SignIn to enter the conversation"}
                        />

                        <button 
                            disabled={!session}
                            type="submit"
                            className="rounded-full bg-red-500 p-3 text-white disabled:bg-gray-200"
                        >
                            Comment
                        </button>
                    </form>
                </div>

                <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
                    <hr className="py-2" />
                    { post?.comments.map( (comment: Comments) => <Comment key={comment.id} comment={comment}/>) }
                </div>
            </div>
        </>
    )
}


export default PostPage;