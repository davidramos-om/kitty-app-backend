import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { PlatformModel } from './PlatformModel';

@ObjectType('CoinStats')
export class CoinStatsModel {

    @Field(type => String, { description: 'id' })
    id: string;

    @Field(type => String)
    @Directive('@upper')
    symbol: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    usd_price: number;

    @Field({ nullable: true })
    creationDate: Date;

    @Field({ nullable: false, defaultValue: 0 })
    cmc_rank: number;

    @Field({ nullable: false, defaultValue: 0 })
    max_supply: number;

    @Field({ nullable: false, defaultValue: 0 })
    circulating_supply: number;

    @Field({ nullable: false, defaultValue: 0 })
    total_supply: number;

    @Field({ nullable: false, defaultValue: 0 })
    market_cap_usd: number;


    @Field({ nullable: false, defaultValue: 0 })
    ath: number;

    @Field({ nullable: false, defaultValue: 0 })
    atl: number;

    @Field({ nullable: true })
    icon: string;

    @Field(type => PlatformModel, { nullable: true, defaultValue: null })
    platform: PlatformModel;

    @Field(type => [ Number ], { nullable: true, defaultValue: [] })
    sparkline_in_7d: number[];
}


@ObjectType('Coin')
export class CoinDto {

    @Field(type => String, { description: 'id' })
    id: string;

    @Field()
    rank: number;

    @Field()
    usd_price: number;

    @Field({ nullable: true })
    name: string;

    @Field(type => String)
    @Directive('@upper')
    symbol: string;

    @Field({ nullable: true })
    icon: string;
}


@ObjectType('CoinMeta')
export class CoinMetaDto {

    @Field(type => String, { description: 'id' })
    id: string;

    @Field({ nullable: true })
    name: string;

    @Field(type => String)
    @Directive('@upper')
    symbol: string;

    @Field(type => String)
    description: string;

    @Field(type => String)
    icon: string;
}

@ObjectType('MarketPriceModel')
export class MarketPriceModel {

    @Field()
    id: string;

    @Field()
    symbol: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    current_price: number;

    @Field({ nullable: true })
    image: string;

    @Field({ nullable: true })
    market_cap: number;

    @Field({ nullable: true })
    market_cap_rank: number;

    @Field({ nullable: true })
    p_change_24h: number;

    @Field({ nullable: true })
    ath: number;

    @Field({ nullable: true })
    atl: number;

}