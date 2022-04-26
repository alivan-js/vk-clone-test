import React, {ChangeEvent, FC, useState, FocusEvent, useEffect} from 'react';

type EditableSpanType = {
    text: string,
    changeText: (text: string) => void
}

const EditableSpan: FC<EditableSpanType> = React.memo(({text, changeText}) => {

    const [state, setState] = useState(text)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setState(text)
    }, [text])

    // почему когда приходят новые пропсы, не происходит отрисовка?

    const changeTextCallback = () => {
        changeText(state)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        changeTextCallback()
        setEditMode(false)
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
                    onBlur={onBlurHandler}/>
                : <span
                    onDoubleClick={onDoubleClickHandler}>
                    {state}
            </span>}
        </>
    );
})

export default EditableSpan;