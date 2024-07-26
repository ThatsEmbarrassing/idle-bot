/**
 * Failed response type from Idle Database
 */
export interface IFailedResponse {
    /**
     * Status code (it's 2 in this case)
     */
    ResultCode: 2;
    /**
     * Error message.
     */
    Message: string;
}
