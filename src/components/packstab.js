import React from 'react';
import MessageHandler from '../logic/messagehandler';
import Button from './button';
import useGameRule from '../hooks/usegamerule';
import useGameState from '../hooks/usegamestate';

export default function PacksTab(props) {
    const gameState = useGameState();

    const packCostRule = useGameRule('PackCost');
    const goodSellValueRule = useGameRule('GoodCardSellValue');
    const badSellValueRule = useGameRule('BadCardSellValue');
    const metaSellValueRule = useGameRule('MetaCardSellValue');
  
    function openPack(amount) {
      MessageHandler.recieveMessage('openpack', amount ? amount : 1);
    }
  
    function sellBadCards(amount) {
      MessageHandler.recieveMessage('sellbadcards', amount ? amount : 1);
    }
  
    function sellGoodCards(amount) {
      MessageHandler.recieveMessage('sellgoodcards', amount ? amount : 1);
    }
  
    function sellMetaCards(amount) {
      MessageHandler.recieveMessage('sellmetacards', amount ? amount : 1);
    }

    return (
        <article>
          <Button text="Open pack" type="buy" click={openPack} resource={gameState.money} cost={packCostRule.value}></Button>
          <Button text="Sell bad card" type="sell" click={sellBadCards} resource={gameState.badcards} cost={badSellValueRule.value}></Button>
          <Button text="Sell good card" type="sell" click={sellGoodCards} resource={gameState.goodcards} cost={goodSellValueRule.value}></Button>
          <Button text="Sell meta card" type="sell" click={sellMetaCards} resource={gameState.metacards} cost={metaSellValueRule.value}></Button>
        </article>
    )
}