import { createStandardAction } from "typesafe-actions";
import { IUploadFile, IAppState } from "../../model";

export const fileSelected = createStandardAction('FILE_SELECTED')<IUploadFile>();
export const ingestStarted = createStandardAction('INGEST_STARTED')();
export const ingestSucceed = createStandardAction('INGEST_SUCCEED')();
export const ingestFile = createStandardAction('INGEST_FILE')();