import {HybridTimestamp} from "../core/clock/HybridTimestamp";
import {EventFinder} from "../core/EventFinder";

describe("EventFinder", () => {
    test("должен отбирать все более поздние события, принадлежащие конкретному узлу", () => {
        let nodeId = "nodeId1";
        let timestamp = new HybridTimestamp(4, 0, nodeId)
        let events = [
            {payload: {}, happenAt: new HybridTimestamp(1, 0, "nodeId1").toString()},
            {payload: {}, happenAt: new HybridTimestamp(2, 0, "nodeId1").toString()},
            {payload: {}, happenAt: new HybridTimestamp(3, 0, "nodeId1").toString()},
            {payload: {}, happenAt: new HybridTimestamp(4, 0, "nodeId1").toString()},
            {payload: {}, happenAt: new HybridTimestamp(4, 0, "nodeId2").toString()},
            {payload: {}, happenAt: new HybridTimestamp(4, 0, "nodeId3").toString()},
            {payload: {}, happenAt: new HybridTimestamp(4, 1, "nodeId1").toString()},
            {payload: {}, happenAt: new HybridTimestamp(5, 0, "nodeId1").toString()},
            {payload: {}, happenAt: new HybridTimestamp(6, 0, "nodeId1").toString()},
        ];

        let filteredEvents = EventFinder.findAllNodeEventsLaterThan(timestamp.toString(), events);

        let allEventsBelongNode = filteredEvents.map(e => HybridTimestamp.parse(e.happenAt))
            .every(t => t.nodeId === nodeId)

        let allEventsLaterThanTargetTimestamp = filteredEvents.map(e => HybridTimestamp.parse(e.happenAt))
            .every(t => timestamp.happenedBefore(t));

        expect(filteredEvents.length).toBe(3)
        expect(allEventsBelongNode).toBeTruthy();
        expect(allEventsLaterThanTargetTimestamp).toBeTruthy();

    })
})