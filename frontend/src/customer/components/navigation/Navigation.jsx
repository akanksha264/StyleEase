import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { navigation } from "./NavigationData";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../state/auth/Action";
import { API_BASE_URL } from "../../../config/ApiConfig";
import { getCart } from "../../../state/cart/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorE1, setAnchorE1] = useState(null);
  const openUserMenu = Boolean(anchorE1);
  const jwt = localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store);
  const dispatch=useDispatch();
  const location=useLocation();
  const {cart} = useSelector(store=>store);

  const handleUserClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorE1(null);
  };

  const handleOpen = () => {
    if(open) setOpen(false);
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    if (location.pathname.endsWith("/login") || location.pathname.endsWith("/register")){
      const updatedPath = location.pathname.replace(/\/(login|register)$/, '');
      navigate(updatedPath);
    }      
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close!==null && close();
    close===null && setOpen(false); 
  };

  useEffect(() => {
    if(jwt) {
      dispatch(getUser(jwt))
    }
  },[jwt,auth.jwt])

  useEffect(() => {
    
    if (auth.user) {
      handleClose();
      dispatch(getCart());
    }

  },[auth.user])

  const handleLogout=()=>{
    dispatch(logout());
    handleCloseUserMenu();
  }

  return (
    <div className="bg-white pb-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flex">
                                  <p
                                    onClick={() =>
                                      handleCategoryClick(
                                        category,
                                        section,
                                        item,
                                        null
                                      )
                                    }
                                    className="cursor-pointer hover:text-gray-800"
                                  >
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {auth.user?.firstName ? (
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar
                          className="text-white"
                          onClick={handleUserClick}
                          aria-controls={open ? "true" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          sx={{
                            bgcolor: "darkblue",
                            color: "white",
                            cursor: "pointer",  
                            width:28,
                            height:28                        
                          }}
                        >
                          {auth.user?.firstName[0].toUpperCase()}
                        </Avatar>
                        <p className="font-semibold">{auth.user?.firstName} {auth.user?.lastName}</p>
                      </div>
                      
                      <div className="ml-8">
                        <div className="p-2">
                          <div onClick={handleCloseUserMenu} className="cursor-pointer">
                            Profile
                          </div>
                        </div>

                        <div className="p-2">
                          <div onClick={() => {
                            navigate("/account/orders");
                            setOpen(false);
                            }} className="cursor-pointer">
                            My Orders
                          </div>
                        </div>

                        <div className="p-2">
                          <div onClick={handleLogout} className="cursor-pointer">
                            Logout
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : ( 
                  <div className="flow-root">
                    <p
                      onClick={handleOpen}
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    >
                      Sign in
                    </p>
                  </div>
                )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/" className="-m-2 flex items-center p-2">
                    <svg
                      class="w-12 h-12"
                      enable-background="new 0 0 512 512"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="256" cy="256" fill="#f0f0f0" r="256" />
                      <path
                        d="m256 0c-101.494 0-189.19 59.065-230.598 144.696h461.195c-41.407-85.631-129.104-144.696-230.597-144.696z"
                        fill="#ff9811"
                      />
                      <path
                        d="m256 512c101.493 0 189.19-59.065 230.598-144.696h-461.196c41.408 85.631 129.104 144.696 230.598 144.696z"
                        fill="#6da544"
                      />
                      <circle cx="256" cy="256" fill="#0052b4" r="89.043" />
                      <circle cx="256" cy="256" fill="#f0f0f0" r="55.652" />
                      <path
                        d="m256 187.326 17.169 38.938 42.304-4.601-25.136 34.337 25.136 34.337-42.304-4.601-17.169 38.938-17.169-38.938-42.304 4.6 25.136-34.336-25.136-34.337 42.304 4.601z"
                        fill="#0052b4"
                      />
                    </svg>
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      IND
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-purple-200"  sx={{bgcolor:"#E6D5F7"}}>
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹499
        </p>

        <nav
          aria-label="Top"
          className="mx-auto px-4"          
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <div onClick={() => navigate("/")} className="cursor-pointer">
                  <span className="sr-only">StyleEase</span>
                  <img
                    className="h-12 w-auto"
                    src="https://drive.google.com/uc?export=view&id=1rCKQ-YSxdYDhpHxCUpBroW9xZr6L2dOi"
                    alt=""
                    height="20px"
                  />
                </div>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "true" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: "darkblue",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorE1}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          Profile
                        </MenuItem>

                        <MenuItem onClick={() => navigate("/account/orders")}>
                          My Orders
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign In
                    </Button>
                  )}
                </div>

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div> */}

                {/* Cart */}
                {auth.user!==null && <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => navigate(`/cart`)}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.cart?.totalItems}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal}/>

    </div>
  );
}
