export async function fetchExercises() {
  const res = await fetch('/api/exercises')
  const data = await res.json()

  return data.exercises
}
