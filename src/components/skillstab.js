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

    let unlocked = '';
    let unlockDiv = (<div><div className="requirement">Requires {gameRule.requirement} badcards</div>
        <div className="unlock">Unlock</div></div>);
    if (gameState.autopackskill.acquired) {
        unlocked = 'unlocked';
        unlockDiv = null;
    }

    return (
        <article>
            <div onClick={unlockSkill} className={'skill button ' + unlocked}>
                <div className="title">Wealthy boyfriend / girlfriend</div>
                <div className="description">Doesnt like to play but loves to gift and open packs for you</div>

                {unlockDiv}
            </div>
        </article>
    )
}