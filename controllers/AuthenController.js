require('dotenv').config();

export const loginController = async (req, res) => {
    res.render('login');
};

export const registerController = async (req, res) => {
    res.render('register');
};
