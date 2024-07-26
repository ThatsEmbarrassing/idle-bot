export interface ICommandConfig {
    /**
     * Command's structure with paramaters
     */
    structure: string;
    /**
     * Command's description
     */
    description: string;
    /**
     * Command's parameters and theirs description
     */
    params?: Record<string, string>;
}
