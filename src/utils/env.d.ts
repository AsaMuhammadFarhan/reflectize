declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NODE_ENV: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_WEB_URL: string;

    EMAIL_SMPT_HOST: string;
    EMAIL_SMPT_PORT: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;

    OPENAI_API_KEY: string;
  }
}
