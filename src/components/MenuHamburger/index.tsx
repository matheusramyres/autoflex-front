import clsx from 'clsx';
import { Menu, X } from 'lucide-react';

interface MenuProps {
  openSideBar: boolean;
  setOpenSideBar: (value: boolean) => void;
}

export const MenuHamburger = ({ openSideBar, setOpenSideBar }: MenuProps) => {
  const handleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <>
      <div
        onClick={handleSideBar}
        className={clsx(
          'fixed right-0 left-0 top-0 bg-[#181b268a]',
          openSideBar ? 'min-h-screen' : 'min-h-0',
        )}
      >
        <div
          className={clsx(
            ' w-full p-2.5 flex md:hidden',
            'bg-erp-main border-b border-erp-subtle',
            openSideBar ? 'justify-end' : 'justify-start',
          )}
        >
          <button className="flex flex-col" onClick={handleSideBar}>
            {openSideBar ? <X size={48} /> : <Menu size={48} />}
          </button>
        </div>
      </div>
    </>
  );
};
