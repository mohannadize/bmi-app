import { PolynomialRegression } from "ml-regression-polynomial";
import data from "./data.json";
const degree = 7; // setup the maximum degree of the polynomial


export function bmiCheck(
  age: number,
  bmi: number,
  gender: "male" | "female" | null
) {
  if (!age || !bmi || !gender) {
    return "--";
  }
  const obese = new PolynomialRegression(
    data.ages,
    data[gender].bmi.obese,
    degree
  );
  const overweight = new PolynomialRegression(
    data.ages,
    data[gender].bmi.overweight,
    degree
  );
  const thinness = new PolynomialRegression(
    data.ages,
    data[gender].bmi.thinness,
    degree
  );
  const severeThinness = new PolynomialRegression(
    data.ages,
    data[gender].bmi.severe_thinness,
    degree
  );

  if (bmi > obese.predict(age)) {
    return "obese";
  }

  if (bmi > overweight.predict(age)) {
    return "overweight";
  }

  if (bmi < severeThinness.predict(age)) {
    return "severe_thinness";
  }

  if (bmi < thinness.predict(age)) {
    return "thinness";
  }

  return "normal";
}

export function heightCheck(
  age: number,
  userHeight: number,
  gender: "male" | "female" | null
) {
  if (!age || !userHeight || !gender) {
    return "--";
  }
  const height = userHeight - 3 < 0 ? userHeight * 100 : userHeight;

  const shortness = new PolynomialRegression(
    data.ages,
    data[gender].height.shortness,
    degree
  );
  const severeShortness = new PolynomialRegression(
    data.ages,
    data[gender].height.severe_shortness,
    degree
  );
  const shortnessFirstDegree = new PolynomialRegression(
    data.ages,
    data[gender].height.shortness_first_degree,
    degree
  );
  const tallness = new PolynomialRegression(
    data.ages,
    data[gender].height.tallness,
    degree
  );
  const giantism = new PolynomialRegression(
    data.ages,
    data[gender].height.giantism,
    degree
  );

  if (height < severeShortness.predict(age)) {
    return "severe_shortness";
  }

  if (height < shortness.predict(age)) {
    return "shortness";
  }

  if (height < shortnessFirstDegree.predict(age)) {
    return "shortness_first_degree";
  }

  if (height > giantism.predict(age)) {
    return "giantism";
  }

  if (height > tallness.predict(age)) {
    return "tallness";
  }

  return "normal";
}

export function getAgeReference(age: number, gender: "male" | "female" | null) {
  if (!age || !gender || age <= 2 || age >= 19) {
    return {
    bmi: {
      more_than: {
        obese: 0,
        overweight: 0,
      },
      less_than: {
        thinness: 0,
        severe_thinness: 0,
      },
    },
    height: {
      more_than: {
        giantism: 0,
        tallness: 0,
      },
      less_than: {
        shortness_first_degree: 0,
        shortness: 0,
        severe_shortness: 0,
      },
    },
  };
  }

  const obese = new PolynomialRegression(
    data.ages,
    data[gender].bmi.obese,
    degree
  );
  const overweight = new PolynomialRegression(
    data.ages,
    data[gender].bmi.overweight,
    degree
  );
  const thinness = new PolynomialRegression(
    data.ages,
    data[gender].bmi.thinness,
    degree
  );
  const severeThinness = new PolynomialRegression(
    data.ages,
    data[gender].bmi.severe_thinness,
    degree
  );

  const tallness = new PolynomialRegression(
    data.ages,
    data[gender].height.tallness,
    degree
  );
  const giantism = new PolynomialRegression(
    data.ages,
    data[gender].height.giantism,
    degree
  );
  const shortness = new PolynomialRegression(
    data.ages,
    data[gender].height.shortness,
    degree
  );
  const severeShortness = new PolynomialRegression(
    data.ages,
    data[gender].height.severe_shortness,
    degree
  );
  const shortnessFirstDegree = new PolynomialRegression(
    data.ages,
    data[gender].height.shortness_first_degree,
    degree
  );

  const reference = {
    bmi: {
      more_than: {
        obese: obese.predict(age),
        overweight: overweight.predict(age),
      },
      less_than: {
        thinness: thinness.predict(age),
        severe_thinness: severeThinness.predict(age),
      },
    },
    height: {
      more_than: {
        giantism: giantism.predict(age),
        tallness: tallness.predict(age),
      },
      less_than: {
        shortness_first_degree: shortnessFirstDegree.predict(age),
        shortness: shortness.predict(age),
        severe_shortness: severeShortness.predict(age),
      },
    },
  };

  return reference;
}

export function getRegressions(gender: "male" | "female") {
  const shortness = new PolynomialRegression(
    data.ages,
    data[gender].height.shortness,
    degree
  );
  const severeShortness = new PolynomialRegression(
    data.ages,
    data[gender].height.severe_shortness,
    degree
  );
  const shortnessFirstDegree = new PolynomialRegression(
    data.ages,
    data[gender].height.shortness_first_degree,
    degree
  );
  const tallness = new PolynomialRegression(
    data.ages,
    data[gender].height.tallness,
    degree
  );
  const giantism = new PolynomialRegression(
    data.ages,
    data[gender].height.giantism,
    degree
  );
}

// Add this function to test regression accuracy
export function testRegressionAccuracy(gender: "male" | "female") {
  // Test all BMI regressions
  const bmiCategories = ['obese', 'overweight', 'thinness', 'severe_thinness'] as const;
  const heightCategories = ['shortness', 'severe_shortness', 'shortness_first_degree', 'tallness', 'giantism'] as const;

  const summary = {
    bmi: {} as Record<typeof bmiCategories[number], {meanError: number, accuracy: number}>,
    height: {} as Record<typeof heightCategories[number], {meanError: number, accuracy: number}>
  };

  // Calculate BMI accuracies
  bmiCategories.forEach(category => {
    const regression = new PolynomialRegression(
      data.ages,
      data[gender].bmi[category],
      degree
    );

    let totalPercentageError = 0;
    const errors = data.ages.map((age, i) => {
      const predicted = regression.predict(age);
      const actual = data[gender].bmi[category][i];
      const error = Math.abs(predicted - actual);
      const percentageError = (error / actual) * 100;
      totalPercentageError += percentageError;
      return error;
    });

    const meanError = errors.reduce((sum, err) => sum + err, 0) / errors.length;
    const averageAccuracy = 100 - (totalPercentageError / data.ages.length);
    
    summary.bmi[category] = {
      meanError: Number(meanError.toFixed(4)),
      accuracy: Number(averageAccuracy.toFixed(2))
    };
  });

  // Calculate Height accuracies
  heightCategories.forEach(category => {
    const regression = new PolynomialRegression(
      data.ages,
      data[gender].height[category],
      degree
    );

    let totalPercentageError = 0;
    const errors = data.ages.map((age, i) => {
      const predicted = regression.predict(age);
      const actual = data[gender].height[category][i];
      const error = Math.abs(predicted - actual);
      const percentageError = (error / actual) * 100;
      totalPercentageError += percentageError;
      return error;
    });

    const meanError = errors.reduce((sum, err) => sum + err, 0) / errors.length;
    const averageAccuracy = 100 - (totalPercentageError / data.ages.length);
    
    summary.height[category] = {
      meanError: Number(meanError.toFixed(4)),
      accuracy: Number(averageAccuracy.toFixed(2))
    };
  });

  return summary;
}
