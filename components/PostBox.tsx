import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { LinkIcon } from "@heroicons/react/24/outline";
import { CloseIcon, PhotographIcon } from "./Icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import toast from "react-hot-toast";

const PostBox = ()  => {

    const { data : session } = useSession();
    const [imageBoxOpen,setImageBoxOpen] = useState<boolean>(false);
    const [addPost] = useMutation(ADD_POST,{
        refetchQueries: [GET_ALL_POSTS, 'getPostList']
    });
    const [addSubreddit] = useMutation(ADD_SUBREDDIT);

    const { register,
            setValue,
             handleSubmit,
             watch,
             formState: { errors } 
          } = useForm();

    
    const onSubmit = handleSubmit( async (formData) => {

        const notification = toast.loading('Creating a new post...');

        try {
            //Get Subreddit
            const { data : { getSubredditListByTopic } } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic : formData.subreddit
                }
            });

            //Get Subreddit id => If it doesnt exit, create a new one
            const subreddit_id = getSubredditListByTopic.length > 0 ? getSubredditListByTopic[0].id : await (
                async ()=>{
                    const { data : { insertSubreddit : newSubreddit } } = await addSubreddit({
                        variables: {
                            topic : formData.subreddit
                        }                    
                });
                return newSubreddit.id;
            })();
            

            //Effectivly creates the Post
            const { data : { insertPost : newPost } } = await addPost({
                variables : {
                    body: formData.postBody,
                    image: formData.postImage || '',
                    subreddit_id,
                    title: formData.postTitle,
                    username: session?.user?.name
                }
            });


            //Reset Inputs
            setValue('postTitle','');
            setValue('postBody','');
            setValue('subreddit','');
            setValue('postImage','');
            setImageBoxOpen(false);
            
            toast.success('New Post Created',{ id : notification });

        } catch (error) {
            toast.error('Whoops, something went wrong...',{ id : notification });
            console.log(error);
        }
    })

    const resetInputs = () => {
        setValue('postTitle','');
        setValue('postBody','');
        setValue('subreddit','');
        setValue('postImage','');     
        setImageBoxOpen(false);   
    }


    return(
        <form 
            onSubmit={onSubmit}
            className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
        >
            <div className="flex items-center space-x-3">
                <Avatar />
                <input
                    disabled={!session}
                    {...register("postTitle", { required: true })}
                    className="flex-1 bg-gray-50 rounded-md p-2 pl-5 outline-none "
                    type="text" 
                    placeholder={ 
                        session ?
                            "Create a post by entering a title" :
                            "Sign in to post"
                        }
                />

                <PhotographIcon 
                    onClick={() => { setImageBoxOpen(o => !o) }}
                    className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && "text-red-500"}`} 
                />   
                <LinkIcon className="h-6 text-gray-300 cursor-pointer" />

                {
                   !!watch('postTitle') && (
                        <CloseIcon 
                            onClick={resetInputs}
                            className={`h-6 text-gray-300 cursor-pointer hover:text-red-500`} 
                        />                     
                   ) 
                }

            </div>
            {
                !!watch('postTitle') && (
                    <div className="flex flex-col p-y-2">

                        {/** Body Form */}
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Body:</p>
                            <input 
                                {...register('postBody')} 
                                className="m-2 flex-1 rounded-md bg-blue-50 p-2 outline-none"
                                type="text" 
                                placeholder="Text (Optional)"
                            />
                        </div>
                        {/** Subreddit Form */}
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Subreddit:</p>
                            <input 
                                {...register('subreddit', { required: true })} 
                                className="m-2 flex-1 rounded-md bg-blue-50 p-2 outline-none"
                                type="text" 
                                placeholder="i.e. reactjs"
                            />
                        </div>
                        {imageBoxOpen  && (
                            <div className="flex items-center px-2">
                                <p className="min-w-[90px]">Image URL:</p>
                                <input 
                                    {...register('postImage')} 
                                    className="m-2 flex-1 rounded-md bg-blue-50 p-2 outline-none"
                                    type="text" 
                                    placeholder="(Optional)"
                                />
                            </div>
                        )}
                        {/** Errors */}
                        {
                            Object.keys(errors).length > 0 && (
                                <div className="space-y-2 p-2 text-red-600">
                                    { errors.postTitle?.type === 'required' && (
                                        <p>A post title is required</p>
                                    )}
                                    { errors.subreddit?.type === 'required' && (
                                        <p>A Subreddit is required</p>
                                    )}
                                </div>
                            )
                        }

                        {/** Submit Button */}
                        { !!watch('postTitle') && (
                            <button 
                                type="submit"
                                className="w-full rounded-full bg-blue-400 hover:bg-blue-500 p-2 text-white"
                            >
                                Create Post
                            </button>
                        )}
                    </div>
                )}
        </form>
    )
}

export default PostBox;