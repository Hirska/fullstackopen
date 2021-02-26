const calculateBmi = (height: number, weight: number) : string => {
    const BMI : number = weight / ((height/100)^2);
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

console.log(calculateBmi(180, 74))