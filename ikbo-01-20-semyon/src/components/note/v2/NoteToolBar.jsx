import React from 'react';
import RoundButton from "../../UI/roundbutton/RoundButton";
import ColorBox from "../../UI/colorbox/ColorBox";
import {colors} from "../../../core/ui/colors";

const NoteToolBar = ({remove, chooseColor, formNoteColor}) => {
    return (
        <div style={{display: 'flex', alignItems: "center", marginTop: "10px"}}>
            <RoundButton onClick={() => remove()}><span role="img" aria-label="delete">🗑️</span></RoundButton>
            <div style={{display: 'flex', alignItems: "center"}}>
                {Object.entries(colors).map((color) =>
                    <ColorBox chosen={formNoteColor === color[1]}
                              key={color[0]}
                              color={color[1]}
                              onClick={() => chooseColor(color[1])}
                    />)}
            </div>
        </div>
    );
};

export default NoteToolBar;