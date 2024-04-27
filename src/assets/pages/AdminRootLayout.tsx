import { LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function AdminRootLayout() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div>
      <div className=" w-full ">
        <header className="max-w-[580px] md:max-w-[680px] m-auto mt-6 bg-white p-3 rounded text-black">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-base">
              <div className="relative group">
                <NavLink to="/">Home</NavLink>
                <span className="absolute -bottom-[2px] left-1/2 w-0 h-[2px] bg-red-500 group-hover:w-1/2 group-hover:transition-all"></span>
                <span className="absolute -bottom-[2px] right-1/2 w-0 h-[2px] bg-red-500 group-hover:w-1/2 group-hover:transition-all"></span>
              </div>
              <div className="relative group">
                <NavLink to="/admin">Links</NavLink>
                <span className="absolute -bottom-[2px] left-1/2 w-0 h-[2px] bg-red-500 group-hover:w-1/2 group-hover:transition-all"></span>
                <span className="absolute -bottom-[2px] right-1/2 w-0 h-[2px] bg-red-500 group-hover:w-1/2 group-hover:transition-all"></span>
              </div>
              <div className="relative group">
                <NavLink to="/admin/social">Redes Sociais</NavLink>
                <span className="absolute -bottom-[2px] left-1/2 w-0 h-[2px] bg-red-500 group-hover:w-1/2 group-hover:transition-all"></span>
                <span className="absolute -bottom-[2px] right-1/2 w-0 h-[2px] bg-red-500 group-hover:w-1/2 group-hover:transition-all"></span>
              </div>
            </div>
            <div className=" cursor-pointer " onClick={handleLogout}>
              <LogOut color="#bd0000" strokeWidth={1.25} />
            </div>
          </nav>
        </header>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
