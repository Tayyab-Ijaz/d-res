import { useState } from "react"

/**
 * <img> that swaps to a local fallback if the primary source fails to load.
 */
export function SafeImg({
  src,
  fallback,
  alt,
  loading,
}: {
  src: string
  fallback: string
  alt: string
  loading?: "lazy" | "eager"
}) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
