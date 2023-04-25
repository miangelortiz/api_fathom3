// Declare globally so that it is in our Fastify instance.
declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            id: number;
            name: string;
            email: string
        };
    }
}

// Declare globally enviroment variables
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        HOST: string,
        PORT: number,
        JWT_SECRET: string,
      }
    }
}

export {}