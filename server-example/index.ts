import { Elysia } from "elysia";
import db from "./db.json";
import cors from "@elysiajs/cors";

const app = new Elysia();
app.use(cors());

app.get("/filters", () => db.filters);
app.get("/articles/headers", () => db.headers);
app.get("/articles", (req) => {
  const { parent_id = null, filters = "{}" } = req.query ?? {};

  // Apply parent id
  let articles = db.articles.filter((a) => a.parent_id === parent_id);

  // Apply filters
  if (filters) {
    const { unit }: { unit: string } = JSON.parse(filters);
    // Apply unit range
    if (unit) {
      const conditions = {
        "1": (a: any) => a.unit < 1_000 ,
        "2": (a: any) => a.unit >= 1_000 && a.unit < 10_000,
        "3": (a: any) => a.unit >= 10_000,
      };
      const cond = conditions[unit as keyof typeof conditions];
      if (cond) {
        articles = articles.filter((a) => a.categories.some(cond));
      }
    }
  }

  return articles;
});

app.listen(8080);
console.log(`🦊 Server is running at on port ${app.server?.port}...`);
