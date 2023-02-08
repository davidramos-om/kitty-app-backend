import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Platform', { description: 'platform' })
export class PlatformModel {
    @Field(type => String)
    id: string;

    @Field(type => String)
    name: string;

    @Field(type => String)
    symbol: string;

    @Field(type => String)
    slug: string;

    @Field(type => String)
    token_address: string;
}


ObjectType('MarketChartModel', { description: 'MarketChartModel' })
export class MarketChartModel {

    @Field(type => [ Number ])
    prices: number[];

    @Field(type => [ Number ])
    market_caps: number[];

    @Field(type => [ Number ])
    total_volumes: number[];

}