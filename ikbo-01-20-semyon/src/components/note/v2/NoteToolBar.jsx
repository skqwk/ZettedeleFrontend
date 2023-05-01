import React from 'react';
import RoundButton from "../../UI/roundbutton/RoundButton";
import ColorBox from "../../UI/colorbox/ColorBox";

const NoteToolBar = ({remove, chooseColor, colors, formNoteColor}) => {
    return (
        <div style={{display: 'flex', alignItems: "center", marginTop: "10px"}}>
            <RoundButton onClick={() => remove()}><span role="img" aria-label="delete">🗑️</span></RoundButton>
            <div style={{display: 'flex', alignItems: "center"}}>
                {colors.map((color, id) =>
                    <ColorBox chosen={formNoteColor === color}
                              key={id}
                              color={color}
                              onClick={() => chooseColor(color)}
                    />)}
            </div>
        </div>
    );
};

export default NoteToolBar;