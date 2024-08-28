import React from "react";
import { Skeleton, Card } from "antd";
const Skeletons = ({ limit = 10 }) => {
  return (
    <div className=" container mx-auto mt-7 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {new Array(limit).fill().map((_, inx) => (
        <Card key={inx}>
          <Skeleton />
        </Card>
      ))}
    </div>
  );
};

export default Skeletons;
