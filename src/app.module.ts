import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DirectiveLocation, GraphQLDirective } from "graphql";

import { isDevlEnvironment } from 'src/util/helper';
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { CoinsModule } from './coins/coins.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';

@Module({
  imports: [
    CoinsModule,
    ConfigModule.forRoot({
      load: [ configuration ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: 'schema.gql',
      // autoSchemaFile: true,
      autoSchemaFile: isDevlEnvironment() ? 'schema.gql' : true,
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      // playground: isDevlEnvironment(),
      playground: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [ DirectiveLocation.FIELD_DEFINITION ],
          }),
        ],
      },
      cors: {
        origin: '*',
      }
    }),
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
  
export class AppModule { }
