import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { LinkIcon } from "@heroicons/react/24/outline";
import { PhotographIcon } from "./Icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";

const PostBox = ()  => {

    const { data : session } = useSession();
    const [imageBoxOpen,setImageBoxOpen] = useState<boolean>(false);
    const [addPost] = useMutation(ADD_POST)
    const { register,
             handleSubmit,
             watch,
             formState: { errors } 
          } = useForm();

    
    const onSubmit = handleSubmit( async (formData) => {
        try {

            const { data : { getSubredditListByTopic } } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic : formData.subreddit
                }
            });

            const subredditExists = getSubredditListByTopic.length > 0;

            if(!subredditExists){
                //create sub
            }else{
                
            }
        } catch (error) {
            
        }
    })


    return(
        <form 
            onSubmit={onSubmit}
            className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
        >
            <div className="flex items-center space-x-3">
                <Avatar seed="joao"/>
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