import {HybridTimestamp} from "./clock/HybridTimestamp";

/**
 * Задача калькулятора - определять событий с каких узлов нет на сервере/клиенте
 *
 * Для этого есть два метода:
 * <ul>
 * <li>{@link VectorVersionCalculator.calculateDiff()}</li>
 * <li>{@link VectorVersionCalculator.calculateMerge()}</li>
 * </ul>
 */
export class VectorVersionCalculator {
    /**
     * Для расчета разницы мы сравниваем удаленный и локальный вектор версий
     * Возможно несколько ситуаций
     *
     * (1)
     * Если на сервере нет никакой информации об одном из узлов - значит нужно отдать
     * все события данного узла
     *
     * (2)
     * Если на сервере устаревшие события с данного узла - значит нужно отдать
     * все события данного узла, которые старше версии сервера
     *
     * (3)
     * Если для конкретного узла события на сервере актуальнее, чем
     * локальные события - ничего делать не нужно
     * @param localVectorVersion локальный вектор версий
     * @param remoteVectorVersion удаленный вектор версий
     * @returns {{}}
     */
    static calculateDiff(localVectorVersion, remoteVectorVersion) {
        let nodes = new Set([...Object.keys(localVectorVersion), ...Object.keys(remoteVectorVersion)]);
        let diff = {};
        nodes.forEach(node => {
                let localTimestampStr = localVectorVersion[node];
                let remoteTimestampStr = remoteVectorVersion[node];
                if (localTimestampStr) {
                    let localTimestamp = HybridTimestamp.parse(localTimestampStr);
                    if (remoteTimestampStr) {
                        let remoteTimestamp = HybridTimestamp.parse(remoteTimestampStr);
                        if (remoteTimestamp.happenedBefore(localTimestamp)) {
                            diff[node] = remoteTimestampStr;
                        }
                    } else {
                        diff[node] = new HybridTimestamp(0, 0, node).toString();
                    }
                }
            }
        );
        return diff;
    }

    static calculateMerge(localVectorVersion, remoteVectorVersion) {
        let nodes = new Set([...Object.keys(localVectorVersion), ...Object.keys(remoteVectorVersion)]);
        let merge = {};
        nodes.forEach(node => {
                let localTimestampStr = localVectorVersion[node];
                let remoteTimestampStr = remoteVectorVersion[node];
                merge[node] = this.chooseMax(localTimestampStr, remoteTimestampStr);
            }
        );
        return merge;
    }

    /**
     * Если оба ненулевые - сравниваем,
     * если один из них нулевой - выбираем ненулевой
     * @param localTimestampStr
     * @param remoteTimestampStr
     * @returns {*}
     */
    static chooseMax(localTimestampStr, remoteTimestampStr) {
        if (localTimestampStr && remoteTimestampStr) {
            let localTimestamp = HybridTimestamp.parse(localTimestampStr);
            let remoteTimestamp = HybridTimestamp.parse(remoteTimestampStr);

            return localTimestamp.happenedBefore(remoteTimestamp)
                ? remoteTimestampStr
                : localTimestampStr;

        } else {
            return localTimestampStr
                ? localTimestampStr
                : remoteTimestampStr;
        }
    }
}