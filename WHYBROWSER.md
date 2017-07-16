# Why test in-browser?
- Faster
  + No annoying timeout errors
- Much easier to adjust what data gets sent to Ironbroker than it is w/ barfing out info into .results.json
- We aren't teaching the students Node, so why are we testing in it? We're teaching client-side JS, so let's test in the browser.
- Node has so many eccentricities (especially w/r/t scope of multiple JS files) that require so much hacky, brittle stuff to test early JS (basically until we introduce the module pattern / module.exports)
- Browser tests are a lot prettier and easier to read/understand and debug with
  + So easy to run a single test
- Students can play with their code in the JS console

# Things to improve
- `.gitignore` the `.learn.auth.data.json` files for now, but figure out a better solution
  + On the same note, figure out a more seamless solution for handling the flow — right now, the ruby server takes over learn-test's process, and using ctrl-C exits from both with an ugly stacktrace