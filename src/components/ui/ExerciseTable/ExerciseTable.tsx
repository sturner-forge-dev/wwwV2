import { useState, useEffect } from 'react'
import { omittedKeys } from './omittedKeys'
import { capitalizeFirstLetters } from '../../../utils/capitalizeFirstLetters'
import { fetchExercises } from './apiCalls'
import type { Exercise } from './ExerciseType'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../catalyst/table'
import ExerciseModal from './ExerciseModal'

function ExerciseTable() {
  const [exercises, setExercises] = useState([])
  const [exercise, setExercise] = useState({} as Exercise)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchExercises().then((data) => setExercises(data))
  }, [])

  return (
    <>
      <Table
        striped={true}
        bleed
        className='[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]'
      >
        <TableHead>
          <TableRow>
            {exercises.length > 0 &&
              Object.keys(exercises[0]).map((key: string) => {
                if (!omittedKeys.includes(key)) {
                  return (
                    <TableHeader
                      key={key}
                      className='font-bold'
                    >
                      {capitalizeFirstLetters(key)}
                    </TableHeader>
                  )
                }
                return null
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise: Exercise) => (
            <TableRow
              key={exercise.name}
              onClick={() => [setIsOpen(true), setExercise(exercise)]}
            >
              {Object.entries(exercise).map(([key, value]) => {
                if (!omittedKeys.includes(key)) {
                  return (
                    <TableCell
                      className='text-zinc-300 font-thin'
                      key={value.toString()}
                    >
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </TableCell>
                  )
                }
                return null
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isOpen && (
        <ExerciseModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          exercise={exercise}
        />
      )}
    </>
  )
}

export default ExerciseTable
