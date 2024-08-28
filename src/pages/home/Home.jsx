import Products from "@/components/products";
import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";
import { Pagination, Button, message, Popconfirm } from "antd";
const Home = () => {
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading } = useFetch(
    "/products",
    {
      limit,
      skip: (skip - 1) * limit,
    },
    [skip, limit]
  );
  const handlChange = (current, pageSize) => {
    message.success("Malumot qoshildi ");
    setLimit(pageSize);
    setSkip(current);
  };
  return (
    <div className=" mb-7">
      {<Products data={data?.products} loading={loading} />}
      <Pagination
        current={skip}
        onChange={handlChange}
        className="mt-5"
        align="center"
        defaultCurrent={1}
        defaultPageSize={limit}
        total={data?.total}
      />
    </div>
  );
};

export default Home;
