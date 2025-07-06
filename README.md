## Setup Instructions

1. **Create Jetstream Directory**

    ```bash
    mkdir jetstream
    ```

2. **Run NATS Server with Docker**

    ```bash
    docker run -d --name nats -p 4222:4222 -p 8222:8222 -v C:\Users\patil\OneDrive\Desktop\moleculer-nats-repro\config\nats.conf:/etc/nats/nats.conf nats:2.11.4 -c /etc/nats/nats.conf
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Start the Application**
    ```bash
    npm run start
    ```
