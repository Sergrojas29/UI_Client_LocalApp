import axios from "axios";

interface Connect {
    service: string;
    isConnected: boolean;
}

interface Log {
    success: boolean;
    status: string;
}


class DebugCall {
    private constructor() { };

    // FUNC HANDLE CONNECTION
    static async handleConnection() {
        try {
            const response = await axios.get('/debug/connect', { timeout: 6000 });

            try {
                if (response.status < 200 || response.status >= 300) throw new Error(`HTTP error. Status : ${response.status}`);
                
            } catch (error: unknown) {

            }
        }
    // FUNC HANDLE LOG
    static async handleLog(): Promise<Log> {
        try {
            const response = await axios.get<Log>('/debug/log', { timeout: 6000 });
            return response.data;
        } catch (error) {
            console.error("Error fetching log:", error);
            return { success: false, status: "Error fetching log" };
        }
    }

    // FUNC HANDLE PHOTO
    static async handlePhoto(): Promise<string> {
        try {
            const response = await axios.get('/debug/photo', {
                responseType: 'arraybuffer',
                timeout: 6000
            });
            const image = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return `data:${response.headers['content-type']};base64,${image}`;
        } catch (error) {
            console.error("Error fetching photo:", error);
            return ""; // Return an empty string or a placeholder image path
        }
    }
}

export default DebugCall;