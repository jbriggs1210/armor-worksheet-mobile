import { drizzle } from "drizzle-orm/libsql/web";

const runtimeConfig = useRuntimeConfig();
export const db = drizzle({
    connection: {
        url: runtimeConfig.public.DB_URL,
        authToken: runtimeConfig.public.DB_SECRET,
    }, casing: "snake_case"
});