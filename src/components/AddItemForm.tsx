import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type AddItemFormType = {
    callback: (title: string) => void
}

export const AddItemForm = memo(({callback}: AddItemFormType) => {
    let [newTitle, setNewTitle] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const clickAdd = () => {
        if (newTitle.trim() !== '') {
            callback(newTitle)
            setNewTitle('')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            clickAdd()
        }
    }
    return (
        <div>
            <input
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                value={newTitle}
            />
            <button
                onClick={clickAdd}>+
            </button>
        </div>
    );
});

