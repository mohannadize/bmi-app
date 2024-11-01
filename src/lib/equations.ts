import { PolynomialRegression } from "ml-regression-polynomial";
import data from "./data.json";
const degree = 9; // setup the maximum degree of the polynomial

// const regression = new PolynomialRegression(x, y, degree);
// console.log(regression.predict(80)); // Apply the model to some x value. Prints 2.6.
// console.log(regression.coefficients); // Prints the coefficients in increasing order of power (from 0 to degree).
// console.log(regression.toString(3)); // Prints a human-readable version of the function.
// console.log(regression.toLaTeX(3));

export function bmiCheck(age: number, bmi: number, gender: "boy" | "girl") {
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
  gender: "boy" | "girl"
) {
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

export function getAgeReference(age: number, gender: "boy" | "girl") {
  if (!age) {
    return {
      bmi: {
        more_than: {
          obese: null,
          overweight: null,
        },
        less_than: {
          thinness: null,
          severe_thinness: null,
        },
      },
      height: {
        more_than: {
          giantism: null,
          tallness: null,
        },
        less_than: {
          shortness_first_degree: null,
          shortness: null,
          severe_shortness: null,
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
