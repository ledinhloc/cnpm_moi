import express, {Express} from "express";
import homeController from "../controllers/homeController";
let router = express.Router();
let initWebRoutes = (app: Express) => {
    router.get('/', (req, res) => {
        return res.send('Nguyễn Hữu Trung');
    });
    router.get('/home', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getFindAllCrud);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    return app.use("/", router);
}
export default initWebRoutes;