import { Client} from 'pg'

export const existById = async (id: number, client: Client) => {
  return (await client.query(`SELECT * from items where id = ${id}`)).rowCount == 1;
}