require('dotenv').config();
import Group from '../sequalizeModels/Group';

const getProductList = async (idnhom) => {
    try {
        if (idnhom === 0) {
            const listProducts = await Group.findAll({
                attributes: ['ten', 'gia', 'hinhanh', 'masp'],
                limit: 10,
            });

            return listProducts;
        } else {
            const listProducts = await Group.findAll({
                attributes: ['ten', 'gia', 'hinhanh', 'masp'],
                where: {
                    idnhom: idnhom,
                },
                limit: 10,
            });

            return listProducts;
        }
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
        const productInfo = await Group.findOne({
            attributes: ['ten', 'gia', 'hinhanh', 'mota'],
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

export const productModels = { getProductList, getProductInfo };
