import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RelativeMenu() {
  const pathname = usePathname();

  const icons = [
    {
      name: "shop",
      route: "/shop",
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3.778 3.655c-.181.36-.27.806-.448 1.696l-.598 2.99a3.06 3.06 0 1 0 6.043.904l.07-.69a3.167 3.167 0 1 0 6.307-.038l.073.728a3.06 3.06 0 1 0 6.043-.904l-.598-2.99c-.178-.89-.267-1.335-.448-1.696a3 3 0 0 0-1.888-1.548C17.944 2 17.49 2 16.582 2H7.418c-.908 0-1.362 0-1.752.107a3 3 0 0 0-1.888 1.548M18.269 13.5a4.53 4.53 0 0 0 2.231-.581V14c0 3.771 0 5.657-1.172 6.828c-.943.944-2.348 1.127-4.828 1.163V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C13.402 16 12.935 16 12 16s-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549c-.201.348-.201.815-.201 1.75v3.491c-2.48-.036-3.885-.22-4.828-1.163C3.5 19.657 3.5 17.771 3.5 14v-1.081a4.53 4.53 0 0 0 2.232.581a4.55 4.55 0 0 0 3.112-1.228A4.64 4.64 0 0 0 12 13.5a4.64 4.64 0 0 0 3.156-1.228a4.55 4.55 0 0 0 3.112 1.228"
          />
        </svg>
      ),
      outlinedIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M7.307 1.25c-.801 0-1.35 0-1.84.133a3.75 3.75 0 0 0-2.36 1.936c-.227.452-.334.991-.491 1.777l-.62 3.098a3.79 3.79 0 0 0 .754 3.117v2.745c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.748.748 1.697 1.08 2.87 1.238c1.139.153 2.595.153 4.432.153h1.113c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.748-.749 1.08-1.698 1.238-2.87c.153-1.14.153-2.595.153-4.433v-2.744a3.79 3.79 0 0 0 .753-3.118l-.62-3.098c-.156-.786-.264-1.325-.49-1.777a3.75 3.75 0 0 0-2.361-1.936c-.489-.133-1.038-.133-1.84-.133zm10.961 11.5a3.8 3.8 0 0 0 1.482-.298V14c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.01.812a16 16 0 0 1-1.538.114v-2.756c0-.44 0-.82-.028-1.13c-.03-.33-.096-.656-.274-.963a2.25 2.25 0 0 0-.823-.824c-.307-.177-.633-.243-.963-.273c-.31-.028-.69-.028-1.13-.028h-.065c-.44 0-.819 0-1.13.028c-.33.03-.655.096-.962.273a2.25 2.25 0 0 0-.824.824c-.177.307-.243.633-.273.962c-.028.312-.028.691-.028 1.13v2.757a16 16 0 0 1-1.54-.114c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.139-1.027-.14-2.382-.14-4.289v-1.548a3.81 3.81 0 0 0 4.588-1.306A3.9 3.9 0 0 0 12 12.75a3.9 3.9 0 0 0 3.162-1.604a3.8 3.8 0 0 0 3.106 1.604m-8.018 8.498q.582.002 1.25.002h1q.668 0 1.25-.002V18.5c0-.481-.001-.792-.022-1.027c-.02-.225-.055-.307-.079-.348a.75.75 0 0 0-.274-.274c-.041-.024-.123-.058-.348-.079A13 13 0 0 0 12 16.75c-.481 0-.792 0-1.027.022c-.226.02-.307.055-.348.079a.75.75 0 0 0-.275.274c-.023.04-.058.123-.078.348c-.021.235-.022.546-.022 1.027zM8.67 2.75H7.418c-.954 0-1.285.007-1.553.08a2.25 2.25 0 0 0-1.416 1.161c-.125.249-.196.571-.383 1.507l-.598 2.99a2.31 2.31 0 1 0 4.562.683l.069-.686l.004-.042zm.921 5.875l.588-5.875h3.642l.584 5.842a2.417 2.417 0 1 1-4.814.033m8.544-5.795c-.268-.073-.599-.08-1.553-.08h-1.254l.643 6.42a2.309 2.309 0 1 0 4.561-.682l-.597-2.99c-.188-.936-.259-1.258-.383-1.507a2.25 2.25 0 0 0-1.417-1.161"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "category",
      route: "/categories",
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 17.5A4.5 4.5 0 0 1 6.5 13h2.7c.63 0 .945 0 1.186.123c.211.107.384.28.491.491c.123.24.123.556.123 1.186v2.7a4.5 4.5 0 1 1-9 0m11-11a4.5 4.5 0 1 1 4.5 4.5h-3.214c-.15 0-.224 0-.287-.007a1.125 1.125 0 0 1-.992-.992C13 9.938 13 9.864 13 9.714z"
          />
          <path
            fill="currentColor"
            d="M2 6.5a4.5 4.5 0 0 1 9 0v3c0 .349 0 .523-.038.666a1.13 1.13 0 0 1-.796.796C10.023 11 9.85 11 9.5 11h-3A4.5 4.5 0 0 1 2 6.5m11 8c0-.349 0-.523.038-.666c.104-.388.408-.692.796-.796c.143-.038.317-.038.666-.038h3a4.5 4.5 0 1 1-4.5 4.5z"
            opacity="0.5"
          />
        </svg>
      ),
      outlinedIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M2.5 6.5a4 4 0 1 1 8 0v2.667c0 .31 0 .465-.034.592a1 1 0 0 1-.707.707c-.127.034-.282.034-.592.034H6.5a4 4 0 0 1-4-4Zm11 8.333c0-.31 0-.465.034-.592a1 1 0 0 1 .707-.707c.127-.034.282-.034.592-.034H17.5a4 4 0 1 1-4 4zM2.5 17.5a4 4 0 0 1 4-4h2.4c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437c.109.214.109.494.109 1.054v2.4a4 4 0 0 1-8 0Zm11-11a4 4 0 1 1 4 4h-2.857c-.133 0-.2 0-.255-.006a1 1 0 0 1-.882-.882c-.006-.056-.006-.122-.006-.255z"
          />
        </svg>
      ),
    },
    {
      name: "package-check",
      route: "/package-check",
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m17.578 4.432l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-2 1.05c-1.773.93-2.816 1.478-3.462 2.21l9.04 4.52l9.04-4.52c-.646-.732-1.688-1.28-3.462-2.21m4.17 3.532l-8.998 4.5v9.44c.718-.179 1.535-.607 2.828-1.286l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-1.893 0-3.076-.252-3.978M11.25 21.904v-9.44l-8.998-4.5C2 8.866 2 10.05 2 11.941v.117c0 2.525 0 3.788.597 4.802c.598 1.015 1.674 1.58 3.825 2.709l2 1.049c1.293.679 2.11 1.107 2.828 1.286"
          />
        </svg>
      ),
      outlinedIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 1.25c-.605 0-1.162.15-1.771.402c-.589.244-1.273.603-2.124 1.05L6.037 3.787c-1.045.548-1.88.987-2.527 1.418c-.668.447-1.184.917-1.559 1.554c-.374.635-.542 1.323-.623 2.142c-.078.795-.078 1.772-.078 3.002v.194c0 1.23 0 2.207.078 3.002c.081.82.25 1.507.623 2.142c.375.637.89 1.107 1.56 1.554c.645.431 1.481.87 2.526 1.418l2.068 1.085c.851.447 1.535.806 2.124 1.05c.61.252 1.166.402 1.771.402s1.162-.15 1.771-.402c.589-.244 1.273-.603 2.124-1.05l2.068-1.084c1.045-.549 1.88-.988 2.526-1.419c.67-.447 1.185-.917 1.56-1.554c.374-.635.542-1.323.623-2.142c.078-.795.078-1.772.078-3.001v-.196c0-1.229 0-2.206-.078-3.001c-.081-.82-.25-1.507-.623-2.142c-.375-.637-.89-1.107-1.56-1.554c-.645-.431-1.481-.87-2.526-1.418l-2.068-1.085c-.851-.447-1.535-.806-2.124-1.05c-.61-.252-1.166-.402-1.771-.402M8.77 4.046c.89-.467 1.514-.793 2.032-1.007c.504-.209.859-.289 1.198-.289c.34 0 .694.08 1.198.289c.518.214 1.141.54 2.031 1.007l2 1.05c1.09.571 1.855.974 2.428 1.356c.282.189.503.364.683.54L12 11.162l-8.34-4.17c.18-.176.401-.351.684-.54c.572-.382 1.337-.785 2.427-1.356zM2.939 8.307c-.05.214-.089.457-.117.74c-.07.714-.071 1.617-.071 2.894v.117c0 1.278 0 2.181.071 2.894c.069.697.2 1.148.423 1.528c.222.377.543.696 1.1 1.068c.572.382 1.337.785 2.427 1.356l2 1.05c.89.467 1.513.793 2.031 1.007q.244.101.448.165v-8.663zm9.812 12.818q.204-.063.448-.164c.518-.214 1.141-.54 2.031-1.007l2-1.05c1.09-.572 1.855-.974 2.428-1.356c.556-.372.877-.691 1.1-1.068c.223-.38.353-.83.422-1.528c.07-.713.071-1.616.071-2.893v-.117c0-1.278 0-2.181-.071-2.894a6 6 0 0 0-.117-.74l-8.312 4.156z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "home",
      route: "/",
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212S22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381c-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2s-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823m6.927 7.575a.75.75 0 1 0-.894 1.204A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.148a.75.75 0 1 0-.894-1.204A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.852"
            clipRule="evenodd"
          />
        </svg>
      ),
      outlinedIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.447 15.397a.75.75 0 1 0-.894 1.205A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.148a.75.75 0 1 0-.893-1.205A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.853"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 1.25c-.725 0-1.387.2-2.11.537c-.702.327-1.512.81-2.528 1.415l-1.456.867c-1.119.667-2.01 1.198-2.686 1.706C2.523 6.3 2 6.84 1.66 7.551c-.342.711-.434 1.456-.405 2.325c.029.841.176 1.864.36 3.146l.293 2.032c.237 1.65.426 2.959.707 3.978c.29 1.05.702 1.885 1.445 2.524c.742.64 1.63.925 2.716 1.062c1.056.132 2.387.132 4.066.132h2.316c1.68 0 3.01 0 4.066-.132c1.086-.137 1.974-.422 2.716-1.061c.743-.64 1.155-1.474 1.445-2.525c.281-1.02.47-2.328.707-3.978l.292-2.032c.185-1.282.332-2.305.36-3.146c.03-.87-.062-1.614-.403-2.325S21.477 6.3 20.78 5.775c-.675-.508-1.567-1.039-2.686-1.706l-1.456-.867c-1.016-.605-1.826-1.088-2.527-1.415c-.724-.338-1.386-.537-2.111-.537M8.096 4.511c1.057-.63 1.803-1.073 2.428-1.365c.609-.284 1.047-.396 1.476-.396s.867.112 1.476.396c.625.292 1.37.735 2.428 1.365l1.385.825c1.165.694 1.986 1.184 2.59 1.638c.587.443.91.809 1.11 1.225c.199.416.282.894.257 1.626c-.026.75-.16 1.691-.352 3.026l-.28 1.937c-.246 1.714-.422 2.928-.675 3.845c-.247.896-.545 1.415-.977 1.787c-.433.373-.994.593-1.925.71c-.951.119-2.188.12-3.93.12h-2.213c-1.743 0-2.98-.001-3.931-.12c-.93-.117-1.492-.337-1.925-.71c-.432-.372-.73-.891-.977-1.787c-.253-.917-.43-2.131-.676-3.845l-.279-1.937c-.192-1.335-.326-2.277-.352-3.026c-.025-.732.058-1.21.258-1.626s.521-.782 1.11-1.225c.603-.454 1.424-.944 2.589-1.638z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <menu>
        <div className="fixed inset-x-0 bottom-4 mx-4 p-4 z-20 bg-black/[0.2] backdrop-blur-3xl rounded-full ring-8 ring-black/5 brightness-150 shadow-[0px_0px_46px_2px_#000000] md:max-w-96 md:mx-auto">
          <div className="relative flex justify-around items-center">
            {icons.map((icon, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-white cursor-pointer"
                whileTap={{ scale: 0.9 }}
                animate={{
                  opacity: pathname === icon.route ? 1 : 0.5,
                  scale: pathname === icon.route ? 1.2 : 0.9,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={icon.route}>
                  {pathname === icon.route
                    ? icon.filledIcon
                    : icon.outlinedIcon}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </menu>
    </>
  );
}