export const HomeFooter: React.FC = () => {
    return (
        <footer className="text-center py-8 border-t border-gray-200 text-sm text-gray-600">
            © {new Date().getFullYear()} Mi SaaS - Todos los derechos reservados.
        </footer>
    );
};
