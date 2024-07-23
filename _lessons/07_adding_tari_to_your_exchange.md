---
layout: lesson
title: Adding Tari to Your Exchange
date: 2024-06-28 12:00
author: stringhandler
subtitle:
class: subpage
---

## Node Setup
In order to accept Tari, you will need to have a base layer Minotari node. You can either run it yourself, or find a node 
that has the correct GRPC methods exposed to the internet. It is recommended that you run your own node.

It may also be worth running multiple nodes as backups to ensure availability.

> NOTE: For end users, it is recommended to use Tari Launchpad which is built for ease of use, but for exchanges and businesses accepting
Tari, the recommended approach is to run the binaries or compile from source.

1. [Install the minotari_node](https://github.com/tari-project/tari?tab=readme-ov-file#installing-using-binaries)
1. Start the node:

```
minotari_node --init
```
1. Update the configuration file under `~/.tari/nextnet/config/config.toml` to enable the following methods via gRPC
```
TODO
```
1. OPTIONAL: Securing the grpc
1. Start the node. 
```
minotari_node
```

1. TODO Monitoring/watchtower
1. Create the wallet keypair for receiving funds

