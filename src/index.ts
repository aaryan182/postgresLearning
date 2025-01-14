import { Client } from "pg";

const client = new Client({
  connectionString: "postgres://postgres:mysecretpassword@localhost/postgres",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
            CREATE TABLE users1 (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

async function insertData() {
  try {
    await client.connect(); 
    const insertQuery =
      "INSERT INTO users1 (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
    const res = await client.query(insertQuery);
    console.log("Insertion success:", res); 
  } catch (err) {
    console.error("Error during the insertion:", err);
  } finally {
    await client.end(); 
  }
}

createUsersTable();
