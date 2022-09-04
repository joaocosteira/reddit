import { ChevronUpIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Avatar from "./Avatar"

type Props = {
    subreddit : Subreddit
    index?: number
}

const SubRedditRow = ({ subreddit, index } : Props) => {

    return(
        <Link href={`/subreddit/${subreddit.topic}`}>
            <div
                className="flex items-center space-x-2 border-t bg-white px-4 py-2 hover:cursor-pointer hover:bg-gray-100"
            >
                { index && <p>{index}</p> }
                <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400"/>
                <Avatar seed={subreddit.topic}/>
                <p className="flex-1 truncate">r/{subreddit.topic}</p>
                <div className="rounded-full px-3 text-white bg-blue-400 hover:bg-blue-500">View</div>
            </div>
        </Link>
    )
}

export default SubRedditRow;