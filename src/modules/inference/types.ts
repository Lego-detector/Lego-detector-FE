export enum HistoryStatus {
    Pending = 'PENDING',
    Completed = 'COMPLETED',
}

type BoundingBox = {
    className: number
    conf: number
    xywh: number[]
}

export type InferenceResults = {
    _id: string
    ownerId: string
    imageUrl: string
    status: HistoryStatus
    results?: BoundingBox[]
}