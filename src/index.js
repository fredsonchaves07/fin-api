const express = require('express')
const { v4: uuidv4 } = require("uuid")

const app = express()

app.use(express.json())

const customers = []

app.post('/account', (request, response) => {
    const { cpf, name } = request.body

    const customAlteadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if(customAlteadyExists){
        return response.status(400).json({
            error: 'Customer already Exists'
        })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send()
})

app.listen(5000)