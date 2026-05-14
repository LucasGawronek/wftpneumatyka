"use client";

import { useEffect, useRef, useState } from "react";

type HeroStatsProps = {
  stats: ReadonlyArray<readonly [string, string]>;
};

type ParsedStat = {
  label: string;
  rawValue: string;
  numericValue: number | null;
  prefix: string;
  suffix: string;
  fractionDigits: number;
  useComma: boolean;
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function parseStat([rawValue, label]: readonly [string, string]): ParsedStat {
  const match = rawValue.trim().match(/^([^0-9-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);

  if (!match) {
    return {
      label,
      rawValue,
      numericValue: null,
      prefix: "",
      suffix: "",
      fractionDigits: 0,
      useComma: false,
    };
  }

  const [, prefix, numericPart, suffix] = match;
  const normalized = numericPart.replace(",", ".");
  const fractionDigits = normalized.includes(".") ? normalized.split(".")[1].length : 0;

  return {
    label,
    rawValue,
    numericValue: Number(normalized),
    prefix,
    suffix,
    fractionDigits,
    useComma: numericPart.includes(","),
  };
}

function formatAnimatedValue(stat: ParsedStat, progress: number) {
  if (stat.numericValue === null) {
    return stat.rawValue;
  }

  const currentValue =
    progress >= 1
      ? stat.numericValue
      : Math.max(0, Number((stat.numericValue * progress).toFixed(stat.fractionDigits)));

  const formatted = currentValue.toLocaleString("en-US", {
    minimumFractionDigits: stat.fractionDigits,
    maximumFractionDigits: stat.fractionDigits,
  });

  return `${stat.prefix}${stat.useComma ? formatted.replace(".", ",") : formatted}${stat.suffix}`;
}

export function HeroStats({ stats }: HeroStatsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const parsedStats = stats.map(parseStat);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setHasStarted(true);
      setProgress(1);
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);

      setProgress(easedProgress);

      if (linearProgress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [hasStarted]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 overflow-hidden rounded-[22px]"
    >
      {parsedStats.map((stat) => (
        <div key={stat.label} className="px-4 py-4 text-white sm:px-8 sm:py-6">
          <div className="text-[24px] font-extrabold leading-none sm:text-[42px]">
            {formatAnimatedValue(stat, progress)}
          </div>
          <div className="mt-2 text-[11px] font-semibold leading-4 sm:mt-3 sm:text-[14px] sm:leading-5">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
