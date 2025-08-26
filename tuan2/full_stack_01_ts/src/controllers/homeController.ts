import {Request, Response} from "express";
import CRUDService from "../services/CRUDService";
import db from "../models";

let getHomePage = async (req: Request, res: Response) => {
    try{
        let data = await db.User.findAll();
        console.log('......................');
        console.log(data);
        console.log('......................');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch(e){
        console.log(e);
    }
}

let getAboutPage = (req: Request, res: Response)=>{
    return res.render('test/about.ejs');
}

let getCRUD = (req: Request, res: Response)=>{
    return res.render('crud.ejs');
}

let getFindAllCrud = async (req: Request, res: Response)=>{
    let data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data
    })
}

let postCRUD = async (req: Request, res: Response) =>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post crud to server');
}

let getEditCRUD = async (req: Request, res: Response)=>{
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/updateUser.ejs', {
            data: userData
        })
    } else{
        return res.send('khong lay duoc id');
    }
}

let putCRUD = async (req: Request, res: Response)=>{
    let data = req.body;
    let data1 = await CRUDService.updateUser(data);
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    })
}

let deleteCRUD = async (req: Request, res: Response)=>{
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!');
    }else{
        return res.send('Not find user');
    }
}
export default {
    getHomePage : getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
}