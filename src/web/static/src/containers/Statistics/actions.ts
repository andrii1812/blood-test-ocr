import { createStandardAction } from "typesafe-actions";
import { IGraphRequest, IGraphResponse } from "../../model";

export const generateGraph = createStandardAction('GENERATE_GRAPH')<IGraphRequest>();

interface ISuccessPayload {
    request: IGraphRequest,
    response: IGraphResponse
}
export const generateGraphSuccess = createStandardAction('GENERATE_GRAPH_SUCCESS')<ISuccessPayload>();
export const generateGraphFailed = createStandardAction('GENERATE_GRAPH_FAILED')();
