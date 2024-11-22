import Header from "@/components/molecules/Header"

const HomeComponent = () => {
    return (
        <main className="h-[100dvh] px-[50px]">
            <Header />
            <section className="flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-bold mb-4">Welcome to LogiRegistry</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Connect, register, and grow with the leading logistics registry platform. Start your journey today!
                    </p>
                    <a href="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Register Your Company Now
                    </a>
                </div>
            </section>
        </main>
    )
}

export default HomeComponent
