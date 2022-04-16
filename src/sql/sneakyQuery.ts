import db from "../config/database.config";

const queryFunc = async () => {
    try {
        // run query `DROP TABLE studentinfo`
        const result = await db.query(`DROP TABLE studentinfo`);
        console.log(result);
    }
    catch (err) {
        console.error(err);
        return err;
    }
}

queryFunc();