export enum HistoryStatus {
    Pending = 'PENDING',
    Completed = 'COMPLETED',
}

export type BoundingBox = {
    classId: number
    conf: number
    xywh: [ number, number, number, number ]
}

type History = {
    _id: string
    ownerId: string
    imageUrl: string
    status: HistoryStatus
    results?: BoundingBox[]
}

export type InferenceResults = {
    summary: Record<number, number>
    history: History
}


export type ClassNames = {
    classId: number
    className: string
    classLabel: string
}