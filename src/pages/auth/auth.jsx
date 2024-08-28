import { useStateValue } from "@/context";
import { message } from "antd";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [messageApi, contextHolder] = message.useMessage();

  let [state, dispatch] = useStateValue();
  useEffect(() => {
    if (state.user?.accessToken) {
      axios
        .get("https://proxy-tau-one.vercel.app/api/v1/user/", {
          headers: {
            Authorization: `Bearer ${state.user?.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            messageApi.success("Welcome");
          } else {
            dispatch({ type: "LOGOUT" });
            messageApi.error(res.data.message);
          }
        })
        .catch((err) => {
          dispatch({ type: "LOGOUT" });
          messageApi.error(err.message);
          console.log(err);
        });
    }
  });
  return state.user?.accessToken ? (
    <>
      {contextHolder}
      <Outlet />
    </>
  ) : (
    <Navigate replace to={"/login"} />
  );
};

export default Auth;
