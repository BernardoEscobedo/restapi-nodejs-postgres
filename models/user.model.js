import {db} from '../database/connection.database.js'

const create = async ({email, password, username}) => {
    const query={
        text: `
        INSER INTO users (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        values: [email, password, username]
    }

    const {rows} = await db.query(query);
    return rows;
}

export const UserModel = {
    create
}