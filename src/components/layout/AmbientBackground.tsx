// src/components/layout/AmbientBackground.tsx — Ambient mesh orbs for liquid glass depth
export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-orb ambient-orb-blue -top-24 -right-16 h-72 w-72 opacity-80 md:h-96 md:w-96" />
      <div className="ambient-orb ambient-orb-violet top-1/3 -left-24 h-64 w-64 opacity-70 md:h-80 md:w-80" />
      <div className="ambient-orb ambient-orb-teal bottom-1/4 right-1/4 h-56 w-56 opacity-60 md:h-72 md:w-72" />
    </div>
  )
}
