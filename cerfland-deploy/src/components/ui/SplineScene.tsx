'use client'
import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene?: string
  className?: string
}

function SplineFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Luxury CSS animation as fallback */}
      <div className="relative w-64 h-64">
        {/* Outer rotating ring */}
        <div
          className="absolute inset-0 rounded-full border border-bronze/20"
          style={{ animation: 'spin 20s linear infinite' }}
        />
        <div
          className="absolute inset-4 rounded-full border border-bronze/15"
          style={{ animation: 'spin 15s linear infinite reverse' }}
        />
        <div
          className="absolute inset-8 rounded-full border border-bronze/10"
          style={{ animation: 'spin 10s linear infinite' }}
        />
        {/* Center mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              className="w-16 h-16 border border-bronze/40 rotate-45"
              style={{ animation: 'pulse 3s ease-in-out infinite' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-bronze/20 rotate-45" />
            </div>
          </div>
        </div>
        {/* Floating dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x = 50 + 42 * Math.cos(rad)
          const y = 50 + 42 * Math.sin(rad)
          return (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-bronze/40 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `pulse 2s ease-in-out ${i * 400}ms infinite`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export function SplineScene({ scene, className = '' }: SplineSceneProps) {
  if (\!scene) {
    return <SplineFallback />
  }

  return (
    <Suspense fallback={<SplineFallback />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
