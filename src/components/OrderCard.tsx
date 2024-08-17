import React, { Fragment } from "react";
import ParaTypo from "./common/ParaTypo";
import HeadingTypo from "./common/HeadingTypo";
import { MapPin, Trash, Truck } from "lucide-react";
import Button from "./common/Button";

const OrderCard = ({
  background,
  info,
  date,
  element
}: {
  background: string;
  info: any;
  date: string;
  element?:any
}) => {
  console.log(info);
  return (
    <>
      {info?.product?.map((ele: any, index: number) => {
        return (
          <Fragment key={index}>
            <div className="w-full relative text-xs sm:text-xl max-w-[600px] p-2 border-2 border-gray-300 rounded-md shadow-md">
              <div className="flex w-full items-center justify-between">
                <div>
                  <ParaTypo className="opacity-75 text-sm">Order ID</ParaTypo>
                  <HeadingTypo className="text-sm">#{info._id}</HeadingTypo>
                </div>
                <div>
                  <ParaTypo
                    className={`opacity-75 text-sm border-2 text-white  rounded-full px-2 py-1 bg-${background}-500`}
                  >
                    {element?._id === 'complete' ? `Arrived On ${date}` : element?._id === 'pending' ? `Estd.on ${date}` : `Cancelled On ${date}`}
                  </ParaTypo>
                </div>
              </div>
              <div className="flex justify-between border-gray-50o p-2 border-2 rounded-full my-2">
                <div className="flex items-center gap-x-2">
                  <Truck />
                  <span className="text-sm">Kalanki,Kathmandu</span>
                </div>
                <p>--------</p>
                <div className="flex items-center gap-x-2">
                  <MapPin />
                  <span className="capitalize text-sm">{`${info.deleveryAddress.city},${info.deleveryAddress.district}`}</span>
                </div>
              </div>
              <div className="flex h-[100px] items-center justify-around">
                <img className="w-[100px]" src={ele?.images?.[0]} alt="" />
                <div className="w-full max-w-[60%] ">
                  <HeadingTypo
                    title={ele.name}
                    className="text-base font-semibold w-full truncate"
                  >
                    {ele.name}
                  </HeadingTypo>
                  <ParaTypo className="opacity-80">Rs {ele.price}</ParaTypo>
                </div>
              </div>
              {ele.status == "pending" && (
                <Button className="bg-red-500 text-sm p-2 absolute left-[83%] top-[80%]">
                  Cancle Order
                </Button>
              )}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default OrderCard;
