require('dotenv').config();
let express = require('express');
let router = express.Router();
let user = require('../Models/User');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let Razorpay = require('razorpay');
let crypto = require('crypto')
let commen = require('../Models/Comment')




let i = 0;
let authToken = (id, days, hours, minutes, seconds) =>{

    return jwt.sign({id: id}, process.env.SECRET, {expiresIn: days*hours*minutes*seconds});

}
router.post('/register', async(req, res)=>{

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);

    let u1 = await user.findOne({email: req.body.email})

    if(u1){
        res.json({ message : 'A user with this E-mail already exists',toLink: ''});
    }
    else{
    let u = new user({
       index: i,
       fname: req.body.fname,
       lname: req.body.lname,
       email: req.body.email,
       password: hash,
       dob: req.body.dob,
       gender: req.body.gender,
       height: req.body.height,
       weight: req.body.weight,
       activityType: req.body.activityType,
       phone_number: req.body.phonenumber,
       state: req.body.state,
       city: req.body.city,
       reff: Date.now(),
       joined: new Date()  
    })

    try{

        let a1 = await u.save();
        i = i+1;
        let token = authToken(a1._id, 30,24,60,60);
        //res.setHeader('Set-Cookie', ['type=ninja',  'language=javascript']); 
        res.cookie('user-token', token, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none', path: '/', domain: '.onrender.com'});
       


    }catch(err){
        console.log(err);
    }

    res.json({ message: '',toLink: '/login'});
}

})


router.get('/login', async(req, res)=>{

    let token = req.cookies.rs_client;

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
            
            let u = await user.findById(tokenDecoded.id);

            if(u){
                res.json({message: '',toLink: '/', user: u});
            }

        });


    }else{
        //res.setHeader('Set-Cookie', "type=test")
        res.cookie("test", "test values", {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none', path: '/', domain: '.onrender.com'})
        res.json({toLink: ''})
    }


});

router.post('/login', async(req, res)=>{

    

    let u = await user.findOne({email: req.body.email});
       
        if(u){

        
            if(await bcrypt.compare(req.body.password, u.password)){
                let token = authToken(u._id, 30,24,60,60);
                //res.setHeader('Set-Cookie', ['type=ninja',  'language=javascript']);
                res.cookie('user-token', token, {maxAge: 30*24*60*60, httpOnly: true, secure: true, sameSite: 'none', path: '/', domain: '.onrender.com'})
                res.json({toLink: '/', err: ''})
                
            }else{
                res.json({toLink: '', err: 'Invalid E-mail or password'})
            }

        
        }else{
            res.json({toLink: '', err: 'Invalid E-mail or password'})
        }

});

router.get('/prices', (req, res)=>{

    let token = req.cookies.rs_client;

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
            
            let u = await user.findById(tokenDecoded.id);

            if(u){
                res.json({toLink: '', reff: u.reff});
            }

        });


    }else{
      
        res.json({toLink: '/login'})
    }

})

router.post("/orders", (req, res)=>{

    
    
	let instance = new Razorpay({key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET});
	let options = {
		amount: req.body.amount * 100,
		currency: 'INR',
	}

	instance.orders.create(options, function(err, order){
		
		if(err){
		     return res.send({code: 500, message: err})
		}else{

            return res.send({code: 200, message: 'order created', data: order})
        }			

	     
	})

    

})

router.post("/verify", async(req, res)=>{

    let body = req.body.response.razorpay_order_id +"|"+req.body.response.razorpay_payment_id;
	let expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
					.update(body.toString())
					.digest('hex');
	
	if(expectedSignature === req.body.response.razorpay_signature){

        let token = req.cookies.rs_client;

        if(token){

            jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
            
            let u = await user.findById(tokenDecoded.id);

            if(u){
                u.courses.push({course: req.body.activity,
                                duration: req.body.duration,
                                purchaseTime: Date.now(),
                                expire: false})
                
                await u.save()
                res.send({code: 200, message: 'Signature Valid', toLink: '/finalpage'})
            }

        });


        }
        
		
	}else{
		res.send({code: 500, message: 'Signature not valid', toLink: ''})
	}
	
	

})

router.get('/fetchcourseforthanks', (req, res)=>{

    let token = req.cookies.rs_client;

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
           let c = u.courses[u.courses.length - 1];
           res.send({coursePurchased: c})
        }

    });


    }

})

router.get('/yourcourses', (req, res)=>{

    let token = req.cookies.rs_client;

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
           let c = u.courses;
           res.send({coursePurchased: c, toLink: ''})
        }

    });


    }else{
        res.send({toLink: '/login'})
    }

});
router.get('/getlogininfo', (req, res)=>{

    let token = req.cookies.rs_client;

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
          res.json({toLink: ''})
        }

    });


    }else{
        res.json({toLink: '/login'})
    }

})


router.get('/getpersonlogin', (req, res)=>{

    let token = req.cookies.rs_client;

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
          res.json({id: u})
        }

    });


    }else{
        res.send({id: ''})
    }

})
router.get('/logout', (req, res)=>{
    //res.setHeader('Set-Cookie', ['type=ninja',  'language=javascript']);
    res.cookie('user-token', '', {maxAge: 1, httpOnly: true, secure: true, sameSite: 'none', path: '/', domain: '.onrender.com'});
    res.json({toLink: '/'})
})

router.post('/postcomment', (req, res)=>{

    let token = req.cookies.rs_client;

    //console.log(req.body.comment, req.body.stars)

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
            let c = new commen({
                username : u.fname+' '+u.lname,
                comment : req.body.comment,
                stars: req.body.stars+1,
                date: req.body.date
            })
            
            await c.save();
        }

    });

    }

})

router.get('/getcomments', async(req, res)=>{

    let com = await commen.find();

   res.json({comments: com});

})

router.post('/getpurchasetime', (req, res)=>{

    let token = req.cookies.rs_client;

    //console.log(req.body.comment, req.body.stars)

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
            for(let i = 0; i < u.courses.length; i++){
                if(u.courses[i].course === req.body.coursename && u.courses[i].duration === req.body.duration){
                    res.json({purchasedTime: u.courses[i].purchaseTime})
                    break;
                }
            }
        }

    });

    }

});

router.post("/updatecoursestatus", (req, res)=>{

    let token = req.cookies.rs_client;

    //console.log(req.body.comment, req.body.stars)

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
            if(req.body.expire){
                for(let i = 0; i < u.courses.length; i++){
                    if(u.courses[i].course === req.body.coursename && u.courses[i].duration === req.body.duration){
                        u.courses[i].expire = true;
                        let u1 = await u.save();
                        res.json(u1);
                        break;
                    }
                }
            }
        }

    });

    }

})

router.get("/getcoursestatus", (req, res)=>{
    let token = req.cookies.rs_client;

    //console.log(req.body.comment, req.body.stars)

    if(token){

        jwt.verify(token, process.env.SECRET, async(err, tokenDecoded)=>{
        
        let u = await user.findById(tokenDecoded.id);

        if(u){
            if(req.body.expire){
                for(let i = 0; i < u.courses.length; i++){
                    if(u.courses[i].course === req.body.coursename && u.courses[i].duration === req.body.duration){
                        if(u.courses[i].expire === true){
                            res.json({courseExpired : u.courses[i].expire});
                            break;
                        }
                    }
                }
            }else{
                res.json({courseExpired : false});
            }
        }

        });
    }
})


module.exports = router;



