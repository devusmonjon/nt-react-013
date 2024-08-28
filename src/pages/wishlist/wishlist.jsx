import Empty from "@/components/empty/empty";
import Products from "@/components/products";
import { useStateValue } from "@/context";

const Wishlist = () => {
  const [data, dispatch] = useStateValue();
  console.log(data);
  return (
    <div>
      {data.wishlist.length ? (
        <Products data={data?.wishlist} />
      ) : (
        <Empty
          url="https://www.lifestone.in/assets/front/images/icons/empty-wishlist.svg"
          title="Sevimlilar Bo'sh !"
        />
      )}
    </div>
  );
};

export default Wishlist;
