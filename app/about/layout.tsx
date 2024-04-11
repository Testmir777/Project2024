"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
      {isVisible
        ? (
          <div>
            <button type="button" onClick={() => router.push("/")}>Home</button>
          </div>
        )
        : undefined}
      <div>
        <h2>Sub layout</h2>
        {children}
      </div>
    </>
  );
}
