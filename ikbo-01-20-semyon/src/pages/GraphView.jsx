import React, {useEffect, useState} from 'react';
import Select from "../components/UI/select/Select";
import {useVault} from "../hooks/useVault";
import {useDispatch, useSelector} from "react-redux";
import {Graph} from "react-d3-graph";
import {loadNotesEvent} from "../store/vaultReducer";
import {useProfile} from "../hooks/useProfile";
import {EventService} from "../API/EventService";
import {NoteWebLoader} from "../core/web/NoteWebLoader";

const GraphView = () => {
    const [vaultId, setVaultId] = useState('');
    const [noteId, setNoteId] = useState(null);
    const [data, setData] = useState({nodes: [{id: 1}], links: []})
    const nowUser = useProfile();
    const dispatch = useDispatch();
    const vault = useVault(vaultId);
    const auth = useSelector(state => state.auth);

    const vaultNames = useSelector(state => state.vault.vaults
        .filter(v => !v.deleted)
        .map(v => ({value: v.id, name: v.name})))

    useEffect(() => {
        EventService.getAllEvents(auth.authToken)
            .then(rs => {
                console.log("Get all events!")
                console.log(rs.data)
                let vaults = NoteWebLoader.applyServerEvents(rs.data);
                dispatch(loadNotesEvent({vaults}));
            })
    }, [])

    useEffect(() => {
        console.log("Load vault");
        let copyNotes = [...vault.notes];
        if (copyNotes.length > 0) {
            console.log(vault);
            let deleted = new Set(copyNotes
                .filter(n => n.deleted)
                .map(n => n.id));

            let formattedNodes = copyNotes
                .filter(n => !n.deleted)
                .map(n => ({id: n.id, title: n.title}));

            let formattedLinks = copyNotes
                .filter(n => !n.deleted)
                .flatMap(n => [...n.links]
                    .filter(l => !deleted.has(n.id) && !deleted.has(l))
                    .map(l => ({source: n.id, target: l})))

            setData({nodes: [...formattedNodes], links: [...formattedLinks]});
        }

    }, [vault])

    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            labelPosition: 'top',
            labelProperty: 'title',
            color: "lightgreen",
            size: 400,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
    };

    const onClickNode = function (nodeId) {
        console.log(`Clicked node ${nodeId}`);
    };

    const onClickLink = function (source, target) {
        console.log(`Clicked link between ${source} and ${target}`);
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <Select
                    defaultValue="Выбор хранилища"
                    value={vaultId}
                    onChange={setVaultId}
                    options={vaultNames}/>
            </div>
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
            />;
        </div>

    );
};

export default GraphView;