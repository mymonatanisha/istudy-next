import main_mobile_menu_data from "@/data/header-menu/main-mobile-menu-data";
import useGlobalContext from "@/hooks/useContexts";
import { useAuth } from "@/hooks/useAuth";
import { MenuItem } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const MobileMenu = () => {
    const router = useRouter();
    const { toggleSidebarMenu } = useGlobalContext();
    const { isAuthenticated, logout } = useAuth(); // removed `loading`
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

    const handleActiveSubMenu = (index: string | number) => {
        const indexStr = String(index);
        setActiveSubMenu(activeSubMenu === indexStr ? null : indexStr);
    };

    const handleActiveMegaMenu = (index: string | number) => {
        const indexStr = String(index);
        setActiveMegaMenu(activeMegaMenu === indexStr ? null : indexStr);
    };

    // THE MAIN FIX: Reliable & immediate logout, removes unused `res`
    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();
        toggleSidebarMenu();
        try {
            await fetch('/api/auth/logout', { method: 'POST' }); // no unused var
            logout(); // Immediately clear client state
            router.push('/'); // Redirect home
            router.refresh(); // Always force a refresh
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Filter menu data based on auth state
    const filteredMenuData = main_mobile_menu_data.filter((item) =>
        (item.hideWhenAuth && isAuthenticated) ? false :
        (item.requireAuth && !isAuthenticated) ? false :
        true
    );

    return (
        <>
            <ul>
                {filteredMenuData.map((item: MenuItem) => (
                    <li
                        key={item.id}
                        className={`${item?.children === true
                            ? "menu-item-has-children"
                            : item?.children === false ? "has-mega-menu" : ""} 
                            ${activeSubMenu === String(item.id) ? "active" : ""}`}
                    >
                        {/* --- LOGOUT --- */}
                        {item.title === "Logout" ? (
                            <a href="#" onClick={handleLogout}>
                                {item.title}
                            </a>
                        ) : (
                            <Link
                                href={item.link}
                                onClick={(e) => {
                                    if (item?.hasDropdown === true) {
                                        e.preventDefault();
                                        handleActiveSubMenu(item.id);
                                    } else {
                                        toggleSidebarMenu();
                                    }
                                }}
                            >
                                {item.title}
                            </Link>
                        )}

                        {/* --- IMG DROPDOWN --- */}
                        {item.previewImg === true && (
                            <ul
                                className="mega-menu mega-grid-4"
                                style={{
                                    display: activeSubMenu === String(item.id) ? "block" : "none",
                                }}
                            >
                                {item?.submenus?.map((subItem, index) => (
                                    <li key={index}>
                                        <Link 
                                            onClick={toggleSidebarMenu}
                                            href={subItem.link}
                                            className="home-menu-item"
                                        >
                                            <div className="home-menu-thumb">
                                                {subItem.previewImg && (
                                                    <Image
                                                        style={{ width: "100%", height: "auto" }}
                                                        src={subItem.previewImg}
                                                        alt="images"
                                                    />
                                                )}
                                            </div>
                                            <div className="home-menu-title">{subItem.title}</div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* --- DROPDOWN MENU (with children) --- */}
                        {item?.hasDropdown === true && item?.submenus?.length && (
                            <ul
                                className="submenu last-children"
                                style={{
                                    display: activeSubMenu === String(item.id) ? "block" : "none",
                                }}
                            >
                                {item?.submenus?.map((dropdownItem, index) => {
                                    const megaMenuKey = `${item.id}-${index}`;
                                    return (
                                        <li
                                            key={index}
                                            className={`menu-item-has-children has-arrow ${activeMegaMenu === megaMenuKey ? "dropdown-opened active" : ""}`}
                                        >
                                            {item?.previewImg ? null : (
                                                <Link
                                                    href={dropdownItem?.link}
                                                    onClick={(e) => {
                                                        if (dropdownItem?.megaMenu?.length) {
                                                            e.preventDefault();
                                                            handleActiveMegaMenu(megaMenuKey);
                                                        } else {
                                                            toggleSidebarMenu();
                                                        }
                                                    }}
                                                    className={activeMegaMenu === megaMenuKey ? "active" : ""}
                                                >
                                                    {dropdownItem?.title}
                                                </Link>
                                            )}

                                            {/* Mega menu (nested) */}
                                            {dropdownItem?.megaMenu?.length && (
                                                <ul
                                                    className="submenu"
                                                    style={{
                                                        display: activeMegaMenu === megaMenuKey ? "block" : "none",
                                                    }}
                                                >
                                                    {dropdownItem?.megaMenu?.map(
                                                        (megaMenuItem, megaMenuIndex: number) => (
                                                            <li key={megaMenuIndex}>
                                                                <Link
                                                                    onClick={toggleSidebarMenu}
                                                                    href={megaMenuItem?.link}
                                                                >
                                                                    {megaMenuItem?.title}
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}

                                            {/* Dropdown expander */}
                                            {dropdownItem?.megaMenu?.length && (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleActiveMegaMenu(megaMenuKey);
                                                    }}
                                                    className={`bd-menu-close ${activeMegaMenu === megaMenuKey ? "mean-clicked" : ""}`}
                                                >
                                                    <i className="fa fa-chevron-right"></i>
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {/* Dropdown expander for children */}
                        {item?.hasDropdown === true && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleActiveSubMenu(item.id);
                                }} 
                                className={`bd-menu-close ${activeSubMenu === String(item.id) ? "mean-clicked" : ""}`}
                            >
                                <i className="fa fa-chevron-right"></i>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MobileMenu;
