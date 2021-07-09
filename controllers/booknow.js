const client = require('../config/db');
const jwt = require('jsonwebtoken');
//email from token 


exports.bookNow = (req, res) => {
  
    const token = req.headers.authorization;
  console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(decoded) // bar
            const email = decoded.email;
            const {selectedSeats , date  } = req.body;
            const movieName = req.query.movieName;
            
            // const seatobj = JSON.stringify(seats);
            // const seatobj  =JSON.stringify(Object.assign({}, seats))
        
        
            console.log(movieName, " ", selectedSeats, " ", date);
                
            
        
            // client.query(`INSERT INTO BOOKDB (movieName ,email, seats,date ) values('${movieName}' , '${email}' ,  '{${selectedSeats}}' , '${date}') ;`)
            //     .then(
            //         res.status(200).json({
            //             message: "Movie booked succesfully"
            //         })
            //     ).catch((err) => {
            //         console.log(err);
            //         res.status(500).json({
            //             message: "Error Submitting Feedback"
            //         })
            //     });
            
            res.status(200).json({
                            message: "Movie booked succesfully"
                        })
            
        }
    });
 

};


exports.showseat = (req, res) => {
    
    // const token = req.params.token;
    // const token = req.headers.authorization;
    // const email = req.query.email;
    //     var decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded) // bar
    //     const email = decoded.email;
    const token = req.headers.authorization;
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(decoded) // bar
            const email = decoded.email;
        
    
            console.log(email);

            client.query(` SELECT * FROM bookdb WHERE email = '${email}' `)
                .then((data) => {

                    console.log(data);
                    res.status(200).send(data.rows);
          
                })
        }

    });
}



exports.sendseat = (req, res) => {

    client.query(`select * from seatdb where movieName = 'Black Panther';`)
    .then((data) => {

        console.log(data);
        res.status(200).send(data.rows);

    })
}