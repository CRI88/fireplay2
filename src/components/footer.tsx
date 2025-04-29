export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg h-18 flex items-center">
            <p className="w-full flex items-center justify-center">© {new Date().getFullYear()} Fireplay. Todos los derechos reservados.</p>
        </footer>
    );
}