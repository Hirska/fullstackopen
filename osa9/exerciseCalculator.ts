interface returnValue {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratingDescriptions = ['try better next time', 'not too bad but could be better', 'nice job, keep that going']

const calculateExercises = (dailyExercises : number[], target : number) : returnValue => {
  const periodLength : number = dailyExercises.length
  const average : number = dailyExercises.reduce((a, b) => a + b, 0)/periodLength
  const rating : number = Math.max(Math.floor(Math.min(average/target, 1) * 3),1)

  return {
    periodLength,
    trainingDays: dailyExercises.filter(hours => hours > 0).length,
    average,
    success : average > target,
    target,
    ratingDescription: ratingDescriptions[rating-1],
    rating
  };
}

console.log(calculateExercises([3, 0, 2, 1, 0, 0, 2], 2))