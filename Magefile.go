//go:build mage
// +build mage

package main

import (
	"fmt"
	// disable this "/ / mage:import", should be //
	build "github.com/grafana/grafana-plugin-sdk-go/build"
)

import	"github.com/magefile/mage/mg"

// Hello prints a message (shows that you can define custom Mage targets).
func Hello() {
	fmt.Println("hello plugin developer!")
}

// Default configures the default target.
var Default = BuildAll

var _ = build.SetBeforeBuildCallback(func(cfg build.Config) (build.Config, error) {
	cfg.EnableCGo = true
	return cfg, nil
})


// Nic
// Build all targets, but only for Linux
func BuildAll() error {

	// Call the Linux build target programmatically
	b := build.Build{}

	mg.Deps(b.Linux, b.GenerateManifestFile)

	return nil
}


func Coverage() error {
	return build.Coverage()
}

func Lint() error {
	return build.Lint()
}
