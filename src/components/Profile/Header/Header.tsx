import UserAvatar from "@/components/Avatar/UserAvatar";
import Hamburger from "hamburger-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

interface NavbarProps {
  isOpen?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  user?: any;
}

export default function Header({ isOpen, setOpen, user }: NavbarProps) {
  const { data: session } = useSession();

  return (
    <>
      <div className="z-50 flex items-center font-bold justify-between rounded-3xl drop-shadow-2xl sha dow-xl shadow-black/10 p-4">
        <div className="flex items-center gap-x-2 text-sm">
          <UserAvatar size={"w-8 h-8"} userAcc={session?.user.access_token} />
          <div className="flex items-center gap-x-1">
            <span className="block">{user?.first_name}</span>
            <span className="block">خوش اومدی :{")"}</span>
          </div>
        </div>

        <div className="-ml-2">
          <Hamburger
            toggled={isOpen}
            size={24}
            animateOnMount={true}
            toggle={setOpen}
            direction="right"
            hideOutline={true}
            rounded={true}
          />
        </div>
      </div>
    </>
  );
}
