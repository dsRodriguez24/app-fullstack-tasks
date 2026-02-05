export interface Task {
    id: number;
    title : string;
    start : string;
    end : string;
    resourceId : string;
    extendedProps: ExtendedPropsTask ;
    completion_at: string;
    // date_end: string;
}


interface ExtendedPropsTask {
    status: string;
}