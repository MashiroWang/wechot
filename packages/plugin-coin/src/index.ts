import { Context, IPlugin, Message } from '@wechot/core';
import { got } from '@wechot/utils';

const WechotPluginCoin: IPlugin = {
  priority: 100,

  apply(context: Context) {
    const handleSearchCoinPrice = async (_message: Message, symbol: string) => {
      if (!symbol) {
        return null;
      }
      const searchSymbol = `${symbol.toUpperCase()}USDT`;
      try {
        const result = await got
          .get('https://api1.binance.com/api/v3/ticker/24hr', {
            searchParams: {
              symbol: searchSymbol,
            },
          })
          .json<any>();
        if (!result?.lastPrice) {
          return null;
        }
        const decimalLength = Math.max(2, 6 - Number(result.lastPrice).toFixed(0).length);
        return `查询币种：${symbol.toUpperCase().replace('USDT', '')}\n当前价格：$${Number(result.lastPrice).toFixed(
          decimalLength,
        )}\n24H涨幅：${Number(result.priceChangePercent).toFixed(2)}%\n`;
      } catch {
        return null;
      }
    };
    context.command.register('coin', handleSearchCoinPrice);
  },
};

export default WechotPluginCoin;
