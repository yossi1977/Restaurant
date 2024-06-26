const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config();
require("./db/db")()

const dishes_router = require("./router/dishes_router")
const workers_router = require("./router/workers_router")
const event_router = require("./router/event_router")
const client_router = require("./router/client_router")
const user_router = require("./router/user_router")


app.use(express.json())
app.use(cors(({
    credentials:true,
    origin:"*",
    optionsSuccessStatus:200
})))

app.use("/dishes",dishes_router)
app.use("/workers",workers_router)
app.use("/events",event_router)
app.use("/clients",client_router)
app.use("/users",user_router)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`server is run on port ${port}`)
})