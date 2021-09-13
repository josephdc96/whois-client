import { SubRecord } from "./SubRecord";

/**
 * IP Record object
 */
export interface IPRecord {
    subRecords: SubRecord[]
    rawText: string
}