const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const axios = require('axios')
const MY_API_KEY = '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'

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-vwhburmVsmqKT8k3eAvtDv6V",
  apiKey: MY_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = openai.listEngines();

console.log("response")
console.log("================")
console.log(response)

// router.get('/secret', isLoggedIn, (req, res, next) => {
//   res.json({
//     secret: 42,
//     user: req.user,
//   })
// })


router.get('/', (req, res, next) => {
  console.log("hitting hitting api")

  res.json({
    body: "helloooo"
  })
})


router.get('/nomadGetting', async (req, res) => {
  console.log("HITTING THE NEW ROUTE")

  try {
    const response = await axios.get('https://api.openai.com/v1/models/text-davinci-003', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MY_API_KEY}`
      }
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.log("errror")
    console.log(error)
    res.status(500).json({ message: error.message });
  }

})
router.post('/nomadCoding', async (req, res) => {
  console.log("hello hitting open ai endponint")
  console.log(req.body)
  const prompt = req.body.prompt;
  console.log(prompt)
  const maxTokens = req.body.maxTokens || 100;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: maxTokens,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MY_API_KEY}`
      }
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.log("errror")
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});


module.exports = router
