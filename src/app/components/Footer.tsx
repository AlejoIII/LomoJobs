"use client";

export default function Footer() {
  return (
    <footer className="container py-8 text-center text-gray-500 dark:text-gray-400">
      LomoJobs &copy; {new Date().getFullYear()} - Todos los derechos reservados
    </footer>
  );
}
