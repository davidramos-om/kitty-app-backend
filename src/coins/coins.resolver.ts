import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { CoinDto, CoinMetaDto, CoinStatsModel, MarketPriceModel } from './models/coins.model';
import { CoinMetaArgs, MapSearchArgs, SearchArgs } from './dto/search.args';
import { CoinsService } from './coins.service';

const pubSub = new PubSub();

@Resolver(() => CoinStatsModel)
export class CoinResolver {

    constructor(private readonly coinService: CoinsService) { }

    @Query(() => [ CoinStatsModel ], { defaultValue: [] })
    coinStats(@Args() args: SearchArgs): Promise<CoinStatsModel[]> {
        return this.coinService.findStats(args);
    }

    @Query(() => [ CoinDto ], { defaultValue: [] })
    coinMap(@Args() args: MapSearchArgs): Promise<CoinDto[]> {
        return this.coinService.coinMap(args);
    }

    @Query(() => [ CoinMetaDto ], { defaultValue: [] })
    coinMetaInfo(@Args() args: CoinMetaArgs): Promise<CoinMetaDto[]> {
        return this.coinService.coinMetaInfo(args);
    }

    @Query(() => [ MarketPriceModel ], { defaultValue: [] })
    coinMarketPrice(
        @Args('ids', { type: () => [ String ], defaultValue: [] }) ids: string[],
    ): Promise<MarketPriceModel[]> {

        return this.coinService.marketPrice(ids);
    }

    @Subscription(() => CoinStatsModel)
    priceUpdated() {
        return pubSub.asyncIterator('priceUpdated');
    }
}