'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { profile } from '@/data/profile';

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('hello');
  const [message, setMessage] = useState('wanted to reach out about...');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({
      subject,
      body: message
    });
    window.location.href = `mailto:${profile.email}?${params.toString()}`;
  };

  return (
    <motion.main
      className="flex flex-col gap-10 pb-20"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl text-ink-100">contact</h1>
        <p className="text-sm text-chrome-400">open to new builds and collaborations</p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-ink-900/70 p-6 shadow-frame">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-chrome-400">email</p>
            <p className="text-lg text-ink-100">{profile.email}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-chrome-400 transition hover:text-ink-100"
            aria-label="copy email"
          >
            {copied ? 'copied' : 'copy'}
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs tracking-[0.3em] text-chrome-400">
          <span>twitter</span>
          <a href={profile.twitter} target="_blank" rel="noreferrer" className="text-ink-100">
            {profile.twitter.replace('https://', '')}
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-ink-900/70 p-6 shadow-frame">
        <h2 className="font-heading text-xl text-ink-100">send a note</h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-xs tracking-[0.3em] text-chrome-400">
            subject
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value.toLowerCase())}
              className="rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-ink-100 outline-none focus:border-white/30"
              aria-label="subject"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs tracking-[0.3em] text-chrome-400">
            message
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value.toLowerCase())}
              rows={5}
              className="rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-ink-100 outline-none focus:border-white/30"
              aria-label="message"
            />
          </label>
          <button
            type="submit"
            className="w-fit rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs tracking-[0.35em] text-ink-100 transition hover:-translate-y-0.5"
          >
            open mail
          </button>
        </form>
      </section>
    </motion.main>
  );
}
