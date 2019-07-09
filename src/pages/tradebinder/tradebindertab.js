import React from 'react';
import './tradebinder.css';
import MessageHandler from '../../logic/messagehandler';
import Button from '../../components/button';
import useGameRule from '../../hooks/usegamerule';
import useGameState from '../../hooks/usegamestate';
import UniqueCard from './uniquecard';

export default function SkillsTab(props) {
    const gameState = useGameState();
    const gameRule = useGameRule('CostForUniqueCards');



    let rangeEmojis = Array.from({ length: 256 }, (v, k) => (k + 9728).toString(16));

    rangeEmojis = rangeEmojis.slice(0,gameState.uniquecards.amount + 1);

    return (
        <article className="tradebinder-content">
            {rangeEmojis.map((code, index) => <UniqueCard key={'emj' + index} cost={gameRule.first} increase={gameRule.increase} count={index + 1} emoji={unescape('%u' + code)} />)}
        </article>
    )
    // return (
    //     <article>
    //       {unescape(div)}
    //     </article>
    // )
}