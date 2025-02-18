const corsOptions = {
    origin: 'http://localhost:3000',  // Permitir solo el origen del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Aplica la configuración de CORS
