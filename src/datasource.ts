import { DataSourceInstanceSettings, ScopedVars } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { KafkaDataSourceOptions, KafkaQuery } from './types';

import { getTemplateSrv } from '@grafana/runtime';

export class DataSource extends DataSourceWithBackend<KafkaQuery, KafkaDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<KafkaDataSourceOptions>) {
    super(instanceSettings);
  }

  // Replace variables before being sent to backend
  // See here: https://community.grafana.com/t/how-to-use-template-variables-in-your-data-source/63250
  applyTemplateVariables(query: KafkaQuery, scopedVars: ScopedVars): Record<string, any> {
    
    const templateSrv = getTemplateSrv();
    
    const interpolatedQuery: KafkaQuery = {
      ...query,
      topicName: templateSrv.replace(query.topicName, scopedVars),
    };

    return interpolatedQuery;
  }
}
