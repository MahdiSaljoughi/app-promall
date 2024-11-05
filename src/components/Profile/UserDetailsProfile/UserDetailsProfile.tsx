"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";

export default function UserDetailsProfile({ user }) {
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("address", address);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await fetch(`${process.env.API_URL}/user/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // const data = await response.json();
      // console.log("User updated successfully:", data);
      setSuccess("تغییرات با موفقیت اعمال شد");
      // setInterval(() => window.location.reload(), 2000);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("خطا در اعمال تغییرات !");
    } finally {
      setLoading(false);
    }
  };

  const defualtImage = "/assets/profile.png";

  // Utility to convert English numbers to Persian numbers
  const toPersianNumber = (num: string) =>
    num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center mx-4">
        <span className="text-xl">اطلاعات کاربری</span>

        <div className="flex items-center flex-col relative mb-4">
          {/* <UserAvatar userAcc={session?.user.access_token} size={"w-20 h-20"} /> */}
          <>
            {user.avatar === "" ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    avatarPreview === "" || avatarPreview === null
                      ? defualtImage
                      : avatarPreview
                  }
                  alt="Avatar"
                  className="w-24 h-24 rounded-full mb-4"
                />
              </>
            ) : (
              <>
                <button className="w-full flex items-center justify-center">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer relative"
                  >
                    <Image
                      src={
                        avatarPreview === "" || avatarPreview === null
                          ? `${process.env.API_URL}${user.avatar}`
                          : avatarPreview
                      }
                      alt="Avatar"
                      className="size-24 rounded-full mb-4"
                      width={128}
                      height={128}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setAvatarFile(e.target.files[0]);
                          setAvatarPreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      className="hidden"
                      id="file-upload"
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      className="absolute right-0 bottom-2 text-sky-500 dark:text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.2 4.2 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241Q1.999 12.737 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236s1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"
                      />
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M17.5 11c-2.121 0-3.182 0-3.841-.659S13 8.621 13 6.5s0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 8.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187c-.09.043-.188.076-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </button>
              </>
            )}
          </>
        </div>

        <Input
          type="text"
          label="اسم*"
          variant="bordered"
          color="primary"
          className="w-full"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="الزامی"
        />
        <Input
          type="text"
          label="فامیل*"
          variant="bordered"
          color="primary"
          className="w-full"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="الزامی"
        />
        <Input
          dir="rtl"
          type="tel"
          label="شماره موبایل"
          variant="bordered"
          color="primary"
          className="w-full"
          disabled
          value={toPersianNumber(user.mobile)}
        />
        <Input
          type="text"
          label="آدرس"
          variant="bordered"
          color="primary"
          className="w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="اختیاری"
        />
        <Input
          type="text"
          label="ایمیل"
          variant="bordered"
          color="primary"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="اختیاری"
        />
        {success ? (
          <>
            <p className="text-emerald-500">{success}</p>
          </>
        ) : null}
        {error ? (
          <>
            <p className="text-rose-500">{error}</p>
          </>
        ) : null}
        <Button
          variant="solid"
          className="w-full rounded-full text-lg shadow-lg bg-primary dark:bg-default text-white"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "در حال بارگذاری" : "ثبت"}
        </Button>
      </div>
    </>
  );
}
