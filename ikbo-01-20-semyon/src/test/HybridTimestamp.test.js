import {HybridTimestamp} from "../core/clock/HybridTimestamp";

describe("HybridTimestamp", () => {
    test("должен корректно переводится в строку",() => {
        let datetime = '2023-04-25T19:10:07.914Z';
        let wallClockTime = Date.parse(datetime);
        let ticks = 255;
        let nodeId = 'node1';

        new Intl.NumberFormat()

        let timestamp = new HybridTimestamp(wallClockTime, ticks, nodeId);

        let expectedTimestamp = '2023-04-25T19:10:07.914Z-00FF-node1'

        expect(timestamp.toString()).toBe(expectedTimestamp);
    })

    test("должен корректно парситься",() => {
        let timestamp = '2023-04-25T19:10:07.914Z-0000-node1';

        let parsedTimestamp = HybridTimestamp.parse(timestamp);

        expect(parsedTimestamp.toString()).toBe(timestamp);
        expect(parsedTimestamp.wallClockTime).toBe(Date.parse('2023-04-25T19:10:07.914Z'))
        expect(parsedTimestamp.ticks).toBe(0)
        expect(parsedTimestamp.nodeId).toBe('node1');
    })

    describe("должен корректно сравниваться с другими временными метками, ", () => {

        test("если метки имеют разное физическое время",() => {
            let t1 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0001-node1');
            let t2 = HybridTimestamp.parse('2023-04-25T20:10:07.914Z-0002-node2');

            expect(t1.compareTo(t2)).toBe(-1);
            expect(t2.compareTo(t1)).toBe(1);
        })

        test("если метки имеют одинаковое физическое время, но разное логическое",() => {
            let t1 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0001-node1');
            let t2 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0002-node2');

            expect(t1.compareTo(t2)).toBe(-1);
            expect(t2.compareTo(t1)).toBe(1);
        })

        test("если метки имеют одинаковое физическое время  и логическое, но разные узлы",() => {
            let t1 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0002-node1');
            let t2 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0002-node2');

            expect(t1.compareTo(t2)).toBe(-1);
            expect(t2.compareTo(t1)).toBe(1);
        })

    })

    test("должен корректно определять отношение 'happened before'",() => {
        let t1 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0002-node1');
        let t2 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0002-node2');
        let t3 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0003-node2');

        expect(t1.happenedBefore(t2)).toBeTruthy();
        expect(t2.happenedBefore(t3)).toBeTruthy();
        expect(t1.happenedBefore(t3)).toBeTruthy();

        expect(t2.happenedBefore(t1)).toBeFalsy();
        expect(t3.happenedBefore(t1)).toBeFalsy();

        expect(t1.happenedBefore(t1)).toBeFalsy();
    })

    test("должен инкрементировать логическое время",() => {
        let t1 = HybridTimestamp.parse('2023-04-25T19:10:07.914Z-0002-node1');

        let t2 = t1.addTicks(2);

        expect(t1 !== t2).toBeTruthy();
        expect(t1.happenedBefore(t2)).toBeTruthy();
        expect(t2.toString()).toBe('2023-04-25T19:10:07.914Z-0004-node1');
    })

    test("должен сравниваться лексикографически, также как и логически",() => {
        let t0 = "2023-04-25T10:10:07.914Z-0002-node1";
        let t1 = "2023-04-25T19:10:07.914Z-0002-node1";
        let t2 = "2023-04-25T19:10:07.914Z-0002-node1";
        let t3 = "2023-04-25T19:10:07.914Z-0002-node2";
        let t4 = "2023-04-25T19:15:07.914Z-0002-node1";

        let ht0 = HybridTimestamp.parse(t0);
        let ht1 = HybridTimestamp.parse(t1);
        let ht2 = HybridTimestamp.parse(t2);
        let ht3 = HybridTimestamp.parse(t3);
        let ht4 = HybridTimestamp.parse(t4);

        expect(ht0.compareTo(ht1)).toBe(t0.localeCompare(t1));
        expect(ht2.compareTo(ht1)).toBe(t2.localeCompare(t1));
        expect(ht2.compareTo(ht3)).toBe(t2.localeCompare(t3));
        expect(ht3.compareTo(ht4)).toBe(t3.localeCompare(t4));

    })

})