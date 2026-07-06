"use client";

import { useState } from "react";
import { submitLead } from "@/app/actions/leads";

const INITIAL_FORM = { name: "", email: "", number: "" };

export default function LeadForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitLead(form);

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setForm(INITIAL_FORM);
  };

  if (status === "success") {
    return (
      <p className="font-mono text-sm uppercase tracking-widest text-paper">
        Got it — we&rsquo;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border-b border-paper/30 bg-transparent py-2 font-mono text-sm text-paper placeholder:text-paper/40 focus:border-paper focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border-b border-paper/30 bg-transparent py-2 font-mono text-sm text-paper placeholder:text-paper/40 focus:border-paper focus:outline-none"
        />
        <input
          type="tel"
          name="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Phone (optional)"
          className="border-b border-paper/30 bg-transparent py-2 font-mono text-sm text-paper placeholder:text-paper/40 focus:border-paper focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="stamp-button stamp-button--invert disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send the brief →"}
        </button>
        {status === "error" && (
          <p className="font-mono text-xs uppercase tracking-widest text-redline">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
