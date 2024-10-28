import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://carmarketplace_owner:Ln1D2HlMYcrx@ep-small-block-a5uv42ub.us-east-2.aws.neon.tech/ai-room-redesign?sslmode=require',
  },
});