package main

import (
	"os"

	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/ncleju/grafana-kafka-datasource/pkg/plugin"
)

func main() {
	if err := datasource.Manage("ncleju-kafka-datasource", plugin.NewKafkaInstance, datasource.ManageOpts{}); err != nil {
		log.DefaultLogger.Error(err.Error())
		os.Exit(1)
	}
}
