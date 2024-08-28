import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { useStateValue } from "@/context";
import { useEffect, useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const Navbar = () => {
  const [state, dispatch] = useStateValue();
  const [items, setItems] = useState(null);

  useEffect(() => {
    console.log(state.user?.data);

    if (state.user?.data) {
      setItems([
        {
          key: "1",
          label: (
            <h1>
              {state.user.data.first_name} {state.user.data.last_name}
            </h1>
          ),
        },
        {
          key: "2",
          label: (
            <button onClick={() => dispatch({ type: "LOGOUT" })}>LOGOUT</button>
          ),
        },
      ]);
    }
  }, [state.user]);
  console.log(items);

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
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <img
                      width={50}
                      height={50}
                      className="object-cover rounded-full h-[50px] w-[50px] object-center"
                      src={state.user?.data.profile_photo}
                      alt={state.user?.data.first_name}
                    />
                  </Space>
                </a>
              </Dropdown>
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
