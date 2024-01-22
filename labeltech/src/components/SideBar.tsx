import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ChartBarIcon,
    FolderIcon
  } from "@heroicons/react/24/solid";

const SideBar = () => {
  return (
    <Card className="h-screen w-full max-w-[21rem] p-4 fixed">
      <div className="mb-2 p-4 flex">
        <img src="../utils/images/Logo_lablelTech.png" alt="logo labeltech" className="w-12 h-" />
        <Typography variant="h5" color="blue-gray" className="flex items-center pl-4">
          LabelTech
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix className="pr-2">
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <a href="/admin/productManagement">
          <ListItem>
            <ListItemPrefix className="pr-2">
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Product Managment
          </ListItem>
        </a>
        <a href="/admin/productionLineManagement">
        <ListItem>
          <ListItemPrefix className="pr-2">
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
         Production Line Management
        </ListItem>
        </a>
        <a href="/admin/userManagement">
        <ListItem>
          <ListItemPrefix className="pr-2">
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          User Management
        </ListItem>
        </a>
        <a href="/admin/labelErrorHistory">
        <ListItem>
          <ListItemPrefix className="pr-2">
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Label Error History
        </ListItem>
        </a>
        <a href="/admin/statistics">
        <ListItem>
          <ListItemPrefix className="pr-2">
            <ChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Statistics
        </ListItem>
        </a>
        <ListItem>
          <ListItemPrefix className="pr-2">
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix className="pr-2">
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
  }

export default SideBar;
