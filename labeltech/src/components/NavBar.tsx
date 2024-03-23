import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
 
const StickyNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black">
    <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        placeholder=""
    >
        <a href="/admin/productManagement" className="flex items-center">
        Product Managment
        </a>
    </Typography>
      <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal" placeholder={undefined}      >
        <a href="/admin/productionLineManagement" className="flex items-center">
            Production Line Management
        </a>
      </Typography>
      <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal" placeholder={undefined}      >
        <a href="/admin/userManagement" className="flex items-center">
            User Management
        </a>
      </Typography>
      <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal" placeholder={undefined}      >
        <a href="/admin/customerManagement" className="flex items-center">
            Customer Management
        </a>
      </Typography>
      <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal" placeholder={undefined}      >
        <a href="/admin/labelErrorHistory" className="flex items-center">
            Label Error History
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <div className="max-h-[768px] w-[calc(100%)]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" placeholder={undefined}>
        <div className="flex items-center justify-between text-blue-gray-900">
            <div className="flex space-x-4 items-center">
                <img src="../utils/images/Logo_lablelTech.png" alt="logo labeltech" className="w-12 h-" />
                <Typography
                            as="a"
                            href="#"
                            className="mr-4 cursor-pointer py-1.5 font-medium text-black" placeholder={undefined}          >
                    LabelTech
                </Typography>
            </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
                <a href="/">
              <Button
                              variant="gradient"
                              size="sm"
                              className="hidden lg:inline-block bg-blue-500 hover:bg-blue-700" placeholder={undefined}              >
                <span>Log Out</span>
              </Button>
                </a>
            </div>
            <div style={{ color: 'black' }}>
            <IconButton
                          variant="text"
                          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden flex"
                          ripple={false}
                          onClick={() => setOpenNav(!openNav)} placeholder={undefined}            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            </div>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <a href="/">
            <Button fullWidth variant="gradient" size="sm" className="bg-blue-500 hover:bg-blue-700" placeholder={undefined}>
              <span>Log Out</span>
            </Button>
            </a>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default StickyNavbar;
