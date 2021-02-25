import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'

interface ChallengeProviderProps{
    children: ReactNode // recebe um componente react
}

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData{
    level: number
    currentExperience: number
    challengesCompleted: number
    startNewChallenge: () => void
    levelUp: () => void
    activeChallenge: Challenge
    resetChallenge: () => void
    experienceToNextLevel: number
    completedChallenge: () => void
}

export const ChallengeContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengeProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completedChallenge() {
        if( !activeChallenge ){
            return;
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return(
        <ChallengeContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted, 
                startNewChallenge, 
                levelUp,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completedChallenge
            }}
        >
            {children}
        </ChallengeContext.Provider>
    )
}