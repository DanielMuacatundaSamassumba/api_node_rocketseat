import { app } from "./app"
import { enV } from "../env"

app.listen({
    port: enV.PORT,
    host: "0.0.0.0"
}).then(() => console.log("🚀 the aplications is running on port 3000"))

