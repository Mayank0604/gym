const mongoose=require("mongoose")


        mongoose.connect('mongodb+srv://thenikhilsingh27:9873636115@gym.mssjbxw.mongodb.net/GYM_Managemenet_Project', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() =>{
            console.log('Connected to MongoDB');
    }).catch ((error) =>{
        console.error('Connection to MongoDB failed:', error);
    })

