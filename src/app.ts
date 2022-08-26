import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import { userRouter } from "./routes/user.routes"
import { sessionRouter } from "./routes/session.routes"
import { categoriesRouter } from "./routes/categories.routes"
import { propertiesRouter } from "./routes/properties.routes"
import { scheduleRouter } from "./routes/schedules.routes"

const app = express()
app.use(express.json())

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/properties", propertiesRouter);
app.use("/schedules", scheduleRouter);

app.use(errorMiddleware);

export default app