export class HybridTimestamp {
     wallClockTime;
     ticks;
     nodeId

    constructor(wallClockTime, ticks, nodeId) {
         this.wallClockTime = wallClockTime;
         this.ticks = ticks;
         this.nodeId = nodeId;
    }

    static parse(timestamp) {
         let counterDash = timestamp.indexOf('-', timestamp.lastIndexOf(':'))
         let nodeIdDash = timestamp.indexOf('-', counterDash + 1);

         let wallClockTime = Date.parse(timestamp.substring(0, counterDash))
         let ticks = parseInt(timestamp.substring(counterDash + 1, nodeIdDash), 16);
         let nodeId = timestamp.substring(nodeIdDash + 1);

         return new HybridTimestamp(wallClockTime, ticks, nodeId);
     }

     toString() {
         let date = new Date(this.wallClockTime).toISOString();
         let hex = this.ticks.toString(16).toLocaleUpperCase().padStart(4, '0');
         return `${date}-${hex}-${this.nodeId}`
     }

     compareTo(other) {
         if (this.wallClockTime === other.wallClockTime) {
             if (this.ticks === other.ticks) {
                 return this.nodeId.localeCompare(other.nodeId);
             } else {
                 return Math.sign(this.ticks - other.ticks);
             }
         } else {
             return Math.sign(this.wallClockTime - other.wallClockTime);
         }
     }

     addTicks(ticks) {
         return new HybridTimestamp(this.wallClockTime, this.ticks + ticks, this.nodeId);
     }

     happenedBefore(other) {
         return this.compareTo(other) < 0;
     }

    // инициализируем с -1, так что addTicks() вернет к 0
     static fromSystemTime(systemTime, nodeId) {
         return new HybridTimestamp(systemTime, -1, nodeId);
     }
}