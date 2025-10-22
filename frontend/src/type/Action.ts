export interface Option {
    key: string;
    label: string;
}
export type OptionResolver = () => Option[];

export interface RequiredField {
    name: string,
    label: string,
    type: string,
    source?: string,
    getOptions?: OptionResolver /* Added by client based on source key */
}

export interface RequiredInput {
    fields: RequiredField[]
}

export interface Action {
    key: string,
    label: string,
    icon: string,
    color: string,
    confirm: Record<string, any>,
    requiredInput: RequiredInput,
}
