import express = require('express');
import handlers = require('./database') ;
import mongoose from './app';

const router = express.Router();

//get user info based on regNo 
router.get('/getUser',async(request,response)=>{
    var regNo = request.query.regNo ;
    if(!regNo){
        response.status(400).json({
            success: false,
            error:'Bad Request',
            message : 'invalid Parameters'
        });
        return ;
    }
    try{
        await handlers.getUser(regNo).then((data)=>{
            response.json({
                success:true,
                user:data
            }) ;
        }).catch((error)=>{
            response.json({
                success:false,
                error:error
            }) ;
        });
    } catch(error) {
        response.status(500).json({
            success:false,
            error: error
        });
    }
});

router.post('/addUser',async(request,response)=>{
    var regNo = request.query.regNo ;
    var name = request.query.name ;
    var password = request.query.password ;

    if(!regNo || !password || !name) {
        response.status(400).json({
            success:false,
            error:'Bad Request',
            message : 'invalid Parameters'
        });
        return ;
    }
    try{
        await handlers.addUser(name,regNo,password).then((data)=>{
            response.json({
                success:true,
                user:data
            }) ;
        }).catch((error)=>{
            response.json({
                success:false,
                errorCode:error.code,
                message:error.errmsg
            }) ;
        });

    } catch(error) {
        response.status(500).json({
            success:false,
            error: error
        });
    }

});

router.post('/addFavourities',async(request,response)=>{
    var regNo = request.query.regNo ;
    if(!request.query.fav || !regNo) {
        response.status(400).json({
            success:false,
            error : 'Bad Request',
            message : 'Wrong Parameters'
        });
        return ;
    }
    var favArray = request.query.fav.split(',') ;
    
    var i=0;
   
    try{
        await handlers.addFavourities(regNo,favArray).then((data)=>{
            response.json({
                success:true,
                result:data
            });
        }).catch((error)=>{
            response.status(500).json({
                success:false,
                error:error
            });
        });
    } catch(error) {
        response.status(500).json({
            success:false,
            error: error
        });
    }
});

router.post('/removeFavourities',async(request,response)=>{
    var regNo = request.query.regNo ;
    if(!regNo || !request.query.fav) {
        response.status(400).json({
            success:false,
            error : 'Bad Request',
            message : 'Wrong Parameters'
        });
        return ;
    }
    var favArray = request.query.fav.split(',') ;
    try{
        await handlers.removeFavourities(regNo,favArray).then((data)=>{
            response.json({
                success:true,
                result:data
            });
        }).catch((error)=>{
            response.status(500).json({
                success:false,
                error:error
            });
        });
    } catch(error) {
        response.status(500).json({
            success:false,
            error: error
        });
    }
    
});



export default router ;