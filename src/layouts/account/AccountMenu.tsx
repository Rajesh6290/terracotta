/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsHouseAdd } from "react-icons/bs";
import {
  MdExpandMore,
  MdNotificationsNone,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiCoupon4Line, RiLockPasswordLine } from "react-icons/ri";
import { BiLogOutCircle, BiWallet } from "react-icons/bi";
import { useRouter } from "next/router";
import { AiOutlineFolderAdd, AiOutlineFolderView } from "react-icons/ai";
import { use, useState } from "react";
import { PiHandCoins } from "react-icons/pi";
import useAppContext from "@/context";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import useMutation from "@/hooks/useMutation";

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const { isLogin, setIsLogin } = useAppContext();
  const router = useRouter();
  const { mutation, isLoading } = useMutation();

  const handleLogout = async () => {
    const res = await mutation("customer/update", {
      method: "PUT",
      isAlert: true,
      body: {
        isOnline: false,
      },
    });
    if (res?.status === 200) {
      router.push("/login");
      toast.success("Logout Successful");
      logout();
      setIsLogin(false);
    } else {
      toast.error(res?.results?.msg);
    }
  };

  const ACCOUNT_MENU_ARR = [
    {
      id: "1",
      title: "My Profile",
      path: "/my-account",
      icon: (
        <MdOutlineAccountCircle className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },
    {
      id: "2",
      title: "Manage Address",
      path: "/my-account/address",
      icon: (
        <BsHouseAdd className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },
    {
      id: "3",
      title: "My Orders",
      path: "/my-account/orders/",
      icon: (
        <HiOutlineShoppingBag className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },
    {
      id: "4",
      title: "My Coupons",
      path: "/my-account/coupons",
      icon: (
        <RiCoupon4Line className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },
    {
      id: "5",
      title: "My Wallet",
      path: "/my-account/wallet",
      icon: (
        <BiWallet className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },
    {
      id: "6",
      title: "My Referral Code",
      path: "/my-account/referral",
      icon: (
        <PiHandCoins className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },

    {
      id: "6",
      title: "Notifications",
      path: "/my-account/notifications",
      icon: (
        <MdNotificationsNone className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },
    {
      id: "7",
      title: "Change Password",
      path: "/my-account/change-password",
      icon: (
        <RiLockPasswordLine className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
    },
  ];

  const INFLUENCER_MENU_ARR = [
    {
      id: "1",
      title: "Add Product",
      icon: (
        <AiOutlineFolderAdd className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
      path: "/my-account/add-product",
    },
    {
      id: "2",
      title: "Manage Products",
      icon: (
        <AiOutlineFolderView className="text-2xl text-gray-500 mr-2 group-hover:text-primary" />
      ),
      path: "/my-account/view-products",
    },
  ];

  return (
    <aside className="lg:sticky lg:top-[96px] w-full lg:w-1/4 flex flex-col bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
      <div className="w-full flex items-center gap-5 border-b border-primary p-4 md:p-6">
        <img
          src={user?.image || "/favicon.png"}
          className="w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] rounded-full border"
        />
        <div className="tracking-wide  w-full overflow-hidden">
          <div className="font-semibold text-xl break-words">
            Hi {user?.name}
          </div>
          <p className="break-words">{user?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-3 md:p-4">
        {ACCOUNT_MENU_ARR.map((item) => (
          <Link href={item.path} key={item.id}>
            <p
              className={`group    flex items-center gap-1 rounded-md p-3  font-medium common-transition
            ${item.path === router.asPath
                  ? " bg-secondary/5"
                  : " hover:text-primary hover:bg-primary/5"
                }
            `}
            >
              {item.icon}
              {item.title}
            </p>
          </Link>
        ))}

        <div
          className="w-full border-y py-3 text-gray-800 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <p className="w-full capitalize font-semibold tracking-wide flex items-center justify-between">
            Become an influencer
            <MdExpandMore
              className={`text-2xl text-gray-800 common-transition ${open ? "" : " -rotate-90"
                }`}
            />
          </p>
          <div
            className={`animate-collapse grid common-transition ease-in-out ${open ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr] "
              }`}
          >
            <div className="overflow-hidden description text-sm md:text-base">
              {INFLUENCER_MENU_ARR.map((item) => (
                <Link href={item.path} key={item.id}>
                  <p className="group hover:text-primary flex items-center gap-1 rounded-md p-3 hover:bg-primary/5 font-medium common-transition">
                    {item.icon}
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p
          onClick={handleLogout}
          className="group hover:text-red-500 flex items-center gap-1 rounded-md p-3 hover:bg-red-500/5 font-medium cursor-pointer common-transition"
        >
          <BiLogOutCircle className="text-2xl text-gray-500 mr-2 group-hover:text-red-500" />
          Logout
        </p>
      </div>
    </aside>
  );
};

export default AccountMenu;
