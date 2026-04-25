import { useState } from "react";
import ChatBox from "./ChatBox";

function ChatWidget() {

  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {open && <ChatBox closeChat={() => setOpen(false)} />}

      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl"
      >
        💬
      </button>

    </div>
  );
}

export default ChatWidget;