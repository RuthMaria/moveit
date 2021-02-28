import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'
import { FaRegFrown, FaRegGrinAlt } from 'react-icons/fa'

export function ChallengeBox() {

  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengeContext)
  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeSucceeded() {
    completedChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>{activeChallenge.type === 'body' ? 'Exercite-se' : 'Mova os olhos'}</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type='button'
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
              <FaRegFrown size={20} className={styles.icon} />
            </button>
            <button
              type='button'
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
              <FaRegGrinAlt size={20} className={styles.icon} />
            </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber desafios</strong>
            <p>
              <img src="icons/level-up.svg" alt="level up" />
               Avance de nível completando desafios
            </p>
          </div>
        )}

    </div>
  )
}
