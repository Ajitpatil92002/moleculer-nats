## Setup Instructions

1. **Run NATS Server with Docker**

    ```bash
     docker run -d --name nats -p 4222:4222 -p 8222:8222 -v C:\Users\patil\OneDrive\Desktop\moleculer-nats-repro\config\nats.conf:/etc/nats/nats.conf nats:2.11.4 -c /etc/nats/nats.conf
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Application**
    ```bash
    npm run start
    ```
