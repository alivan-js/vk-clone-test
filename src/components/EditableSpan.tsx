import React, {ChangeEvent, FC, useState, KeyboardEvent, useEffect} from 'react';

type EditableSpanType = {
    text: string,
    changeText: (text: string) => void
}

const EditableSpan: FC<EditableSpanType> = React.memo(({text, changeText}) => {

    const [state, setState] = useState(text)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setState(text)
        return () => {
            setState("")
        }
    }, [text])

    // callbacks

    const changeTextCallback = () => {
        changeText(state)
        setState(text)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        changeTextCallback()
        setEditMode(false)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            changeTextCallback()
        }
    }

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    return (
        <>
            {editMode
                ? <input
                    autoFocus
                    value={state}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    onKeyDown={onKeyDownHandler}/>
                : <span
                    onDoubleClick={onDoubleClickHandler}>
                    {state}
            </span>}
        </>
    );
})

export default EditableSpan;