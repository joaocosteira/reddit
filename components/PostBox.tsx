import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { LinkIcon } from "@heroicons/react/24/outline";
import { PhotographIcon } from "./Icons";
import { useForm } from "react-hook-form";
import { useState } from "react";

const PostBox = ()  => {

    const { data : session } = useSession();
    const [imageBoxOpen,setImageBoxOpen] = useState<boolean>(false);

    const { register,
             handleSubmit,
             watch,
             formState: { errors } 
          } = useForm();

    return(
        <form className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2">
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
                                {...register('subreddit')} 
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
                    </div>
                )
            }
        </form>
    )
}

export default PostBox;