import clsx from 'clsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuHamburger } from '../components/MenuHamburger';
import { OptionDashboard } from '../components/OptionDashboard';

export const SideBar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  type variant = 'dashboard' | 'products' | 'materials';
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', to: '/' },
    { id: 'products', label: 'Produtos', to: '/products' },
    { id: 'materials', label: 'Materiais', to: '/materials' },
  ];
  return (
    <>
      <MenuHamburger
        setOpenSideBar={setOpenSideBar}
        openSideBar={openSideBar}
      />
      <aside
        className={clsx(
          'fixed max-w-3xs w-full min-h-screen z-1',
          'bg-erp-main flex flex-col items-center',
          '-translate-x-full md:translate-none',
          'pt-11 md:pt-0',
          openSideBar ? 'translate-none' : '-translate-x-full',
          'transition delay-100 duration-300 ease-in-out',
        )}
      >
        <header className="mt-7 mb-10 w-full pl-6">
          <p className="text-xl text-white font-bold">ERP Industrial</p>
          <p className="text-sm text-erp-muted font-normal">
            Gerenciamento de Sistema
          </p>
        </header>
        <nav className="flex flex-col items-center w-full">
          {menuItems.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.to}
                className="w-full flex items-center justify-center"
                onClick={() => setOpenSideBar(false)}
              >
                {({ isActive }) => (
                  <OptionDashboard
                    title={item.label}
                    variant={item.id as variant}
                    active={isActive}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
