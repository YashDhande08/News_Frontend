import React, { useEffect, useRef, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export default function App() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    createSession();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function createSession() {
    try {
      const res = await fetch(`${API_BASE}/session`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to create session");
      const json = await res.json();
      setSessionId(json.sessionId);
      setError("");
      return json.sessionId;
    } catch (e) {
      setError("Cannot reach server. Ensure API and Redis are running.");
      return "";
    }
  }

  async function resetSession() {
    if (!sessionId) return;
    await fetch(`${API_BASE}/session/${sessionId}`, { method: "DELETE" });
    setMessages([]);
  }

  async function sendMessage(e) {
    e?.preventDefault();
    if (!input.trim()) return;
    let sid = sessionId;
    if (!sid) {
      sid = await createSession();
      if (!sid) return;
    }
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid, message: userMsg.content }),
      });
      const json = await res.json();
      if (json.answer) {
        setMessages((m) => [...m, { role: "assistant", content: json.answer }]);
        setError("");
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Sorry, something went wrong." },
        ]);
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error." },
      ]);
      setError("Cannot reach server. Check that it is running on port 4000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>News Chatbot</h1>
        <div className="app__actions">
          <button onClick={resetSession}>Reset Session</button>
        </div>
      </header>
      <main className="chat">
        {error && <div className="banner banner--error">{error}</div>}
        <div className="chat__messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`msg msg--${m.role}`}>
              <div className="msg__role">
                {m.role === "user" ? "You" : "Bot"}
              </div>
              <div className="msg__content">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="msg msg--assistant">
              <div className="msg__content">Thinking…</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <form className="chat__input" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the latest news…"
          />
          <button disabled={loading || !input.trim()} type="submit">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
