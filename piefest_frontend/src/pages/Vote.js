import React, { useState } from 'react';
import VoteInstance from '../components/VoteInstance';
import NavBar from '../components/NavBar';

function Vote() {
    
    return (
        <div>
            <NavBar />
            <VoteInstance />
        </div>
    );
}

export default Vote;