import Datee from "./Datee";

interface Props {
  messageText: string;
  from?: "me" | "other";
  hour: string;
}

export default function MessageBox({ messageText, hour, from }: Props) {
  return (
    <>
      {from === "me" ? (
        <>
          <div className="flex items-center w-full mb-1">
            <p className="bg-primary text-zinc-700 rounded-2xl py-2 px-4 shadow-ticket drop-shadow-ticket break-words overflow-hidden">{`${messageText}`}</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-end w-full mb-1">
            <p className="bg-order-gradient text-zinc-300 rounded-2xl py-2 px-4 shadow-ticket drop-shadow-ticket break-words overflow-hidden">{`${messageText}`}</p>
          </div>
        </>
      )}

      {from === "me" ? (
        <>
          <div className="flex items-center w-full">
            <Datee date={hour} from={from} />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-end w-full">
            <Datee date={hour} from={from} />
          </div>
        </>
      )}
    </>
  );
}
