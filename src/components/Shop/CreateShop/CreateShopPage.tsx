"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/app/logo.png";
import {
  Button,
  Input,
  Progress,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateShopPage({ session }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [instaId, setInstaId] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [categoryIds, setCategoryIds] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [imagePosters, setImagePosters] = useState([]);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(30);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const defualtImage = "/assets/profile.png";

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step > 0) setProgress(progress + 35);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      if (step > 1) setProgress(progress - 35);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("instaId", instaId);
    formData.append("address", address);
    formData.append("bio", bio);
    formData.append("siteAddress", siteAddress);
    formData.append("categoryIds", "");

    if (avatar) {
      formData.append("avatar", avatar);
    }

    imagePosters.forEach((file) => {
      formData.append("imagePosters", file);
    });

    try {
      const response = await fetch(`${process.env.API_URL}/shop`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const result = await response.json();
      // console.log("Shop created:", result);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col bg-profile-gradient"
      >
        <div className="fixed top-2 left-2 z-50">
          <Button
            variant="light"
            isIconOnly
            className="z-40"
            onClick={() => router.back()}
          >
            <ChevronLeft
              color="white"
              strokeWidth={2}
              absoluteStrokeWidth
              size={30}
            />
          </Button>
        </div>

        <div className="fixed top-0 bg-gradient-to-b from-black/90 to-transparent h-20 inset-x-0 z-40" />

        <div className="w-full h-64 z-0 relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            transition={{ opacity: { duration: 0.3 } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src={
                step === 0
                  ? "/assets/backgrounds/createshop1.png"
                  : "/assets/backgrounds/createshop2.png"
              }
              alt="Banner Image"
              className="object-cover w-full h-full"
              height={250}
              width={1000}
            />
          </motion.div>
        </div>

        <AnimatePresence>
          <div className="flex flex-col flex-grow p-4 rounded-t-3xl shadow-2xl bg-black/50 -mt-5 relative backdrop-blur">
            <AnimatePresence mode="sync">
              <motion.div
                key={step}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.3 }}
              >
                {step !== 0 && (
                  <>
                    <Progress size="sm" value={progress} className="mt-4" />
                  </>
                )}

                {step === 0 && (
                  <>
                    <div>
                      <span className="block text-center text-xl">گام اول</span>
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xl text-primary text-center mt-8 mb-4">
                        مشخصات
                      </p>
                      <p className="text-center my-8">
                        لطفا اطلاعات زیر رو تکمیل کنین تا بریم مرحله بعد ...
                      </p>
                      <div className="flex flex-col gap-y-6 items-center justify-center w-full">
                        <Input
                          type="text"
                          label="اسم فروشگاهتون*"
                          variant="bordered"
                          color="primary"
                          className="w-full"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                          type="text"
                          label="آیدی پیج*"
                          variant="bordered"
                          color="primary"
                          className="w-full"
                          name="instaId"
                          value={instaId}
                          onChange={(e) => setInstaId(e.target.value)}
                        />
                        <Input
                          type="text"
                          label="آدرس سایتتون"
                          placeholder="اختیاری"
                          variant="bordered"
                          color="primary"
                          className="w-full"
                          name="siteAddress"
                          value={siteAddress}
                          onChange={(e) => setSiteAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xl text-primary text-center mt-8 mb-4">
                        لوگو
                      </p>

                      <button className="w-full flex items-center justify-center">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer relative"
                        >
                          <Image
                            src={
                              avatarPreview === "" || avatarPreview === null
                                ? defualtImage
                                : avatarPreview
                            }
                            alt="Avatar"
                            className="size-28 rounded-full my-4"
                            width={128}
                            height={128}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                // @ts-ignore
                                setAvatar(e.target.files[0]);
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
                            className="absolute right-0 bottom-2"
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

                      <p className="text-center my-8 text-xl">
                        لوگو برند خودتونو اینجا وارد کنین
                      </p>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xl text-primary text-center mt-8 mb-4">
                        دسته بندی
                      </p>
                      <p className="text-center my-8">
                        لطفا اطلاعات زیر رو تکمیل کنین تا بریم مرحله بعد ...
                      </p>
                      <div className="flex flex-col gap-y-6 items-center justify-center w-full">
                        <Select
                          label="دسته بندی*"
                          placeholder="محصولاتتون"
                          selectionMode="multiple"
                          className="w-full"
                          variant="bordered"
                          color="primary"
                          name="categoryIds"
                          value={categoryIds}
                          onChange={(e) => setCategoryIds(e.target.value)}
                        >
                          <SelectItem key={"test"}>test</SelectItem>
                          <SelectItem key={"test1"}>test1</SelectItem>
                          <SelectItem key={"test2"}>test2</SelectItem>
                        </Select>
                        <Textarea
                          label="آدرس فروشگاه حضوری"
                          placeholder="اختیاری"
                          color="primary"
                          className="w-full"
                          variant="bordered"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <Textarea
                          label="درباره فروشگاهتون"
                          placeholder="اختیاری"
                          color="primary"
                          className="w-full"
                          variant="bordered"
                          name="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="mt-28">
              <div className="flex justify-center items-center w-full fixed bottom-16 inset-x-0">
                {step !== 0 && (
                  <>
                    <Button
                      color={"primary"}
                      className="mx-2"
                      fullWidth
                      onPress={prevStep}
                    >
                      قبلی
                    </Button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <Button
                      color={"primary"}
                      className="mx-2"
                      fullWidth
                      onPress={handleSubmit}
                    >
                      تموم
                    </Button>
                  </>
                )}
                {step !== 3 && (
                  <>
                    <Button
                      color={"primary"}
                      className="mx-2"
                      fullWidth
                      onPress={nextStep}
                    >
                      بعدی
                    </Button>
                  </>
                )}
              </div>
            </div>
            <Link
              href="/"
              className="flex justify-center items-center w-full p y-4 fixed bottom-4 inset-x-0"
            >
              <Image
                src={Logo}
                alt="Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </Link>
          </div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
