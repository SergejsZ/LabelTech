import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    ShoppingBagIcon,
    UserCircleIcon,
    InboxIcon,
    PowerIcon,
    FolderIcon
  } from "@heroicons/react/24/solid";

const SideBar = () => {
  return (
    <Card className="h-screen w-full max-w-[21rem] p-4 fixed" placeholder={undefined}>
      <div className="mb-2 p-4 flex">
        <img src="../utils/images/Logo_lablelTech.png" alt="logo labeltech" className="w-12 h-" />
        <Typography variant="h5" color="blue-gray" className="flex items-center pl-4" placeholder={undefined}>
          LabelTech
        </Typography>
      </div>
      <List placeholder={undefined}>
        <a href="/admin/productManagement">
          <ListItem placeholder={undefined}>
            <ListItemPrefix className="pr-2" placeholder={undefined}>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Product Managment
          </ListItem>
        </a>
        <a href="/admin/productionLineManagement">
        <ListItem placeholder={undefined}>
          <ListItemPrefix className="pr-2" placeholder={undefined}>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
         Production Line Management
        </ListItem>
        </a>
        <a href="/admin/userManagement">
        <ListItem placeholder={undefined}>
          <ListItemPrefix className="pr-2"  placeholder={undefined}>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          User Management
        </ListItem>
        </a>
        <a href="/admin/labelErrorHistory">
        <ListItem placeholder={undefined}>
          <ListItemPrefix className="pr-2"  placeholder={undefined}>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Label Error History
        </ListItem>
        </a>      
      </List>
      <List className="mt-auto" placeholder={undefined}>
      <a href="/">
        <ListItem placeholder={undefined}>
          <ListItemPrefix className="pr-2"  placeholder={undefined}>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
        </a>
      </List>
    </Card>
  );
  }

export default SideBar;
