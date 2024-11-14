require('dotenv').config();
import Product from '../sequalizeModels/Product';

const getProductList = async (idnhom) => {
    try {
        if (idnhom === 0) {
            const listProducts = await Product.findAll({
                attributes: ['ten', 'gia', 'hinhanh', 'masp'],
                limit: 10,
            });
            return {
                EM: 'GET_LIST_PRODUCT | INFO | Lấy danh sách sản phẩm của nhóm thành công',
                EC: '200',
                DT: listProducts,
            };
        } else {
            const listProducts = await Product.findAll({
                attributes: ['ten', 'gia', 'hinhanh', 'masp'],
                where: {
                    idnhom: idnhom,
                },
                limit: 10,
            });

            return {
                EM:
                    'GET_LIST_PRODUCT | INFO | Lấy danh sách sản phẩm của nhóm ' +
                    idnhom +
                    ' thành công',
                EC: '200',
                DT: listProducts,
            };
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
        const productInfo = await Product.findOne({
            attributes: ['ten', 'gia', 'hinhanh', 'mota'],
            where: {
                masp: masp,
            },
        });
        return {
            EM: 'GET_PRODUCT_INFO | INFO | Lấy thông tin sản phẩm thành công',
            EC: '200',
            DT: productInfo
        };
    } catch (error) {
        console.error('MODEL | GET_PRODUCT_INFO | ERROR |', error);
        return {
            EM: 'GET_PRODUCT_INFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

export const productModels = { getProductList, getProductInfo };
