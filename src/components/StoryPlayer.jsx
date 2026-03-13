import { useEffect, useState } from 'react'

function toEmbedUrl(url) {
  if (!url) return ''

  try {
    const u = new URL(url)

    // Shorts: https://www.youtube.com/shorts/ID
    if (u.pathname.startsWith('/shorts/')) {
      const id = u.pathname.split('/')[2]
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`
    }

    // Standard watch: https://www.youtube.com/watch?v=ID
    if (u.searchParams.get('v')) {
      const id = u.searchParams.get('v')
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`
    }

    return url
  } catch {
    return url
  }
}

export function StoryPlayer({ split, currentIndex, onChangeIndex, onClose }) {
  const [touchStartX, setTouchStartX] = useState(null)

  const exercise = split.exercises[currentIndex]
  const embedUrl = toEmbedUrl(exercise.videoUrl)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChangeIndex(Math.min(split.exercises.length - 1, currentIndex + 1))
      if (e.key === 'ArrowLeft') onChangeIndex(Math.max(0, currentIndex - 1))
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentIndex, onChangeIndex, onClose, split.exercises.length])

  const goNext = () => {
    if (currentIndex < split.exercises.length - 1) {
      onChangeIndex(currentIndex + 1)
    } else {
      onClose()
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      onChangeIndex(currentIndex - 1)
    }
  }

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = (e) => {
    if (touchStartX == null) return
    const endX = e.changedTouches && e.changedTouches[0]?.clientX
    if (endX == null) return

    const deltaX = endX - touchStartX
    const threshold = 40
    if (deltaX > threshold) {
      goPrev()
    } else if (deltaX < -threshold) {
      goNext()
    }
    setTouchStartX(null)
  }

  return (
    <div className="story-overlay" onClick={onClose}>
      <div
        className="story-shell"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="story-close" type="button" onClick={onClose} aria-label="Close stories">
          ✕
        </button>

        <div className="story-progress">
          {split.exercises.map((_, idx) => (
            <div
              key={idx}
              className={`story-progress-bar ${idx <= currentIndex ? 'is-active' : ''}`}
            />
          ))}
        </div>

        <header className="story-header">
          <div>
            <p className="story-split-name">{split.name}</p>
            <h2 className="story-title">{exercise.name}</h2>
          </div>
          <p className="story-sets-reps">{exercise.setsReps}</p>
        </header>

        <div className="story-video-wrap">
          {embedUrl ? (
            <iframe
              key={embedUrl}
              className="story-video"
              src={embedUrl}
              title={exercise.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="story-video placeholder">No video</div>
          )}
        </div>

        <p className="story-cue">{exercise.visualCue}</p>

        <div className="story-tap-zones">
          <button className="story-tap-area left" type="button" onClick={goPrev} aria-label="Previous exercise" />
          <button className="story-tap-area right" type="button" onClick={goNext} aria-label="Next exercise" />
        </div>
      </div>
    </div>
  )
}

