import { models } from '../models/HomeModel';
import { productModels } from '../models/ProductModel';

export const getGroupList = async (req, res) => {
    const result = await models.getGroups();

    return res.status(200).json(result);
};

export const getProductList = async (req, res) => {
    const idnhom = req.body.idnhom;
    const result = await productModels.getProductList(idnhom);

    return res.status(200).json(result);
};

export const getProductInfo = async (req, res) => {
    const masp = req.body.masp;
    const result = await productModels.getProductInfo(masp);

    return res.status(200).json(result);
};
