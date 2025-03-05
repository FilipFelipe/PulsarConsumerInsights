# PulsarConsumerInsights
PulsarConsumerInsights is a repository designed to analyze high-demand publication patterns among consumers. It includes examples in Go and JavaScript for producing and consuming messages with Pulsar

## 📋 Requirements

Make sure you have the following tools installed:
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (for JavaScript examples)
- [Go](https://golang.org/) (for Go examples)

## 🛠️ Getting Started
 
This repository includes a **Docker Compose** file that sets up a Pulsar environment for sending and consuming messages. To get started, follow the steps below.
### 1. **Start Pulsar with Docker Compose**
Run the following command to start **Pulsar**:
```bash
docker-compose up
```

This will start a Docker container with Pulsar ready to produce and consume messages.

### 2. **Set Up Environment Variables**

Important environment variables are located in the `.env` file. Make sure to configure this file as needed for your environment.

### 3. **Sequential Mode**

To control the **sequential mode**, you can set the environment variable `SEQUENTIAL_MODE` in the `.env` file:

```env
SEQUENTIAL_MODE=true  # Enable sequential mode
SEQUENTIAL_MODE=false # Disable sequential mode
```

Alternatively, you can pass a flag when running the scripts to toggle between modes.

#### Example of producing messages with **Node.js**:

To produce messages, run the following command:

```bash
node producer.js --sequential_mode=true
```

This will run the message producer in sequential mode if `--sequential_mode=true` is passed.

### 4. **Consuming Messages with JavaScript**

To consume the produced messages using **Node.js**, run the following command:

```bash
node consumer.js consumer-4
```

Where `consumer-4` is the consumer name. You can replace the number with any value you prefer.

### 5. **Consuming Messages with Go**

There is also an example consumer in **Go**. To consume messages using the Go example, run the following command:

```bash
go run main.go --name=consumer-5
```

Where `consumer-5` is the consumer name. You can use any numeric value to identify the consumer.

### 6. **Installing Dependencies**

- For **Node.js**, install dependencies using the following command:

```bash
npm install
```

- For **Go**, use Go Mod to manage project dependencies. Run the following to ensure everything is installed properly:

```bash
go mod tidy
```

This will fetch all the necessary dependencies for the Go code.

---

## 🔍 Project Structure

```
├── compose.yml                 # Docker configuration for Pulsar
├── .env                        # Environment variable file
├── consumer.js                 # JavaScript consumer example
├── producer.js                 # JavaScript producer example
├── main.go                     # Go consumer example
├── go.mod                      # Go dependencies file
├── README.md                   # This file
└── node_modules/               # Node.js dependencies (generated after npm install)
```


## 🤝 Contributions

Contributions are welcome! If you find any bugs or want to add something new, feel free to open an **issue** or a **pull request**.