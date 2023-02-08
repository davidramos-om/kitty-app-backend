import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { DateScalar } from '../common/scalars/date.scalar';
import { CoinResolver } from './coins.resolver';
import { CoinsService } from './coins.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
            maxBodyLength: 100000,
            maxContentLength: 100000,
        }),
    ],
    providers: [ CoinResolver, CoinsService, DateScalar ],
})

export class CoinsModule { }