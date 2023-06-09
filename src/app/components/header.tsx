import { getServerSession } from 'next-auth'
import Link from 'next/link'
import HeaderMenu from './header-menu'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Header = async () => {
    const session = await getServerSession(authOptions)
    const avatarImage = session?.user?.image as string
    const userFirstTwoLetters = session?.user?.name
        ?.slice(0, 2)
        .toUpperCase() as string
    const userName = session?.user?.name as string
    return (
        <header className="sticky top-0 z-10 w-full border-b border-b-border-dark backdrop-blur-[3px]">
            <nav className="flex items-center justify-between px-3 py-[0.4rem] md:px-20 lg:px-40 2xl:px-72">
                <Link
                    href="/"
                    className="text-lg font-semibold text-accent-dark"
                >
                    mylo
                    <span className="csgo">/csgo</span>
                </Link>
                {session && (
                    <HeaderMenu
                        avatarImage={avatarImage}
                        avatarFallback={userFirstTwoLetters}
                        userName={userName}
                    />
                )}
            </nav>
        </header>
    )
}

export default Header
