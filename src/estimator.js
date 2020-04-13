const data = {
  region: {
    name: 'Africa',
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
// const formElement = document.querySelector('form');
// const request = new XMLHttpRequest();
// request.open('POST', 'estimator.js');
// const data = request.send(new FormData(formElement));
// console.log(formElement.elements['data-population']);
// let result = document.querySelector('#result');

const covid19ImpactEstimator = () => {
  // const input = data;
  const { reportedCases, totalHospitalBeds, region, periodType } = data;
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected * 512;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;

  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;

  // use 95% working capacity for hospital beds available
  const hospitalBedsCapacity = (95 / 100) * totalHospitalBeds;
  /* const hospitalBedsAlreadyOccupied = (65 / 100) * hospitalBedsCapacity; */
  const expectedBedsForSevereCovid19Patients = (35 / 100) * hospitalBedsCapacity;

  impact.hospitalBedsByByRequestedTime = expectedBedsForSevereCovid19Patients
  - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByByRequestedTime = expectedBedsForSevereCovid19Patients
  - severeImpact.severeCasesByRequestedTime;

  impact.casesForICUByRequestedTime = (5 / 100) * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = (5 / 100) * severeImpact.infectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedTime = (2 / 100) * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = (0.02) * severeImpact.infectionsByRequestedTime
   * severeImpact.infectionsByRequestedTime;

  impact.dollarsInFlight = impact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * 30;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * 30;

  return {
    data,
    impact,
    severeImpact
  };
};

// formElement.addEventListener('submit', (e) => {
//   covid19ImpactEstimator();
// });

// export default covid19ImpactEstimator;
console.log(covid19ImpactEstimator(data));