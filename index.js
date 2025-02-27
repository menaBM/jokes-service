const express = require('express');
const app = express();
const { Joke, Sequelize } = require('./db');
const Op = Sequelize.Op

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    let jokes = [];
    
    if (req.query){
      jokes = await Joke.findAll({where: {
        tags:{
          [Op.substring]: req.query.tags??""
        },
        joke: {
                [Op.substring]: req.query.content??""
              }
      }
      })
    // }else if(req.query.content){
    //   jokes = await Joke.findAll({where: {
    //     joke: {
    //       [Op.substring]: req.query.content
    //     }}})
    }else{
    jokes = await Joke.findAll()
  }

    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

app.post("/jokes", async(req,res,next)=>{
  try{
    const joke = await Joke.create(req.body)
    res.status(201).send(joke)
  }catch(error){
    next(error)
  }
})

// we export the app, not listening in here, so that we can run tests
module.exports = app;
