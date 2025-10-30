import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStop = () => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={startStop}
          style={[styles.button, { backgroundColor: isRunning ? '#FF5252' : '#4CAF50' }]}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={reset} style={[styles.button, { backgroundColor: '#2196F3' }]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 64,
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
