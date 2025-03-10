
export default function Hero() {
    return (
        <section className="container py-12">
            <h1 className="text-4xl font-bold text-center">
                Ofertas de Empleo
            </h1>
            <p className="text-center text-gray-700 mt-2">
                Encuentra empleos para demostrar tu potencial y ganarte la vida asqueroso.    
            </p>
            <form className="flex gap-2 mt-4 max-w-md mx-auto">
                <input
                    type="search"
                    className="border border-gray-400 w-full py-2 px-3 rounded-md"
                    placeholder="Buscar Ofertas..."/>
                <button className="bg-purple-400 text-white py-2 px-4 rounded-md">
                    Buscar
                </button>
            </form>
        </section>
    );
}