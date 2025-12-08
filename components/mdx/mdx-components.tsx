import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { AccentCallout } from './AccentCallout';
import { PulseCard } from './PulseCard';
import { cn } from '@/lib/utils';

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 text-2xl font-semibold tracking-tight text-slate-900"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 text-xl font-semibold tracking-tight text-slate-800"
      {...props}
    />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-slate-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700" {...props} />,
  li: (props) => <li className="leading-relaxed text-slate-700" {...props} />,
  strong: (props) => <strong className="text-slate-900" {...props} />,
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
        'rounded-md bg-slate-900/5 px-2 py-1 text-[13px] font-mono text-emerald-700',
        'shadow-inner shadow-slate-200',
      )}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-800"
      {...props}
    />
  ),
  AccentCallout,
  PulseCard,
};

export { components as mdxComponents };
