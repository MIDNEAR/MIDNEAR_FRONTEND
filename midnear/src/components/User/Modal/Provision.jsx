import React from 'react';

const Provision = ({ name, onAgree, onDisagree }) => {
    return (
        <div className='provision_modal'>

            <h2>{name}</h2>
            <p>{name} 내용...</p>
            <div className='btns'>
                <button onClick={onAgree}>동의함</button>
                <button onClick={onDisagree}>동의하지 않음</button>
            </div>

        </div>
    );
};

export default Provision;
