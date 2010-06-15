CWD = $(shell pwd -P)
NODE_WAF ?= node-waf
CFLAGS ?= -g -Wall
CXXFLAGS ?= -g -Wall

# We need to build position-independent code regardless of platform
CFLAGS += -fPIC
CXXFLAGS += -fPIC

# These variables are respected by waf if we export them
export CFLAGS CXXFLAGS

.PHONY: all crypto-extras

all: crypto-extras

crypto-extras: 
	cd src && \
		$(NODE_WAF) configure && \
		$(NODE_WAF) build

clean:
	rm -fr build
