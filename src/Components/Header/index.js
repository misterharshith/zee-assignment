import React from 'react';

const Header = props => {
    const { handleInputChange } = props;
    return (
        <header>
            <h1>Zee Assignment</h1>
            <input type='text' placeholder='Search...' name='filter' onChange={handleInputChange} />
        </header>
    )
}

export default Header