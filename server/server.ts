import express from 'express';
import type { Application } from 'express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen("8000", () => console.log("Server started on port 8000"));
