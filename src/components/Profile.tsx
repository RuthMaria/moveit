import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useContext(ChallengeContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/RuthMaria.png" alt="Profile" />
      <div>
        <strong>Ruth Maria</strong>
        <p>
          <img src="icons/level.svg" alt="icon level" />
                    Nível {level}
        </p>
      </div>
    </div>
  )
}
