require('dotenv').config();
import sequelize from '../sequalize';
import Group from '../sequalizeModels/Group';

const getProductList = async (idnhom) => {
    try {
        // find current user
        const listProducts = await Group.findAll({
            attributes : ['ten','gia','hinhanh','masp'],
            where: {
                idnhom: idnhom,
            },
            limit: 10,
        });
        console.log(listProducts);

        return listProducts;
    } catch (error) {
        console.error('MODEL | GET_LIST_PRODUCT | ERROR |', error);
        return {
            EM: 'GET_LIST_PRODUCT | ERROR | ' + error,
            EC: '500',
        };
    }
};

const getProductInfo = async (masp) => {
    try {
        // find current user
        const productInfo = await Group.findOne({
            attributes : ['ten','gia','hinhanh','mota'],
            where: {
                masp: masp,
            },
        });
        console.log(productInfo);

        return productInfo;
    } catch (error) {
        console.error('MODEL | GET_PRODUCT_INFO | ERROR |', error);
        return {
            EM: 'GET_PRODUCT_INFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

export const productModels = { getProductList };
