package main

import (
	_ "github.com/iot-master-contrib/webui"
	"github.com/spf13/viper"
	"github.com/zgwit/iot-master/v4/config"
	"github.com/zgwit/iot-master/v4/web"
)

func main() {
	_ = config.Load()
	viper.Set("web.port", 8081)

	web.Start()

	web.Serve()

	select {}
}
