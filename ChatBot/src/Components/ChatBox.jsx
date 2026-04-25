import { useState, useRef, useEffect } from "react";

function ChatBox({ closeChat }) {

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello 👋 How can I help you?" }
  ]);

  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setMessages(prev => [...prev, userMsg]);

    setInput("");

    try {

      const res = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input
        })
      });

      const data = await res.json();

      const botReply = data.reply || "No response";

      setMessages(prev => [
        ...prev,
        { role: "bot", text: botReply }
      ]);

    } catch (error) {

      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Server error 😢" }
      ]);

    }

  };

  return (
    <div className="w-[320px] h-[430px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-black text-white p-3 flex justify-between items-center">

        <span>AI Assistant</span>

        <button onClick={closeChat}>✕</button>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={endRef}></div>

      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;