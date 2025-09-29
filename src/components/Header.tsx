import Link from "next/link";
import { UserCircle } from "lucide-react";

const Header = () => {
    const navItems = [
        { label: "Accueil", href: "/", icon: null, style: "default" },
        { label: "Joueur", href: "/player", icon: null, style: "default" },
        { label: "Admin", href: "/admin", icon: null, style: "admin" },
        { label: "Connexion", href: "/auth", icon: <UserCircle className="w-4 h-4 text-white" />, style: "auth" },
      ];
      
      return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[50%] bg-black/10 border border-orange-300 rounded-lg shadow-md">
          <div className="px-8 py-2 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">Betandro</h1>
      
            <div className="flex items-center space-x-2">
              {navItems.map(({ label, href, icon, style }) => (
                <Link key={href} href={href}>
                  {style === "admin" ? (
                    <button className="px-3 py-1 text-xs font-medium text-white bg-orange-500 rounded hover:bg-orange-600 transition">
                      {label}
                    </button>
                  ) : style === "auth" ? (
                    <button className="flex items-center space-x-1 px-3 py-1 text-xs text-white bg-transparent hover:text-orange-400 transition">
                      {icon}
                      <span>{label}</span>
                    </button>
                  ) : (
                    <button className="px-3 py-1 text-xs font-medium text-white bg-transparent hover:text-orange-400 transition">
                      {label}
                    </button>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </header>
      );
}

export default Header;