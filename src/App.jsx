import { useState } from 'react'
import { workoutPlan } from './data/workoutPlan'
import { StoryPlayer } from './components/StoryPlayer'

function App() {
  const [activeSplitId, setActiveSplitId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeSplit = workoutPlan.find((s) => s.id === activeSplitId) || null

  const openStories = (splitId, startIndex = 0) => {
    setActiveSplitId(splitId)
    setActiveIndex(startIndex)
  }

  const closeStories = () => {
    setActiveSplitId(null)
    setActiveIndex(0)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Workout Plan</h1>
        <p className="app-subtitle">Push / Pull / Legs – 6 days a week</p>
      </header>

      <main className="splits">
        {workoutPlan.map((split) => (
          <section key={split.id} className="split-card">
            <header className="split-header">
              <div>
                <h2>{split.name}</h2>
                <p className="split-days">{split.days.join(' & ')}</p>
              </div>
              {split.notes && <p className="split-notes">{split.notes}</p>}
            </header>

            <button
              type="button"
              className="split-play"
              onClick={() => openStories(split.id, 0)}
            >
              ▶ Play stories
            </button>

            <ul className="exercise-list">
              {split.exercises.map((exercise) => (
                <li key={exercise.name} className="exercise-item">
                  <div className="exercise-main">
                    <h3>{exercise.name}</h3>
                    <p className="sets-reps">{exercise.setsReps}</p>
                  </div>
                  <p className="visual-cue">{exercise.visualCue}</p>
                  {exercise.videoUrl && (
                    <a
                      className="video-link"
                      href={exercise.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch form video
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      {activeSplit && (
        <StoryPlayer
          split={activeSplit}
          currentIndex={activeIndex}
          onChangeIndex={setActiveIndex}
          onClose={closeStories}
        />
      )}
    </div>
  )
}

export default App
