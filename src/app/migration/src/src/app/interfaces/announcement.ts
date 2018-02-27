export interface Announcement {
    type: string;
    title: string;
    from: string;
    read: boolean;
    description: string;
    links: string[];
    attachments: object[];
    createdDate: string;
}
