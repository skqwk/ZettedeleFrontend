import {VectorVersionCalculator} from "../core/VectorVersionCalculator";
import {HybridTimestamp} from "../core/clock/HybridTimestamp";

describe("VectorVersionCalculator", () => {


    describe("должен расчитывать разницу между векторами версий, ", () => {
        test("когда на сервере нет никакой информации с узла", () => {
            let node1 = "556a4927-b728-4c90-8d87-f14f26a2b5ee";
            let node2 = "4dbe409c-22ed-4783-a0fc-e89be8744c9e"

            let localVectorVersion = {
                [node1]: "2023-04-26T04:48:47.770Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee",
                [node2]: "2023-04-19T14:28:37.140Z-0100-4dbe409c-22ed-4783-a0fc-e89be8744c9e"
            }

            let serverVectorVersion = {}

            let diff = VectorVersionCalculator.calculateDiff(localVectorVersion, serverVectorVersion);

            expect(diff).not.toBeNull();
            expect(diff[node1]).toBe('1970-01-01T00:00:00.000Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee')
            expect(diff[node2]).toBe('1970-01-01T00:00:00.000Z-0000-4dbe409c-22ed-4783-a0fc-e89be8744c9e')
        })

        test("когда на сервере неактуальная информация с узла", () => {
            let node1 = "556a4927-b728-4c90-8d87-f14f26a2b5ee";
            let node2 = "4dbe409c-22ed-4783-a0fc-e89be8744c9e"

            let localVectorVersion = {
                [node1]: "2023-04-26T04:48:47.770Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee",
                [node2]: "2023-04-19T14:28:37.140Z-0100-4dbe409c-22ed-4783-a0fc-e89be8744c9e"
            }

            let serverVectorVersion = {
                [node1]: "2023-04-26T02:48:47.770Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee",
                [node2]: "2023-04-19T10:28:37.140Z-0100-4dbe409c-22ed-4783-a0fc-e89be8744c9e"
            }

            let diff = VectorVersionCalculator.calculateDiff(localVectorVersion, serverVectorVersion);

            expect(diff).not.toBeNull();
            expect(diff[node1]).toBe("2023-04-26T02:48:47.770Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee")
            expect(diff[node2]).toBe("2023-04-19T10:28:37.140Z-0100-4dbe409c-22ed-4783-a0fc-e89be8744c9e")
        })
    })

    describe("должен расчитывать объединение векторов версий, ", () => {
        test("когда векторы версий оба содержат уникальные значения", () => {
            let node1 = "556a4927-b728-4c90-8d87-f14f26a2b5ee";
            let time1 = "2023-04-26T04:48:47.770Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee"

            let node2 = "4dbe409c-22ed-4783-a0fc-e89be8744c9e"
            let time2 = "2023-04-19T14:28:37.140Z-0100-4dbe409c-22ed-4783-a0fc-e89be8744c9e";

            let localVectorVersion = {
                [node1]: time1,
                [node2]: time2
            }

            let node3 = "3f570240-caa4-47e5-9be0-13df707a1dd8";
            let time3 = "2023-04-26T04:46:45.680Z-0000-3f570240-caa4-47e5-9be0-13df707a1dd8";

            let node4 = "a69c4a8f-caa6-4ae6-8f03-cb75561400d6";
            let time4 = "2023-04-26T04:46:12.680Z-0000-a69c4a8f-caa6-4ae6-8f03-cb75561400d6";

            let serverVectorVersion = {
                [node3]: time3,
                [node4]: time4
            }

            let merge = VectorVersionCalculator.calculateMerge(localVectorVersion, serverVectorVersion);

            expect(merge).not.toBeNull();
            expect(merge[node1]).toBe(time1)
            expect(merge[node2]).toBe(time2)
            expect(merge[node3]).toBe(time3)
            expect(merge[node4]).toBe(time4)
        })

        test("когда на сервере/клиенте содержится неактуальная информация с узла - выбирается максимальное", () => {
            let node1 = "556a4927-b728-4c90-8d87-f14f26a2b5ee";
            let localTime1 = "2023-04-26T04:48:47.770Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee"

            let node2 = "4dbe409c-22ed-4783-a0fc-e89be8744c9e"
            let localTime2 = "2023-04-19T14:28:37.140Z-0100-4dbe409c-22ed-4783-a0fc-e89be8744c9e";

            let localVectorVersion = {
                [node1]: localTime1,
                [node2]: localTime2
            }

            let serverTime1 = "2023-04-27T04:46:45.680Z-0000-556a4927-b728-4c90-8d87-f14f26a2b5ee";
            let serverTime2 = "2023-04-18T04:46:12.680Z-0000-4dbe409c-22ed-4783-a0fc-e89be8744c9e";

            let serverVectorVersion = {
                [node1]: serverTime1,
                [node2]: serverTime2
            }

            let merge = VectorVersionCalculator.calculateMerge(localVectorVersion, serverVectorVersion);

            expect(HybridTimestamp.parse(localTime1).happenedBefore(HybridTimestamp.parse(serverTime1))).toBeTruthy();
            expect(HybridTimestamp.parse(serverTime2).happenedBefore(HybridTimestamp.parse(localTime2))).toBeTruthy();

            expect(merge).not.toBeNull();
            expect(merge[node1]).toBe(serverTime1)
            expect(merge[node2]).toBe(localTime2)
        })
    })
})