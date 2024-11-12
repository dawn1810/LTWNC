import { productModels } from "../models/ProductModel";

export const getProductList = async (req, res) => {
    const idnhom = req.body.idnhom;
    const result = await productModels.getProductList(idnhom);

    return res.status(200).json(result);
};

export const getProductInfo = async (req, res) => {
    const idnhom = req.body.masp;
    const result = await productModels.getUserInfo(masp);

    return res.status(200).json(result);
};

export default homeController;
