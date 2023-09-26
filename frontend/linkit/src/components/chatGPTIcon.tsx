import React from 'react'
import Image from 'next/image'
import chatGPTIcon from '@assets/chatGptIcon.png'


const iconStyle = {
    width: '40px', 
    height: '40px', 
};


export default function ChatGPTIcon() {
    return (
        <div style={iconStyle}>
            <Image
                src={chatGPTIcon}
                alt="ChatGPT"
            />
        </div>
    )
}
