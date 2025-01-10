import UserAvatar from "@/components/Avatar/UserAvatar";
import LogoDarkAndLight from "@/components/Main/Logos/LogoDarkAndLight";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

interface IMenuItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  href: string;
}

export default function Header({ user, session }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const menuItems: IMenuItem[] = [
    {
      id: 0,
      title: "خانه",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093l-.279-1.937c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22m-4.708-6.447a.75.75 0 0 1 1.049-.156c.728.54 1.607.853 2.553.853s1.825-.313 2.553-.853a.75.75 0 1 1 .894 1.205A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.155-1.049"
            clipRule="evenodd"
          />
        </svg>
      ),
      href: "/",
    },
    {
      id: 1,
      title: "پروفایل",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <circle cx={12} cy={6} r={4} fill="currentColor"></circle>
          <path
            fill="currentColor"
            d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
            opacity={0.5}
          ></path>
        </svg>
      ),
      href: "/profile",
    },
    {
      id: 2,
      title: "ایجاد فروشگاه",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 14.25a.75.75 0 0 1 .75.75v6.25H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h1.25V15a.75.75 0 0 1 1.5 0v6.25h12.5V15a.75.75 0 0 1 .75-.75"
            opacity={0.5}
          ></path>
          <path
            fill="currentColor"
            d="M16.528 2H7.472c-1.203 0-1.804 0-2.287.299c-.484.298-.753.836-1.29 1.912L2.49 7.76c-.324.82-.608 1.786-.062 2.479A2 2 0 0 0 6 9a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 3.571 1.238c.546-.693.262-1.659-.062-2.479l-1.404-3.548c-.537-1.076-.806-1.614-1.29-1.912C18.332 2 17.731 2 16.528 2"
          ></path>
        </svg>
      ),
      href: "/profile/create-shop",
    },
    {
      id: 3,
      title: "سفارشات ثبت شده",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12"
            opacity={0.5}
          ></path>
          <path
            fill="currentColor"
            d="M10.543 7.517a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM13 8.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5zm-2.457 6.267a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM13 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
          ></path>
        </svg>
      ),
      href: "/profile/register-orders",
    },
    {
      id: 4,
      title: "اشتراک",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m15.502 14.367l5.03-5.014c.724-.722 1.087-1.083 1.277-1.543C22 7.351 22 6.84 22 5.82v-.49c0-1.57 0-2.355-.49-2.843C21.022 2 20.235 2 18.659 2h-.489c-1.024 0-1.537 0-1.997.19s-.823.551-1.547 1.274l-5.03 5.014c-.846.844-1.371 1.367-1.574 1.873c-.064.16-.097.317-.097.483c0 .69.557 1.245 1.671 2.356l.15.149l1.754-1.78a.645.645 0 0 1 .919.906l-1.76 1.785l.119.117c1.114 1.11 1.67 1.666 2.362 1.666q.228 0 .447-.081c.519-.191 1.048-.72 1.916-1.585m2.363-5.888c-.652.65-1.71.65-2.363 0a1.66 1.66 0 0 1 0-2.356c.653-.65 1.71-.65 2.363 0s.653 1.705 0 2.356M2.774 12.481a.76.76 0 0 1 0 1.074l-.156.155a.34.34 0 0 0 0 .48a.34.34 0 0 0 .483 0l1.713-1.71a.76.76 0 0 1 1.072 1.075l-1.712 1.71a1.86 1.86 0 0 1-2.629 0a1.857 1.857 0 0 1 0-2.629l.156-.155a.76.76 0 0 1 1.073 0m4.523 4.215c.293.3.288.78-.012 1.073l-1.73 1.692a.759.759 0 0 1-1.061-1.085l1.73-1.692a.76.76 0 0 1 1.073.012m4.184 1.422a.76.76 0 0 1 0 1.074l-1.713 1.71a.34.34 0 0 0 0 .48c.134.133.35.133.484 0l.156-.155A.759.759 0 0 1 11.48 22.3l-.155.155a1.86 1.86 0 0 1-2.63 0a1.857 1.857 0 0 1 0-2.629l1.713-1.71a.76.76 0 0 1 1.073.001"
            clipRule="evenodd"
          ></path>
          <path
            fill="currentColor"
            d="M10.846 5.41L8.658 7.59c-.402.401-.77.769-1.062 1.101a5 5 0 0 0-.532.706l-.022-.021l-.08-.08a4.2 4.2 0 0 0-1.319-.865l-.106-.042l-.325-.13a.658.658 0 0 1-.223-1.077c.963-.96 2.12-2.114 2.679-2.346a2.9 2.9 0 0 1 1.537-.197c.47.07.915.311 1.641.77m3.736 11.484c.176.18.293.306.399.44q.21.268.373.567c.123.223.218.462.408.939c.155.388.67.491.968.193l.073-.072c.963-.96 2.12-2.114 2.353-2.67a2.9 2.9 0 0 0 .197-1.534c-.07-.468-.312-.912-.772-1.636l-2.195 2.189c-.411.41-.789.786-1.13 1.08a5 5 0 0 1-.674.504m-6.896-2.33a.759.759 0 1 0-1.073-1.073L4.47 15.632a.759.759 0 1 0 1.074 1.074zm2.809 2.806a.759.759 0 1 0-1.073-1.073l-2.128 2.127a.76.76 0 0 0 1.074 1.074z"
            opacity={0.5}
          ></path>
        </svg>
      ),
      href: "/profile/subscription",
    },
    {
      id: 5,
      title: "پشتیبانی",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M18 14a8 8 0 0 1-11.45 7.22a1.67 1.67 0 0 0-1.15-.13l-1.227.329a1.3 1.3 0 0 1-1.591-1.592L2.91 18.6a1.67 1.67 0 0 0-.13-1.15A8 8 0 1 1 18 14M6.5 15a1 1 0 1 0 0-2a1 1 0 0 0 0 2m3.5 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m3.5 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
            clipRule="evenodd"
          ></path>
          <path
            fill="currentColor"
            d="M17.984 14.508a6 6 0 0 0 .32-.142c.291-.14.622-.189.934-.105l.996.267a1.056 1.056 0 0 0 1.294-1.294l-.267-.996a1.36 1.36 0 0 1 .105-.935A6.5 6.5 0 1 0 9.492 6.016Q9.744 6 10 6a8 8 0 0 1 7.984 8.508"
            opacity={0.6}
          ></path>
        </svg>
      ),
      href: "/profile/tickets",
    },
    {
      id: 6,
      title: "پیام ها",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
            opacity={0.5}
          ></path>
          <path
            fill="currentColor"
            d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
          ></path>
        </svg>
      ),
      href: "/profile/notification",
    },
  ];

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
        <>
          <button className="block" onClick={onOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M20 7H4m16 5H4m16 5H4"
              />
            </svg>
          </button>
          <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xs">
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader className="flex items-center justify-center">
                    <Link href={"/"}>
                      <LogoDarkAndLight width={12} />
                    </Link>
                  </DrawerHeader>
                  <DrawerBody>
                    <div className="flex flex-col gap-y-4">
                      {menuItems.map((item: IMenuItem) => (
                        <Link
                          onClick={onClose}
                          key={item.id}
                          href={item.href}
                          className="flex items-center gap-x-2 text-lg bg-sky-100/50 dark:bg-primary/10 p-4 rounded-2xl hover:scale-105 transition-transform"
                        >
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </>
      </div>
    </>
  );
}
