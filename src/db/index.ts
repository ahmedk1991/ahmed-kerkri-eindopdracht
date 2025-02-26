import * as schema from "./schema";

import {drizzle} from "drizzle-orm/d1";
import {neon, NeonQueryFunction} from "@neondatabase/serverless";

const client = neon(process.env.NEXT_PUBLIC_DATABASE_URL!) as NeonQueryFunction<false, false>;


export const db = drizzle({ client, schema });

