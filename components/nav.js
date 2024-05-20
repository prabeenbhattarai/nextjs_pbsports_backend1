// components/Sidebar.js

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();
    const { pathname } = router;

    const links = [
        { href: "/", text: "Dashboard", icon: <DashboardIcon /> },
        { href: "/category", text: "Event Category", icon: <CategoryIcon /> },
        { href: "/schedule", text: "Match Schedule", icon: <ScheduleIcon /> },
        { href: "/highlight", text: "Highlight", icon: <HighlightIcon /> },
        { href: "/gallery", text: "Images", icon: <GalleryIcon /> },
        { href: "/settings", text: "Settings", icon: <SettingsIcon /> }
    ];

    async function logout() {
        await signOut();
    }

    return (
        <aside className="flex flex-col w-64 bg-gray-800 h-full text-white">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <Link href="/">
                    <a className="text-xl font-semibold">Pbsports</a>
                </Link>
            </div>
            <nav className="flex flex-col flex-1">
                {links.map((link, index) => (
                    <Link key={index} href={link.href}>
                        <a className={`flex items-center py-3 px-6 ${pathname === link.href ? 'bg-gray-700' : 'hover:bg-gray-700'} ${index === 0 && 'rounded-tl-lg'} ${index === links.length - 1 && 'rounded-bl-lg'}`}>
                            {link.icon}
                            <span className="ml-4">{link.text}</span>
                        </a>
                    </Link>
                ))}
            </nav>
            <button onClick={logout} className="flex items-center justify-center h-16 bg-gray-900 hover:bg-gray-700 rounded-bl-lg">
                <LogoutIcon />
                <span className="ml-4">Logout</span>
            </button>
        </aside>
    );
};

const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {/* Add your Dashboard icon path here */}
    </svg>
);

const CategoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {/* Add your Category icon path here */}
    </svg>
);

const ScheduleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {/* Add your Schedule icon path here */}
    </svg>
);

const HighlightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {/* Add your Highlight icon path here */}
    </svg>
);

const GalleryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {/* Add your Gallery icon path here */}
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {/* Add your Settings icon path here */}
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {/* Add your Logout icon path here */}
    </svg>
);

export default Sidebar;
