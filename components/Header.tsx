import Image from "next/image";

const Header = ()  => {

    return(
        <div>
            <div className="relative h-10 w-20">
                <Image
                    objectFit="contain"
                    src="/reddit_logo.svg"
                    layout="fill"
                />
            </div>
        </div>
    )
}

export default Header;