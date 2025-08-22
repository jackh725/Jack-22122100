module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        company_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        company_address: {
            type: Sequelize.STRING,
            allowNull: true,
          },
        contact_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "contacts",   // connect to  contacts table
                key: "id",
            },
            allowNull: false,
          }
    });

    return Company;
};