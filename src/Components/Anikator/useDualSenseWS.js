import { useEffect, useState, useCallback } from 'react';

// A shared hook for Desktop to listen and Controller to emit messages via WebSocket
export function useDualSenseWS() {
    const [ws, setWs] = useState(null);
    const [action, setAction] = useState(null);
    const [joystick, setJoystick] = useState({ dx: 0, dy: 0 }); // add joystick state

    useEffect(() => {
        // Determine the WS URL (using the same host/port, but wss/ws protocol)
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/playstation-ws`;

        let socket;
        let reconnectTimeout;

        const connect = () => {
            socket = new WebSocket(wsUrl);

            socket.onopen = () => {
                console.log('WS Connected');
                setWs(socket);
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'ACTION') {
                    setAction(data.payload); // e.g., 'LEFT', 'RIGHT', 'SELECT'
                    // clear action quickly so same action can be triggered again
                    setTimeout(() => setAction(null), 100);
                } else if (data.type === 'JOYSTICK') {
                    setJoystick(data.payload);
                }
            };

            socket.onclose = () => {
                console.log('WS Disconnected, reconnecting...');
                setWs(null);
                reconnectTimeout = setTimeout(connect, 1000);
            };

            socket.onerror = (err) => {
                console.error('WS Error:', err);
                socket.close();
            };
        };

        connect();

        return () => {
            clearTimeout(reconnectTimeout);
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const sendAction = useCallback((payload) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ACTION', payload }));
        }
    }, [ws]);

    const sendJoystick = useCallback((payload) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'JOYSTICK', payload }));
        }
    }, [ws]);

    return { action, sendAction, joystick, sendJoystick };
}
