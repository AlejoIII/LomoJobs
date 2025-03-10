import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href="/" className="font-bold xl">LomoJobs</Link>
        <nav className="flex gap-4">
          <Link href="/register" className="bg-gray-300 px-4 py-2 rounded-md">Registrarse</Link>
          <Link href="/login" className="bg-gray-300 px-4 py-2 rounded-md">Iniciar Sesión</Link>
          <Link href="/post" className="bg-purple-400 text-white px-4 py-2 rounded-md">Añadir Oferta</Link>
        </nav>
      </div>
    </header>
  );
}
