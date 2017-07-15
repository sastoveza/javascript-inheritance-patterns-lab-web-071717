const payload = {
  "build": {
    "test_suite": [
      {
        "duration": {}
      }
    ]
  },
  "ide_container": false, // Ruby script in learn-test should write this information to the local file that we fetch
  "repo_name": "javascript-inheritance-patterns-lab-v-000", // Same
  "ruby_platform": "x86_64-darwin16" // Same
};

let startTime;

before(() => {
  console.log('before');

  startTime = Date.now();
});

after(() => {
  console.log('after');

  const endTime = Date.now();

  const duration = payload.build.test_suite[0].duration;
  duration.start = new Date(startTime).toISOString();
  duration.end = new Date(endTime).toISOString();
  duration.duration = endTime - startTime;


  const suites = mocha.suite.suites[0].suites;
  countTests(suites);

  // debugger;

  // console.dir(mocha.suite.suites[0].suites);

  // payload['build']['test_suite'] = this.test.parent.suites[0].suites

  console.dir(payload);

  fetch('.netrc')
    .then(file => file.text())
    .then(netrc => {
      const tokenStart = netrc.indexOf('learn-config') + 38;

      payload['learn_oauth_token'] = netrc.substr(tokenStart, 64);

      const re = /flatiron-push\s+login\s([A-Za-z0-9-]+)\s+password\s([^\n]+)/;
      const result = netrc.match(re);

      payload['username'] = result[1];
      payload['github_user_id'] = result[2];
    })
    .then(() => {
      fetch('http://ironbroker-v2.flatironschool.com/e/flatiron_mocha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        mode: "no-cors"
      })
        .then(response => response.json())
        .then(parsedResponse => console.dir(parsedResponse))
        .catch(error => console.dir(error));
    });
});

function countTests(testSuites) {
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
      }
    }
  }

  payload.passing_count = passed;
  payload.failure_count = failed;
  payload.pending_count = pending;
  payload.examples = passed + failed + pending;
}
