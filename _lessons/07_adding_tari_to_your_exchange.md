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

> NOTE: For end users, it is recommended to use Tari Launchpad which is built for ease of use. If you are not an exchange user, download [Tari Launchpad](https://tari.com/downloads) instead. For exchanges and businesses accepting
Tari, the recommended approach is to run the Tari binaries or compile from source.

> NOTE: For all servers connected to the internet, they must either be running a Tor client or configure public IP information. Documentation on this is available [here](https://github.com/tari-project/tari#README) and [here] (https://github.com/tari-project/tari/discussions/6366). If you are running on Linux, the Tari applications have built-in Tor support, so this can be ignored.

### Installing Minotari Node
> NOTE: If you are using a public `minotari_node`, you can skip this section
1. [Install the minotari_node](https://github.com/tari-project/tari?tab=readme-ov-file#installing-using-binaries)
1. Start the node:

```
minotari_node --init
```

1. Start the node. 
```
minotari_node
```

1. Press Ctrl+C to enter the command mode
1. Type `whoami` and press enter. You'll see something like this. You should copy this data to a file for future reference.
```
18:46 v1.0.0-pre.16 esmeralda State: Listening Tip: 3872 (Tue, 23 Jul 2024 14:27:53 +0000) Mempool: 0tx (0g, +/- 0blks) Connections: 0|0 Banned: 0 Messages (last 60s): 0 Rpc: 0/100 ️🔌
>> whoami
Public Key: 90f67a04edcb36261e6304ca213629d183c44e26bd47e38c253473f44d901733
Node ID: e8ed9a4fd38577b6b01e3b8e9d
Public Addresses: /onion3/f5qbkkfkoxowzvshe5mppzpgiiy76cwumpsacungeldoal6hehcgzfqd:18141
Features: PeerFeatures(MESSAGE_PROPAGATION | DHT_STORE_FORWARD)
```

1. Restart the node.

### Setting up a send and receive address

In this section we'll create a wallet address for receiving funds. 

> Be careful here, we'll be creating seed phrases that must be backed up and stored carefully.
If you are not familiar with seed phrases, you should probably stop here and ask for help. Get in touch with the Tari contributors 
if you need help

It's suggested you run this step on a trusted computer, that you know will not leak the information. Ideally, this computer should be entirely offline.

1. First, let's create a folder to hold all the wallet data.
```
mkdir tari_wallet_data
cd tari_wallet_data
```

2. Now let's run the wallet. Make sure that you specify the `--base-path` field to keep all the data in the above folder so that you can delete it afterwards.
```
minotari_console_wallet --base-path ~/tari_wallet_data
```
3. You will be asked if you want to mine. Choose `N`

```
Node config does not exist.
Would you like to mine (Y/n)?
NOTE: this will enable additional gRPC methods that could be used to monitor and submit blocks from this node.
```

4. Next, you will be asked if you want to create a new wallet, restore it, or restore from a view key. We want to create a new wallet, so we will __select 1__ here.

```
Console Wallet

1. Create a new wallet.
2. Recover wallet from seed words or hardware device.
3. Create a read-only wallet using a view key.
>>
```

5. Next we will be asked for a password. You will need to save this password for future use. Enter this password now and confirm it. 
> NOTE: You will not see the password as you type it.

```
Create wallet passphrase: 
Confirm wallet passphrase: 
```

6. You will now be asked if you want to use a hardware wallet. If you would like to, then select `Y`. This guide will assume you do not have a hardware wallet, so
most users will select `N` here

```
Would you like to use a connected hardware wallet? (Supported types: Ledger) (Y/n)
```

7. Next you will be presented with your seed words. You must write these down to be backed up in a secure place.

> This is a very sensitive step. Be careful not to leak data here


```
=========================
       IMPORTANT!        
=========================
These are your wallet seed words.
They can be used to recover your wallet and funds.
WRITE THEM DOWN OR COPY THEM NOW. THIS IS YOUR ONLY CHANCE TO DO SO.

=========================
<...............seed words will be presented here.............>
=========================

I confirm that I will never see these seed words again.
Type the word "confirm" to continue.
>>
```

8. When you have made a backup of these seed words. Type `confirm`.

9. You will now see the wallet. Press the right arrow twice to get to the `Receive` tab.

```
│┌Connection Details───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐│
││Tari Address interactive:   f4HKi5gVrRgc3ibmXSk5YtMSNXYfX5CGQyiS7MSsFpLLd3M4y3Y9q2VFhxdaiE53bMBfERVvdcyhPbNLojDtKzU8Xae                                  ││
││Tari Address one-sided:     f2HKi5gVrRgc3ibmXSk5YtMSNXYfX5CGQyiS7MSsFpLLd3M4y3Y9q2VFhxdaiE53bMBfERVvdcyhPbNLojDtKzU8XZq                                  ││
││Node ID:                    1f0acb873f7adf9cf01dfb6aa0                                                                                                   ││
││Network Address:            /onion3/5bukgcjbadffcgspwkdeku6haqgvxo6oinf7vvjvzmzi33wbijjebqyd:18141 
```

10. Copy the details you see above. Most important is the `Tari Address one-sided` field. This is the address that users will send funds to for the exchange.

11. Press `f10` to exit the wallet

12. Next, we'll export the view key for the wallet.
Run

```
minotari_console_wallet --base-path ~/tari_wallet_data export-view-key-and-spend-key
```

13. You'll be asked for the password you entered in step 5.
```
Console Wallet

Enter wallet passphrase:
Minotari Console Wallet running... (Command mode started)
==============
Command Runner
==============

1. ExportViewKeyAndSpendKey(ExportViewKeyAndSpendKeyArgs { output_file: None })

View key: cb6c13f07af23380c7756bbfcd622bc3277ec2cc42abd5ed3d8ddd19fa49060c
Spend key: f29039796b3430c6927f26bf216b6241dd7fad7f30a6640e8ac95f3d0af51a52
Minotari Console Wallet running... (Command mode completed)

Press Enter to continue to the wallet, or type q (or quit) followed by Enter.

```
14. Copy both of these values to a safe space. We will be using them in future steps.

15. Press 'q' and `Enter` to exit the console wallet.

16. Make sure you have saved the above data. You can now destroy the folder `tari_wallet_data` and even the machine if you wish.

### Setting up a read-only wallet to receive deposits

In this section, we will create a read-only wallet that will watch for funds received at the address saved in step 10. If you are integrating an exchange, this is 
how you can watch for received funds. 
> NOTE: This wallet we create will not have the ability to spend any funds, so you do not need to secure it as much as you do the spending wallet.

17. On a server machine that is connected to the internet. Run this command to create a wallet
> By default all data is stored in `~/.tari`. You can find all logs, config and data in there. If you would like to use a specific folder, you can use the `--base-path` folder.
```
minotari_console_wallet
```

18. You will be asked if you want to mine. Choose `N`

```
Node config does not exist.
Would you like to mine (Y/n)?
NOTE: this will enable additional gRPC methods that could be used to monitor and submit blocks from this node.
```

19. Next, you will be asked if you want to create a new wallet, restore it, or restore from a view key. We want to create a _read-only wallet_, so we will __select 3__ here.

```
Console Wallet

1. Create a new wallet.
2. Recover wallet from seed words or hardware device.
3. Create a read-only wallet using a view key.
>>
```

20. Next we will be asked for a password. You will need to save this password for future use. Enter this password now and confirm it. 
> NOTE: You will not see the password as you type it.

> NOTE: THIS PASSWORD DOES NOT NEED TO MATCH THE PREVIOUS PASSWORD CREATED IN STEP 5. It is suggested you use a different password here

```
>> 3

Create wallet passphrase: 
Confirm wallet passphrase: 
```

21. Enter the view key from step 17

```
Enter view key:  (hex)
cb6c13f07af23380c7756bbfcd622bc3277ec2cc42abd5ed3d8ddd19fa49060c
```
22. Enter the spend key from step 18

```
Enter the public spend key:  (hex or base58)
f29039796b3430c6927f26bf216b6241dd7fad7f30a6640e8ac95f3d0af51a52  
```

23. You should now see the familiar console wallet. We'll need to configure it a bit more, so let's close it now by pressing `f10`.

24. Browse to the config file under `~/.tari/mainnet/config/config.toml` and open it in your favourite text editor.

25. Find the section `[wallet]`

```toml
########################################################################################################################
#                                                                                                                      #
#                      Wallet Configuration Options (WalletConfig)                                                     #
#                                                                                                                      #
########################################################################################################################

[wallet]
# The buffer size constants for the publish/subscribe connector channel, connecting comms messages to the domain layer:
# (min value = 300, default value = 50000).
#buffer_size = 50000

# The relative path to store persistent data (default = "data/wallet")
#data_dir = "data/wallet"
```

26. Next, find the line `#grpc_enabled = false` and change it to `grpc_enabled = true`
> Remember to remove the `#` character at the start of the line.

```toml
# Set to true to enable grpc. (default = false)
grpc_enabled = true
# The socket to expose for the gRPC base node server (default = "/ip4/127.0.0.1/tcp/18143")
#grpc_address = "/ip4/127.0.0.1/tcp/18143"
# gRPC authentication method (default = "none")
#grpc_authentication = { username = "admin", password = "xxxx" }
```

> If you wish to secure the GRPC more, you can edit the other settings. It is important that the wallet's gRPC port is not accessible from the public internet











