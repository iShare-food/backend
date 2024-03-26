import express, {Express} from 'express';
import cors from 'cors';

export const app: Express = express();

app.use(express.json()); //pra entender os bodys passados
app.use(cors());  //pra não tomar erro de porta

// Criação do servidor
import { AddressInfo } from "net";

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    };
});
