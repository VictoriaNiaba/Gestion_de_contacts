
import { ConfigService } from '@nestjs/config/dist';
import { ConnectionOptions, createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) => {
      
      // Configuration partagée entre production et développement
      let connexionOptions: ConnectionOptions = {
        type: "postgres",
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ]
      };

      // Configuration spécifique à production
      if (configService.get("DATABASE_URL")) {
        connexionOptions = Object.assign(connexionOptions, {
          url: configService.get("DATABASE_URL")
        });
      }
      // Configuration spécifique à développement
      else {
        connexionOptions = Object.assign(connexionOptions, {
          host: configService.get("DATABASE_HOST"),
          port: configService.get("DATABASE_PORT"),
          username: configService.get("DATABASE_USER"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_NAME"),
          "synchronize": true
        });
      }

      return await createConnection(connexionOptions);
    },
    inject: [ConfigService]
  },
];
