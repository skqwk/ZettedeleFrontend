import {HybridTimestamp} from "./clock/HybridTimestamp";

export class EventFinder {
    static findAllNodeEventsLaterThan(timestamp, allEvents) {
        let targetTimestamp = HybridTimestamp.parse(timestamp);
        return allEvents
            .filter(event => HybridTimestamp.parse(event.happenAt).nodeId === targetTimestamp.nodeId)
            .filter(event => targetTimestamp.happenedBefore(HybridTimestamp.parse(event.happenAt)));
    }
}