import { IFailedResolveURLResponse } from './IFailedResolveURLResponse.interface';
import { ISuccessfulResolveURLResponse } from './ISuccessfulResolveURLResponse.interface';

export type ResolveURLResponse = ISuccessfulResolveURLResponse | IFailedResolveURLResponse;
