// Local development only. Never imported by a production build (see the LOCAL_DB branch in client.ts).
import { createClient } from "@libsql/client";

export const createLocalClient = (url: string, authToken?: string) => createClient({ url, authToken });
