import Image from "next/image"

const Header = () => {
    return (
        <header className="px-[30px] border-b border-b-gray-200">
            <Image src="/logo.png" alt="logo" width={80} height={80} />
        </header>
    )
}

export default Header
