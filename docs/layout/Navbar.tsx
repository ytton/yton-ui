import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/home" className="flex items-center flex-shrink-0 cursor-pointer">
                <img className="w-8 h-8" src="/yton-ui/logo.png"  alt="Yton UI Logo" />
                <span className="ml-2 text-xl font-semibold text-blue-500 ">YTON UI</span>
              </Link>
              <div className="flex items-center ml-6">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Icon icon="mdi:search" className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="搜索"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <NavLink
                to="/intro"
                className={({ isActive }) => clsx('text-gray-500 hover:text-gray-700 flex items-center px-3 py-2 rounded-md text-sm font-medium', isActive ? '!text-blue-500' : '')}
              >
                <Icon icon="mdi:document" className="inline-block w-5 h-5 mr-1" />
                文档
              </NavLink>
              <NavLink
                to="/components"
                className={({ isActive }) => clsx('text-gray-500 hover:text-gray-700 flex items-center px-3 py-2 rounded-md text-sm font-medium', isActive ? '!text-blue-500' : '')}
              >
                <Icon icon="mdi:puzzle" className="inline-block w-5 h-5 mr-1" />
                组件
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar