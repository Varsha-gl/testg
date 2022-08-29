const express=require('express')
const app=express()
const bp=require('body-parser')
const jwt=require('jsonwebtoken')
const userCredentials=require('./data/credentials')
const cors=require('cors')
const authorize=require('./authorize')
const cookieparser=require('cookie-parser')
app.use(cors({origin:'http://localhost:3000',credentials:true}))
app.use(bp.json())
app.use(cookieparser())

app.post('/signin',(req,res)=>{
const data=req.body
const result=userCredentials.find((item)=>item.email===data.email)
if(data.password===result.password){
    const token=jwt.sign({email:data.email},'jamesbond',{expiresIn:'60'})
    res.send({"msg":'authenticated',"status":true,"accesstoken":token})
}
else{
    res.send({"msg":' not authenticated',"status":false})
}
})
app.post('/login',(req,res)=>{
    const data=req.body
    const result=userCredentials.find((item)=>item.email===data.email)
    if(data.password===result.password){
        const token=jwt.sign({email:data.email},'jamesbond')
        console.log(token)
        res.status(200).cookie('sometokevalue',token,{sameSite:'strict',httpOnly:true})
        res.send({"msg":'you are authenticated',"status":true})   
    }
    else{
        res.send({"msg":' not authenticated',"status":false})
    }
})
app.post('/delete',authorize,(req,res)=>{
    res.send({"msg":'deleted successfully'})
})
app.post('/update',authorize,(req,res)=>{
    console.log(req.cookies)
   res.send({"msg":"you are authorized"})
})

app.post('/seecookie',(req,res)=>{
   
res.send('cookie is seen')
})

app.listen(3001,()=>console.log('server started at port 3001'))