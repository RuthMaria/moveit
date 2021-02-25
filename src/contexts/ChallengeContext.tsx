import {createContext, ReactNode, useState} from 'react'
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
}

export const ChallengeContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengeProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
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
                experienceToNextLevel
            }}
        >
            {children}
        </ChallengeContext.Provider>
    )
}