import { DataSourceInstanceSettings } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { KafkaDataSourceOptions, KafkaQuery } from './types';

import { getTemplateSrv } from '@grafana/runtime';

export class DataSource extends DataSourceWithBackend<KafkaQuery, KafkaDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<KafkaDataSourceOptions>) {
    super(instanceSettings);
  }

  // Replace variables before being sent to backend
  // See here: https://community.grafana.com/t/how-to-use-template-variables-in-your-data-source/63250
  applyTemplateVariables(query: KafkaQuery): Record<string, any> {
    const interpolatedQuery: MyQuery = {
      ...query,
      topicName: getTemplateSrv().replace(topicName),
    };

    return interpolatedQuery;
  }
}
