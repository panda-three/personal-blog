import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { AccentCallout } from './AccentCallout';
import { PulseCard } from './PulseCard';
import { cn } from '@/lib/utils';

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 text-2xl font-semibold tracking-tight text-white"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 text-xl font-semibold tracking-tight text-white/90"
      {...props}
    />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-white/70" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70" {...props} />,
  li: (props) => <li className="leading-relaxed text-white/70" {...props} />,
  strong: (props) => <strong className="text-white" {...props} />,
  a: (props) => (
    <Link
      className="font-semibold text-neon-blue underline decoration-dotted underline-offset-4 hover:text-neon-pink"
      {...props}
      href={props.href || '#'}
    />
  ),
  code: (props) => (
    <code
      className={cn(
        'rounded-md bg-white/10 px-2 py-1 text-[13px] font-mono text-neon-green',
        'shadow-inner shadow-black/30',
      )}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-white/80"
      {...props}
    />
  ),
  AccentCallout,
  PulseCard,
};

export { components as mdxComponents };
