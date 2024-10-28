import { drizzle } from "drizzle-orm/neon-http";
export const db = drizzle(
  "postgresql://carmarketplace_owner:Ln1D2HlMYcrx@ep-small-block-a5uv42ub.us-east-2.aws.neon.tech/ai-room-redesign?sslmode=require"
);
