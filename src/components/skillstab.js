import React from 'react';
import MessageHandler from '../logic/messagehandler';
import Button from './button';
import useGameRule from '../hooks/usegamerule';
import useGameState from '../hooks/usegamestate';

export default function SkillsTab(props) {
    const gameState = useGameState();
    const gameRule = useGameRule('AutoPackSkill');

    function unlockSkill() {
        MessageHandler.recieveMessage('unlockskill', 'autopackskill');
    }

    return (
        <article>
            <div onClick={unlockSkill} className="skill button">
                <div className="title">Wealthy boyfriend / girlfriend</div>
                <div className="description">Doesnt like to play but loves to buy and open packs for you</div>
                <div className="requirement">Requires 1500 badcards</div>
                <div className="unlock">Unlock</div>
            </div>
        </article>
    )
}