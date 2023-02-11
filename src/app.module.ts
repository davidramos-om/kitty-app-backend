import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DirectiveLocation, GraphQLDirective } from "graphql";

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
      autoSchemaFile: 'schema.gql',
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      playground: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [ DirectiveLocation.FIELD_DEFINITION ],
          }),
        ],
      },
    }),
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule { }
