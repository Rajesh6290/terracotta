
import CustomerRatings from "@/components/common/CustomerRating";
import ExpandTitle from "@/components/common/ExpandTitle";
import useSwr from "@/hooks/useSwr";
import { PublicLayout } from "@/layouts";
import { Dialog } from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import Link from "next/link";
import { Fragment, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { IoChevronForwardSharp } from "react-icons/io5";
import { MdStarBorder } from "react-icons/md";




const Orders = () => {
    const [ratingOpen, setRatingOpen] = useState(false);
    const [value, setValue] = useState<any>()
    const [orderId, setOrderId] = useState<string>("")
    const { data, isValidating, mutate } = useSwr(`order`, { revalidateOnFocus: true, })
    const AllOrders = data?.data?.data
    return (
        <PublicLayout>
            <RatingsModal open={ratingOpen} close={setRatingOpen} item={value} mutate={mutate} orderId={orderId} />
            <section className="bg-slate-50">
                <main className="main-container py-10">
                    <div className=" flex flex-col w-full gap-3 relative h-full  ">
                        <div className="flex gap-1 items-center p-1 text-xs text-gray-500 font-semibold font-sub ">
                            <Link
                                href="#"
                                className="flex items-center gap-1 hover:text-blue-500"
                            >
                                Home
                            </Link>
                            <IoChevronForwardSharp />
                            <Link
                                href={"/my-account"}
                                className="flex items-center gap-1 hover:text-blue-500"
                            >
                                My Account
                            </Link>
                            <IoChevronForwardSharp />
                            <p>My orders</p>
                        </div>

                        {AllOrders?.map((item: any, index: number) => {
                            return (
                                <motion.article
                                    layout
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index < 5 ? index * 0.5 : 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    viewport={{ once: true }}
                                    key={item._id}
                                    className="bg-white rounded-md shadow-[0px_0px_2px_1px_#00000024]  py-4 px-6 w-full h-full flex flex-col gap-5"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start gap-5 ">
                                        <p className="flex flex-col md:flex-row md:items-center items-start md:gap-6 gap-3">
                                            <span className="py-3 text-gray-800 px-5 bg-gray-200 rounded-2xl font-medium md:text-[1rem] text-sm">
                                                Order Id:{" "}
                                                <span className=" text-primary font-medium tracking-wider">
                                                    {item?.orderNo}
                                                </span>
                                            </span>
                                            <span className="text-gray-800  font-semibold">
                                                Order Placed: <span className=" text-sm"> {moment(item?.createdAt).format("lll")}</span>
                                            </span>
                                        </p>
                                        <Link
                                            href={`/my-account/orders/${item._id}`}
                                            className="flex items-center gap-2 bg-primary px-8 py-2  text-white font-medium rounded-md "
                                        >
                                            <BiCurrentLocation />
                                            <span className=" uppercase"> Track order</span>
                                        </Link>
                                    </div>
                                    <hr />
                                    <div className=" flex flex-col gap-5  lg:flex-row items-start justify-between w-full">
                                        <div className="lg:w-[50%] w-full flex flex-col gap-4">
                                            {
                                                item?.product?.map((pre: any) => (
                                                    <div key={pre?.id} className=" flex items-center gap-5  w-full">
                                                        <Link
                                                            href={`/products/${pre.id}`}
                                                            className="md:w-28 w-24 h-16 md:h-20 md:p-2 p-1 bg-slate-100 rounded-md shadow-[0px_0px_3px_1px_#00000024]"
                                                        >
                                                            <img
                                                                src={pre?.image}
                                                                className=" w-full h-full  object-contain"
                                                                alt=""
                                                            />
                                                        </Link>
                                                        <div className="flex flex-col gap-1">
                                                            <p
                                                                className=" font-semibold text-gray-800 md:text-[1.3rem] text-[1rem]"
                                                            >
                                                                {pre?.name}
                                                            </p>
                                                            <span className="md:text-sm text-xs text-gray-600">
                                                                <ExpandTitle limit={4} text={pre?.description} />
                                                            </span>
                                                            {
                                                                item?.orderStatus === "COMPLETED" &&

                                                                <span className="md:text-sm text-xs text-gray-600">
                                                                    <p className="flex items-center gap-0.5">
                                                                        {[...Array(5)].map((_, index) => (
                                                                            <Fragment key={index}>
                                                                                {pre?.star >= index + 1 ? (
                                                                                    <FaStar className=" text-amber-400 text-lg" />
                                                                                ) : (
                                                                                    <MdStarBorder fontSize="inherit" color="inherit" className="text-lg" />
                                                                                )}
                                                                            </Fragment>
                                                                        ))}
                                                                    </p>
                                                                </span>
                                                            }
                                                            <span className=" flex items-center md:gap-5 gap-2">
                                                                <p className="flex items-center gap-2 ">
                                                                    <span className=" font-normal text-gray-800 text-sm ">
                                                                        Category
                                                                    </span>
                                                                    <span className=" font-normal text-gray-800 text-xs">
                                                                        {pre?.category}
                                                                    </span>
                                                                </p>
                                                                <p className="w-[0.02rem] h-6 bg-black "></p>
                                                                <p>Qty: {pre?.quantity}</p>
                                                                <p className="w-[0.02rem] h-6 bg-black "></p>
                                                                <p className=" capitalize">Color : {pre?.color}</p>
                                                                <p className="w-[0.02rem] h-6 bg-black "></p>
                                                                <p className=" text-gray-800 font-semibold text-lg">
                                                                    Rs.{pre?.totalSalePrice}
                                                                </p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <span className="lg:w-[25%] w-full flex flex-col gap-1 ">
                                            <p className="text-[1.3rem] font-semibold text-gray-500 text-left">
                                                Status
                                            </p>
                                            <span className=" flex items-center gap-2">
                                                <p className=" p-1.5 rounded-full bg-green-500"></p>
                                                <p className=" text-gray-800 font-semibold text-left">
                                                    {item?.orderStatus}
                                                </p>
                                            </span>

                                            <p className=" text-gray-800  capitalize  text-left">
                                                Your items has been <span className=" capitalize">{item?.orderStatus}</span>
                                            </p>
                                            {
                                                item?.orderStatus === "COMPLETED" &&
                                                <p
                                                    onClick={() => {
                                                        setRatingOpen(!ratingOpen)
                                                        setValue(item?.product)
                                                        setOrderId(item?._id)
                                                    }}
                                                    className=" cursor-pointer flex items-center gap-2 text-blue-600 font-semibold"
                                                >
                                                    <AiOutlineStar />
                                                    <span>Review & Ratings</span>
                                                </p>
                                            }
                                        </span>
                                        <span className="flex flex-col lg:w-[20%] w-full lg:items-end ">
                                            <p className="text-gray-600 text-[1rem]">
                                                Delivery Expected By:
                                            </p>
                                            <p className=" text-gray-800 font-semibold text-xl">
                                                Not Available
                                            </p>
                                        </span>
                                    </div>
                                </motion.article>
                            );
                        })}


                    </div>
                </main>
            </section>
        </PublicLayout>
    );
};

export default Orders;

const RatingsModal = ({ open, close, item, mutate, orderId }: any) => {
    const [rating, setRating] = useState(false);
    const [productId, setProductId] = useState<string>("")
    return (
        <>
            <CustomerRatings open={rating} close={() => setRating(false)} productId={productId} mutate={mutate} orderId={orderId} />
            <Dialog open={open} maxWidth="lg" onClose={() => close(false)} PaperProps={{
                style: {
                    borderRadius: 18, // Adjust the value according to your preference
                },
            }}>
                <div className="w-[40rem] h-fit p-7 flex flex-col gap-5 items-center">
                    <p className=" font-semibold text-xl">Review And Ratings</p>
                    <div className="w-full flex flex-col gap-3">
                        {
                            item?.map((data: any) => (
                                <div key={data?.id} className="w-full flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img src={data?.image} className="w-16 h-16 rounded-xl object-fill" alt="" />
                                        <p className="flex flex-col">
                                            <span className="text-gray-900 font-semibold">{data?.name}</span>
                                            <span className="text-xs font-medium text-gray-600">{data?.category}</span>
                                            <span className="text-xs font-medium text-gray-600">{data?.description}</span>

                                        </p>
                                    </div>
                                    <p onClick={() => {
                                        setProductId(data?.id)
                                        setRating(true)
                                    }} className=" cursor-pointer text-sm px-4 py-1.5 rounded-lg bg-primary text-white font-medium">Give Rating</p>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </Dialog>
        </>
    )
}
