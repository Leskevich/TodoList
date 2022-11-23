import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    oldTitle: string
    callback: (title: string) => void
}


export const EditableSpan = (props: EditableSpanProps) => {
    const {oldTitle, callback} = props
    const [updateTitle, setUpdateTitle] = useState<string>(oldTitle)
    const [edit, setEdit] = useState(false)



    const onClickHandler = () => {
        setEdit(!edit)
        edit && callback(updateTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    return (
        edit ? <input onChange={onChangeHandler} value={updateTitle} onBlur={onClickHandler} autoFocus/> :
            <span onDoubleClick={onClickHandler}>{oldTitle}</span>

    );
};

