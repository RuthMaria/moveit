import { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { FcOk } from 'react-icons/fc';
import { BsX, BsPlayFill } from 'react-icons/bs'
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext)

  //padStar coloco o zero se a string passada não tiver dois caracteres e o split divide em duas partes
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
          <FcOk size={20} className={styles.icon} />
        </button>
      ) : (
          <>
            { isActive ? (
              <button
                type='button'
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo
                <BsX size={20} className={styles.icon} />
              </button>
            ) : (
                <button type='button' className={styles.countdownButton} onClick={startCountdown}>
                  Iniciar um ciclo
                  <BsPlayFill size={20} className={styles.icon} />
                </button>
              )}
          </>
        )}
    </div>
  )
}
