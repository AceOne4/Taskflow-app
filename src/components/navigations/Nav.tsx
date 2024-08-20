import { auth } from "@/utils/auth";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";

async function Nav() {
  const session = await auth();
  return <Navbar session={session} />;
}

export default Nav;
