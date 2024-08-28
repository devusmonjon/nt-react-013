import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { useStateValue } from "@/context";

const Navbar = () => {
  const [state, dispatch] = useStateValue();
  return (
    <nav className="w-full py-4 sticky top-0">
      <div className="container flex justify-between items-center">
        <Link to={"/"} className="font-bold text-[28px]">
          LOGO
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link to={"/wishlist"} className="relative">
              <IoIosHeartEmpty size={25} />
              {state.wishlist.length > 0 ? (
                <span className="absolute -top-[5px] -right-[10px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-green-500 text-white">
                  {state.wishlist.length}
                </span>
              ) : null}
            </Link>
          </li>
          <li>
            {state.user?.accessToken ? (
              <button
                className="font-bold"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                LOGOUT
              </button>
            ) : (
              <Link to={"/login"} className="font-bold">
                LOGIN
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
