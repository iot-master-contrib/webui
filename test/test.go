package main

import (
	"github.com/spf13/viper"
	_ "github.com/zgwit/iot-master-contrib/webui"
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
