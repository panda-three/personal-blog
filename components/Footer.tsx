export default function Footer() {
  return (
    <footer className="mb-6 text-sm text-white/50">
      <div className="ink-panel mt-6 rounded-3xl px-6 py-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-white/80">保持好奇，保持手感。</p>
          <div className="flex items-center gap-4">
            <a
              className="transition hover:text-neon-pink"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="transition hover:text-neon-blue"
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              X / Twitter
            </a>
            <a className="transition hover:text-neon-green" href="mailto:hello@neonjournal.dev">
              邮件
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
