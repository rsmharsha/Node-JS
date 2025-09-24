// It should have 4 routes

// 1. http://localhost:3000/multiply?a=1&b=2
// 2. [http://localhost:3000/add?a=1&b=2](http://localhost:3000/multiply?a=1&b=2)
// 3. [http://localhost:3000/divide?a=1&b=2](http://localhost:3000/multiply?a=1&b=2)
// 4. [http://localhost:3000/subtract?a=1&b=2](http://localhost:3000/multiply?a=1&b=2)
const express = require("express");
const app = express();

app.get("/sum", function(req, res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    res.json({
        ans: a + b
    });
});

app.get("/multiply", function(req, res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    res.json({
        ans: a * b
    });
});

app.get("/divide", function(req, res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (b === 0) {
        return res.status(400).json({ error: "Division by zero is not allowed" });
    }

    res.json({
        ans: a / b
    });
});

app.get("/subtract", function(req, res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    res.json({
        ans: a - b
    });
});

app.listen(3000, () => {
    console.log("Calculator API running on http://localhost:3000");
});
