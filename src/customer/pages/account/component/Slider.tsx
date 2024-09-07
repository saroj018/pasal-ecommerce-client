import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Button from "../../../../components/common/Button";
import ProductCard from "../../../../components/ProductCard";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const Slider = ({ productList }: { productList: any[] }) => {
  console.log("log>>", productList);

  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        <section className="flex flex-col items-center mt-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-x-3 ">
            {productList &&
              productList?.map((ele: any) => {
                return (
                  <SwiperSlide>
                    <ProductCard key={ele._id} product={ele} />
                  </SwiperSlide>
                );
              })}
          </div>
        </section>
      </Swiper>
      <Link to={"/allproducts"} className="flex justify-center">
        <Button className="bg-red-500 w-fit text-white mt-6 px-6 py-2">
          View All Products
        </Button>
      </Link>
    </>
  );
};

export default Slider;
