import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "@/context";
import { data } from "autoprefixer";
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigete = useNavigate();
  const [state, dispatch] = useStateValue();
  const [file, setFile] = useState();
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
  const handleRegister = (values) => {
    // setLoading(true);
    let formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("profile_photo", file);
    formData.append("password", values.password);
    console.log(formData);

    axios
      .post("https://proxy-tau-one.vercel.app/api/v1/auth/register/", formData)
      .then((res) => {
        // navigete("/");
        if (res.data.success) {
          messageApi.success(res.data.message);
          messageApi.success("We're redirect yo to homepage in 3 seconds");
          dispatch({
            type: "LOGIN",
            payload: {
              accessToken: res.data.data.tokens.access,
              refreshToken: res.data.data.tokens.refresh,
              data: res.data.data.user,
            },
          });
          setTimeout(() => {
            navigete("/");
          }, 3000);
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
          onFinish={handleRegister}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "First Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Last Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Profile photo"
            name="profile_photo"
            rules={[
              {
                required: true,
                message: "Profile photo!",
              },
            ]}
          >
            <Input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
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
        <Link to={"/login"}>Already have account?</Link>
      </div>
    </div>
  );
};
export default Login;
