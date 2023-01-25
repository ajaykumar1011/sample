import { createConnection } from "mysql";
import { hashPassword } from "./utils/hashUtils";
const { makeDb } = require("mysql-async-simple");
const password = hashPassword(`Hello@123`);

export async function dropUser() {
  await dbQuery(`DELETE FROM admins`);
  await dbQuery(`INSERT INTO admins (email, password) VALUES('admin@gmail.com', '${password}')`);
}

export async function dbQuery(queryString: string) {
  var MySQLConnection = createConnection({
    host: `localhost`,
    user: `root`,
    password: `Balla12345`,
    database: `salary_management`
  });
  try {
    var db = makeDb();
    await db.connect(MySQLConnection);
    let resp = await db.query(MySQLConnection, queryString);
    return { success: true, resp };
  } catch (error) {
    return { success: false, error };
  } finally {
    await db.close(MySQLConnection);
  }
}
