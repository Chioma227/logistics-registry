import Image from "next/image"

const Header = () => {
    return (
        <header className="px-[30px] border-b border-b-gray-200">
            <Image src="/logo.png" alt="logo" width={70} height={70} />
        </header>
    )
}

export default Header
