require('dotenv').config();

const aboutController = async (req, res) => {
    const session = await req.session;

    res.render('about', { header: 'header', footer: 'footer', user: session.user });
};

export default aboutController;
