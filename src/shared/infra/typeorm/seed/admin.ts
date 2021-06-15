import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash(process.env.HASH_ADMIN, 8);

  await connection.query(
    `
      INSERT INTO USERS(id, email, password, created_at)
      values('${id}', 'admin@email.com', '${password}','now()')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
