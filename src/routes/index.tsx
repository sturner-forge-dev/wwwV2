import { createFileRoute } from '@tanstack/react-router'
import ExerciseTable from '../components/ui/ExerciseTable/ExerciseTable'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <>
      <ExerciseTable />
    </>
  )
}
