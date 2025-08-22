module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,   // Allow null for address
        }
    });

    return Contact;
};