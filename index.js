var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
const server = require('http').Server(app);
var bodyParser = require("body-parser");

var app = express()
 

 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 




app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use(session({
    secret: 'whaterver',
    resave: false,
    saveUninitialized: true
  }))

function createID(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 16; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};

function copyObject(mainObj) {
    let objCopy = {}; // objCopy will store a copy of the mainObj
    let key;
  
    for (key in mainObj) {
      objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
}


var AdminDatabase = {};
var AgentDatabase = {};
var PersonDatabase = {};
var AgentDatabase = {};
var Disburse = {};
var Property = {};


exports.createID = function createID(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 16; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};


app.post('/Login', function (req, res, next) {
    let Username = req.body.Username || req.params.Username;
    let Password = req.body.Password || req.body.Password;
    req.session.username = Username;

    if (!(Username&&Password)){
        res.json({
            message:"Missing a Username or Password"
        });
        return;

    }

    res.json({
        returnValues:[Username,Password]
      });
    

})


app.post('/Admin', function (req, res, next) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }

    let Name = req.body.Name || req.params.Name;
    let Icon = req.body.Icon || req.body.Icon;
    let Country = req.body.Country || req.params.Country;
    let Region1 = req.body.Region1 || req.body.Region1;
    let Region2 = req.body.Region2 || req.params.Region2;

    let Key = req.body.Key || req.params.Key;

    if (!Key){
        Key = createID();
    }

    if (!(Name&&Icon&&Country&&Region1&&Region2)){
        res.json({
            message:"Missing a Name or Icon or Country or Region1 or Region2"
        });
        return;

    }

    AdminDatabase[Key]= {Name,Icon,Country,Region1,Region2};

    res.json({
        returnValues:{Name,Icon,Country,Region1,Region2,Key}
    });
})

app.get('/Admin', function (req, res) {
    let Key = req.params.Key || req.query.Key;

    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    res.json({
        ReturnValues:{Key},
        Data:AdminDatabase[Key]
    });
})

app.get('/AdminAll', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    res.json({
        Data:AdminDatabase
    });
})

app.get('/Person', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    let Key = req.params.Key || req.query.Key;
    res.json({
        ReturnValues:{Key},
        Data:PersonDatabase[Key]
    });
})

app.post('/Person', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    if (!AdminDatabase[req.session.username]){
        res.json({
            message:"Not Logged In as Administrator"
        });
        return
    }

    let Key = req.body.Key || req.params.Key;

    if (!Key){
        Key = createID();
    }

    let Name = req.body.Name || req.params.Name;
    let Icon = req.body.Icon || req.body.Icon;
    let Country = req.body.Country || req.params.Country;
    let Region1 = req.body.Region1 || req.body.Region1;
    let Region2 = req.body.Region2 || req.params.Region2;
    let Organization = req.session.username;

    if (!(Name&&Icon&&Country&&Region1&&Region2)){
        res.json({
            message:"Missing a Name or Icon or Country or Region1 or Region2"
        });
        return;

    }

    PersonDatabase[Key]= {Name,Icon,Country,Region1,Region2,Organization};

    res.json({
        returnValues:{Name,Icon,Country,Region1,Region2,Key}
    });
       
})

app.get('/PersonAll', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    res.json({
        Data:PersonDatabase
    });
})


app.get('/Agent', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    let Key = req.params.Key || req.query.Key;
    res.json({
        ReturnValues:{Key},
        Data:AgentDatabase[Key]
    });
})

app.post('/Agent', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    if (!AdminDatabase[req.session.username]){
        res.json({
            message:"Not Logged In as Administrator"
        });
        return
    }
    let Name = req.body.Name || req.params.Name;
    let Icon = req.body.Icon || req.body.Icon;
    let Country = req.body.Country || req.params.Country;
    let Region1 = req.body.Region1 || req.body.Region1;
    let Region2 = req.body.Region2 || req.params.Region2;
    let Organization = req.session.username;

    let Key = req.body.Key || req.params.Key;

    if (!Key){
        Key = createID();
    }

    if (!(Name&&Icon&&Country&&Region1&&Region2)){
        res.json({
            message:"Missing a Name or Icon or Country or Region1 or Region2"
        });
        return;

    }

    AgentDatabase[Key]= {Name,Icon,Country,Region1,Region2,Organization};

    res.json({
        returnValues:{Name,Icon,Country,Region1,Region2,Key}
    });
})

app.get('/AgentAll', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    res.json({
        Data:AgentDatabase
    });
})

app.get('/Disburse', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    let Key = req.params.Key || req.query.Key;
    res.json({
        ReturnValues:{Key},
        Data:Disburse[Key]
    });

})

app.post('/Disburse', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    if (!AdminDatabase[req.session.username]){
        res.json({
            message:"Not Logged In as Administrator"
        });
        return
    }
    
    let Name = req.body.Name || req.params.Name;
    let Icon = req.body.Icon || req.body.Icon;
    let Country = req.body.Country || req.params.Country;
    let Region1 = req.body.Region1 || req.body.Region1;
    let Region2 = req.body.Region2 || req.params.Region2;
    let Organization = req.session.username;

    let Key = req.body.Key || req.params.Key;

    if (!Key){
        Key = createID();
    }
    if (!(Name&&Icon&&Country&&Region1&&Region2)){
        res.json({
            message:"Missing a Name or Icon or Country or Region1 or Region2"
        });
        return;

    }

    Disburse[Key]= {Name,Icon,Country,Region1,Region2};
    
    res.json({
            returnValues:{Name,Icon,Country,Region1,Region2,Key}
    });
})

