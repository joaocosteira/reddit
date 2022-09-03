import Image from "next/image";
import { HomeIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { SparklesIcon, GlobeAltIcon, VideoCameraIcon, BellIcon, PlusIcon } from '@heroicons/react/24/outline';
import { MessageIcon, SpeakerIcon, MenuIcon } from './Icons';



const Header = ()  => {

    return(
        <div className="sticky top-0 z-50 flex bg-white px-4 py-2">

            {/** Left Side Logo */}
            <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
                <Image
                    objectFit="contain"
                    src="/reddit_logo.svg"
                    layout="fill"
                />
            </div>
            
            {/** Home Drop Down */}
            <div className="flex items-center mx-7 xl:min-w-[300px] border rounded-md p-2 border-gray-100 hover:bg-gray-100 hover:cursor-pointer">
                <HomeIcon className="h-5 w-5"/>
                <p className="ml-2 hidden flex-1 lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5"/>
            </div>

            {/** Search Icon*/}
            <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1"> 

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 w-8 h-8">
                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                </svg>

                <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search Reddit"/>
                <button type="submit" hidden/>
            </form>

            <div className="hidden items-center space-x-2 text-gray-500 mx-5 lg:inline-flex">
                <SparklesIcon className="icon"/>
                <GlobeAltIcon className="icon"/>
                <VideoCameraIcon className="icon"/>
                <hr className="h-10 border border-gray-100"/>

                {/** Message Icon */}
                <MessageIcon  className="icon"/>
                <BellIcon className="icon"/>
                <PlusIcon className="icon"/>
                <SpeakerIcon className="icon"/>

            </div>

            <div className="flex lg:hidden items-center text-gray-500 ml-5">
                <MenuIcon className="icon"/>
            </div>
            

            {/** Sign In/out Button */}
            <div className="hidden lg:flex items-center space-x-2 border-gray-100 p-2 hover:cursor-pointer">
                <div className="relative h-5 w-5 flex-shrink-0">
                    <Image 
                        src="/reddit-head.png" 
                        alt="reddit head"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <p className="text-gray-400">Sign In</p>
            </div>


        </div>
    )
}

export default Header;