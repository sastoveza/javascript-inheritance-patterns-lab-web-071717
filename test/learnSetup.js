let skippedTests;

after(() => {
  const mochaResults = mocha.suite.suites[0].suites;
  const payload = computeResults(mochaResults);

  if (!skippedTests) {
    fetch('.learn.auth.data.json')
      .then(file => file.json())
      .then(json => Object.assign({}, json, payload))
      .then(payload => postPayload(payload))
      .catch(error => console.error(error));
  } else {
    console.warn("Not all tests ran.");
  }
});

function computeResults(testSuites) {
  let passed = 0;
  let failed = 0;
  let pending = 0;

  for (let i = 0; i < testSuites.length; i++) {
    for (let j = 0; j < testSuites[i].tests.length; j++) {
      const test = testSuites[i].tests[j];

      if (test.state === "passed") {
        passed++;
      } else if (test.state === "failed") {
        failed++;
      } else if (test.pending) {
        pending++;
      } else {
        skippedTests = true;
      }
    }
  }

  return {
    "passing_count": passed,
    // "failure_count": failed,
    // "pending_count": pending,
    "examples": passed + failed + pending
  };
}

function postPayload(payload) {
  fetch('http://ironbroker-v2.flatironschool.com/e/flatiron_mocha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    mode: "no-cors"
  })
    .then(response => {
      if (response.ok) {
        // Parse response and print relevant data to student, such as a confirmed submission message
      } else if (response.type === 'opaque') {
        console.warn("'no-cors' mode enabled.")
      } else {
        console.error(response);
      }
    })
    .catch(error => console.error(error));
}