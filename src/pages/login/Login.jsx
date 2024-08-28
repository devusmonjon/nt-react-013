import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "@/context";
import { data } from "autoprefixer";
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigete = useNavigate();
  const [state, dispatch] = useStateValue();
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
            navigete("/");
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
  const handleLogin = (values) => {
    setLoading(true);
    axios
      .post("https://proxy-tau-one.vercel.app/api/v1/auth/login/", values)
      .then((res) => {
        // navigete("/");
        if (res.data.success) {
          messageApi.success(res.data.message);
          const tokens = {
            accessToken: res.data.data.access,
            refreshToekn: res.data.data.refresh,
          };

          axios
            .get("https://proxy-tau-one.vercel.app/api/v1/user/", {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            })
            .then((res) => {
              if (res.data.success) {
                dispatch({
                  type: "LOGIN",
                  payload: {
                    ...tokens,
                    data: res.data.data,
                  },
                });
                navigete("/");
              } else {
                dispatch({ type: "LOGOUT" });
                messageApi.error(res.data.message);
              }
            });
        } else {
          messageApi.error(res.data.message);
        }
        console.log(res);
      })
      .catch((err) => {
        messageApi.error("username or password in incorrect!");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {contextHolder}
      <div className=" w-[400px]">
        <h3 className="text-center text-3xl mb-3">Login</h3>
        <Form
          className=""
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Ism kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              disabled={loading}
              className="w-full"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <ul className="list-disc">
          <li>Login: testuser</li>
          <li>password: testuser</li>
        </ul>
      </div>
    </div>
  );
};
export default Login;
