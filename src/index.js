import express from 'express';
import cors from 'cors';

import productoRoutes from './routes/producto.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import imagenRoutes from './routes/imagen.routes.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', productoRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', imagenRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