app.get('/DisburseAll', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    res.json({
        Data:Disburse
    });
})

app.get('/Property', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    let Key = req.params.Key || req.query.Key;
    res.json({
        ReturnValues:{Key},
        Data:PersonDatabase[Key]
    });
})

app.post('/Property', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }

    let Address1 = req.body.Address1 || req.params.Address1;
    let Address2 = req.body.Address2 || req.params.Address2;
    let Country = req.body.Country || req.params.Country;
    let Region1 = req.body.Region1 || req.body.Region1;
    let Region2 = req.body.Region2 || req.params.Region2;
    let Owners = req.body.Owners || req.params.Owners;
    let States = req.body.States || req.params.States;

    if (!(Address1&&Address2&&Country&&Region1&&Region2&&Owners&&States)){
        res.json({
            message:"Address1 or Address2 or Country or Region1 or Region2 or Owners or States"
        });
        return;

    }

    try {
        Owners = JSON.parse(Owners);
        States = JSON.parse(States);
    }
    catch(err) {
        res.json({
            message:"Could Not Parse JSON "
        });
        return
    }

    
    
    
    let Key = createID();
    Property[Key]= {Address1,Address2,Country,Region1,Region2,Owners,States,Key};
    
    res.json({
            returnValues:{Address1,Address2,Country,Region1,Region2,Owners,States,Key},
            Data:Property[Key],
            Key
            
    });
})

app.get('/PropertyAll', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }
    res.json({
        Data:Property
    });
})

var Agreement = {};

app.get('/AgreementAll', function (req, res) {
    res.json({
        Data:Agreement
    });
});

app.post('/DraftAgreement', function (req, res) {
    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }

    let Hash = req.body.Hash || req.params.Hash;
    let Storage = req.body.Storage  || req.params.Storage ;
    let Signers = req.body.Signers || req.params.Signers;
    let State = req.body.State || req.params.State;
    let Type = req.body.Type || req.params.Type;
    let Signed = [req.session.username];

    if (!(Hash&&Storage&&Signers&&State&&Type&&Signed)){
        res.json({
            message:"Hash or Storage or Signers or State or Type or Signed"
        });
        return;

    }

    try {
        Signers = JSON.parse(Signers);
        Signers.push(req.session.username);
        State = JSON.parse(State);
    }
    catch(err) {
        res.json({
            message:"Could Not Parse JSON "
        });
        return
    }


    let Key = createID();
    Agreement[Key]= {Hash,Storage,Signers,State,Type, Signed};

    res.json({
        Data:Agreement[Key],
        Key
    });


})

app.post('/RedraftAgreement', function (req, res) {

    let Key = req.body.Key || req.params.Key;

    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }

    if (!Key){
        res.json({
            message:"No Key"
        });
        return
    }



    let currentValue = Agreement[Key];

    if (!currentValue){
        res.json({
            message:"Key Not Valid"
        });
        return
    }

    if (!currentValue.Signed.includes(req.session.username)){
        res.json({
            message:"Can Not Alter This Agreement"
        });
        return
    }
    let PastData;
    if (!copyObject.pastVersion){
        PastData = [copyObject(currentValue)];
    } else {
        PastData = currentValue.pastData.slice(0);
        delete currentValue.pastData;
        PastData.push(copyObject(currentValue));
    }
    let Hash = req.body.Hash || req.params.Hash;
    let Storage = req.body.Storage  || req.params.Storage ;
    let Signers = req.body.Signers || req.params.Signers;
    let Signed = [req.session.username];
    let State = req.body.State || req.params.State;
    let Type = req.body.Type || req.params.Type;

    try {
        Signers = JSON.parse(Signers);
        Signers.push(req.session.username);
        State = JSON.parse(State);
    }
    catch(err) {
        res.json({
            message:"Could Not Parse JSON "
        });
        return
    }

    Agreement[Key]= {Hash,Storage,Signers,State,Type, PastData,Signed};

    res.json({
        returnValues:{Hash,Storage,Signers,State,Type, Signed},
        Data:Agreement[Key],
        Key
    });

})

app.post('/CancelAgreement', function (req, res) {
    let Key = req.body.Key || req.params.Key;

    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }

    if (!Key){
        res.json({
            message:"No Key"
        });
        return
    }



    let currentValue = Agreement[Key];

    if (!currentValue){
        res.json({
            message:"Key Not Valid"
        });
        return
    }

    if(!req.session.username){
        for (var i=currentValue.Signed.length-1; i>=0; i--) {
            if (currentValue.Signed[i] === req.session.username) {
                currentValue.Signed.splice(i, 1);
            }
        }
    }

    res.json({
        Data:Agreement[Key],
        Key
    });
    

})

app.post('/SignAgreement', function (req, res) {
    let Key = req.body.Key || req.params.Key;
    value = Property[Key];

    if(!req.session.username){
        res.json({
            message:"Not Logged In"
        });
        return
    }

    let currentValue = Agreement[Key];

    if (!currentValue){
        res.json({
            message:"Key is Not Valid"
        });
        return
    }

    if (!currentValue.Signed.includes(req.session.username)){
        res.json({
            message:"Can Not Alter This Agreement"
        });
        return
    }

    currentValue.Signed.push(req.session.username);

    if (currentValue.Signed.length === currentValue.Signers.length){
        currentValue.completedData = Date();
    }


    res.json({
        Data:Agreement[Key],
        Key
    });

    
})


