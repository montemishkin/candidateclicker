export default function applySchema(db) {
    const Candidate = db.define('candidate', {
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        clicks: {
            type: Sequelize.INTEGER,
        },
    })
}
