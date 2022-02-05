const OpenAI = require('openai-api');
const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server);
const key = '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'
const openai = new OpenAI(key);

app.use(express.static(__dirname +"/public"))
app.use(express.json())

io.on('connection', socket =>{
    async function irena(event){
        const gptResponse = await openai.complete({
            engine: 'text-davinci-001',
            prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou:${event}`,
            temperature:0.5,
            max_tokens:2000,
            top_p:0.3,
            frequency_penalty:0.5,
            presence_penalty:0.0
        });
    
        socket.emit('response', (gptResponse.data.choices[0].text).slice(7))
    };
    socket.on('question', event => {
        irena(event)
    })
})



app.get('/', (req,res)=>{
    
    
})

server.listen(3000)