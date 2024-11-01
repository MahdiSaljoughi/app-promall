import Hamburger from "hamburger-react";
import UserAvatar from "@/components/Avatar/UserAvatar";

export default function Header({ isOpen, setOpen, user }) {
  return (
    <>
      <div className="flex items-center py-4 justify-between font-bold rounded-3xl mx-4 bg-[#f3f8fd] text-black drop-shadow-2xl shadow-xl shadow-black/10 ">
        <div className="inline-flex">
          <div className="flex flex-col justify-center mr-5">
            <UserAvatar userAcc={user.access_token} size={"w-8 h-8"} />
          </div>
          <div className="flex flex-col justify-center mr-3">
            <p className="text-md">وقت بخیر :{")"}</p>
            <p className="text-default-500 text-sm">فروشگاه ایران جردن</p>
          </div>
        </div>
        <div className="flex flex-col items-center ml-5 justify-center mb-1">
          <Hamburger
            toggled={isOpen}
            size={25}
            animateOnMount={true}
            toggle={setOpen}
            color="black"
            direction="right"
            hideOutline={true}
            rounded={true}
          />
        </div>
      </div>
    </>
  );
}
