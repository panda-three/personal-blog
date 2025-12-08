'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;
const MS_IN_YEAR = 365.25 * MS_IN_DAY;

function getNowChinaMs() {
  const now = Date.now();
  const offsetToUTC = new Date().getTimezoneOffset() * MS_IN_MINUTE;
  const chinaOffset = 8 * MS_IN_HOUR;
  return now - offsetToUTC + chinaOffset;
}

function formatTwoDigits(value: number) {
  return String(value).padStart(2, '0');
}

function breakdownMilliseconds(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / MS_IN_SECOND));
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds };
}

export function LifeCountdown() {
  const [ageInput, setAgeInput] = useState('28');
  const [expectancyInput, setExpectancyInput] = useState('85');
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    const age = Number(ageInput);
    const expectancy = Number(expectancyInput);

    if (!Number.isFinite(age) || !Number.isFinite(expectancy) || age < 0 || expectancy <= age) {
      setTargetTime(null);
      setRemainingMs(0);
      return;
    }

    const msLeft = (expectancy - age) * MS_IN_YEAR;
    setTargetTime(getNowChinaMs() + msLeft);
  }, [ageInput, expectancyInput]);

  useEffect(() => {
    if (!targetTime) return;

    const tick = () => {
      setRemainingMs(Math.max(0, targetTime - getNowChinaMs()));
    };

    tick();
    const timer = setInterval(tick, 120);
    return () => clearInterval(timer);
  }, [targetTime]);

  const remainingYears = useMemo(() => {
    const age = Number(ageInput);
    const expectancy = Number(expectancyInput);

    if (!Number.isFinite(age) || !Number.isFinite(expectancy)) return null;
    return Math.max(0, expectancy - age);
  }, [ageInput, expectancyInput]);

  const snapshot = useMemo(() => breakdownMilliseconds(remainingMs), [remainingMs]);
  const isInvalid = targetTime === null;
  const secondProgress = targetTime ? 1 - (remainingMs % MS_IN_SECOND) / MS_IN_SECOND : 0;

  return (
    <section className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white/95 via-white/90 to-sky-50/85 p-7 shadow-xl shadow-slate-200/80">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-sky-200/35 blur-3xl" />
      </div>

      <div className="relative grid gap-6 md:grid-cols-[1.1fr,1fr] md:items-center">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">生命计时</p>
          <h2 className="text-2xl font-semibold text-slate-900">死亡倒计时</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            输入当前年龄和预期寿命，看看可用的时间还剩多少。倒计时以时分秒不停流逝，提醒自己把握当下。
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            基于中国时间（UTC+8） · 生命正在流逝
          </p>
          {isInvalid && (
            <p className="text-sm font-medium text-rose-600">
              请填写非负数字，且预期寿命需要大于当前年龄。
            </p>
          )}
        </div>

        <motion.div
          className="ink-panel glow relative space-y-4 rounded-2xl p-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span className="block">当前年龄</span>
              <input
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={ageInput}
                onChange={(event) => setAgeInput(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800 shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span className="block">预期寿命</span>
              <input
                type="number"
                min="1"
                step="0.1"
                inputMode="decimal"
                value={expectancyInput}
                onChange={(event) => setExpectancyInput(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-800 shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-4 py-5 text-white shadow-2xl shadow-slate-900/40">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              <span>剩余寿命</span>
              <span>实时</span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-3xl font-semibold tabular-nums leading-none">{snapshot.days} 天</div>
              <div className="text-sm text-slate-200">
                约 {remainingYears !== null && !Number.isNaN(remainingYears) ? remainingYears.toFixed(1) : '—'} 年
              </div>
            </div>

            <div className="mt-3 font-mono text-2xl font-semibold tabular-nums tracking-tight">
              {formatTwoDigits(snapshot.hours)}:{formatTwoDigits(snapshot.minutes)}:{formatTwoDigits(snapshot.seconds)}
            </div>

            <div className="mt-4 h-1.5 rounded-full bg-slate-700/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 transition-all duration-100 ease-linear"
                style={{ width: `${Math.min(100, Math.max(0, secondProgress * 100))}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
