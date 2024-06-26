import { DataQuery, DataSourceJsonData } from '@grafana/data';

export enum AutoOffsetReset {
  EARLIEST = 'earliest',
  LATEST = 'latest',
  BEGINNING = 'beginning',
  LASTN = 'lastN',
}

export enum TimestampMode {
  Now = 'now',
  Message = 'message',
}

export type AutoOffsetResetInterface = {
  [key in AutoOffsetReset]: string;
};

export type TimestampModeInterface = {
  [key in TimestampMode]: string;
};

export interface KafkaDataSourceOptions extends DataSourceJsonData {
  bootstrapServers: string;
}

export interface KafkaSecureJsonData {
  apiKey?: string;
}

export interface KafkaQuery extends DataQuery {
  topicName: string;
  partition: number;
  N: number;
  withStreaming: boolean;
  autoOffsetReset: AutoOffsetReset;
  timestampMode: TimestampMode;
}

export const defaultQuery: Partial<KafkaQuery> = {
  partition: 0,
  N: 0,
  withStreaming: true,
  autoOffsetReset: AutoOffsetReset.LATEST,
  timestampMode: TimestampMode.Now,
};
