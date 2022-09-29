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

const getAllOrders = (request, response) => {
    pool.query('select * from "Order_History" order by "Order_Number" asc', (e, res) => {
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

const getPopularProducts = (request, response) => {
    pool.query('select * from "ProductList" where "popular" is true order by "id" asc', (e, res) => {
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

    pool.query('select * from "ProductList" where "category" = $1 order by "title" asc', [id], (e, res) => {
        if (e) {
            throw e;
        }

        response.status(200).json(res.rows);
    })
}

const getTypedAccessories = (request, response) => {
    const id = request.params.id;
    let noll = 'null';
    let bag = '';
    let ind = '';
    let lan = '';
    let mug = '';
    let sup = '';
    let rec = '';
    let tec = '';

    if (id[0] == '1') { bag = 'bag'; } else { bag = 'null' }
    if (id[1] == '1') { ind = 'indycar'; } else { ind = 'null' }
    if (id[2] == '1') { lan = 'lanyard'; } else { lan = 'null' }
    if (id[3] == '1') { mug = 'mug'; } else { mug = 'null' }
    if (id[4] == '1') { sup = 'supplies'; } else { sup = 'null' }
    if (id[5] == '1') { rec = 'recreational'; } else { rec = 'null' }
    if (id[6] == '1') { tec = 'technology'; } else { tec = 'null' }

    pool.query('select * from "ProductList" where "id" > 2000 and 1 = 1 and "type" = $1 or "type" = $2 or "type" = $3 or "type" = $4 or "type" = $5 or "type" = $6 or "type" = $7 or "type" = $8 order by "title" asc;', [noll, bag, ind, lan, mug, sup, rec, tec], (e, res) => {
        if (e) {
            throw e;
        }
        response.status(200).json(res.rows);
    })
}

module.exports = {
    getUsers,
    getUserById,
    getAllOrders,
    getOrderInfo,
    postOrderInfo,
    getProductList,
    getProductById,
    getProductByCategory,
    getPopularProducts,
    getTypedAccessories
}