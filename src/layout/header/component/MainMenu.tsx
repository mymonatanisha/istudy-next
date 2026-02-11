"use client";

import main_menu_data from "@/data/header-menu/main-menu-data";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CommonHeaderMainMenu = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // Don't render anything while loading to avoid menu flashing
  if (loading) {
    return <ul></ul>;
  }

  // Filter menu items based on authentication state
  const filteredMenuData = main_menu_data.filter((item) => {
    // Hide items that should be hidden when authenticated
    if (item.hideWhenAuth && isAuthenticated) {
      return false;
    }
    // Hide items that require authentication when not authenticated
    if (item.requireAuth && !isAuthenticated) {
      return false;
    }
    return true;
  });

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <ul>
        {filteredMenuData.map((item) => (
          <li
            key={item.id}
            className={`${item?.children === true
              ? "menu-item-has-children"
              : item?.children === false
                ? "has-mega-menu"
                : ""
              }`}
          >
            {item.title === "Logout" ? (
              <a href="#" onClick={handleLogout}>{item?.title}</a>
            ) : (
              <Link href={item?.link}>{item?.title}</Link>
            )}
            {/* img menu */}
            {item?.previewImg === true && (
              <ul className={`mega-menu home-menu-grid`}>
                {item?.submenus?.length && (
                  <>
                    {item?.submenus.map((subItem, index) => (
                      <li key={index}>
                        <Link href={subItem?.link} className="home-menu-item">
                          <div className="home-menu-thumb">
                            {subItem?.previewImg && (
                              <Image src={subItem?.previewImg} style={{ width: "100%", height: 'auto' }} alt="images" />
                            )}
                          </div>
                          <div className="home-menu-title">{subItem?.title}</div>
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}
            {/* Render Dropdown Menu */}
            {item?.hasDropdown === true && item?.submenus?.length && (
              <ul className="submenu last-children">
                {item?.submenus.map((dropdownItem, index) => (
                  <li key={index} className={`${dropdownItem.pluseIncon == true ? "menu-item-has-children has-arrow" : ""}`}>
                    <Link href={dropdownItem?.link} className="title">{dropdownItem?.title}</Link>

                    {/* Check for megaMenu presence and ensure it's an array */}
                    {dropdownItem?.megaMenu?.length && (
                      <ul className="submenu">
                        {dropdownItem?.megaMenu.map((megaDropDownItem, megaIndex) => (
                          <li key={megaIndex}>
                            <Link href={megaDropDownItem?.link}>
                              {megaDropDownItem?.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {/* multi pages */}
            {item?.pageLayout === true && item?.submenus?.length && (
              <ul className="mega-menu mega-grid-5">
                {item?.submenus?.map((pageLayoutItem, pageLayoutIndex) => (
                  <li key={pageLayoutIndex}>
                    <Link href={pageLayoutItem?.link} className="title">
                      {pageLayoutItem?.title}
                    </Link>
                    {pageLayoutItem?.megaMenu?.length && (
                      <ul>
                        {pageLayoutItem?.megaMenu?.map(
                          (
                            singlePageItem,
                            singlePageItemIndex: number
                          ) => (
                            <li key={singlePageItemIndex}>
                              <Link href={singlePageItem?.link}>
                                {singlePageItem?.title}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommonHeaderMainMenu;

