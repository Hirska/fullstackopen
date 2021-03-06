interface returnValue {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface resultObject {
  target: number;
  weeklyHours: number[];
}

const parseArgs = (args: Array<string>): resultObject => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours = args.slice(3).map(hour => Number(hour))
  if (!isNaN(Number(args[2])) && hours.every(hour => !isNaN(hour))) {

    return {
      target: Number(args[2]),
      weeklyHours: hours
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const ratingDescriptions = ['try better next time', 'not too bad but could be better', 'nice job, keep that going']

export const calculateExercises = (dailyExercises : number[], target : number) : returnValue => {
  const periodLength : number = dailyExercises.length;
  const average : number = dailyExercises.reduce((a, b) => a + b, 0)/periodLength;
  const rating : number = Math.max(Math.floor(Math.min(average/target, 1) * 3),1);

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

try {
  const {target, weeklyHours} = parseArgs(process.argv);
  console.log(calculateExercises(weeklyHours, target));
} catch (e) {
  console.log('Error, something bad happened. Message: ', e.message);
}
