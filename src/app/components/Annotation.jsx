"use client";

import { useEffect, useRef, useState } from "react";

const VARIANTS = {
  circle: {
    viewBox: "0 0 200 80",
    path: "M14 40 C10 14, 60 2, 100 4 C150 6, 194 18, 190 42 C186 66, 130 78, 92 76 C46 74, 18 62, 16 46",
  },
  underline: {
    viewBox: "0 0 200 20",
    path: "M4 11 C 60 17, 140 5, 196 13",
  },
  strike: {
    viewBox: "0 0 200 24",
    path: "M4 13 C 60 9, 140 17, 196 11",
  },
};

export default function Annotation({
  variant = "circle",
  color = "redline",
  as: Tag = "span",
  className = "",
  children,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const { viewBox, path } = VARIANTS[variant] ?? VARIANTS.circle;

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`annotation annotation--${variant} ${className}`}
      data-color={color}
    >
      <span className="annotation__content">{children}</span>
      <svg
        className={`annotation__mark ${visible ? "is-visible" : ""}`}
        viewBox={viewBox}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path d={path} pathLength="1" />
      </svg>
    </Tag>
  );
}
