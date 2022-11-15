import React from 'react';
type buttonType={
    name:string
    collBack:()=>void
}

export const Button = ({name,collBack}:buttonType) => {
    return (

            <button onClick={collBack}>{name}</button>

    );
};

