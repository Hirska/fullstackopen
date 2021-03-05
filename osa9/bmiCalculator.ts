interface parameters {
    height: number;
    weight: number;
  }

const parseArguments = (args: Array<string>): parameters => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number) : string => {
    const BMI : number = weight / (Math.pow((height/100), 2));
    console.log(BMI)
    if( BMI < 15) {
        return "Very severely underweight"
    }
    if(15 <= BMI && BMI  < 16) {
        return "Severely underweight"
    }
    if(16 <= BMI && BMI  < 18.5) {
        return "Underweight"
    }
    if(18.5 <= BMI && BMI  < 25) {
        return "Normal (healthy weight)"
    }
    if(25 <= BMI && BMI  < 30) {
        return "Overweight"
    }
    if(30 <= BMI && BMI  < 35) {
        return "Obese Class I (Moderately obese)"
    }
    if(35 <= BMI && BMI  < 40) {
        return "Obese Class II (Severely obese)"
    }
    else {
        return "Obese Class III (Very severely obese)"
    }
}

try {
    const { height, weight} = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (e) {
    console.log('Error, something bad happened. Message: ', e.message)
}