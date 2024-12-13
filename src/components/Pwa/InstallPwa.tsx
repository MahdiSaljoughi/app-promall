"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string[];
  }>;
}

export default function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("PWA نصب شد!");
    } else {
      console.log("کاربر نصب را رد کرد.");
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <>
      {isInstallable && (
        <div className="bg-sky-50 dark:bg-zinc-900 p-4 rounded-2xl flex flex-col gap-y-4 md:flex-row items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                className="text-primary"
              >
                <path
                  fill="currentColor"
                  d="M20 9.801v4.067c0 3.833 0 5.75-1.172 6.941S15.771 22 12 22s-5.657 0-6.828-1.191C4 19.619 4 17.701 4 13.868V9.8c0-3.833 0-5.75 1.172-6.94c.375-.383.825-.642 1.386-.819c.353-.11.728.047.942.35l.154.236c.634.97.855 1.307 1.368 1.631q.165.105.342.186c.591.274 1.273.274 2.636.274s2.044 0 2.636-.274q.177-.081.342-.186c.513-.324.734-.662 1.368-1.631l.154-.235c.2-.305.564-.467.91-.36c.577.176 1.036.438 1.418.827C20 4.051 20 5.968 20 9.801"
                  opacity={0.5}
                ></path>
                <path
                  fill="currentColor"
                  d="M8.25 18.984c0-.417.336-.755.75-.755h6c.414 0 .75.338.75.755a.75.75 0 0 1-.75.754H9a.75.75 0 0 1-.75-.754"
                ></path>
              </svg>
            </div>
            <p className="text-center leading-7">
              برای نصب نسخه PWA پرومال روی دکمه نصب کلیک کنید.
            </p>
          </div>
          <Button
            onPress={handleInstallClick}
            className="flex items-center gap-x-2"
            color="primary"
          >
            <span>نصب وب اپلیکیشن</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
              className="animate-bounce"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path
                  d="M3 14.25a.75.75 0 0 1 .75.75c0 1.435.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.754.101 1.756.103 3.191.103h6c1.435 0 2.436-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191a.75.75 0 0 1 1.5 0v.055c0 1.367 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26s-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-6.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337V15a.75.75 0 0 1 .75-.75"
                  opacity="0.5"
                />
                <path d="M12 16.75a.75.75 0 0 0 .553-.244l4-4.375a.75.75 0 1 0-1.107-1.012l-2.696 2.95V3a.75.75 0 0 0-1.5 0v11.068l-2.696-2.95a.75.75 0 0 0-1.108 1.013l4 4.375a.75.75 0 0 0 .554.244" />
              </g>
            </svg>
          </Button>
        </div>
      )}
    </>
  );
}
