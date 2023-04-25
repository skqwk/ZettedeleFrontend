import {HybridTimestamp} from "./HybridTimestamp";

export class HLC {
    latestTime;
    nodeId

    constructor(currentTimeMillis, nodeId) {
        this.latestTime = new HybridTimestamp(currentTimeMillis, 0, nodeId);
        this.nodeId = nodeId;
    }


    /**
     * (2) Отправка или локальное событие на узле
     * <br>
     * Каждый раз, когда произошло локальное событие, гибридная метка времени сопоставляется с изменением.
     * Нужно сравнить системное время узла и события, если узел отстает, тогда увеличить другое значение,
     * которое представляет логическую часть компонента (ticks), чтобы отразить ход часов.
     * @returns {HybridTimestamp}
     */
    now() {
        let currentTimeMillis = new Date().getTime();
        if (this.latestTime.wallClockTime >= currentTimeMillis) {
            this.latestTime = this.latestTime.addTicks(1);
        } else {
            this.latestTime = new HybridTimestamp(currentTimeMillis, 0, nodeId);
        }
        return this.latestTime.now();
    }

    /**
     * (3) Получение сообщения из удаленного узла
     * <br>
     * Данный метод возвращает временную метку с системным временем и логическим компонентом
     * Установленным в -1, но он вернется в 0, после addTicks(1);
     * @param remoteTimestamp метка из удаленного узла
     * @returns {HybridTimestamp}
     */
    tick(remoteTimestamp) {
        let nowMillis = new Date().getTime()
        let now = HybridTimestamp.fromSystemTime(nowMillis, this.nodeId);

        // Выбираем максимальную временную метку из 3ех:
        // [1] - Текущее системное время
        // [2] - Временная метка другого клиента
        // [3] - Временная метка данного клиента
        this.latestTime = this.max(now, remoteTimestamp, this.latestTime);
        this.latestTime = this.latestTime.addTicks(1);

        return this.latestTime.now();
    }

    max() {
        let args = Array.from(arguments);
        return args.reduce((t1, t2) => t1.happenedBefore(t2) ? t2 : t1);
    }

    static timestamp() {
        return new Date().toISOString();
    }
}