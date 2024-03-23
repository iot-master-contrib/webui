package webui

import (
	"embed"
	"github.com/zgwit/iot-master/v4/web"
	"net/http"
)

//go:embed www
var wwwFiles embed.FS

func init() {
	web.Static.Put("", http.FS(wwwFiles), "www", "index.html")
}
