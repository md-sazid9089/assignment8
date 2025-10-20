import { Link } from 'react-router-dom';

// Resolve hero image asset for Vite
const heroImgUrl = new URL('../assets/hero.png', import.meta.url).href;

export default function Hero() {
return (
    <section className="bg-gray-50 pt-0 md:pt-2 pb-16 md:pb-20">
        <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
                <div className="text-center mb-8">
                    <h1 className="mt-0 text-5xl md:text-6xl font-bold mb-3 leading-tight">
                        We Build<br />
                        <span className="text-primary">Productive Apps</span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.
                        Our goal is to turn your ideas into digital experiences that truly make an impact.
                    </p>
                    
                    <div className="flex gap-6 justify-center mt-6">
                        <Link to="/apps" className="flex items-center bg-white border border-gray-200 rounded-md px-6 py-3 hover:shadow-md transition-all text-base">
                            <img src="https://static.vecteezy.com/system/resources/previews/022/613/026/non_2x/google-play-store-icon-logo-symbol-free-png.png" alt="Google Play" className="h-6 mr-3" />
                            <span>Google Play</span>
                        </Link>
                        <Link to="/apps" className="flex items-center bg-white border border-gray-200 rounded-md px-6 py-3 hover:shadow-md transition-all text-base">
                            <img src="https://logos-world.net/wp-content/uploads/2021/02/App-Store-Logo-2017-present.jpg" alt="App Store" className="h-6 mr-3" />
                            <span>App Store</span>
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <img 
                        src={heroImgUrl}
                        alt="Hero App Interface" 
                        className="relative z-10 max-w-sm md:max-w-lg"
                    />
                </div>
            </div>
        </div>
    </section>
);
}
