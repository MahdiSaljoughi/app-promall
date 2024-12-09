import Notif from "@/components/Notification/Notif";

export default function Page() {
  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto md:border dark:border-zinc-700 rounded-3xl p-4">
          <Notif />
        </div>
      </div>
    </>
  );
}
