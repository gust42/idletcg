import React, { useState, useEffect } from 'react';
import MessageHandler from '../logic/messagehandler';
export function useMessage(message) {
    useEffect(() => {
        MessageHandler.recieveMessage(message);
    })
}