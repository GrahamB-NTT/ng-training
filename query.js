const Pool = require('pg').Pool;
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'AngularTraining',
    password: 'postgres',
    port: '5432'
});

const getUsers = (request, response) => {
    pool.query('select * from "Customer_Info" order by "Customer_Name" asc', (e, res) => {
        if (e) {
            throw e;
        }

        response.status(200).json(res.rows);
    })
}

const getUserById = (request, response) => {
    const id = request.params.id;

    pool.query('select * from "Customer_Info" where "Customer_Name" = $1 or "Customer_Email" = $1', [id], (e, res) => {
        if (e) {
            throw e;
        }

        response.status(200).json(res.rows);
    })
}

const getOrderInfo = (request, response) => {
    const id = request.params.id;

    pool.query('select * from "Order_History" where "Customer_Name" = $1 or "Customer_Email" = $1', [id], (e, res) => {
        if (e) {
            throw e;
        }

        response.status(200).json(res.rows);
    })
}

const postOrderInfo = (request, response) => {
    const { name, email, ordernum, orderdesc, date, paid } = request.body;

    pool.query('insert into "Order_History" ("Customer_Name", "Customer_Email", "Paid", "Transaction_Date", "Order_Description", "Order_Number") values ($1, $2, $3, $4, $5, $6) returning *', 
    [name, email, paid, date, orderdesc, ordernum], (e, res) => {
        if (e) {
            throw e;
        }

        response.status(201).send(`Order added with ID: ${res.rows[0].id}`);
    })
}

const getProductList = (request, response) => {
    pool.query('select * from "ProductList" order by "id" asc', (e, res) => {
        if (e) {
            throw e;
        }

        response.status(200).json(res.rows);
    })
}

const getProductById = (request, response) => {
    const id = request.params.id;

    pool.query('select * from "ProductList" where "id" = $1', [id], (e, res) => {
        if (e) {
            throw e;
        }

        response.status(200).json(res.rows);
    })
}

const getProductByCategory = (request, response) => {
    const id = request.params.id;

    pool.query('select * from "ProductList" where "category" = $1', [id], (e, res) => {
        if (e) {
            throw e;
        }

        response.status(200).json(res.rows);
    })
}

module.exports = {
    getUsers,
    getUserById,
    getOrderInfo,
    postOrderInfo,
    getProductList,
    getProductById,
    getProductByCategory
}